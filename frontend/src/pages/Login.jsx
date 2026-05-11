import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
  "https://team-task-manager-production-7522.up.railway.app/",
  formData
);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "userEmail",
        formData.email
      );

      window.location.href = "/dashboard";

    } catch (error) {

      alert("Invalid Credentials");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative px-4">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-90"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

      {/* Card */}

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-md p-10 text-white">

        {/* Icon */}

        <div className="flex justify-center mb-6">

          <div className="bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-500/40">

            <ShieldCheck size={40} />

          </div>

        </div>

        {/* Heading */}

        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold mb-3 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-slate-300 text-lg">
            Login to manage your team workflow
          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 text-sm text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
          >

            Login

            <ArrowRight size={20} />

          </button>

        </form>

        {/* Footer */}

        <div className="flex items-center justify-center gap-2 mt-8 text-slate-300">

          <Sparkles size={18} />

          <p>Secure Team Collaboration Platform</p>

        </div>

        <p className="text-center mt-6 text-slate-300">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-400 font-semibold hover:text-blue-300"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;