"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load saved tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Generate plan
  const generatePlan = async () => {
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
      });

      const data = await res.json();

      const lines = data.plan
        .split(/[\n•\-]/)
        .filter(line => line.trim() !== "");

      setTasks(lines.map(t => ({ text: t, status: "pending" })));

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  const markDone = (index) => {
    const updated = [...tasks];
    updated[index].status = "done";
    setTasks(updated);
  };

  const markSkip = (index) => {
    const updated = [...tasks];
    updated[index].status = "skipped";
    setTasks(updated);
  };

  const reschedule = () => {
    const pending = tasks.filter(t => t.status !== "skipped");
    const skipped = tasks.filter(t => t.status === "skipped");

    setTasks([
      ...pending,
      ...skipped.map(t => ({ ...t, status: "pending" }))
    ]);
  };

  return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f0fe, #f8f9fa)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    fontFamily: "Arial"
  }}>
    <div style={{
      width: "600px",
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>

      <h1 style={{ textAlign: "center", color: "#4285F4" }}>
        Study Agent
      </h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 3 hours physics"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "15px"
        }}
      />

      <button
        onClick={generatePlan}
        style={{
  width: "100%",
  marginTop: "15px",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  background: "#1a73e8",
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(26,115,232,0.3)"
}}
      >
        Generate Plan
      </button>

      {/* TASK LIST */}
      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task, i) => (
          <li key={i} style={{
            background: "#f9f9f9",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px"
          }}>
            <strong>{task.text}</strong> — {task.status}

            <button onClick={() => markDone(i)} style={{ marginLeft: "10px" }}>
              ✅
            </button>

            <button onClick={() => markSkip(i)} style={{ marginLeft: "5px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>

    </div>
  </div>
); }
