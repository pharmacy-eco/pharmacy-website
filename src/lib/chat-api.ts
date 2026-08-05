export interface ChatRequest {
  message: string;
  api_key_id?: number;
  previous_interaction_id?: string;
  system_instruction?: string;
}

export interface ChatUsage {
  prompt_token_count: number;
  candidates_token_count: number;
  total_token_count: number;
  token_quota: number;
  token_used: number;
  token_remaining: number;
}

export interface ChatData {
  message: string;
  interaction_id: string;
  model: string;
  api_key_id: number;
  usage: ChatUsage;
}

export interface ChatResponse {
  requestId: string;
  at: string;
  error: {
    code: number;
    message: string;
  };
  data: ChatData;
}

interface ChatErrorEnvelope {
  error?: {
    code?: number;
    statusCode?: number;
    message?: string | string[];
  };
  message?: string | string[];
  statusCode?: number;
}

export class ChatApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new ChatApiError(500, "NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl.replace(/\/$/, "");
};

const getErrorMessage = (
  value: string | string[] | undefined,
  fallback: string
) => {
  if (Array.isArray(value)) return value.join(". ");
  return value || fallback;
};

export async function sendAIChatMessage(
  payload: ChatRequest,
  signal?: AbortSignal
): Promise<ChatData> {
  const response = await fetch(`${getApiBaseUrl()}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    signal
  });

  let responseBody: ChatResponse | ChatErrorEnvelope | null = null;

  try {
    responseBody = (await response.json()) as ChatResponse | ChatErrorEnvelope;
  } catch {
    if (!response.ok) {
      throw new ChatApiError(response.status, "Không gửi được tin nhắn");
    }
  }

  const envelopeError = responseBody?.error;
  const envelopeStatus =
    envelopeError && "statusCode" in envelopeError
      ? envelopeError.statusCode
      : undefined;
  const errorCode =
    envelopeError && "code" in envelopeError ? envelopeError.code : undefined;
  const bodyStatus =
    responseBody && "statusCode" in responseBody
      ? responseBody.statusCode
      : undefined;
  const effectiveErrorStatus =
    envelopeStatus ??
    bodyStatus ??
    (typeof errorCode === "number" && errorCode >= 400
      ? errorCode
      : undefined);

  if (!response.ok || effectiveErrorStatus) {
    const status = effectiveErrorStatus ?? response.status;
    const bodyMessage =
      envelopeError && "message" in envelopeError
        ? envelopeError.message
        : responseBody && "message" in responseBody
          ? responseBody.message
          : undefined;

    throw new ChatApiError(
      status,
      getErrorMessage(bodyMessage, "Không gửi được tin nhắn")
    );
  }

  if (!responseBody || !("data" in responseBody) || !responseBody.data) {
    throw new ChatApiError(502, "Phản hồi từ dịch vụ AI không hợp lệ");
  }

  return responseBody.data;
}
