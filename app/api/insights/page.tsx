"use client";

import { useState } from "react";

type Message = { sender: "user" | "bot"; text: string };

export default function InsightsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const cleanText = (text: string) => text.replace(/\*\*/g, "").trim();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    const history = [...messages, userMessage];
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: cleanText(data.reply) }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { sender: "bot", text: `Error: ${data.error}` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to AI Insights" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col">
      <div className="flex-1 border border-gray-300 rounded-lg p-4 overflow-y-auto bg-gray-50 shadow-inner">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex my-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm shadow-md max-w-[75%] break-words ${
                m.sender === "user"
                  ? "bg-blue-200 text-gray-900 self-end"
                  : "bg-gray-200 text-gray-800 self-start leading-relaxed"
              }`}
            >
              {m.sender === "bot"
                ? m.text.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                    <p key={idx} className="mb-1">
                      {sentence.trim()}
                    </p>
                  ))
                : m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-left text-sm text-gray-500">Typing...</div>}
      </div>

      <div className="mt-4 flex">
        <input
          className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask AI Insights..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2 rounded-lg shadow"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
