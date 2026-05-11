import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
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

      await axios.post(
        "team-task-manager-production-2b0a.up.railway.app",
        formData
      );

      alert("Registration Successful");

      window.location.href = "/";

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-8">

          <div className="bg-purple-500 p-4 rounded-full mb-4">
            <UserPlus size={35} />
          </div>

          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-slate-300 mt-2">
            Join the Team Task Manager
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-6 text-white"
            onChange={handleChange}
          >
            <option className="text-black" value="member">
              Member
            </option>

            <option className="text-black" value="admin">
              Admin
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-4 rounded-xl font-semibold text-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-slate-300">
          Already have an account? {" "}

          <Link
            to="/"
            className="text-purple-400 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;