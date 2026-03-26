# AandolanBot 🇳🇵

> AI-powered chatbot for exploring Nepal's 2025 Gen-Z protests through a 900-page official government document

AandolanBot provides conversational access to understanding Nepal's 2025 Gen-Z uprising. Ask questions in plain language and receive precise, sourced answers drawn directly from the official government investigative report.

![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.2-06B6D4)

## ✨ Features

- 🤖 **AI-Powered Q&A** - Ask questions about the 2025 protests and get informed responses
- 💾 **Persistent Chat History** - Conversations saved locally using IndexedDB
- 🔄 **Smart Retry** - Retry failed messages with one click
- 💡 **Suggested Questions** - Context-aware follow-up suggestions after responses
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Nepal-Inspired Theme** - Custom design system with crimson red and deep blue colors
- ⚡ **Real-time Typing** - Animated typing indicators during responses
- 📄 **Rich Markdown** - Full support for formatted text, lists, and code blocks
- 🔍 **Example Questions** - Pre-loaded examples for new users
- 🌙 **Theme Support** - Light/dark mode toggle (foundation ready)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd genz-rag-fe

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Configuration

Create a `.env.local` file:

```bash
# Required for production API
NEXT_PUBLIC_API_URL=http://localhost:8000/ask

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 API Integration

### Backend Requirements

AandolanBot expects a REST API endpoint that:

**Request:**

```http
POST /ask
Content-Type: application/x-www-form-urlencoded

query=When did the Gen-Z protest happen in Nepal?
```

**Response:**

```json
{
  "query": "When did the Gen-Z protest happen in Nepal?",
  "answer": "The Gen-Z protest in Nepal happened on **Bhadra 23, 2082**...",
  "session_id": "unique-session-identifier"
}
```

### Mock API

When `NEXT_PUBLIC_API_URL` is not configured, the app automatically uses a mock API with keyword-based responses for:

- Timeline questions (when)
- Cause/reason questions (why)
- Accountability questions (who)
- Demands questions (what)
- Government response questions

## 🏗️ Architecture

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles & theme
│   └── chat/
│       └── page.tsx       # Chat interface
├── components/
│   ├── navbar.tsx         # Navigation with Nepal flag
│   ├── home/
│   │   └── hero-section.tsx    # Landing page hero
│   ├── chat/              # Chat components
│   │   ├── chat-interface.tsx  # Main chat logic
│   │   ├── message-list.tsx    # Message container
│   │   ├── message-bubble.tsx  # Individual messages
│   │   ├── message-input.tsx   # Input with auto-resize
│   │   ├── typing-indicator.tsx # Loading animation
│   │   └── suggested-questions.tsx # Follow-up suggestions
│   └── ui/                # 50+ shadcn/ui components
├── lib/
│   ├── api.ts            # Production API client
│   ├── mock-api.ts       # Development mock API
│   ├── storage.ts        # IndexedDB persistence
│   ├── format-time.ts    # Relative time formatting
│   └── utils.ts          # Utilities
└── types/
    └── chat.ts           # TypeScript definitions
```

### Tech Stack

**Core:**

- [Next.js 16.2](https://nextjs.org/) - React framework with App Router
- [React 19.2](https://react.dev/) - UI library
- [TypeScript 5.7](https://www.typescriptlang.org/) - Type safety

**UI & Styling:**

- [Tailwind CSS v4.2](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives
- [Lucide React](https://lucide.dev/) - Icon library

**State & Data:**

- React Hooks - State management
- IndexedDB - Client-side persistence
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Form validation

**Content:**

- [React Markdown](https://remarkjs.github.io/react-markdown/) - Markdown rendering
- GitHub Flavored Markdown support

## 🎨 Design System

### Colors (Nepal-Inspired)

- **Primary:** Crimson Red `#DC143C` - Represents passion and determination
- **Secondary:** Deep Blue `#003893` - Represents depth and stability
- **Background:** Near-black Navy - Professional dark theme
- **Accent:** Lighter Crimson for interactions

### Typography

- **Font:** Poppins - Clean, modern, and highly readable
- **Sizes:** Responsive scale from 12px to 72px
- **Weight:** 300-900 range for proper hierarchy

### Components

All components follow:

- Mobile-first responsive design
- Accessibility (ARIA labels, semantic HTML)
- Dark theme optimization
- Nepal flag branding elements

## 💾 Data Persistence

Messages are automatically saved to IndexedDB with:

- **Database:** `genz-rag-chat`
- **Store:** `messages` with timestamp indexing
- **Operations:** Auto-save on message updates, load on mount
- **Features:** Clear history, retry failed messages

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repo
git clone <your-fork-url>
cd genz-rag-fe

# Install dependencies
pnpm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development
pnpm dev
```

### Code Standards

- **TypeScript:** Strict mode enabled
- **ESLint:** Configured with Next.js rules
- **Prettier:** Code formatting (if configured)
- **Components:** Use shadcn/ui patterns
- **Styling:** Tailwind CSS classes only
- **State:** React hooks, avoid external state libraries

### Adding New Features

1. **UI Components:** Add to `components/ui/` following shadcn conventions
2. **Chat Features:** Extend `components/chat/` with proper TypeScript
3. **API Changes:** Update both `api.ts` and `mock-api.ts`
4. **Storage:** Use existing IndexedDB patterns in `storage.ts`

## 📝 Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Dependencies
pnpm add <package>      # Add dependency
pnpm add -D <package>   # Add dev dependency
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-api-domain.com/ask
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

**Production Required:**

- `NEXT_PUBLIC_API_URL` - Backend API endpoint

**Optional:**

- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Analytics
- Theme and feature flags as needed

## 🐛 Troubleshooting

### Common Issues

**API Connection Failed:**

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend endpoint is accessible
- Review CORS configuration on backend

**Messages Not Persisting:**

- Check browser IndexedDB storage limits
- Verify localStorage permissions
- Clear browser data and retry

**Build Errors:**

- Run `pnpm install` to update dependencies
- Check TypeScript errors with `pnpm type-check`
- Verify all environment variables are set

**Styling Issues:**

- Ensure Tailwind CSS is configured correctly
- Check for conflicting CSS classes
- Verify custom theme variables in `globals.css`

## 📄 License

[Add your license here - e.g., MIT, Apache 2.0]

## 🙏 Acknowledgments

- **Nepal amá gar** (Government of Nepal) - For the official investigative document
- **Gen-Z Protesters** - For their courage and civic engagement
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ for Nepal** | मायाले बनाइएको नेपालको लागि
