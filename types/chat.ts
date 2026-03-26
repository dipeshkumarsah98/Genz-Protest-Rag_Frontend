export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ApiResponse {
  query: string;
  answer: string;
  session_id: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
