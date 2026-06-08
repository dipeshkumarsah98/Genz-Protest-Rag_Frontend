import type { ApiResponse, ApiError } from "@/types/chat";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn(
    "[AandolanBot] NEXT_PUBLIC_API_URL is not set. API calls will fail. " +
      "Add it to your .env.local file.",
  );
}

export class ChatApiError extends Error {
  public readonly status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

export async function* sendQuestionStream(
  question: string,
): AsyncGenerator<string, void, unknown> {
  const trimmed = question.trim();

  if (!trimmed) {
    throw new ChatApiError("Question cannot be empty.");
  }

  if (!API_BASE_URL) {
    throw new ChatApiError(
      "API endpoint is not configured. Please set NEXT_PUBLIC_API_URL in your environment.",
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120_000);
  const url = `${API_BASE_URL}/ask/stream`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/event-stream",
      },
      body: new URLSearchParams({ query: trimmed }).toString(),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}.`;
      try {
        const errorBody = (await response.json()) as Partial<ApiError>;
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // Unable to parse error body — keep the default message
      }
      throw new ChatApiError(errorMessage, response.status);
    }

    const body = response.body;
    if (!body) {
      throw new ChatApiError("No response body received from stream.");
    }

    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      // Keep last potentially incomplete line in the buffer
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

        const jsonStr = trimmedLine.slice(6); // Remove "data: " prefix
        if (jsonStr === "[DONE]") return;

        try {
          const parsed = JSON.parse(jsonStr) as {
            type: string;
            content: string;
          };
          if (parsed.type === "chunk" && typeof parsed.content === "string") {
            yield parsed.content;
          }
        } catch {
          // Skip malformed JSON lines
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim().startsWith("data: ")) {
      const jsonStr = buffer.trim().slice(6);
      if (jsonStr !== "[DONE]") {
        try {
          const parsed = JSON.parse(jsonStr) as {
            type: string;
            content: string;
          };
          if (parsed.type === "chunk" && typeof parsed.content === "string") {
            yield parsed.content;
          }
        } catch {
          // Skip malformed JSON
        }
      }
    }
  } catch (err) {
    if (err instanceof ChatApiError) throw err;

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ChatApiError(
        "The request timed out. The server may be slow — please try again.",
      );
    }

    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new ChatApiError(
        "Network error. Please check your internet connection and try again.",
      );
    }

    throw new ChatApiError(
      "An unexpected error occurred. Please try again later.",
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function sendQuestion(question: string): Promise<ApiResponse> {
  const trimmed = question.trim();

  if (!trimmed) {
    throw new ChatApiError("Question cannot be empty.");
  }

  if (!API_BASE_URL) {
    throw new ChatApiError(
      "API endpoint is not configured. Please set NEXT_PUBLIC_API_URL in your environment.",
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60_000);
  const baseUrl = `${API_BASE_URL}/ask`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({ query: trimmed }).toString(),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}.`;

      try {
        const errorBody = (await response.json()) as Partial<ApiError>;
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        console.log(
          "Failed to parse error response as JSON. Using default error message.",
        );
        // Unable to parse error body — keep the default message
      }

      throw new ChatApiError(errorMessage, response.status);
    }

    const data = (await response.json()) as ApiResponse;
    console.log("API response:", data);

    if (typeof data.answer !== "string") {
      throw new ChatApiError(
        'Unexpected API response format. Expected an "answer" string field.',
      );
    }

    return data;
  } catch (err) {
    if (err instanceof ChatApiError) throw err;

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ChatApiError(
        "The request timed out. The server may be slow — please try again.",
      );
    }

    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new ChatApiError(
        "Network error. Please check your internet connection and try again.",
      );
    }

    throw new ChatApiError(
      "An unexpected error occurred. Please try again later.",
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
