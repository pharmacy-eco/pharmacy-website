export interface ChatHistoryDto {
  role: "user" | "model";
  text: string;
}

export interface ChatMessageDto {
  message: string;
  api_key_id?: number;
  history?: ChatHistoryDto[];
  system_instruction?: string;
}

export interface ChatResponseDto {
  message: string;
  model: string;
  api_key_id: number;
  usage: {
    prompt_token_count: number;
    candidates_token_count: number;
    total_token_count: number;
    token_quota: number;
    token_used: number;
    token_remaining: number;
  };
}

interface ApiResponse<T> {
  requestId: string;
  at: string;
  error: {
    code: number;
    message: string;
  };
  data?: T;
}

const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl.replace(/\/$/, "");
};

export async function sendAIChatMessage(
  payload: ChatMessageDto
): Promise<ChatResponseDto> {
  const response = await fetch(`${getApiBaseUrl()}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to send chat message");
  }

  const responseBody = (await response.json()) as ApiResponse<ChatResponseDto>;

  if (responseBody.error?.code || !responseBody.data) {
    throw new Error(responseBody.error?.message || "Unable to send chat message");
  }

  return responseBody.data;
}
