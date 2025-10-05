"use client";

import { useState } from "react";

type Message = { sender: "user" | "bot"; text: string };

export default function InsightsClient() {
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
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
      {/* Messages area */}
      <div className="h-[400px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 rounded-md bg-gray-900 p-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-20">
            No conversation yet. Ask your first question about meteorite data!
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              m.sender === "user"
                ? "bg-teal-600 text-white ml-auto max-w-[80%]"
                : "bg-gray-700 text-gray-200 mr-auto max-w-[80%]"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Your Question
      </label>
      <textarea
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question about meteorite data..."
      />

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Sample size slider (optional like in your screenshot) */}
        <div className="flex flex-col w-2/3">
          <label className="text-xs text-gray-400 mb-1">Sample Size: 1000</label>
          <input
            type="range"
            min="100"
            max="5000"
            defaultValue="1000"
            className="w-full accent-teal-500"
          />
        </div>

        <button
          className="ml-4 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-md disabled:opacity-50 transition"
          onClick={sendMessage}
          disabled={loading}
        >
          Get Insights
        </button>
      </div>
    </div>
  );
}
