import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold mb-3">Invoice Generator</h1>
        <p className="text-sm text-gray-600 mb-6">Generate, preview and download a one-page invoice.</p>
        <Link href="/invoice" className="inline-block rounded bg-black px-4 py-2 text-white text-sm hover:bg-neutral-800">
          Open Invoice Generator
        </Link>
      </div>
    </main>
  );
}
