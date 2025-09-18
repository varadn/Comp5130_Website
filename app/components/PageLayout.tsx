import React from "react";
import Link from "next/link";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <nav className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between">
        <div className="font-bold text-lg">MTG Deck Analyzer</div>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start p-8 w-full max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
}
