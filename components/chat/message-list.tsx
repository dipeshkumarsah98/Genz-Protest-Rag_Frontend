'use client'

import { useEffect, useRef } from 'react'
import { MessageBubble } from '@/components/chat/message-bubble'
import { TypingIndicator } from '@/components/chat/typing-indicator'
import type { Message } from '@/types/chat'
import { MessageSquare } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  onSendMessage?: (message: string) => void
  onRetry?: (messageId: string) => void
}

export function MessageList({ messages, isLoading, onSendMessage, onRetry }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="mx-auto w-full max-w-3xl flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-medium text-foreground">
              Start by asking a question
            </p>
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
              You can ask anything about the 2025 Gen-Z Aandolan in Nepal —
              events, timelines, demands, government responses, and more.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onSendMessage?.(q)}
                className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col overflow-y-auto px-4 py-6 scrollbar-thin"
      role="list"
      aria-label="Conversation"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} onRetry={onRetry} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  )
}

const EXAMPLE_QUESTIONS: string[] = [
  'When did the Gen-Z Aandolan happen in Nepal?',
  'Why did the Aandolan escalate?',
  'Who should be punished for this Aandolan?',
  'What were the main demands of Aandolan?',
  'How did the government respond?',
]
