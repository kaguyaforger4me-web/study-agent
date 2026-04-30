"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    if (!input) return;

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.text);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f1115] text-white px-4">

      {/* LOGO */}
      <h1 className="text-6xl font-semibold mb-10 bg-gradient-to-r from-blue-500 via-red-500 to-green-400 bg-clip-text text-transparent">
        Study Agent
      </h1>

      {/* INPUT BOX */}
      <div className="w-full max-w-2xl relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
          placeholder="Ask anything..."
          className="w-full px-6 py-4 rounded-full bg-[#1a1c22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg"
        />
      </div>

      {/* RESPONSE */}
      {response && (
        <div className="mt-8 max-w-2xl w-full bg-[#1a1c22] p-6 rounded-xl border border-gray-700 shadow-lg">
          {response}
        </div>
      )}

    </main>
  );
}
