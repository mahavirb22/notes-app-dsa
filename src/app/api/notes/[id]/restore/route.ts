import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// POST /api/notes/[id]/restore - Restore soft-deleted note
export async function POST(
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
      where: { id, userId, deleted: true },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const note = await prisma.note.update({
      where: { id },
      data: { deleted: false },
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error("POST /api/notes/[id]/restore error:", error);
    return NextResponse.json(
      { error: "Failed to restore note" },
      { status: 500 },
    );
  }
}
