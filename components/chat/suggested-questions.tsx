'use client'

import type { Message } from '@/types/chat'

interface SuggestedQuestionsProps {
    messages: Message[]
    onSendMessage: (message: string) => void
}

// Suggested follow-up questions based on conversation context
const SUGGESTED_QUESTIONS = [
    'Tell me more details about this',
    'What were the consequences?',
    'Who was involved in this?',
    'When exactly did this happen?',
    'What was the government response?',
    'How did the public react?',
] as const

export function SuggestedQuestions({ messages, onSendMessage }: SuggestedQuestionsProps) {
    // Only show if there's at least one conversation (user + AI response)
    const hasConversation = messages.length >= 2 &&
        messages.some(m => m.role === 'user') &&
        messages.some(m => m.role === 'assistant')

    if (!hasConversation) {
        return null
    }

    return (
        <div className=" px-4 py-3 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question) => (
                        <button
                            key={question}
                            type="button"
                            onClick={() => onSendMessage(question)}
                            className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                        >
                            {question}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}