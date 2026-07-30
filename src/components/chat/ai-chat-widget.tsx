"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import {
  Bot,
  Loader2,
  MessageCircle,
  RefreshCcw,
  Send,
  User,
  X
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  ChatApiError,
  sendAIChatMessage
} from "@/lib/chat-api";
import type { ChatData } from "@/lib/chat-api";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_INSTRUCTION =
  "Bạn là trợ lý tư vấn dược phẩm. Trả lời ngắn gọn bằng tiếng Việt.";

const isDebugMode = process.env.NEXT_PUBLIC_CHAT_DEBUG === "true";

const createMessageId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getFriendlyErrorMessage = (error: unknown) => {
  if (!(error instanceof ChatApiError)) {
    return "Không thể kết nối tới dịch vụ AI. Vui lòng kiểm tra mạng và thử lại.";
  }

  switch (error.status) {
    case 400:
      return "Nội dung tin nhắn không hợp lệ. Vui lòng kiểm tra và thử lại.";
    case 429:
      return "Bạn đang gửi tin nhắn quá nhanh. Vui lòng đợi một chút rồi thử lại.";
    case 502:
      return "Dịch vụ AI đang gặp sự cố kết nối. Vui lòng thử lại sau.";
    case 503:
      return "Dịch vụ AI tạm thời không khả dụng. Vui lòng thử lại sau.";
    case 504:
      return "Dịch vụ AI phản hồi quá lâu. Vui lòng thử lại.";
    default:
      return error.message || "Không thể gửi tin nhắn. Vui lòng thử lại sau.";
  }
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<ChatData | null>(null);
  const interactionIdRef = useRef<string>();
  const apiKeyIdRef = useRef<number>();
  const activeRequestRef = useRef<AbortController | null>(null);
  const requestSequenceRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [isOpen, messages, isLoading, error]);

  useEffect(() => {
    return () => activeRequestRef.current?.abort();
  }, []);

  const startNewConversation = () => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    requestSequenceRef.current += 1;
    interactionIdRef.current = undefined;
    apiKeyIdRef.current = undefined;
    setMessages([]);
    setInput("");
    setError(null);
    setDebugData(null);
    setIsLoading(false);
  };

  const handleSend = async () => {
    const message = input.trim();

    if (!message || isLoading || activeRequestRef.current) return;

    const requestSequence = ++requestSequenceRef.current;
    const abortController = new AbortController();
    activeRequestRef.current = abortController;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createMessageId(),
        role: "user",
        content: message
      }
    ]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await sendAIChatMessage(
        {
          message,
          api_key_id: apiKeyIdRef.current,
          previous_interaction_id: interactionIdRef.current,
          system_instruction: SYSTEM_INSTRUCTION
        },
        abortController.signal
      );

      if (requestSequence !== requestSequenceRef.current) return;

      interactionIdRef.current = response.interaction_id;
      apiKeyIdRef.current = response.api_key_id;
      setDebugData(response);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: "assistant",
          content: response.message
        }
      ]);
    } catch (caughtError) {
      if (
        abortController.signal.aborted ||
        requestSequence !== requestSequenceRef.current
      ) {
        return;
      }

      setError(getFriendlyErrorMessage(caughtError));
    } finally {
      if (requestSequence === requestSequenceRef.current) {
        activeRequestRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSend();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    void handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <Card className="flex h-[640px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-lg border-blue-ea shadow-2xl sm:w-[380px]">
          <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-blue-ea bg-blue-12 p-4 text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-white text-blue-12">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">Trợ lý AI</CardTitle>
                <p className="text-xs text-white/80">Hỗ trợ tư vấn nhanh</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
                onClick={startNewConversation}
                aria-label="Tạo cuộc hội thoại mới"
                title="Cuộc hội thoại mới"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Đóng chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="min-h-0 flex-1 p-0">
            <ScrollArea className="h-full">
              <div
                className="space-y-4 p-4"
                role="log"
                aria-live="polite"
                aria-label="Nội dung hội thoại"
              >
                {messages.length === 0 ? (
                  <div className="py-8 text-center">
                    <Avatar className="mx-auto mb-3 h-10 w-10">
                      <AvatarFallback className="bg-blue-ea text-blue-12">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-foreground">
                      Xin chào, tôi có thể hỗ trợ gì cho bạn?
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Hãy nhập câu hỏi về dược phẩm ở bên dưới.
                    </p>
                  </div>
                ) : null}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.role === "user" && "justify-end"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Avatar className="mt-1 h-7 w-7">
                        <AvatarFallback className="bg-blue-ea text-blue-12">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : null}

                    <div
                      className={cn(
                        "max-w-[78%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-6",
                        message.role === "user"
                          ? "bg-blue-12 text-white"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {message.content}
                    </div>

                    {message.role === "user" ? (
                      <Avatar className="mt-1 h-7 w-7">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                  </div>
                ))}

                {isLoading ? (
                  <div className="flex gap-2" role="status">
                    <Avatar className="mt-1 h-7 w-7">
                      <AvatarFallback className="bg-blue-ea text-blue-12">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Đang trả lời...
                    </div>
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="block border-t p-4">
            {error ? (
              <p className="mb-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            {isDebugMode && debugData ? (
              <div className="mb-2 text-xs text-muted-foreground">
                <p>
                  Debug: {debugData.model} · {debugData.usage.total_token_count}{" "}
                  tokens
                </p>
                <p>
                  Quota còn lại:{" "}
                  {debugData.usage.token_remaining.toLocaleString("vi-VN")}
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Nhập tin nhắn..."
                rows={2}
                disabled={isLoading}
                className="max-h-28 resize-none"
                aria-label="Tin nhắn"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                aria-label="Gửi tin nhắn"
                className="h-10 w-10 shrink-0 bg-blue-12 text-white hover:bg-blue-26"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : null}

      <Button
        type="button"
        size="icon"
        className="h-14 w-14 rounded-full bg-blue-12 text-white shadow-lg hover:bg-blue-26"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}

export default AIChatWidget;
