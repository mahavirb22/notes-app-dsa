"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotes } from "@/hooks/useNotes";
import { NoteCard } from "./NoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { NoteFilters } from "@/types/note";

const TOPICS = [
  "All",
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
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

export function NotesList() {
  const [filters, setFilters] = useState<NoteFilters>({});
  const [searchInput, setSearchInput] = useState("");

  const { data: notes, isLoading } = useNotes(filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchInput || undefined });
  };

  const handleTopicChange = (topic: string) => {
    setFilters({ ...filters, topic: topic === "All" ? undefined : topic });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setFilters({
      ...filters,
      difficulty: difficulty === "All" ? undefined : difficulty,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">DSA Notes</h1>
          <p className="text-gray-400 mt-1">
            {notes
              ? `${notes.length} note${notes.length !== 1 ? "s" : ""}`
              : "Loading..."}
          </p>
        </div>
        <Link href="/notes/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-navy-light border border-navy-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-cyan" />
          <h2 className="text-sm font-medium text-gray-300">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search notes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Topic Filter */}
          <Select
            value={filters.topic || "All"}
            onChange={(e) => handleTopicChange(e.target.value)}
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic === "All" ? "All Topics" : topic}
              </option>
            ))}
          </Select>

          {/* Difficulty Filter */}
          <Select
            value={filters.difficulty || "All"}
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {diff === "All" ? "All Difficulties" : diff}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Notes Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="space-y-3 bg-navy-light border border-navy-lighter rounded-lg p-4"
            >
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No notes found</p>
          <p className="text-gray-500 text-sm mt-2">
            {filters.search || filters.topic || filters.difficulty
              ? "Try adjusting your filters"
              : "Create your first note to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
