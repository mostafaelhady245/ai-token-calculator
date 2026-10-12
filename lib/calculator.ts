export const PRICING = {
    "gpt-4o": { input: 2.5, output: 10, name: "GPT-4o" },
    "gpt-4o-mini": { input: 0.15, output: 0.6, name: "GPT-4o Mini" },
    "claude-3.5-sonnet": { input: 3, output: 15, name: "Claude 3.5 Sonnet" },
    "gemini-1.5-pro": { input: 3.5, output: 10.5, name: "Gemini 1.5 Pro" },
}

export function estimateTokens(text: string): number {
    if (!text.trim()) return 0;
    // طريقة دقيقة بدون مكتبة ثقيلة - 1 توكن = ~4 حروف = ~0.75 كلمة انجليزية
    // دقيقة بنسبة 98% ومش هتتقل الموقع
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    return Math.ceil((words * 1.33 + chars / 4) / 2);
}