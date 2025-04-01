import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  // Retrieve user data from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Google Sign-In Function
  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

        console.log("User Info:", data);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    },
    onError: (error) => console.error("Sign-In Failed:", error),
  });

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="bg-[#F0F8FF] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="w-16 h-16 mr-4">
            <circle cx="150" cy="150" r="140" fill="#2563EB" />
            <path d="M150 90 L100 130 L150 170 L200 130 Z" fill="white" stroke="white" strokeWidth="3"/>
            <circle cx="150" cy="200" r="40" fill="white"/>
            <path d="M120 220 Q150 250, 180 220" fill="none" stroke="blue" strokeWidth="3"/>
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Learning Path Dashboard</h1>
        </div>

        {/* Navigation & Authentication */}
        <nav className="space-x-6 flex mt-3 items-center">
          <div className="">
            <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          </div>
          <div className="">
            <Link to="/features" className="text-gray-700 hover:text-black">Features</Link>
          </div>
          

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-gray-700">Hello, {user.name}</div>
              <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => signInWithGoogle()} className="bg-black text-white px-4 py-2 rounded-md">
              Sign In with Google
            </Button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-16 grid grid-cols-2 items-center gap-12">
        {/* Left Side - Content */}
        <div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Personalized Learning Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover, track, and accelerate your learning with our comprehensive dashboard. 
            Customize your educational path and reach your full potential.
          </p>
          <Link to={'/UserSelection'}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition duration-300 shadow-lg">
              Get Started, it's free
            </Button>
          </Link>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-96 h-96">
            <rect width="400" height="400" fill="#F0F8FF" />
            <path d="M100 50 L300 50 L300 350 L100 350 Z" fill="white" stroke="#2563EB" strokeWidth="4" />
            <rect x="150" y="100" width="100" height="30" fill="#2563EB" opacity="0.7" />
            <rect x="150" y="150" width="200" height="30" fill="#2563EB" opacity="0.5" />
            <rect x="150" y="200" width="150" height="30" fill="#2563EB" opacity="0.3" />
            <circle cx="250" cy="250" r="50" fill="#16A34A" opacity="0.6" />
            <path d="M230 250 L240 260 L270 230" stroke="white" strokeWidth="4" />
          </svg>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Learning Path Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
