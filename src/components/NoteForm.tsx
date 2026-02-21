"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateNoteInput, Note } from "@/types/note";
import { useCreateNote, useUpdateNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

interface NoteFormProps {
  note?: Note;
  mode: "create" | "edit";
}

const TOPICS = [
  "Array",
  "String",
  "LinkedList",
  "Tree",
  "Graph",
  "DP",
  "Greedy",
  "Backtracking",
  "Sorting",
  "Searching",
  "Other",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export function NoteForm({ note, mode }: NoteFormProps) {
  const router = useRouter();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const [formData, setFormData] = useState<CreateNoteInput>({
    title: note?.title || "",
    content: note?.content || "",
    topic: note?.topic || "Array",
    difficulty: (note?.difficulty as "Easy" | "Medium" | "Hard") || "Medium",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      createNote.mutate(formData, {
        onSuccess: () => {
          router.push("/");
        },
      });
    } else {
      updateNote.mutate(
        { id: note!.id, ...formData },
        {
          onSuccess: () => {
            router.push(`/notes/${note!.id}`);
          },
        },
      );
    }
  };

  const isLoading = createNote.isPending || updateNote.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Note"
              : "Update Note"}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Title
          </label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Kadane's Algorithm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Topic
            </label>
            <Select
              id="topic"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Difficulty
            </label>
            <Select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                })
              }
            >
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Content (Markdown supported)
          </label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="## Algorithm&#10;&#10;Explain the concept...&#10;&#10;```python&#10;def solution():&#10;    pass&#10;```"
            rows={20}
            required
            className="font-mono"
          />
        </div>
      </div>
    </form>
  );
}
