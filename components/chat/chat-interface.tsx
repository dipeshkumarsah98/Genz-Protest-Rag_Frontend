'use client'

import { useState, useCallback, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { MessageList } from '@/components/chat/message-list'
import { MessageInput } from '@/components/chat/message-input'
import { SuggestedQuestions } from '@/components/chat/suggested-questions'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { sendQuestion, ChatApiError } from '@/lib/api'
import { sendQuestionMock } from '@/lib/mock-api'
import { generateId } from '@/lib/id'
import { loadMessages, saveMessages, clearMessages } from '@/lib/storage'
import type { Message } from '@/types/chat'
const isApiConfigured =
  typeof process.env.NEXT_PUBLIC_API_URL === 'string' &&
  process.env.NEXT_PUBLIC_API_URL.trim() !== ''

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  // Load messages from IndexedDB on mount
  useEffect(() => {
    loadMessages().then((savedMessages) => {
      if (savedMessages.length > 0) {
        setMessages(savedMessages)
      }
      setIsHydrated(true)
    })
  }, [])

  // Save messages to IndexedDB whenever they change
  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      saveMessages(messages)
    }
  }, [messages, isHydrated])

  const handleClearHistory = useCallback(async () => {
    await clearMessages()
    setMessages([])
  }, [])

  const handleRetry = useCallback(async (errorMessageId: string) => {
    // Find the error message and the preceding user message
    const errorIndex = messages.findIndex(m => m.id === errorMessageId)
    if (errorIndex === -1) return

    // Find the most recent user message before the error
    let userMessage: Message | null = null
    for (let i = errorIndex - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessage = messages[i]
        break
      }
    }

    if (!userMessage) return

    // Remove the error message from the array
    setMessages((prev) => prev.filter(m => m.id !== errorMessageId))
    setIsLoading(true)

    try {
      const { answer: markdown } = isApiConfigured
        ? await sendQuestion(userMessage.content)
        : await sendQuestionMock(userMessage.content)

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: markdown,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorText =
        err instanceof ChatApiError
          ? err.message
          : 'Something went wrong. Please try again.'

      const newErrorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: errorText,
        timestamp: new Date(),
        isError: true,
      }

      setMessages((prev) => [...prev, newErrorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isApiConfigured])

  const handleSubmit = useCallback(async (question: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const { answer: markdown } = isApiConfigured
        ? await sendQuestion(question)
        : await sendQuestionMock(question)

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: markdown,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorText =
        err instanceof ChatApiError
          ? err.message
          : 'Something went wrong. Please try again.'

      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: errorText,
        timestamp: new Date(),
        isError: true,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="border-b border-border px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground">
              Nepal Gen-Z Aandolan Document
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              900-page official government report &mdash; 2025
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
            {messages.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="h-8 px-2 text-muted-foreground hover:cursor-pointer hover:text-white hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Clear chat history</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear chat history</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <MessageList messages={messages} isLoading={isLoading} onSendMessage={handleSubmit} onRetry={handleRetry} />
      <SuggestedQuestions messages={messages} onSendMessage={handleSubmit} />
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
