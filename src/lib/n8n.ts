export interface N8nTranslationRequest {
  text: string;
  targetLanguage: "ar" | "en";
  sourceLanguage?: "ar" | "en";
}

export interface N8nTranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
}

export class N8nTranslationService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async translateText(
    request: N8nTranslationRequest,
  ): Promise<N8nTranslationResponse> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: request.text,
          targetLanguage: request.targetLanguage,
          sourceLanguage: request.sourceLanguage || "en",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        translatedText: data.translatedText || data.text || "",
        success: true,
      };
    } catch (error) {
      console.error("Translation error:", error);
      return {
        translatedText: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async translateMultipleTexts(
    texts: string[],
    targetLanguage: "ar" | "en",
    sourceLanguage?: "ar" | "en",
  ): Promise<N8nTranslationResponse[]> {
    const promises = texts.map((text) =>
      this.translateText({ text, targetLanguage, sourceLanguage }),
    );

    return Promise.all(promises);
  }
}

export const n8nTranslationService = new N8nTranslationService(
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    "https://your-n8n-instance.com/webhook/translate",
);
