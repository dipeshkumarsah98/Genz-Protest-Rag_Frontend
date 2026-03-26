import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/format-time'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import type { Message } from '@/types/chat'
import { AlertCircle, User, Bot, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MessageBubbleProps {
  message: Message
  onRetry?: (messageId: string) => void
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isError = message.isError === true

  return (
    <div
      className={cn(
        'flex gap-3 w-full',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
      role="listitem"
      aria-label={isUser ? 'Your message' : 'Assistant response'}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1',
          isUser
            ? 'bg-primary text-primary-foreground'
            : isError
              ? 'bg-destructive/20 text-destructive'
              : 'bg-secondary text-secondary-foreground'
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : isError ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-base',
          isUser
            ? 'rounded-tr-sm bg-user-bubble text-user-bubble-foreground'
            : isError
              ? 'rounded-tl-sm bg-destructive/10 border border-destructive/30 text-destructive-foreground'
              : 'rounded-tl-sm bg-ai-bubble text-ai-bubble-foreground'
        )}
      >
        {isUser ? (
          <p className="leading-relaxed whitespace-pre-wrap wrap-break-word">
            {message.content}
          </p>
        ) : isError ? (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle
                className="h-4 w-4 mt-0.5 shrink-0 text-destructive"
                aria-hidden="true"
              />
              <p className="leading-relaxed text-muted-foreground">
                {message.content}
              </p>
            </div>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(message.id)}
                className="h-8 px-3 text-xs border-destructive/30 text-destructive hover:cursor-pointer hover:bg-destructive/10"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            )}
          </div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}

        {/* Timestamp */}
        <time
          dateTime={message.timestamp.toISOString()}
          className={cn(
            'mt-2 block text-[12px] select-none',
            isUser
              ? 'text-primary-foreground/60 text-right'
              : 'text-muted-foreground'
          )}
          title={message.timestamp.toLocaleString()}
        >
          {formatRelativeTime(message.timestamp)}
        </time>
      </div>
    </div>
  )
}
