import axios from "axios"

const CF_BASEURL = "https://codeforces.com/api"
const cache = new Map();

function getCached(key){
    const entry = cache.get(key)
    if(!entry) return null;
    if(Date.now()>entry.expire){
        cache.delete(key)
        return null
    }
    return entry.value
}

function setCached(key,value,ttlms = 5 * 60 * 1000){
    cache.set(key,{value,expire:Date.now()+ttlms})
}


export  const fetchCodeforcesStats = async (handle, opts = {}) => {
  const { useCache = true, submissionsCount = 50 } = opts;
  if (!handle) throw new Error("Codeforces handle is required");

  const cacheKey = `cf:${handle}`;
  if (useCache) {
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }

  const [infoRes, statusRes] = await Promise.all([
    axios.get(`${CF_BASEURL}/user.info`,{params:{handles:handle}}),
    axios.get(`${CF_BASEURL}/user.status`,{params:{handle,count:submissionsCount}})
  ]);

    if (!infoRes?.data || infoRes.data.status !== "OK") {
      throw new Error("Codeforces user not found or user.info failed");
    }

    const info = infoRes.data.result[0];
    const submissions = statusRes?.data?.status === "OK" ? statusRes.data.result : [];
    
    const solvedSet = new Set();
    const recentSet = new Set();
    const now = Math.floor(Date.now() / 1000);
    const sevenDays = 7 * 24 * 3600;

    for (const s of submissions) {
      if (s.verdict === "OK" && s.problem) {
        const key = `${s.problem.contestId}-${s.problem.index}`;
        solvedSet.add(key);
        if (now - (s.creationTimeSeconds || 0) <= sevenDays) recentSet.add(key);
      }
    }


    const mapped = {
      handle: info.handle,
      rating: info.rating ?? null,
      maxRating: info.maxRating ?? null,
      rank: info.rank ?? null,
      maxRank: info.maxRank ?? null,
      avatar: info.titlePhoto || null,
      contribution: info.contribution ?? 0,
      solvedCount: solvedSet.size,
      recentSolvedLast7d: recentSet.size,
      lastOnline: info.lastOnlineTimeSeconds
        ? new Date(info.lastOnlineTimeSeconds * 1000)
        : null,
      sampleSubmissionsCount: submissions.length,
      rawInfo: info,
    };

    setCached(cacheKey, mapped, 5 * 60 * 1000); // store for 5 mins
    return mapped;

};