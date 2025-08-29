import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const BASE_URL = "https://laundary-backend-vpz9.onrender.com";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/todo/tasks`);
      console.log(res.data);
      setTasks(
        res.data?.data?.map((t) => ({
          id: t._id,
          title: t.description,
          completed: !!t.isCompleted,
          favorite: !!t.isStarred,
          dueDate: t.dueDate,
        })) || []
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const addTask = async () => {
    if (newTaskTitle.trim() === "") return;
    setAdding(true);
    try {
      const body = {
        description: newTaskTitle.trim(),
        dueDate: new Date().toISOString().split("T")[0],
        isStarred: false,
      };

      const res = await axios.post(`${BASE_URL}/api/todo/tasks`, body);
      const t = res.data?.data;
      if (t) {
        setTasks((prev) => [
          ...prev,
          {
            id: t._id,
            title: t.description,
            completed: !!t.isCompleted,
            favorite: !!t.isStarred,
            dueDate: t.dueDate,
          },
        ]);
        setNewTaskTitle("");
        setIsAddingTask(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setAdding(false);
    }
  };

  
  const toggleCompleted = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await axios.put(`${BASE_URL}/api/todo/tasks/${id}`, {
        isCompleted: !task.completed,
      });
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: task.completed } : t))
      );
      setError(err.response?.data?.message || err.message);
    }
  };

 
  const toggleFavorite = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    );

    try {
      await axios.put(`${BASE_URL}/api/todo/tasks/${id}`, {
        isStarred: !task.favorite,
      });
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, favorite: task.favorite } : t))
      );
      setError(err.response?.data?.message || err.message);
    }
  };

  
  const deleteTask = async (id) => {
    const backup = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await axios.delete(`${BASE_URL}/api/todo/tasks/${id}`);
    } catch (err) {
      setTasks(backup);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkText">To-Do List</h1>
        {isAddingTask ? (
          <button
            onClick={addTask}
            disabled={adding}
            className="bg-bgPri text-lightText px-5 py-2 rounded-md shadow-sm"
          >
            {adding ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-bgPri text-lightText px-5 py-2 rounded-md shadow-sm"
          >
            Add New Task
          </button>
        )}
      </div>

      {isAddingTask && (
        <div className="mb-4 p-4 bg-bgWhite rounded-md shadow-sm border border-lbYellow">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full p-2 border border-lbBlue rounded focus:outline-none focus:ring-1 focus:ring-lbGreen"
            autoFocus
          />
        </div>
      )}

      {error && <div className="text-red-500 mb-3">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center p-4 rounded-md shadow-sm border ${
                task.completed
                  ? "bg-lbGreen border-lbGreen"
                  : "bg-bgWhite border-lbBlue"
              }`}
            >
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                  className="h-4 w-4 mr-4 cursor-pointer accent-lbGreen"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-lightText"
                      : "text-darkText"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleFavorite(task.id)}
                  className="p-2 focus:outline-none"
                >
                  {task.favorite ? (
                    <FaStar className="text-lbYellow text-lg" />
                  ) : (
                    <FaRegStar className=" text-lg" />
                  )}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 focus:outline-none"
                >
                  {task.completed ? (
                    <FaTrash className="text-bgWhite text-lg" />
                  ) : (
                    <IoMdClose className=" text-lg" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
