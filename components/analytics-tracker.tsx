'use client'

import { useEffect } from 'react'

interface AnalyticsTrackerProps {
    eventName: string
    eventParameters?: Record<string, any>
}

export function AnalyticsTracker({ eventName, eventParameters = {} }: AnalyticsTrackerProps) {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
                ...eventParameters,
            })
        }
    }, [eventName, eventParameters])

    return null
}

declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void
    }
}