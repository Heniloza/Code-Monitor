import { Github } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function SignupPage() {
  const [formData, setFormData] = useState({
          name: '',
          email:"",
          password:"",
      })
    const { isSiggingin, signup, isLoggedin, user} =
      useAuthStore();
    const navigate = useNavigate();

    const handleGoogleAuth = () => {
      window.location.href = "http://localhost:5000/api/auth/google";
    };

    const handleGithubAuth = () => {
     window.location.href = "http://localhost:5000/api/auth/github";
    };

  const handleSubmit = (e)=>{
    e.preventDefault()
    signup(formData)
  }

  useEffect(()=>{
    if(isLoggedin) navigate("/verify")
  },[user,isLoggedin])
  return (
    <div className="h-screen w-screen flex gap-6">
      {/* {Left side} */}
      <div className="flex flex-col items-center flex-1/2 ">
        <div className="h-30 w-30">
          <img src="/icon.png" alt="Code monitor logo" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-[80%] w-full md:w-[70%]  rounded-2xl flex items-center flex-col gap-8 justify-center"
        >
          <h1 className="mt-4 text-md  md:text-2xl font-bold">
            Create Account
          </h1>

          <div className="flex flex-col w-[70%] gap-0.5">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border  rounded-md hover:border-2 p-1 px-4"
              required
            />
          </div>

          <div className="flex flex-col w-[70%] gap-0.5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border  rounded-md hover:border-2 p-1 px-4"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="border w-[70%] py-2 rounded-md font-bold text-2xl mt-2 bg-purple-400 text-white hover:bg-purple-300 hover:scale-95 delay-150 transition-all"
            disabled={isSiggingin}
          >
            {isSiggingin ? "Loading..." : " Create account"}
          </button>
          <h1 className="font-bold">OR</h1>

          <div className="flex md:hidden gap-2 ">
            <h2>Already have an account? </h2>
            <Link to={"/signup"}>
              <p className="text-blue-700 hover:underline">Login</p>
            </Link>
          </div>
        </form>

        {/* {Oauth} */}
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

      {/* {Righ side } */}
      <div className="hidden md:flex flex-1/2 flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Already have an account?</h1>
          <div>
            <p className="text-gray-400">
              Log in now to access your dashboard,
            </p>
            <p className="text-gray-400 ml-9">track progress,and view stats.</p>
          </div>
          <Link
            to="/login"
            className="px-8 rounded-sm py-1 shadow-2xl bg-gray-200 mt-2 flex items-center justify-center hover:scale-95 delay-100 hover:bg-gray-100 transition-all"
          >
            <button>Go to login</button>
          </Link>
        </div>
        <div className="h-[50%] w-[50%]">
          <img src="/signup_icon.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage
