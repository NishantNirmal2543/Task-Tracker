import React, { useState } from "react";
import "./styles.css";

export default function TaskList({ tasks, onDelete, onEdit, setTaskToEdit }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const statusMatches =
      statusFilter === "All" || task.status === statusFilter;
    const priorityMatches =
      priorityFilter === "All" || task.priority === priorityFilter;
    return statusMatches && priorityMatches;
  });

  return (
    <div>
      <div className="filters">
        <label>
          Status:
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
        <label>
          Priority:
          <select onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      {filteredTasks.map((task) => (
        <div key={task.id} className="task">
          <h3>{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <p>
            <span className="task-label">Priority:</span>{" "}
            <span className="task-value">{task.priority}</span>
          </p>
          <p>
            <span className="task-label">Status:</span>{" "}
            <span className="task-value">{task.status}</span>
          </p>
          <p>
            <span className="task-label">Assigned To:</span>{" "}
            <span className="task-value">{task.assignedTo}</span>
          </p>
          <p>
            <span className="task-label">Start Date:</span>{" "}
            <span className="task-value">{task.startDate || "N/A"}</span>
          </p>
          <p>
            <span className="task-label">End Date:</span>{" "}
            <span className="task-value">{task.endDate || "N/A"}</span>
          </p>
          <p>
            <span className="task-label">Time Spent:</span>{" "}
            <span className="task-value">{task.timeSpent} minutes</span>
          </p>

          <div className="button-container">
            <button className="button" onClick={() => setTaskToEdit(task)}>
              Edit Task
            </button>
            <button
              className="button"
              onClick={() => onEdit(task.id, "In Progress")}>
              Set In Progress
            </button>
            <button
              className="button"
              onClick={() => onEdit(task.id, "Completed")}>
              Complete Task
            </button>
            <button className="button" onClick={() => onDelete(task.id)}>
              Delete Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
