// app/api/insights/route.ts
import { NextResponse } from "next/server";
import { genAI, CHAT_MODEL } from "../../../lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // --------------------------------
    // 1. NASA Keyword Guardrail (Pre-filter)
    // --------------------------------
    const nasaKeywords = [
      "nasa",
      "meteor",
      "asteroid",
      "comet",
      "space",
      "orbit",
      "planet",
      "moon",
      "mars",
      "satellite",
      "astronomy",
      "galaxy",
      "universe",
      "rocket",
      "launch",
      "iss",
      "telescope",
    ];

    const isRelevant = nasaKeywords.some((k) =>
      message.toLowerCase().includes(k)
    );

    if (!isRelevant) {
      return NextResponse.json({
        reply: "I can only answer NASA-related questions.",
      });
    }

    // --------------------------------
    // 2. Strict System Prompt + History
    // --------------------------------
    let prompt = `
You are a NASA domain expert for our hackathon project "Meteor Madness".
Rules:
- ONLY answer questions related to NASA, meteors, space, astronomy, or satellites.
- If the user asks something irrelevant, reply exactly: "I can only answer NASA-related questions."
- Keep answers concise, factual, and easy to understand.

Conversation so far:
`;

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        prompt += `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}\n`;
      });
    }

    prompt += `User: ${message}\nAI:`;

    // --------------------------------
    // 3. Call Gemini
    // --------------------------------
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
