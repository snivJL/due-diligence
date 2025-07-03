import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";

const components: Partial<Components> = {
  // @ts-expect-error
  code: CodeBlock,
  pre: ({ children }) => <>{children}</>,

  // Paragraphs with better spacing and line height
  p: ({ node, children, ...props }) => {
    return (
      <p className="mb-4 leading-7  dark:text-gray-300" {...props}>
        {children}
      </p>
    );
  },

  // Ordered lists with better styling
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-2" {...props}>
        {children}
      </ol>
    );
  },

  // Unordered lists (fixed the list-decimal bug)
  ul: ({ node, children, ...props }) => {
    return (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2" {...props}>
        {children}
      </ul>
    );
  },

  // List items with better spacing
  li: ({ node, children, ...props }) => {
    return (
      <li className="text-gray-700 dark:text-gray-300 leading-6" {...props}>
        {children}
      </li>
    );
  },

  // Enhanced strong/bold text
  strong: ({ node, children, ...props }) => {
    return (
      <strong className="font-bold text-gray-900 dark:text-gray-100" {...props}>
        {children}
      </strong>
    );
  },

  // Emphasis/italic text
  em: ({ node, children, ...props }) => {
    return (
      <em className="italic text-gray-800 dark:text-gray-200" {...props}>
        {children}
      </em>
    );
  },

  // Enhanced links with better hover effects
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600 underline-offset-2 transition-colors duration-200"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Enhanced headings with better hierarchy and spacing
  h1: ({ node, children, ...props }) => {
    return (
      <h1
        className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2"
        {...props}
      >
        {children}
      </h1>
    );
  },

  h2: ({ node, children, ...props }) => {
    return (
      <h2
        className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ node, children, ...props }) => {
    return (
      <h3
        className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h3>
    );
  },

  h4: ({ node, children, ...props }) => {
    return (
      <h4
        className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h4>
    );
  },

  h5: ({ node, children, ...props }) => {
    return (
      <h5
        className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h5>
    );
  },

  h6: ({ node, children, ...props }) => {
    return (
      <h6
        className="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h6>
    );
  },

  // Beautiful blockquotes
  blockquote: ({ node, children, ...props }) => {
    return (
      <blockquote
        className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-6 pr-4 py-4 my-6 italic text-gray-700 dark:text-gray-300 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    );
  },

  // Horizontal rules
  hr: ({ node, ...props }) => {
    return (
      <hr
        className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
        {...props}
      />
    );
  },

  // Enhanced tables
  table: ({ node, children, ...props }) => {
    return (
      <div className="overflow-x-auto my-6">
        <table
          className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },

  thead: ({ node, children, ...props }) => {
    return (
      <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
        {children}
      </thead>
    );
  },

  tbody: ({ node, children, ...props }) => {
    return (
      <tbody
        className="divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      >
        {children}
      </tbody>
    );
  },

  tr: ({ node, children, ...props }) => {
    return (
      <tr
        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
        {...props}
      >
        {children}
      </tr>
    );
  },

  th: ({ node, children, ...props }) => {
    return (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
        {...props}
      >
        {children}
      </th>
    );
  },

  td: ({ node, children, ...props }) => {
    return (
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
        {...props}
      >
        {children}
      </td>
    );
  },

  // Task list items (GitHub-style checkboxes)
  input: ({ node, ...props }) => {
    return (
      <input
        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        disabled
        {...props}
      />
    );
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
