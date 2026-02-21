export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface UpdateNoteInput {
  id: string;
  title?: string;
  content?: string;
  topic?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

export interface DeleteNoteInput {
  id: string;
}

export interface NoteFilters {
  topic?: string;
  difficulty?: string;
  search?: string;
}
