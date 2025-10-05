// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("❌ Missing GOOGLE_API_KEY in .env.local");
  throw new Error("Missing GOOGLE_API_KEY in .env.local");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const CHAT_MODEL = "gemini-2.5-pro";
