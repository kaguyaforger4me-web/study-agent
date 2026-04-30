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
    <div className="page">

      {/* LOGO */}
      <div className="logo">
        <span className="g">G</span>
        <span className="s">S</span>
        <span className="a">A</span>
      </div>
      <div className="tagline">Your Study Agent</div>

      {/* SEARCH BAR */}
      <div className="search">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything. Your AI study partner..."
        />
        <button onClick={send}>✨</button>
      </div>

      {/* QUICK BUTTONS */}
      <div className="actions">
        <button onClick={() => setInput("Explain a topic")}>Explain</button>
        <button onClick={() => setInput("Summarize notes")}>Summarize</button>
        <button onClick={() => setInput("Solve problem")}>Solve</button>
        <button onClick={() => setInput("Make study plan")}>Plan</button>
      </div>

      {/* RESPONSE */}
      <div className="response">{response}</div>

    </div>
  );
}
