'use client'

import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function Home() {

  const [deckInput, setDeckInput] = useState("");
  const [results, setResults] = useState<string | null>(null);

  const handleAnalyze = () => {
    const cardCount = deckInput.split("\n").filter(line => line.trim() !== "").length;
    setResults(`Deck has ${cardCount} cards.`);
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
