import { Link } from "react-router-dom"
import { GalleryVerticalEnd } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted p-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
          <GalleryVerticalEnd className="h-6 w-6" />
          TradeMe
        </div>
        <h1 className="text-3xl font-bold">Welcome to TradeMe</h1>
        <p className="text-muted-foreground">Buy, sell, and grow your investments.</p>
        <div className="flex gap-4 justify-center mt-4">
          <Link to="/login" className="bg-primary text-white px-4 py-2 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-secondary text-black px-4 py-2 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
