"use client";

import React from "react";
// import Image from "next/image";
// import Link from 'next/link';
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  const [deckInput, setDeckInput] = useState("");
  const [results, setResults] = useState<React.JSX.Element | null>(null);

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

      const curve: Record<string, number> = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6+": 0,
      };

      parsed.forEach((c, i) => {
        if (cards[i].type_line && cards[i].type_line.includes("Land")) return;
        const cmc = Math.round(cards[i].cmc ?? 0);

        if (cmc >= 6) {
          curve["6+"] += c.qty;
        } else {
          curve[cmc.toString()] += c.qty;
        }
      });

      setResults(
        <div className="flex flex-col items-center text-center w-full">
          <p
            className="opacity-0 animate-fade-in text-base mb-2"
            style={{
              animation: `fadeIn 0.6s ease forwards`,
              animationDelay: `0s`,
            }}
          >
            Deck has <span className="font-bold">{totalCards}</span> cards.
            Found <span className="font-bold">{gamechangers.length}</span> game
            changers.
          </p>
          <p
            className="opacity-0 animate-fade-in text-base mb-2"
            style={{
              animation: `fadeIn 0.6s ease forwards`,
              animationDelay: `0.2s`,
            }}
          >
            Mana breakdown: {manaBreakdown}
          </p>
          <div
            className="opacity-0 animate-fade-in mb-4"
            style={{
              animation: `fadeIn 0.6s ease forwards`,
              animationDelay: `0.4s`,
            }}
          >
            <span className="block text-base font-semibold mb-2">
              Mana Curve:
            </span>
            <div className="flex items-end space-x-2 h-32 min-h-[12rem]">
              {(() => {
                const counts = Object.values(curve);
                const maxCount = Math.max(...counts);
                const maxBarHeight = 128;
                return Object.entries(curve).map(([cost, count]) => {
                  const barHeight = maxCount
                    ? Math.max((count / maxCount) * maxBarHeight, 6)
                    : 6;
                  return (
                    <div key={cost} className="flex flex-col items-center">
                      <span className="text-xs text-gray-600 mb-2">
                        {count}
                      </span>
                      <div
                        className="bg-blue-500 rounded w-8 mt-1"
                        style={{ height: `${barHeight}px` }}
                      ></div>
                      <span className="text-xs mt-2">{cost}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: none; }
            }
          `}</style>
        </div>
      );
    } catch (err) {
      setResults(
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{(err as Error).message}</span>
        </div>
      );
    }
  };

  return (
    <PageLayout>
      <main className="flex-1 flex flex-col items-center justify-start p-8 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Paste Your Decklist</h1>

        <textarea
          className="w-full h-64 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste around 100 cards here, one per line Format: [number] Card Name..."
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
            {results}
          </div>
        )}
      </main>
    </PageLayout>
  );
}
