"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function send() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <main style={{
      height: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      
      <h1 style={{
        fontSize: "60px",
        background: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        Study Agent
      </h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        style={{
          marginTop: "20px",
          padding: "15px",
          width: "400px",
          borderRadius: "30px",
          border: "1px solid #333",
          background: "#111",
          color: "white"
        }}
      />

      <button onClick={send} style={{ marginTop: "15px" }}>
        Ask AI
      </button>

      <p style={{ marginTop: "30px", maxWidth: "600px" }}>
        {response}
      </p>

    </main>
  );
}
