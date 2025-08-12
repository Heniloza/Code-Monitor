import React, { useEffect, useState } from 'react'
import {useAuthStore} from "../store/authStore.js"
import ConnectAccount from '../components/ConnectAccount.jsx';
import { usePlatformStatsStore } from '../store/platformStatsStore.js';
import {Link} from "react-router-dom"

function Dashboard() {
  const [openConnectionDialog, setOpenConnectionDialog] = useState(false)
  const {user} = useAuthStore()
  const { allPlatformStats, fetchAllStats } = usePlatformStatsStore()
  console.log(allPlatformStats);
  const progressPercentage = Math.min(
  Math.round((allPlatformStats?.leetcode?.totalSolved / 3637) * 100),
  100
  );

   useEffect(() => {
     if (user?.platformHandles) {
       fetchAllStats(user.platformHandles);
     }
   }, [user, fetchAllStats]);
  
  return (
    <div>
      {user?.isFirstLogin ? (
        <div className="flex h-screen w-screen justify-center items-center flex-col gap-8">
          <div className="flex flex-col gap-4 justify-center items-center mt-16">
            <p className="font-bold text-md  md:text-2xl">
              You haven't connect your account yet.
            </p>
            <p>Please connect your account to continue.</p>
          </div>
          <button
            className="py-1 px-16 md:px-26 bg-purple-400 text-white font-semibold rounded-sm hover:bg-purple-300 transition-all"
            onClick={() => setOpenConnectionDialog(true)}
          >
            Connect Account
          </button>
          <img
            src="notconnected_icon.png"
            alt="not connected image"
            className="h-120 w-120"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
          {/* LeetCode Card */}
          <div className="bg-cyan-100 shadow rounded-lg p-4">
            <p className="text-gray-500">LeetCode Problems Solved</p>
            <div className="flex items-center gap-3 mt-2">
              <img
                src={allPlatformStats?.leetcode?.avatar}
                alt="LeetCode avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">
                  {allPlatformStats?.leetcode?.username}
                </h2>
                <p className="text-sm text-gray-600">
                  Total Solved: {allPlatformStats?.leetcode?.totalSolved ?? 0}
                </p>
                <p className="text-sm text-gray-600">
                  Ranking: #{allPlatformStats?.leetcode?.ranking ?? "N/A"}
                </p>
                <div>
                  <p className="text-sm text-gray-600">
                    Easy Problems : {allPlatformStats?.leetcode?.easySolved}
                  </p>
                  <p className="text-sm text-gray-600">
                    Medium Problems : {allPlatformStats?.leetcode?.mediumSolved}
                  </p>
                  <p className="text-sm text-gray-600">
                    Hard Problems : {allPlatformStats?.leetcode?.hardSolved}
                  </p>
                </div>
                <div className="w-full h-4 mt-1 rounded-2xl bg-gray-300">
                  <div
                    className="h-4 rounded-2xl bg-green-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="bg-green-100 shadow rounded-lg p-4">
            <p className="text-gray-500">GitHub Overview</p>
            <div className="flex items-center gap-3 mt-2">
              <img
                src={allPlatformStats?.github?.avatar}
                alt="GitHub avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">
                  {allPlatformStats?.github?.name}
                </h2>
                <Link
                  to={allPlatformStats?.github?.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Repos: {allPlatformStats?.github?.publicRepos ?? 0}</p>
              <p>Followers: {allPlatformStats?.github?.followers ?? 0}</p>
              <p>Stars: {allPlatformStats?.github?.totalStars ?? 0}</p>
              <p>
                Top Languages:{" "}
                {allPlatformStats?.github?.topLanguages
                  ?.map((lang) => lang.language)
                  .join(", ") || "N/A"}
              </p>
            </div>
          </div>

          {/* Codeforces Card */}

          <div className="bg-pink-100 shadow rounded-lg p-4">
            <p className="text-gray-500">Codeforces Rating</p>
            {allPlatformStats?.codeforces ? (
              <>
                <h2 className="text-2xl font-bold mt-2">
                  {allPlatformStats.codeforces.rating}
                </h2>
                <p className="text-sm text-gray-600">
                  Rank: {allPlatformStats.codeforces.rank}
                </p>
                <p className="text-sm text-gray-600">
                  Max Rating: {allPlatformStats.codeforces.maxRating}
                </p>
              </>
            ) : (
              <p className="text-gray-400 mt-2">No Codeforces data connected</p>
            )}
          </div>
        </div>
      )}
      {openConnectionDialog && (
        <ConnectAccount setOpenConnectionDialog={setOpenConnectionDialog} />
      )}
    </div>
  );
}

export default Dashboard
