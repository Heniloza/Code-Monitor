import axios from "axios"

const GH_BASEURL =  "https://api.github.com";
const cache = new Map();

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expire) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}
function setCached(key, value, ttlMs = 5 * 60 * 1000) {
  cache.set(key, { value, expire: Date.now() + ttlMs });
}

export async function fetchGithubStats(username, opts = {}) {
  const { useCache = true, perPage = 100, ttlMs = 5 * 60 * 1000 } = opts;
  if (!username) throw new Error("GitHub username is required");

  const cacheKey = `gh:${username}`;
  if (useCache) {
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }

  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const profileRes = await axios.get(`${GH_BASEURL}/users/${username}`, { headers });
  if (!profileRes?.data) throw new Error("GitHub user not found");

  const repos = [];
  let page = 1;
  while (true) {
    const res = await axios.get(`${GH_BASEURL}/users/${username}/repos`, {
      headers,
      params: { per_page: perPage, page, sort: "updated" },
    });
    if (!res?.data || res.data.length === 0) break;
    repos.push(...res.data);
    if (res.data.length < perPage) break;
    page += 1;
  }

  let totalStars = 0;
  let totalForks = 0;
  const languageCount = {};
  let lastPushed = null;

  for (const repo of repos) {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;
    if (repo.language) languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    if (repo.pushed_at) {
      const d = new Date(repo.pushed_at);
      if (!lastPushed || d > lastPushed) lastPushed = d;
    }
  }

  const topLanguages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({ language, count }));

const mapped = {
    username: profileRes.data.login,
    name: profileRes.data.name || null,
    avatar: profileRes.data.avatar_url,
    bio: profileRes.data.bio || "",
    followers: profileRes.data.followers,
    following: profileRes.data.following,
    publicRepos: profileRes.data.public_repos,
    totalStars,
    totalForks,
    topLanguages,
    lastPushed,
    profileUrl: profileRes.data.html_url,
    createdAt: profileRes.data.created_at,
    rawProfile: profileRes.data,
  };

  setCached(cacheKey, mapped, ttlMs);
  return mapped;

}   