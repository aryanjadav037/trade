import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import {LoginForm} from "./components/login-form"
import {SignUpForm} from "./components/signup-form"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm className={"flex w-full max-w-sm flex-col gap-6"}/>} />
        <Route path="/signup" element={<SignUpForm className={" flex w-full max-w-sm flex-col gap-6 "}/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}
