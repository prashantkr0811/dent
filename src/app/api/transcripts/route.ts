import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataDir = path.resolve(process.cwd(), "data");
    const filePath = path.join(dataDir, "transcripts.json");

    // ensure dir exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (e) {
      // ignore
    }

    let existing: any[] = [];
    try {
      const content = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(content || "[]");
    } catch (e) {
      existing = [];
    }

    const record = {
      id: Date.now(),
      ...body,
    };

    existing.push(record);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("/api/transcripts error", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
