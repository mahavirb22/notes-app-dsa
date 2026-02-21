"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: ({ inline, className, children, ...props }: any) => {
            return !inline ? (
              <code className={`${className} font-mono`} {...props}>
                {children}
              </code>
            ) : (
              <code
                className="bg-cyan/10 text-cyan px-1.5 py-0.5 rounded font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }: any) => (
            <pre
              className="bg-navy-light border border-navy-lighter rounded-lg p-4 overflow-x-auto"
              {...props}
            >
              {children}
            </pre>
          ),
          h1: ({ children, ...props }: any) => (
            <h1
              className="text-3xl font-bold text-gray-100 mb-4 mt-8"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: any) => (
            <h2
              className="text-2xl font-semibold text-gray-200 mb-3 mt-6"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: any) => (
            <h3
              className="text-xl font-semibold text-gray-300 mb-2 mt-4"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }: any) => (
            <p className="text-gray-300 mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }: any) => (
            <ul
              className="list-disc list-inside text-gray-300 mb-4 space-y-2"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: any) => (
            <ol
              className="list-decimal list-inside text-gray-300 mb-4 space-y-2"
              {...props}
            >
              {children}
            </ol>
          ),
          a: ({ children, ...props }: any) => (
            <a className="text-cyan hover:text-cyan-light underline" {...props}>
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }: any) => (
            <blockquote
              className="border-l-4 border-cyan/30 pl-4 italic text-gray-400 my-4"
              {...props}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
