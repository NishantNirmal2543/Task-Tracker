"use client";
import "./styles.css";
import { useEffect, useRef } from "react";
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
} from "chart.js";

Chart.register(...registerables);

export default function TaskTrend({ tasks }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const allDates = [];
    tasks.forEach((task) => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        allDates.push(new Date(d));
      }
    });

    const uniqueDates = Array.from(
      new Set(allDates.map((date) => date.toDateString()))
    )
      .map((dateString) => new Date(dateString))
      .sort((a, b) => a - b);

    const taskCounts = uniqueDates.map((date) => {
      return tasks.filter((task) => {
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);
        return start <= date && end >= date;
      }).length;
    });

    const chartData = {
      labels: uniqueDates.map((date) => date.toLocaleDateString()),
      datasets: [
        {
          label: "Concurrent Tasks",
          data: taskCounts,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Dates",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Concurrent Tasks",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [tasks]);

  return <canvas ref={canvasRef}></canvas>;
}
