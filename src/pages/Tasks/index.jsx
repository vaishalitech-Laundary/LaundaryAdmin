import React, { useState } from 'react';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Tasks = () => {
  // Initial tasks from the images
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Meeting with CEO', completed: false, favorite: false },
    { id: 2, title: 'Meet with Manager Meeting', completed: false, favorite: true },
    { id: 3, title: 'Send Invoices', completed: false, favorite: false },
    { id: 4, title: 'Review with HR', completed: true, favorite: false },
    { id: 5, title: 'Add Team Members', completed: false, favorite: false },
    { id: 6, title: 'Add Services', completed: false, favorite: true },
    { id: 7, title: 'Update Services', completed: false, favorite: false },
    { id: 8, title: 'Analysis', completed: false, favorite: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Toggle task completion status
  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, favorite: !task.favorite } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Add new task
  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      favorite: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        {isAddingTask ? (
          <button 
            onClick={addTask}
            className="bg-[#1F3C5F] text-white px-5 py-2 rounded-md shadow-sm"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setIsAddingTask(true)}
            className="bg-[#1F3C5F] text-white px-5 py-2 rounded-md shadow-sm"
          >
            Add New Task
          </button>
        )}
      </div>

      {/* Task input field */}
      {isAddingTask && (
        <div className="mb-4 p-4 bg-white rounded-md shadow-sm border border-gray-100">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
            autoFocus
          />
        </div>
      )}

      {/* Tasks list */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`flex items-center p-4 rounded-md ${
              task.completed ? 'bg-green-400' : 'bg-white'
            } shadow-sm border border-gray-100`}
          >
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className="h-4 w-4 mr-4 cursor-pointer accent-green-500"
              />
              <span className={task.completed ? 'line-through text-gray-700' : 'text-gray-800'}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => toggleFavorite(task.id)} 
                className="p-2 focus:outline-none"
                aria-label={task.favorite ? "Unmark as favorite" : "Mark as favorite"}
              >
                {task.favorite ? 
                  <FaStar className="text-yellow-400 text-lg" /> : 
                  <FaRegStar className="text-gray-300 text-lg" />
                }
              </button>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Delete task"
              >
                <IoMdClose className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;