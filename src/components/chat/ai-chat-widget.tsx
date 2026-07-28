"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";
import { sendAIChatMessage } from "@/lib/chat-api";
import type { ChatHistoryDto } from "@/lib/chat-api";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const createMessageId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Xin chào, tôi có thể hỗ trợ gì cho bạn?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages, isLoading]);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || isLoading) return;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: message
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const history: ChatHistoryDto[] = messages
        .filter((item) => item.id !== "welcome")
        .map((item) => ({
          role: item.role === "assistant" ? "model" : "user",
          text: item.content
        }));

      const response = await sendAIChatMessage({
        message,
        history
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: "assistant",
          content: response.message
        }
      ]);
    } catch {
      setError("Không thể gửi tin nhắn. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
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
                <p className="text-xs text-white/80">
                  Hỗ trợ tư vấn nhanh
                </p>
              </div>
            </div>
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
          </CardHeader>

          <CardContent className="min-h-0 flex-1 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
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
                  <div className="flex gap-2">
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
              <p className="mb-2 text-sm text-destructive">{error}</p>
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
