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

  try {
    const response = await fetch(API_BASE_URL, {
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
