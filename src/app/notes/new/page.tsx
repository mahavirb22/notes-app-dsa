import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { NoteForm } from "@/components/NoteForm";

export default function NewNotePage() {
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
          <h1 className="text-2xl font-bold text-gray-100 mb-6">
            Create New Note
          </h1>
          <NoteForm mode="create" />
        </div>
      </div>
    </SignedIn>
  );
}
