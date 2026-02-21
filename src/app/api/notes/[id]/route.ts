import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET /api/notes/[id] - Get single note
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
        deleted: false,
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error("GET /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 },
    );
  }
}

// PATCH /api/notes/[id] - Update note
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Verify note belongs to user
    const existingNote = await prisma.note.findFirst({
      where: { id, userId, deleted: false },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const note = await prisma.note.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error("PATCH /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

// DELETE /api/notes/[id] - Soft delete note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify note belongs to user
    const existingNote = await prisma.note.findFirst({
      where: { id, userId, deleted: false },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const note = await prisma.note.update({
      where: { id },
      data: { deleted: true },
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error("DELETE /api/notes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
