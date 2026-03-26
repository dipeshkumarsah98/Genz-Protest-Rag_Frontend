'use client'

import {
  useRef,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
} from 'react'
import { SendHorizontal, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (question: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function MessageInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  disabled = false,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [])

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault()
      const trimmed = value.trim()
      if (!trimmed || isLoading || disabled) return
      onSubmit(trimmed)
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    },
    [value, isLoading, disabled, onSubmit]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const isSubmittable = value.trim().length > 0 && !isLoading && !disabled

  return (
    <div className="border-t border-border bg-background px-4 py-3 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-2"
        aria-label="Message input form"
      >
        <label className="sr-only" htmlFor="chat-input">
          Ask a question about the Nepal Gen-Z protests
        </label>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            adjustHeight()
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the 2025 Nepal Gen-Z protests..."
          disabled={isLoading || disabled}
          aria-disabled={isLoading || disabled}
          aria-label="Your question"
          className={cn(
            'flex-1 resize-none rounded-xl border border-border bg-muted',
            'px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'transition-all duration-150 leading-relaxed',
            'min-h-[48px] max-h-40 overflow-y-auto scrollbar-thin'
          )}
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!isSubmittable}
          aria-label={isLoading ? 'Sending…' : 'Send question'}
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            'transition-all duration-150',
            isSubmittable
              ? 'bg-primary text-primary-foreground hover:bg-accent cursor-pointer'
              : 'bg-muted text-muted-foreground cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {isLoading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <SendHorizontal className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </form>

      <p className="mt-2 text-center text-[14px] text-muted-foreground mx-auto max-w-3xl">
        Answers are sourced from a 900-page government report on the 2025 Gen-Z
        protests in Nepal. Press{' '}
        <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
          Enter
        </kbd>{' '}
        to send,{' '}
        <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
          Shift+Enter
        </kbd>{' '}
        for new line.
      </p>
    </div>
  )
}
