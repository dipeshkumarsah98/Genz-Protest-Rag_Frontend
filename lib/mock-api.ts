import type { ApiResponse } from "@/types/chat";

/**
 * Hardcoded Q&A pairs from real session data for local testing.
 * Questions are matched case-insensitively on partial substrings.
 */
const MOCK_RESPONSES: Array<{ keywords: string[]; markdown: string }> = [
  {
    keywords: ["when", "happen", "date", "start", "begin"],
    markdown: `The Gen-Z protest in Nepal happened on **Bhadra 23, 2082** (approximately September 2025).

- This movement started peacefully but later escalated into violence as demonstrators reached the Everest Hotel in Baneshwar.`,
  },
  {
    keywords: ["why", "reason", "cause", "trigger", "because"],
    markdown: `The Gen-Z protest happened in response to a combination of deep-rooted grievances:

- **Systemic injustice** and impunity
- **Violence** and state repression
- **Corruption** in government and institutions
- Misuse of power affecting the youth
- **Unemployment** and lack of opportunities
- Rising **economic inequality**

Protesters demanded accountability from the government and full transparency in governance.`,
  },
  {
    keywords: [
      "punish",
      "accountab",
      "responsible",
      "blame",
      "arrest",
      "justice",
    ],
    markdown: `The following individuals should be held accountable for actions surrounding the protests:

- The **then Prime Minister**
- The **then Home Minister**
- Other officials involved in the violent incidents — including vandalism and arson — on **September 24, 2082**

Peaceful protesters who engaged in violence should also face appropriate legal action as per the law.`,
  },
  {
    keywords: ["demand", "want", "ask", "call"],
    markdown: `The primary demands of the Gen-Z protesters included:

1. **Accountability** — prosecution of those responsible for corruption and violence
2. **Transparency** in government decision-making
3. **Employment opportunities** for youth
4. An end to **systemic injustice** and impunity
5. Reduction of **economic inequality**`,
  },
  {
    keywords: ["government", "response", "react", "police", "state"],
    markdown: `The government response to the Gen-Z protests was widely criticised:

- **Security forces** were deployed to disperse crowds
- The situation escalated into violence near the **Everest Hotel in Baneshwar**
- Multiple incidents of **vandalism and arson** were reported on Bhadra 24, 2082
- Human rights organisations condemned the disproportionate use of force against peaceful demonstrators`,
  },
];

const FALLBACK_MARKDOWN = `I can answer questions about the **2025 Gen-Z protests in Nepal** based on the official government document.

Try asking:
- *When did the Gen-Z protest happen in Nepal?*
- *Why did the Gen-Z protest happen?*
- *Who should be held accountable for the protests?*
- *What were the main demands of the protesters?*
- *How did the government respond?*`;

/**
 * Simulates a network round-trip with a realistic delay, then matches
 * the question against known keyword sets. Falls back to a helpful
 * prompt if no match is found.
 */
export async function sendQuestionMock(question: string): Promise<ApiResponse> {
  // Simulate network latency (800 ms – 1.8 s)
  const delay = 800 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lower = question.toLowerCase();

  const match = MOCK_RESPONSES.find(({ keywords }) =>
    keywords.some((kw) => lower.includes(kw)),
  );

  return { markdown: match ? match.markdown : FALLBACK_MARKDOWN };
}

/**
 * Mock streaming variant that yields characters with a small delay
 * to simulate the SSE streaming experience during development.
 */
export async function* sendQuestionStreamMock(
  question: string,
): AsyncGenerator<string, void, unknown> {
  // Simulate initial latency
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 400),
  );

  const lower = question.toLowerCase();
  const match = MOCK_RESPONSES.find(({ keywords }) =>
    keywords.some((kw) => lower.includes(kw)),
  );
  const fullText = match ? match.markdown : FALLBACK_MARKDOWN;

  // Yield chunks of ~2-5 characters at a time
  let i = 0;
  while (i < fullText.length) {
    const chunkSize = 2 + Math.floor(Math.random() * 4);
    const chunk = fullText.slice(i, i + chunkSize);
    yield chunk;
    i += chunkSize;
    await new Promise((resolve) =>
      setTimeout(resolve, 15 + Math.random() * 25),
    );
  }
}
