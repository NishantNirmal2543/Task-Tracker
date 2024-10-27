"use client";
import TaskTrend from "./TaskTrend";
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./styles.css";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("viewTasks");
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (task) => {
    const newTasks = [
      ...tasks,
      { ...task, id: tasks.length + 1, timeSpent: 0, startTime: null },
    ];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const editTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      const currentTime = new Date();
      if (task.id === id) {
        if (newStatus === "In Progress" && !task.startTime) {
          return { ...task, status: newStatus, startTime: currentTime };
        } else if (newStatus === "Completed" && task.startTime) {
          const timeSpent = Math.round((currentTime - task.startTime) / 60000);
          return {
            ...task,
            status: newStatus,
            timeSpent: task.timeSpent + timeSpent,
            startTime: null,
          };
        } else {
          return { ...task, status: newStatus };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="container">
      <h2>Task-Tracker</h2>

      <div className="tabs">
        <button onClick={() => setActiveTab("viewTasks")}>View Tasks</button>
        <button onClick={() => setActiveTab("manageTasks")}>
          Manage Tasks
        </button>
        <button onClick={() => setActiveTab("trendLine")}>
          View Trend Line
        </button>
      </div>

      {activeTab === "viewTasks" && (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={editTaskStatus}
          setTaskToEdit={(task) => {
            setTaskToEdit(task);
            setActiveTab("manageTasks");
          }}
        />
      )}
      {activeTab === "manageTasks" && (
        <TaskForm
          onAddTask={addTask}
          taskToEdit={taskToEdit}
          onUpdateTask={updateTask}
        />
      )}
      {activeTab === "trendLine" && <TaskTrend tasks={tasks} />}
    </div>
  );
}
