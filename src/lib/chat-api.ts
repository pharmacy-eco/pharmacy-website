export type ChatConversationId = number | string;

export type SendChatMessagePayload = {
  message: string;
  conversationId?: ChatConversationId;
};

export type SendChatMessageResponse = {
  reply: string;
  conversationId: ChatConversationId;
};

const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl.replace(/\/$/, "");
};

export async function sendAIChatMessage(
  payload: SendChatMessagePayload
): Promise<SendChatMessageResponse> {
  const response = await fetch(`${getApiBaseUrl()}/ai-chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to send chat message");
  }

  return response.json();
}
