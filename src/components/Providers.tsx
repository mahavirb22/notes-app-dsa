"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#f3f4f6",
            border: "1px solid #1a2332",
          },
          success: {
            iconTheme: {
              primary: "#00d4ff",
              secondary: "#0a0f1e",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#0a0f1e",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
