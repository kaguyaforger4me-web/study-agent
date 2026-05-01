"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const askAI = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.text || "⚠️ No response" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ API error" },
      ]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="h-screen flex flex-col bg-[#0f1115] text-white">

      {/* HEADER */}
      <div className="p-4 text-center text-xl font-semibold border-b border-gray-800">
        <span className="bg-gradient-to-r from-blue-500 via-red-500 to-green-400 bg-clip-text text-transparent">
          Study Agent
        </span>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-[#1a1c22] border border-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-3 rounded-full bg-[#1a1c22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={askAI}
          className="px-5 py-2 rounded-full bg-blue-600"
        >
          Send
        </button>
      </div>
    </main>
  );
}
