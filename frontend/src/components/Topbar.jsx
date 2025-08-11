import { User } from "lucide-react"
import { NavLink, useLocation} from "react-router-dom"

function Topbar() {
  const location = useLocation().pathname.split("/")[1]
  
  return (
    <div className='w-full h-[70px] border-b-2 border-b-gray-500 flex justify-between px-2 md:px-8 items-center'>
      <h1 className="text-lg md:text-2xl font-bold">{location==="" ?  "Dashboard":location.charAt(0).toUpperCase()+location.slice(1)}</h1>
      <NavLink className={({isActive})=>`flex gap-4 px-2 md:px-6 py-1.5 border rounded-md justify-center items-center hover:bg-purple-100 hover:text-purple-600 transition-all hover:scale-95${isActive ? "bg-purple-100 text-purple-600 " : ""}`} to={"/profile"} >
        <User className="size-4 md:size-8"/>
        <p className="font-semibold text-sm md:text-xl">Profile</p>
      </NavLink>
    </div>
  )
}

export default Topbar