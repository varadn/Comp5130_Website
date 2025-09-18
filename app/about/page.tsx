import PageLayout from "@/components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p className="text-gray-700">
        This tool analyzes Magic: The Gathering decks.
      </p>
    </PageLayout>
  );
}