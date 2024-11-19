"use client";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200"> 
      <div className="m-5 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-4xl font-bold mb-6">To-Do List</h1>

        <div className="flex items-center space-x-3 mb-100">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-100 p-2 rounded-md w-full"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-300 transition"
          >
            Add Task
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="cursor-pointer"
                  aria-label={`Mark task "${task.text}" as ${task.completed ? "incomplete" : "completed"}`}
                />
                <span
                  className={`flex-grow ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="ml-4 bg-red-500 text-white p-1 rounded-md hover:bg-red-400 transition"
                aria-label={`Delete task "${task.text}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
