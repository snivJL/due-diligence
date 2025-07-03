"use server";

import { generateText, type UIMessage } from "ai";
import { cookies } from "next/headers";
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from "@/lib/db/queries";
import type { VisibilityType } from "@/components/visibility-selector";
import { myProvider } from "@/lib/ai/providers";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel("title-model"),
    system: `
You are given a user message whose *first* attachment is a company memo.  
Your task is to **extract the company’s name** and output **exactly**:

[CompanyName] Memo

—with no additional words, punctuation, quotes, colons, line breaks, or whitespace.  
The output must match the regex: /^[A-Za-z0-9 &.-]+ Memo$/.  
Examples of valid outputs:
- Facebook Memo
- Acme Corp Memo
`,
    prompt: JSON.stringify(message),
  });

  return title.trim();
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
