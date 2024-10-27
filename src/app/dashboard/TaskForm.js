"use client";
import "./styles.css";
import { useState, useEffect } from "react";

export default function TaskForm({ onAddTask, taskToEdit, onUpdateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [assignedTo, setAssignedTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setAssignedTo(taskToEdit.assignedTo);
      setStartDate(taskToEdit.startDate);
      setEndDate(taskToEdit.endDate);
    } else {
      clearForm();
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      priority,
      status,
      assignedTo,
      startDate,
      endDate,
    };

    if (taskToEdit) {
      onUpdateTask({ ...newTask, id: taskToEdit.id });
    } else {
      onAddTask(newTask);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Pending");
    setAssignedTo("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Title</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
        required
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input"
        required
      />
      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="input">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input">
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <label>Assigned To</label>
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="input"
      />
      <label>Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input"
      />
      <label>End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input"
      />
      <button type="submit" className="button">
        Add Task
      </button>
    </form>
  );
}
