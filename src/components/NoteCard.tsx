"use client";

import React from "react";
import Link from "next/link";
import { Note } from "@/types/note";
import { Badge } from "@/components/ui/badge";
import { formatDate, getTopicColor, getDifficultyColor } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteNote } from "@/hooks/useNotes";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const deleteNote = useDeleteNote();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote.mutate(note.id);
    }
  };

  return (
    <Link href={`/notes/${note.id}`}>
      <div className="group relative card-glow bg-navy-light border border-navy-lighter rounded-lg p-4 hover:border-cyan/30 transition-all duration-300 cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-cyan transition-colors line-clamp-2">
            {note.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/notes/${note.id}/edit`;
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-400 line-clamp-3 mb-4 font-mono">
          {note.content.substring(0, 150)}
          {note.content.length > 150 ? "..." : ""}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge className={getTopicColor(note.topic)}>{note.topic}</Badge>
            <Badge className={getDifficultyColor(note.difficulty)}>
              {note.difficulty}
            </Badge>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(note.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
