"use client";

import { useParams } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { useNote } from "@/hooks/useNotes";
import { NoteForm } from "@/components/NoteForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditNotePage() {
  const params = useParams();
  const noteId = params.id as string;

  const { data: note, isLoading } = useNote(noteId);

  return (
    <SignedIn>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-cyan" />
            <span className="text-xl font-bold text-gray-100">DSA Notes</span>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="bg-navy-light border border-navy-lighter rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-100 mb-6">Edit Note</h1>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          ) : note ? (
            <NoteForm mode="edit" note={note} />
          ) : (
            <p className="text-gray-400">Note not found</p>
          )}
        </div>
      </div>
    </SignedIn>
  );
}
