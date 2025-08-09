import {X} from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/api";
import { useAuthStore } from "../store/authStore";

function ConnectAccount({setOpenConnectionDialog}) {
  const [accounts, setAccounts] = useState({
    leetcode: "",
    codeforces: "",
    github:"",
  });
  const {user} = useAuthStore();

  const handleSave = async()=>{
    if(accounts.github.trim()===""){
      toast.error("Github username is required")
    }

    if (accounts.leetcode.trim() === "" && accounts.codeforces.trim() === "") {
      toast.error("Please enter either your LeetCode or Codeforces username");
      return;
    }

    try {
      const { data } = await axiosInstance.patch("/auth/platform-handles", {
        leetcode: accounts.leetcode.trim(),
        codeforce: accounts.codeforces.trim(), 
        github: accounts.github.trim(),
      });

      console.log(data);
      

      toast.success(data.message || "Accounts connected successfully!");
      useAuthStore.getState().setUser(data.user)

      setOpenConnectionDialog(false);
    } catch (error) {
       console.error(error);
       toast.error(error.response?.data?.message || "Failed to save accounts");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[80%] md:w-[60%] h-[45%]  md:h-[70%] max-w-lg bg-white shadow-2xl p-6 relative rounded-2xl flex flex-col items-center justify-center gap-8">
        <button
          className="absolute top-3 right-3 hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => setOpenConnectionDialog(false)}
        >
          <X />
        </button>

        <h2 className="text-md md:text-xl font-bold mb-4">
          Connect Your Accounts
        </h2>

        <input
          type="text"
          placeholder="LeetCode username"
          className="border px-4 w-[80%] rounded-md py-1"
          value={accounts.leetcode}
          onChange={(e) =>
            setAccounts((prev) => ({ ...prev, leetcode: e.target.value }))
          }
        />

        <input
          type="text"
          placeholder="code Force username"
          className="border px-4 w-[80%] rounded-md py-1"
          value={accounts.codeforces}
          onChange={(e) =>
            setAccounts((prev) => ({ ...prev, codeforces: e.target.value }))
          }
        />

        <input
          type="text"
          placeholder="Github username"
          className="border px-4 w-[80%] rounded-md py-1"
          value={accounts.github}
          onChange={(e) =>
            setAccounts((prev) => ({ ...prev, github: e.target.value }))
          }
        />

        <button
          className="bg-purple-400 hover:bg-purple-300 hover:scale-95 transition-all w-[80%] py-1 rounded-md mt-8 text-white font-semibold"
          onClick={handleSave}
        >
          Save Connection
        </button>
      </div>
    </div>
  );
}

export default ConnectAccount