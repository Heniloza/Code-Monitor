import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyOtp from "./pages/VerifyOtp"
import {Toaster} from "react-hot-toast"
import { useEffect } from "react"
import { useAuthStore } from "./store/authStore"
import NotFound from "./pages/NotFound"
import { Loader2 } from "lucide-react"
import AuthSuccess from "./pages/AuthSuccess"
import Dashboard from "./pages/Dashboard"

function App() {
  const checkAuth = useAuthStore(state=>state.checkAuth)
  const { isAuthenticated, isCheckikngAuth, user, isLoggedin } = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckikngAuth && !user){
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin size-20"/>
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />}/>
          {/* {auth routes} */}
          <Route path="/login" element={!isAuthenticated? <LoginPage />:<Navigate to={"/"}/>} />
          <Route path="/signup" element={!isAuthenticated ? <SignupPage />:<Navigate to={"/"}/>} />
          <Route path="/verify" element={!isAuthenticated && isLoggedin ? <VerifyOtp />:<Navigate to="/"/>} />
          <Route path="/auth/success" element={<AuthSuccess / >}/>

          <Route path="/" element={isAuthenticated? <Dashboard /> : <Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App
