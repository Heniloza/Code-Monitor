import {  TbDeviceAnalytics } from "react-icons/tb";
import {ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Flame, LayoutDashboard, LogOut, Settings, Settings2, Star, Swords, Trophy} from "lucide-react"
import {NavLink} from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false)
  const {logout} = useAuthStore()

  const menuItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
    { icon: <Trophy />, label: "Gamification", path: "/gamification" },
    { icon: <Swords />, label: "Rival Mode", path: "/rival" },
    { icon: <Flame />, label: "Streaks", path: "/streaks" },
    { icon: <Star />, label: "XP & Levels", path: "/xp" },
    { icon: <Settings />, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`h-full w-[80px] md:w-[250px] shadow-2xl transition-[width]  duration-300 ease-in-out flex flex-col gap-4 md:gap-8 ${
        openSidebar ? "w-[250px] " : ""
      }`}
    >
      <NavLink className="flex gap-4 mt-4 md:mt-8 px-4 justify-center" to="/">
        <TbDeviceAnalytics className="size-8 " />
        <h1 className="text-2xl font-bold hidden md:block">CodeMonitor</h1>
      </NavLink>

      <hr className="text-gray-400" />

      <div className="flex flex-col flex-1/2 gap-4 mt-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `px-4 flex gap-6 py-2 rounded-lg mx-3 transition-all  cursor-pointer
              ${
                isActive
                  ? " bg-purple-100 text-purple-600 font-semibold shadow-md  md:border-purple-500 md:rounded-lg"
                  : "text-gray-500 hover:bg-gray-100 hover:shadow-md"
              }`
            }
          >
            {item.icon}
            <h2
              className={`text-lg font-semibold ${
                openSidebar ? "block" : "hidden"
              } md:block`}
            >
              {item.label}
            </h2>
          </NavLink>
        ))}
      </div>

      <div
        className="px-4 flex gap-4 py-2 rounded-lg mx-3 text-gray-500 hover:bg-purple-100 hover:text-purple-600 hover:shadow-md transition-all md:mb-4 cursor-pointer"
        onClick={() => logout()}
      >
        <LogOut />
        <h2 className="text-lg font-semibold hidden md:block">Logout</h2>
      </div>

      <div
        className="flex md:hidden px-6 mb-4"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? <ChevronLeft /> : <ChevronRight />}
      </div>
    </div>
  );
}

export default Sidebar;
