import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-invert max-w-none text-sm leading-relaxed',
        // Headings
        '[&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:first:mt-0',
        '[&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:first:mt-0',
        '[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground/90 [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:first:mt-0',
        // Paragraphs
        '[&_p]:text-ai-bubble-foreground [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:last:mb-0',
        // Strong / em
        '[&_strong]:text-foreground [&_strong]:font-semibold',
        '[&_em]:text-foreground/80 [&_em]:italic',
        // Links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-accent [&_a]:transition-colors',
        // Unordered / ordered lists
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1',
        '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1',
        '[&_li]:text-ai-bubble-foreground',
        // Blockquote
        '[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:my-3',
        '[&_blockquote]:text-muted-foreground [&_blockquote]:italic',
        // Horizontal rule
        '[&_hr]:border-border [&_hr]:my-4',
        // Inline code
        '[&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:text-primary',
        '[&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded',
        '[&_code:not(pre_code)]:text-xs [&_code:not(pre_code)]:font-mono',
        // Code blocks
        '[&_pre]:bg-muted [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:my-3 [&_pre]:overflow-x-auto',
        '[&_pre_code]:text-foreground/90 [&_pre_code]:text-xs [&_pre_code]:font-mono [&_pre_code]:bg-transparent [&_pre_code]:p-0',
        // Tables
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:text-xs',
        '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground',
        '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-muted-foreground',
        '[&_tr:nth-child(even)_td]:bg-muted/30',
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
