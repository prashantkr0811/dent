// // app/api/appointments/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const appointments = await prisma.appointment.findMany({
//       include: { user: true, doctor: true },
//       orderBy: { date: "desc" },
//     });
//     return NextResponse.json({ appointments }, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/appointments error", error);
//     return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     // Validate required fields
//     const {
//       userId,
//       doctorId,
//       date, // should be an ISO date string or something parseable by Date
//       time, // "14:30"
//       duration = 30,
//       reason,
//       notes,
//       status = "CONFIRMED",
//     } = body ?? {};

//     if (!userId || !doctorId || !date || !time) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Minimal parsing/normalization
//     const parsedDate = new Date(date);
//     if (Number.isNaN(parsedDate.getTime())) {
//       return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
//     }

//     const data = {
//       userId,
//       doctorId,
//       date: parsedDate,
//       time: String(time),
//       duration: Number(duration) || 30,
//       reason: reason ?? null,
//       notes: notes ?? null,
//       status: status as "CONFIRMED" | "COMPLETED" | "CANCELLED",
//     };

//     const created = await prisma.appointment.create({ data });

//     return NextResponse.json({ appointment: created }, { status: 201 });
//   } catch (error) {
//     console.error("POST /api/appointments error", error);
//     return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
//   }
// }
