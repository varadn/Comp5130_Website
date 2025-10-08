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
      <div
        role="main"
        aria-labelledby="contact-heading"
        className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md grid place-items-center"
      >
        <h1
          id="contact-heading"
          role="heading"
          aria-level={1}
          className="text-2xl font-bold mb-6"
        >
          Contact Us
        </h1>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            role="form"
            aria-labelledby="contact-heading"
            className="w-full max-w-lg space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-gray-700 font-medium mb-1"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                aria-required="true"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="contact-body"
                className="block text-gray-700 font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="contact-body"
                name="message"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                aria-required="true"
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
          <div
            role="status"
            aria-live="polite"
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in"
          >
            <p className="font-bold">Thank you for reaching out!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
