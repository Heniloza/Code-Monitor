import { fetchCodeforcesStats } from "../services/codeForcesService.js";
import { fetchGithubStats } from "../services/githubService.js";
import { fetchLeetCodeStats } from "../services/leetcodeServices.js";



export async function fetchAllPlatformStats(handles) {
    const {codeforces,github,leetcode} = handles   

    const results = await Promise.allSettled([
      codeforces ? fetchCodeforcesStats(codeforces) : null,
      github ? fetchGithubStats(github) : null,
      leetcode ? fetchLeetCodeStats(leetcode) : null,
    ]);

    return {
      codeforces:
        results[0].status === "fulfilled"
          ? results[0].value
          : { error: results[0].reason?.message },
      github:
        results[1].status === "fulfilled"
          ? results[1].value
          : { error: results[1].reason?.message },
      leetcode:
        results[2].status === "fulfilled"
          ? results[2].value
          : { error: results[2].reason?.message },
    };
}