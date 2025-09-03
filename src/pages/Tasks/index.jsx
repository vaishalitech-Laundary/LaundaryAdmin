import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Tasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  // Fetch tasks from backend function is here 
  const fetchTasks = async () => {
    try {
      const todo = await axios.get("http://localhost:5000/api/todo/tasks", {
        withCredentials: true,
      });
      setTaskData(todo.data.data);
    } catch (error) {
      alert("No task found - server error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task function is here 
  const addTask = async () => {
    if (newTaskTitle.trim() === "") return;

    try {
      await axios.post(
        "http://localhost:5000/api/todo/tasks",
        {
          description: newTaskTitle,
          dueDate: new Date().toISOString(),
          isStarred: false,
          isCompleted: false,
        },
        { withCredentials: true }
      );

      setNewTaskTitle("");
      setIsAddingTask(false);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  // Update task function is here 
  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todo/tasks/${id}`,
        updates,
        { withCredentials: true }
      );

      setTaskData((prev) =>
        prev.map((task) => (task._id === id ? res.data.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  // Delete task function is here 
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/tasks/${id}`, {
        withCredentials: true,
      });
      setTaskData((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  // Toggle Completed function is here 
  const toggleCompleted = (task) => {
    updateTask(task._id, { isCompleted: !task.isCompleted });
  };

  // Toggle Favorite function is here 
  const toggleFavorite = (task) => {
    updateTask(task._id, { isStarred: !task.isStarred });
  };

  // Start editing  function is here 
  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTaskTitle(task.description);
  };

  // Save edited task function is here 
  const saveEdit = (id) => {
    if (editTaskTitle.trim() === "") return;
    updateTask(id, { description: editTaskTitle });
    setEditingTaskId(null);
    setEditTaskTitle("");
  };

  //  Cancel editing function is here 
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskTitle("");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkText">To-Do List</h1>
        {isAddingTask ? (
          <button
            onClick={addTask}
            className="bg-bgPri text-lightText px-5 py-2 rounded-md shadow-sm"
          >
            Save
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

      {/* Input field for new task */}
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

      {/* rendering all Tasks list here ----- */}
      <div className="space-y-3">
        {taskData.map((task) => (
          <div
            key={task._id}
            className={`flex items-center p-4 rounded-md shadow-sm border ${
              task.isCompleted
                ? "bg-lbGreen border-lbGreen"
                : "bg-bgWhite border-lbBlue"
            }`}
          >
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleCompleted(task)}
                className="h-4 w-4 mr-4 cursor-pointer accent-lbGreen"
              />

              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                  className="flex-1 p-2 border border-lbBlue rounded focus:outline-none focus:ring-1 focus:ring-lbGreen"
                  autoFocus
                />
              ) : (
                <span
                  className={`${
                    task.isCompleted
                      ? "line-through text-lightText"
                      : "text-darkText"
                  }`}
                >
                  {task.description}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {editingTaskId === task._id ? (
                <>
                  <button
                    onClick={() => saveEdit(task._id)}
                    className="bg-lbGreen bg-green-600 ml-2 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* Favorite Button is here  */}
                  <button
                    onClick={() => toggleFavorite(task)}
                    className="p-2 focus:outline-none"
                  >
                    {task.isStarred ? (
                      <FaStar className="text-lbYellow text-lg" />
                    ) : (
                      <FaRegStar className=" text-lg" />
                    )}
                  </button>

                  {/* Edit Button is here  */}
                  <button
                    onClick={() => startEditing(task)}
                    className="p-2 focus:outline-none text-darkText cursor-pointer"
                  >
                    Edit
                  </button>

                  {/* Delete / Close Button is here  */}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2 focus:outline-none cursor-pointer"
                  >
                    <IoMdClose className=" text-lg" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
