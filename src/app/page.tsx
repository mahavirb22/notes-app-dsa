import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { NotesList } from "@/components/NotesList";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-2xl">
            <div className="flex justify-center">
              <div className="bg-cyan/10 p-4 rounded-full">
                <BookOpen className="h-16 w-16 text-cyan" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-100">DSA Notes</h1>
            <p className="text-xl text-gray-400">
              Your blazing-fast companion for mastering algorithms and data
              structures
            </p>
            <div className="flex justify-center pt-4">
              <SignInButton mode="modal">
                <button className="bg-cyan text-navy px-8 py-3 rounded-lg font-semibold text-lg hover:bg-cyan-dark transition-colors">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-cyan" />
              <span className="text-xl font-bold text-gray-100">DSA Notes</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <NotesList />
        </div>
      </SignedIn>
    </>
  );
}
