"use client";

import React from "react";
import InvoiceEditor from "@/components/invoice/InvoiceEditor";
import InvoicePaper from "@/components/invoice/InvoicePaper";
import { useInvoice } from "@/hooks/useInvoice";

export default function InvoicePage() {
  const actions = useInvoice();
  const { data } = actions;
  const totals = actions.calculateTotals();

  return (
    <main className="min-h-screen bg-neutral-100 text-black">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl md:text-2xl font-semibold">One-page Invoice Generator</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={actions.loadExample}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Load Sample
            </button>
            <button
              onClick={() => window.print()}
              className="rounded bg-black px-3 py-1.5 text-sm text-white hover:bg-neutral-800"
            >
              Preview & Download
            </button>
            <button
              onClick={actions.clearForm}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-4">
          <section className="h-[calc(100vh-120px)] overflow-hidden rounded border border-gray-200 bg-white print:hidden">
            <InvoiceEditor data={data} actions={actions} />
          </section>

          <section className="overflow-auto rounded border border-gray-200 bg-neutral-200 p-2 md:p-3 print:border-none print:bg-white print:p-0">
            <InvoicePaper data={data} totals={totals} />
          </section>
        </div>
      </div>
    </main>
  );
}
