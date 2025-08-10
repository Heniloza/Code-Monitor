import axios from "axios";

const LC_BASEURL = "https://leetcode.com/graphql";
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

export async function fetchLeetCodeStats(username, opts = {}) {
  const { useCache = true, ttlMs = 5 * 60 * 1000 } = opts;
  if (!username) throw new Error("LeetCode username is required");

  const cacheKey = `lc:${username}`;
  if (useCache) {
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;  

   try {
     const res = await axios.post(
       LC_BASEURL,
       { query, variables: { username } },
       { headers: { "Content-Type": "application/json" } }
     );

     if (!res?.data?.data?.matchedUser) {
       throw new Error("LeetCode user not found");
     }

     const u = res.data.data.matchedUser;
     const totalSolved =
       u.submitStats.acSubmissionNum.find((d) => d.difficulty === "All")
         ?.count || 0;
     const easySolved =
       u.submitStats.acSubmissionNum.find((d) => d.difficulty === "Easy")
         ?.count || 0;
     const mediumSolved =
       u.submitStats.acSubmissionNum.find((d) => d.difficulty === "Medium")
         ?.count || 0;
     const hardSolved =
       u.submitStats.acSubmissionNum.find((d) => d.difficulty === "Hard")
         ?.count || 0;

     const mapped = {
       username: u.username,
       realName: u.profile.realName,
       avatar: u.profile.userAvatar,
       ranking: u.profile.ranking,
       totalSolved,
       easySolved,
       mediumSolved,
       hardSolved,
     };

     setCached(cacheKey, mapped, ttlMs);
     return mapped;
   } catch (err) {
     console.error("LeetCode API error:", err.message);
     throw err;
   }

}