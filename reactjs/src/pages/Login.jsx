import { useState } from "react";
import { useAppContext } from "../context/Appcontext";

export default function Login() {
  const { loginUser, signupUser,navigate } = useAppContext();
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signupUser(formData);
    } else {
      loginUser(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-black/20 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-black/20 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-black/20 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />

          <button
            onClick={()=>navigate("/reports")}
            type="submit"
            className="w-full py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all font-medium"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-pink-400 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
