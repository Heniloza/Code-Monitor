// src/pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/api";
import { Loader } from "lucide-react";

function AuthSuccess() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {     
      axiosInstance
        .get("/auth/check-auth")
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data),"Got data from google";
          setIsAuthenticated(true);
          setIsLoggedIn(true);
          navigate("/"); 
        })
        .catch((err) => {
          console.log(err);
        });
    }, [checkAuth]);

  return <div className="text-center mt-8 flex flex-col items-center justify-center gap-6 h-screen">
    
<Loader className="animate-spin size-20"/>
Logging you in...
</div>;
}

export default AuthSuccess;
