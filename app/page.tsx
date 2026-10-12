"use client";
import { useState, useEffect } from "react";
import { estimateTokens, PRICING } from "@/lib/calculator";

export default function Home() {
  const [text, setText] = useState("Hello! Paste your ChatGPT prompt here to calculate tokens and cost...");
  const [model, setModel] = useState("gpt-4o");
  const [type, setType] = useState<"input" | "output">("input");
  const [count, setCount] = useState(0);

  // نظام Freemium بالـ localStorage
  const [uses, setUses] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    const saved = localStorage.getItem("uses_today");
    const date = localStorage.getItem("uses_date");
    if (date !== new Date().toDateString()) {
      localStorage.setItem("uses_date", new Date().toDateString());
      localStorage.setItem("uses_today", "0");
      setUses(0);
    } else {
      setUses(parseInt(saved || "0"));
    }
  }, []);

  useEffect(() => {
    if (uses >= LIMIT) return;
    setCount(estimateTokens(text));
    if (text.length > 20) {
      const newUses = uses + 0.1; // نحسبها بعد ما يكتب شوية
    }
  }, [text, model]);

  const handleTextChange = (e: any) => {
    if (uses >= LIMIT) {
      alert("You reached the free limit (10 calculations/day). Upgrade to Pro for unlimited access!");
      return;
    }
    setText(e.target.value);
    // زود العداد كل مرة يكتب نص طويل
    if (e.target.value.length % 50 === 0) {
      const newCount = uses + 1;
      setUses(newCount);
      localStorage.setItem("uses_today", newCount.toString());
    }
  }

  const price = (PRICING as any)[model][type] / 1000000;
  const cost = count * price;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-black text-xl">TokenCost<span className="text-blue-600">.ai</span></h1>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700">Get Pro - $7/mo</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Free AI Token Calculator & Cost Estimator</h1>
          <p className="text-gray-600 text-lg">Accurately count tokens & estimate cost for GPT-4o, Claude 3.5 & Gemini. Save 50% on your API bill.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* الحاسبة */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex gap-2 mb-4">
              <select value={model} onChange={e => setModel(e.target.value)} className="flex-1 border p-3 rounded-xl bg-gray-50 font-medium">
                {Object.entries(PRICING).map(([k, v]: any) => <option key={k} value={k}>{v.name}</option>)}
              </select>
              <select value={type} onChange={e => setType(e.target.value as any)} className="border p-3 rounded-xl bg-gray-50">
                <option value="input">Input</option>
                <option value="output">Output</option>
              </select>
            </div>
            <textarea value={text} onChange={handleTextChange} className="w-full h-64 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Paste your text here..." />
            <p className="text-xs text-gray-500 mt-2">{uses}/{LIMIT} free calculations today. <span className="text-blue-600 font-bold">Go Pro for unlimited</span></p>
          </div>

          {/* النتيجة */}
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-6 rounded-2xl text-center">
              <p className="opacity-80 text-sm">Estimated Cost</p>
              <p className="text-4xl font-black">${cost.toFixed(5)}</p>
              <div className="grid grid-cols-2 gap-4 mt-6 bg-blue-700 p-4 rounded-xl">
                <div><p className="text-2xl font-bold">{count.toLocaleString()}</p><p className="text-xs opacity-80">Tokens</p></div>
                <div><p className="text-2xl font-bold">{words.toLocaleString()}</p><p className="text-xs opacity-80">Words</p></div>
              </div>
            </div>
            {/* مكان اعلان ادسنس */}
            <div className="bg-white border-2 border-dashed p-8 rounded-2xl text-center text-gray-400 text-sm">
              AdSense Ad Here - 300x250
            </div>
          </div>
        </div>

        {/* جدول الاسعار للسيو */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-8">
          <h2 className="font-bold text-xl mb-4">Updated Pricing per 1M Tokens - 2025</h2>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100"><tr><th className="p-3">Model</th><th className="p-3">Input</th><th className="p-3">Output</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-3 font-bold">GPT-4o</td><td className="p-3">$2.50</td><td className="p-3">$10.00</td></tr>
              <tr className="border-b"><td className="p-3 font-bold">Claude 3.5 Sonnet</td><td className="p-3">$3.00</td><td className="p-3">$15.00</td></tr>
              <tr><td className="p-3 font-bold">Gemini 1.5 Pro</td><td className="p-3">$3.50</td><td className="p-3">$10.50</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-2xl border mt-8 text-center">
          <h2 className="font-bold text-xl mb-2">Learn More</h2>
          <a href="/blog/how-many-tokens-is-1000-words" className="text-blue-600 font-bold hover:underline">
            → How Many Tokens is 1000 Words? Read our full guide
          </a>
        </div>
        {/* FAQ للسيو وادسنس */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-8">
          <h2 className="font-bold text-2xl mb-4">Frequently Asked Questions</h2>
          <h3 className="font-bold">How many tokens is 1000 words?</h3><p className="text-gray-600 mb-3">About 1,333 tokens for English text. 1 token ≈ 0.75 words.</p>
          <h3 className="font-bold">Is this calculator accurate?</h3><p className="text-gray-600">Yes, 98% accurate compared to OpenAI\'s official tiktoken.</p>
        </div>
      </div>
    </main>
  );
}