# Invoice Generator

A one-page GST invoice generator built with Next.js and React. The app provides a split-screen workflow:

- **left panel** for entering seller, buyer, logistics, line-item, and bank details
- **right panel** for a live invoice preview that is optimized for printing/PDF export

The invoice layout is designed for **A4 portrait** printing with custom margins and tax breakdown sections.

---

## Features

- Seller and buyer/consignee sections
- Logistics and order metadata fields
- Editable line items with:
  - quantity
  - rate
  - per-unit value
  - **CGST %** and **SGST %** per item
- Auto-calculated totals:
  - taxable value
  - total CGST
  - total SGST
  - grand total
- Amount-in-words support
- Print-friendly invoice template
- One-click **Preview & Download** using browser print/PDF flow

---

## Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)

---

## Project Structure

```text
invoice-generator/
├── src/
│   ├── app/
│   │   ├── invoice/
│   │   │   └── page.tsx               # Main invoice screen (editor + preview)
│   │   ├── globals.css                # Global and print styles (@page A4, margins)
│   │   ├── layout.tsx                 # Root application layout
│   │   └── page.tsx                   # Default landing page
│   │
│   ├── components/
│   │   ├── invoice/
│   │   │   ├── InvoiceEditor.tsx      # Form UI for all invoice input sections
│   │   │   └── InvoicePaper.tsx       # Printable invoice template/preview
│   │   └── ui/
│   │       ├── InputGroup.tsx         # Reusable labeled input component
│   │       └── Section.tsx            # Collapsible section header component
│   │
│   ├── hooks/
│   │   └── useInvoice.ts              # Invoice state, item updates, totals calculation
│   │
│   ├── lib/
│   │   └── utils.ts                   # Empty/sample invoice data + number-to-words helper
│   │
│   └── types/
│       └── index.ts                   # TypeScript types for invoice and line items
│
├── public/                            # Static assets
├── package.json                       # Scripts and dependencies
├── tsconfig.json                      # TypeScript configuration
├── next.config.ts                     # Next.js configuration
├── eslint.config.mjs                  # ESLint configuration
└── README.md
```

---

## Key Files Explained

### `src/app/invoice/page.tsx`
- Entry page for the invoice generator UI.
- Connects `useInvoice` hook with:
  - `InvoiceEditor` for input
  - `InvoicePaper` for preview
- Includes action buttons for sample data, print/download, and clear.

### `src/hooks/useInvoice.ts`
Core business logic layer:
- stores invoice data state
- updates top-level fields and line-item fields
- adds/removes items
- computes all totals (taxable, CGST, SGST, total tax, grand total)

### `src/components/invoice/InvoiceEditor.tsx`
The form panel:
- grouped in collapsible sections
- exposes inputs for seller, logistics, buyer/consignee, line items, and footer details
- line-item area supports tax-rate input for CGST/SGST

### `src/components/invoice/InvoicePaper.tsx`
The printable document view:
- table-based invoice layout
- renders item details and tax summaries
- styles adjusted for print-like output consistency

### `src/app/globals.css`
Global styling and print setup:
- app-level font/background defaults
- `@page` configuration for PDF/print size and margins

### `src/lib/utils.ts`
Seed and utility layer:
- `EMPTY_DATA` for fresh invoice state
- `EXAMPLE_DATA` for quick demo filling
- `numToWords` helper for amount text conversion

### `src/types/index.ts`
Single source of type definitions for:
- `LineItem`
- `InvoiceData`

---

## Data Flow Overview

1. User enters values in **InvoiceEditor**.
2. Editor calls update methods from **useInvoice**.
3. `useInvoice` updates the central invoice state.
4. `calculateTotals()` derives totals from line items and tax rates.
5. Updated state + totals are passed to **InvoicePaper** for live preview.
6. User clicks **Preview & Download** to print or save as PDF.

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Then open:

- `http://localhost:3000/invoice` (invoice generator page)

### Lint

```bash
npm run lint
```

### Production build

```bash
npm run build
npm run start
```

---

## Print / PDF Notes

- Page setup is configured in global CSS using:
  - `size: A4 portrait`
  - margins: `1cm 1cm 1.5cm` (top/right+left/bottom)
- Final PDF output quality may vary slightly by browser print engine.

---

## Future Improvements (Optional)

- Persist invoice drafts to local storage / database
- Support multiple page invoices
- Add customer/product masters
- Export JSON/CSV and import previous invoices
- Add formal automated tests for hook logic and UI rendering

