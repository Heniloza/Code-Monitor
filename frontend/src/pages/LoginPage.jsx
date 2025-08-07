import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {Github} from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from '../store/authStore.js';

function LoginPage() {
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })
    const { user, login, isLoggingin, isLoggedin,  } =
      useAuthStore();
    const navigate = useNavigate();

    const handleGoogleAuth=()=>{
      window.location.href = "http://localhost:5000/api/auth/google";
    }

    const handleGithubAuth=()=>{
      window.location.href = "http://localhost:5000/api/auth/github";
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      login(formData)
    }
    useEffect(() => {
      if(isLoggedin) navigate("/verify")
    }, [user, isLoggedin]);
  return (
    <div className="h-screen w-screen flex gap-6">
      {/* {Left Side} */}
      <div className="flex flex-col items-center flex-1/2 ">
        <div className="h-30 w-30">
          <img src="/icon.png" alt="Code monitor logo" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-[60%] md:h-[70%] w-full  md:w-[70%] rounded-2xl flex items-center flex-col gap-8 justify-center"
        >
          <h1 className="mt-4 text-md  md:text-2xl font-bold">
            Login to your accouunt
          </h1>

          <div className="flex flex-col w-[70%] gap-0.5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border  rounded-md hover:border-2 p-1 px-4"
            />
          </div>

          <div className="flex flex-col w-[70%] gap-0.5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border rounded-md hover:border-2 p-1 px-4"
            />
          </div>

          <button
            type="submit"
            className="border w-[70%] py-2 rounded-md font-bold text-2xl mt-2 bg-purple-400 text-white hover:bg-purple-300 hover:scale-95 delay-150 transition-all"
            disabled={isLoggingin}
          >
            {isLoggingin ? "Loading..." : "Login"}
          </button>
          <h1 className="font-bold">OR</h1>

          <div className="flex md:hidden gap-2 ">
            <h2>Don't have an account? </h2>
            <Link to={"/signup"}>
              <p className="text-blue-700 hover:underline">Signup</p>
            </Link>
          </div>
        </form>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-md w-full sm:w-auto hover:bg-gray-100 transition"
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-md w-full sm:w-auto hover:bg-gray-100 transition"
            onClick={handleGithubAuth}
          >
            <Github className="text-xl" />
            <span className="text-sm font-medium">Continue with GitHub</span>
          </button>
        </div>
      </div>

      {/* {Right side} */}
      <div className="hidden md:flex flex-1/2 flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Don't have an account?</h1>
          <div>
            <p className="text-gray-400">
              Start your journey by creating an account{" "}
            </p>
            <p className="text-gray-400 ml-9">and track progress and stats</p>
          </div>
          <Link
            to="/signup"
            className="px-8 rounded-sm py-1 shadow-2xl bg-gray-200 mt-2 flex items-center justify-center hover:scale-95 delay-100 hover:bg-gray-100 transition-all"
          >
            <button>Go to signup</button>
          </Link>
        </div>
        <div className="h-[50%] w-[50%]">
          <img src="/signin_icon.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage
