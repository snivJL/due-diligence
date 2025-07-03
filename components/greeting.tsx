"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  MessageSquare,
  Upload,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Attachment } from "ai";
const steps = [
  {
    icon: Upload,
    title: "Upload Company Memo",
    description: "Upload the company memo you want to review",
    color: "text-emerald-600",
  },
  {
    icon: Brain,
    title: "Get AI Analysis",
    description:
      "Receive an automated summary of the business's strengths, weaknesses, and risks",
    color: "text-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Review Follow-up Questions",
    description:
      "Get a ready-to-use list of key follow-up questions to ask the founders",
    color: "text-orange-600",
  },
];
export const Greeting = ({
  setAttachments,
  append,
}: {
  append: UseChatHelpers["append"];
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "processing" | "success"
  >("idle");
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (error) {
      toast.error("Failed to upload file, please try again!");
    }
  };
  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      if (files.length === 0) return;

      setUploadState("uploading");

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);

        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);

        if (successfullyUploadedAttachments.length > 0) {
          setUploadState("processing");

          append(
            {
              role: "user",
              content:
                "Summarize key strengths, weaknesses, and risks, and generate follow-up questions for the founders",
            },
            { experimental_attachments: successfullyUploadedAttachments }
          );

          // Reset to success briefly, then back to idle
          setTimeout(() => {
            setUploadState("success");
            setTimeout(() => setUploadState("idle"), 2000);
          }, 1000);
        } else {
          setUploadState("idle");
        }
      } catch (error) {
        console.error("Error uploading files!", error);
        setUploadState("idle");
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [append, setAttachments]
  );
  return (
    <div className="max-w-6xl mx-auto md:mt-0 px-8  flex flex-col">
      {/* Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Due Diligence
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            AI Assistant
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Summary and Follow Up Questions
        </p>
      </motion.div>

      {/* Identity Blue Paragraph - Enhanced but keeping the essence */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.4 }}
        className="text-base mb-8 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            This demo is for investors who receive high volumes of company memos
            and need a fast, reliable way to surface key insights and risks. It
            summarizes each memo and generates essential follow-up questions,
            streamlining due diligence and decision-making.
          </div>
        </div>
      </motion.div>

      {/* How It Works - Step by Step */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="relative"
              >
                <div className="flex items-start gap-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center  font-bold text-gray-700 dark:text-gray-300">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 1.2 }}
        className="text-center pt-4"
      >
        <div className="space-y-4">
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (uploadState === "idle") {
                fileInputRef.current?.click();
              }
            }}
            disabled={uploadState !== "idle"}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[280px]"
          >
            {uploadState === "idle" && (
              <>
                <Upload className="w-5 h-5" />
                Ready to get started? Upload your first memo
              </>
            )}

            {uploadState === "uploading" && (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading your memo...
              </>
            )}

            {uploadState === "processing" && (
              <>
                <Brain className="w-5 h-5 animate-pulse" />
                AI is analyzing your memo...
              </>
            )}

            {uploadState === "success" && (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Analysis complete!
              </>
            )}
          </Button>

          {/* File format hint */}
          {uploadState === "idle" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports PDF, DOC, DOCX, and TXT files
            </p>
          )}
        </div>

        <input
          type="file"
          className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          tabIndex={-1}
          accept=".pdf,.doc,.docx,.txt"
        />
      </motion.div>
    </div>
  );
};
