import {X} from "lucide-react"
import { useState } from "react";

function ConnectAccount({setOpenConnectionDialog}) {
  const [accounts, setAccounts] = useState({
    leetcode: "",
    codeforces: "",
    github:"",
  });

  const handleSave = async()=>{

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[60%] h-[70%] max-w-lg bg-white shadow-2xl p-6 relative rounded-2xl flex flex-col items-center justify-center gap-8">
        <button
          className="absolute top-3 right-3 hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => setOpenConnectionDialog(false)}
        >
          <X />
        </button>

        <h2 className="text-md md:text-xl font-bold mb-4">Connect Your Accounts</h2>

        <input
          type="text"
          placeholder="LeetCode username"
          className="border px-4 w-[80%] rounded-md py-1"
        />

        <input
          type="text"
          placeholder="code Force username"
          className="border px-4 w-[80%] rounded-md py-1"
        />

        <input
          type="text"
          placeholder="Github username"
          className="border px-4 w-[80%] rounded-md "
        />

        <button className="bg-purple-400 hover:bg-purple-300 hover:scale-95 transition-all w-[80%] py-1 rounded-md mt-8 text-white font-semibold" onClick={handleSave}>
          Save Connection
        </button>
      </div>
    </div>
  );
}

export default ConnectAccount