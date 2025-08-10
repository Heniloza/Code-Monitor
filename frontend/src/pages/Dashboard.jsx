import React, { useState } from 'react'
import {useAuthStore} from "../store/authStore.js"
import ConnectAccount from '../components/ConnectAccount.jsx';

function Dashboard() {
  const [openConnectionDialog, setOpenConnectionDialog] = useState(false)
  const {user} = useAuthStore()
  console.log(user);
  
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
        <div>
          <h1>Dashboard page</h1>
        </div>
      )}
      {openConnectionDialog && (
        <ConnectAccount setOpenConnectionDialog={setOpenConnectionDialog} />
      )}
    </div>
  );
}

export default Dashboard
