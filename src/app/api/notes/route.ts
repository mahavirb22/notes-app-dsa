import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET /api/notes -Fetch all notes for user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");

    // Build where clause
    const where = {
      userId,
      deleted: false,
    } as any;

    if (topic) where.topic = topic;
    if (difficulty) where.difficulty = difficulty;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST /api/notes - Create new note
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, topic, difficulty } = body;

    if (!title || !content || !topic || !difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        topic,
        difficulty,
        userId,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
