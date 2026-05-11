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

  const API =
    "https://team-task-manager-production-7522.up.railway.app";

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `${API}/api/tasks`,
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
        `${API}/api/tasks`,
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
        `${API}/api/tasks/${id}`,
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

      </main>

    </div>

  );
}

export default Dashboard;