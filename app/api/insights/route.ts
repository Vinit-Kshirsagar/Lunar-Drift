// app/api/insights/route.ts
import { NextResponse } from "next/server";
import { genAI, CHAT_MODEL } from "../../../lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // Build conversation context
    let prompt = "You are a friendly AI Insights assistant. Answer clearly and empathetically.\n\n";
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        prompt += `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}\n`;
      });
    }
    prompt += `User: ${message}\nAI:`;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: CHAT_MODEL });
    const result = await model.generateContent(prompt);

    return NextResponse.json({ reply: result.response.text() });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
