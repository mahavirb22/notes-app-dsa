"use client";

import { useParams, useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNote, useDeleteNote } from "@/hooks/useNotes";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, getTopicColor, getDifficultyColor } from "@/lib/utils";

export default function NoteViewPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const { data: note, isLoading } = useNote(noteId);
  const deleteNote = useDeleteNote();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote.mutate(noteId, {
        onSuccess: () => {
          router.push("/");
        },
      });
    }
  };

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

        {isLoading ? (
          <div className="bg-navy-light border border-navy-lighter rounded-lg p-6 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : note ? (
          <div className="bg-navy-light border border-navy-lighter rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/notes/${noteId}/edit`)}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-100 mb-4">
              {note.title}
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTopicColor(note.topic)}>{note.topic}</Badge>
              <Badge className={getDifficultyColor(note.difficulty)}>
                {note.difficulty}
              </Badge>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Last updated {formatDate(note.updatedAt)}
            </p>

            <div className="border-t border-navy-lighter pt-6">
              <MarkdownRenderer content={note.content} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Note not found</p>
          </div>
        )}
      </div>
    </SignedIn>
  );
}
