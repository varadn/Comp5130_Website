"use client";
import React from "react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function Contact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject_parsed = `Contact - ${name} - ${subject}`;
    window.location.href = `mailto:user@example.com?subject=${subject_parsed}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={5}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-sm">
          Thank you for reaching out!
        </div>
      )}
    </PageLayout>
  );
}
