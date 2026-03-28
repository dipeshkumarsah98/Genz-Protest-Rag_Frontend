import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ChatInterface } from '@/components/chat/chat-interface'
import { AnalyticsTracker } from '@/components/analytics-tracker'

export const metadata: Metadata = {
  title: 'Ask a Question — AandolanBot',
  description:
    'Cross-question the official 900-page government document about Nepal\'s 2025 Gen-Z Aandolan.',
}

export default function ChatPage() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <AnalyticsTracker
        eventName="page_view"
        eventParameters={{
          custom_event_type: 'chat_page_visit',
          section: 'chat',
          user_engagement: 'high_intent'
        }}
      />
      <Navbar />

      <div
        className="flex flex-1 flex-col overflow-hidden pt-14"
        aria-label="Chat interface"
      >
        <ChatInterface />
      </div>
    </div>
  )
}
