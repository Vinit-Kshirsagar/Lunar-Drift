// app/api/meteors/route.ts
import { NextResponse } from "next/server";
import { sanitizeMeteor } from "@/lib/nasa";

const MOCK_METEORS = [
  {
    id: "1",
    name: "Aachen",
    mass: "21",
    year: "1880-01-01T00:00:00.000",
    reclat: "50.775",
    reclong: "6.08333",
    recclass: "L5"
  },
  {
    id: "2",
    name: "Aarhus",
    mass: "720",
    year: "1951-01-01T00:00:00.000",
    reclat: "56.18333",
    reclong: "10.23333",
    recclass: "H6"
  },
  {
    id: "3",
    name: "Abee",
    mass: "107000",
    year: "1952-01-01T00:00:00.000",
    reclat: "54.21667",
    reclong: "-113.0",
    recclass: "EH4"
  }
];

export async function GET(req: Request) {
  try {
    const limitParam = new URL(req.url).searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : MOCK_METEORS.length;

    // Use sanitizeMeteor to mimic real API behavior
    const sanitized = MOCK_METEORS.slice(0, limit)
      .map(item => sanitizeMeteor(item))
      .filter(Boolean);

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error in mock meteors API:", error);
    return NextResponse.json(
      { error: "Failed to fetch meteor data" },
      { status: 500 }
    );
  }
}
