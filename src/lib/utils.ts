import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getTopicColor(topic: string) {
  const colors: Record<string, string> = {
    array: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    string: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    linkedlist: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    tree: "bg-green-500/15 text-green-400 border-green-500/30",
    graph: "bg-red-500/15 text-red-400 border-red-500/30",
    dp: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    greedy: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    backtracking: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    sorting: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    searching: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  };
  return colors[topic.toLowerCase()] || "bg-cyan/10 text-cyan border-cyan/20";
}

export function getDifficultyColor(difficulty: string) {
  const colors: Record<string, string> = {
    easy: "badge-easy",
    medium: "badge-medium",
    hard: "badge-hard",
  };
  return colors[difficulty.toLowerCase()] || "badge-medium";
}
