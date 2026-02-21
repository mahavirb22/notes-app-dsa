"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Note,
  CreateNoteInput,
  UpdateNoteInput,
  NoteFilters,
} from "@/types/note";
import toast from "react-hot-toast";

// Fetch notes with filters
export function useNotes(filters?: NoteFilters) {
  const queryParams = new URLSearchParams();
  if (filters?.topic) queryParams.set("topic", filters.topic);
  if (filters?.difficulty) queryParams.set("difficulty", filters.difficulty);
  if (filters?.search) queryParams.set("search", filters.search);

  return useQuery<Note[]>({
    queryKey: ["notes", filters],
    queryFn: async () => {
      const url = `/api/notes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      return data.notes;
    },
  });
}

// Fetch single note
export function useNote(id: string) {
  return useQuery<Note>({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await fetch(`/api/notes/${id}`);
      if (!res.ok) throw new Error("Failed to fetch note");
      const data = await res.json();
      return data.note;
    },
    enabled: !!id,
  });
}

// Create note with optimistic update
export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateNoteInput) => {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to create note");
      const data = await res.json();
      return data.note as Note;
    },
    onMutate: async (newNote) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData<Note[]>([
        "notes",
        undefined,
      ]);

      // Optimistically update with temp note
      const tempNote: Note = {
        id: `temp-${Date.now()}`,
        ...newNote,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "temp",
      };

      queryClient.setQueryData<Note[]>(["notes", undefined], (old) =>
        old ? [tempNote, ...old] : [tempNote],
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      // Rollback on error
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes", undefined], context.previousNotes);
      }
      toast.error("Failed to create note");
    },
    onSuccess: () => {
      toast.success("Note created!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

// Update note with optimistic update
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateNoteInput) => {
      const res = await fetch(`/api/notes/${input.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to update note");
      const data = await res.json();
      return data.note as Note;
    },
    onMutate: async (updatedNote) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      await queryClient.cancelQueries({ queryKey: ["note", updatedNote.id] });

      // Snapshot
      const previousNotes = queryClient.getQueryData<Note[]>([
        "notes",
        undefined,
      ]);
      const previousNote = queryClient.getQueryData<Note>([
        "note",
        updatedNote.id,
      ]);

      // Optimistic update for list
      queryClient.setQueryData<Note[]>(["notes", undefined], (old) =>
        old?.map((note) =>
          note.id === updatedNote.id
            ? { ...note, ...updatedNote, updatedAt: new Date() }
            : note,
        ),
      );

      // Optimistic update for single note
      if (previousNote) {
        queryClient.setQueryData<Note>(["note", updatedNote.id], {
          ...previousNote,
          ...updatedNote,
          updatedAt: new Date(),
        });
      }

      return { previousNotes, previousNote };
    },
    onError: (err, updatedNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes", undefined], context.previousNotes);
      }
      if (context?.previousNote) {
        queryClient.setQueryData(
          ["note", updatedNote.id],
          context.previousNote,
        );
      }
      toast.error("Failed to update note");
    },
    onSuccess: () => {
      toast.success("Note updated!");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
    },
  });
}

// Delete note with optimistic update and undo
export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      const data = await res.json();
      return data.note as Note;
    },
    onMutate: async (noteId) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      const previousNotes = queryClient.getQueryData<Note[]>([
        "notes",
        undefined,
      ]);

      // Optimistically remove note
      queryClient.setQueryData<Note[]>(["notes", undefined], (old) =>
        old?.filter((note) => note.id !== noteId),
      );

      return { previousNotes, noteId };
    },
    onError: (err, noteId, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes", undefined], context.previousNotes);
      }
      toast.error("Failed to delete note");
    },
    onSuccess: (deletedNote, noteId) => {
      // Show toast with undo option
      const toastId = toast.success("Note deleted - Click to undo", {
        duration: 3000,
      });

      // Store the undo function
      (window as Record<string, any>).__lastDeletedNote = {
        noteId,
        toastId,
        restore: async () => {
          try {
            const res = await fetch(`/api/notes/${noteId}/restore`, {
              method: "POST",
            });
            if (!res.ok) throw new Error("Failed to restore");
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note restored!");
          } catch {
            toast.error("Failed to restore note");
          }
        },
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
