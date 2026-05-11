import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  LogOut,
  PlusCircle,
  Moon,
  Sun,
  Calendar
} from "lucide-react";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const token = localStorage.getItem("token");

  const userEmail =
    localStorage.getItem("userEmail") || "User";

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            authorization: token
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    if (!token) {
      window.location.href = "/";
    }

    fetchTasks();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: {
            authorization: token
          }
        }
      );

      setFormData({
        title: "",
        description: "",
        dueDate: ""
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  const markDone = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status: "Done"
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userEmail");

    window.location.href = "/";
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  return (

    <div className={`${darkMode ? "bg-slate-900 text-white" : "bg-slate-100"} min-h-screen`}>

      {/* Top Navbar */}

      <div className={`${darkMode ? "bg-slate-950" : "bg-white"} shadow-lg px-6 md:px-10 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>

        <div>

          <h1 className="text-3xl font-bold">
            Team Task Manager
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome, {userEmail}
          </p>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
          >

            {darkMode
              ? <Sun size={18} />
              : <Moon size={18} />
            }

            {darkMode
              ? "Light"
              : "Dark"
            }

          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

      <main className="p-6 md:p-10">

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-6 shadow-lg`}>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Total Tasks
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {tasks.length}
                </h2>

              </div>

              <ClipboardList
                className="text-blue-500"
                size={40}
              />

            </div>

          </div>

          <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-6 shadow-lg`}>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Completed
                </p>

                <h2 className="text-4xl font-bold text-green-500 mt-2">
                  {completedTasks}
                </h2>

              </div>

              <CheckCircle
                className="text-green-500"
                size={40}
              />

            </div>

          </div>

          <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-6 shadow-lg`}>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Pending
                </p>

                <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                  {pendingTasks}
                </h2>

              </div>

              <Clock
                className="text-yellow-500"
                size={40}
              />

            </div>

          </div>

        </div>

        {/* Create Task */}

        <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-2xl p-8 shadow-lg mb-10`}>

          <div className="flex items-center gap-3 mb-6">

            <PlusCircle className="text-blue-500" />

            <h2 className="text-3xl font-bold">
              Create Task
            </h2>

          </div>

          <form onSubmit={createTask}>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border mb-5 text-black"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border mb-5 h-32 text-black"
            />

            <div className="mb-5">

              <label className="flex items-center gap-2 mb-2 text-slate-500">

                <Calendar size={18} />

                Due Date

              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border text-black"
              />

            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Create Task
            </button>

          </form>

        </div>

        {/* Pending Tasks */}

        <div>

          <h2 className="text-3xl font-bold mb-6">
            Pending Tasks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {tasks
              .filter((task) => task.status !== "Done")
              .map((task) => (

              <div
                key={task._id}
                className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition`}
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-2xl font-bold">
                    {task.title}
                  </h3>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {task.status}
                  </span>

                </div>

                <p className="text-slate-500 mb-4">
                  {task.description}
                </p>

                {task.dueDate && (

                  <p className="text-sm text-blue-400 mb-5">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>

                )}

                <button
                  onClick={() => markDone(task._id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition"
                >
                  Mark Done
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>

  );
}

export default Dashboard;