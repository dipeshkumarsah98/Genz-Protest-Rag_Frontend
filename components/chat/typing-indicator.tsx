import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div
      className="flex gap-3 w-full flex-row"
      role="status"
      aria-label="Assistant is thinking"
      aria-live="polite"
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1 bg-secondary text-secondary-foreground"
        aria-hidden="true"
      >
        <Bot className="h-4 w-4" />
      </div>

      {/* Animated dots */}
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-ai-bubble px-4 py-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: '0ms', animationDuration: '900ms' }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: '180ms', animationDuration: '900ms' }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: '360ms', animationDuration: '900ms' }}
          />
        </div>
      </div>
    </div>
  )
}
