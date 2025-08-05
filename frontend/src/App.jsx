import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyOtp from "./pages/VerifyOtp"
import {Toaster} from "react-hot-toast"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App
