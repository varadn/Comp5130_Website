"use client";

import React from "react";
// import Image from "next/image";
// import Link from 'next/link';
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  const [deckInput, setDeckInput] = useState("");
  const [results, setResults] = useState<string | null>(null);

  const parseDeck = (deck: string) => {
    return deck
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => {
        const match = line.match(/^(\d+)\s+(.*)$/);
        return match
          ? { qty: parseInt(match[1]), name: match[2] }
          : { qty: 1, name: line };
      });
  };

  const fetchCardData = async (name: string) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`
    );
    if (!response.ok) throw new Error(`Card not found: ${name}`);
    return response.json();
  };

  const countManaSymbols = (
    manaCost: string,
    qty: number,
    counts: Record<string, number>
  ) => {
    const symbols = manaCost.match(/\{.*?\}/g) || [];
    symbols.forEach((sym) => {
      const clean = sym.replace(/[{}]/g, "");
      if (["W", "U", "B", "R", "G", "C"].includes(clean)) {
        counts[clean] = (counts[clean] || 0) + qty;
      }
    });
  };

  const handleAnalyze = async () => {
    const parsed = parseDeck(deckInput);

    try {
      const cards = await Promise.all(parsed.map((c) => fetchCardData(c.name)));
      const totalCards = parsed.reduce((sum, c) => sum + c.qty, 0);
      const gamechangers = cards.filter((card) =>
        card.keywords?.includes("Gamechanger")
      );

      const manaCounts: Record<string, number> = {};
      parsed.forEach((c, i) => {
        if (cards[i].mana_cost) {
          countManaSymbols(cards[i].mana_cost, c.qty, manaCounts);
        }
      });

      const manaBreakdown =
        Object.entries(manaCounts).length > 0
          ? Object.entries(manaCounts)
              .map(([color, count]) => `${color}: ${count}`)
              .join(", ")
          : "No colored mana symbols found.";

      setResults(
        `Deck has ${totalCards} cards. Found ${gamechangers.length} gamechangers.\n Mana breakdown: ${manaBreakdown}`
      );
    } catch (err) {
      setResults(`Error analyzing deck: ${(err as Error).message}`);
    }
  };

  return (
    <PageLayout>
      <main className="flex-1 flex flex-col items-center justify-start p-8 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Paste Your Decklist</h1>

        <textarea
          className="w-full h-64 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste around 100 cards here, one per line..."
          value={deckInput}
          onChange={(e) => setDeckInput(e.target.value)}
        />

        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={handleAnalyze}
        >
          Analyze Deck
        </button>

        {results && (
          <div className="mt-6 w-full bg-gray-100 text-black p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <p>{results}</p>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
