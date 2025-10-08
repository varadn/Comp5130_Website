"use client";

import React from "react";
import PageLayout from "@/components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <div
        role="main"
        aria-labelledby="about-heading"
        className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md text-center"
      >
        <h1
          className="text-3xl font-bold mb-4 text-gray-900 opacity-0"
          id="about-heading"
          role="heading"
          aria-level={1}
          style={{
            animation: "fadeIn 0.6s ease forwards",
            animationDelay: "0s",
          }}
        >
          About
        </h1>

        <p
          className="text-gray-700 leading-relaxed opacity-0"
          style={{
            animation: "fadeIn 0.6s ease forwards",
            animationDelay: "0.2s",
          }}
        >
          This tool analyzes Magic: The Gathering decks using real-time data
          from the{" "}
          <a
            href="https://scryfall.com/docs/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            aria-label="Scryfall API documentation"
          >
            Scryfall API
          </a>
          . It provides insights such as mana curve distribution, number of
          gamechangers, and mana color breakdown to help optimize your deck's
          performance.
        </p>
      </div>
    </PageLayout>
  );
}
