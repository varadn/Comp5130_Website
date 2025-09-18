import PageLayout from "@/components/PageLayout";

export default function Contact() {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p className="text-gray-700">
        Have questions or feedback? Reach out at{" "}
        <a href="mailto:fake@gmail.com" className="text-blue-600 hover:underline">
          fake@gmail.com
        </a>.
      </p>
    </PageLayout>
  );
}