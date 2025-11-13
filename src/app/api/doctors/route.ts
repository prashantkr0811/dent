import { NextResponse } from "next/server";
import { createDoctor } from "@/lib/actions/doctors";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const doctor = await createDoctor(body);

    return NextResponse.json({ ok: true, doctor });
  } catch (error: any) {
    console.error("API /api/doctors error:", error);
    return NextResponse.json({ ok: false, error: error.message || "Failed to create doctor" }, { status: 400 });
  }
}
