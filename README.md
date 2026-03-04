# 🧾 GST Invoice Generator

A one-page **GST invoice generator** built using **Next.js (App Router)** and **React + TypeScript**.

The application provides a split-screen workflow:

* **Left Panel** → Structured invoice data entry
* **Right Panel** → Live A4 print-optimized invoice preview

The preview is designed specifically for **A4 Portrait printing**, including custom margins and GST tax breakdown sections, making it ready for browser-based Print / Save as PDF workflows.

---

## ✨ Features

### 📌 Invoice Sections

* Seller details
* Buyer / Consignee details
* Logistics & order metadata
* Bank details

### 🧮 Line Item Controls

Each item supports:

* Quantity
* Rate
* Per-unit value
* CGST %
* SGST %

### 🔢 Automatic Calculations

* Taxable value
* Total CGST
* Total SGST
* Total tax
* Grand total
* Amount in words

### 🖨 Print & Export

* A4 portrait layout
* Custom `@page` margins
* Print-friendly styling
* One-click **Preview & Download** (browser print / PDF)

---

## 🛠 Tech Stack

* **Next.js (App Router)**
* **React + TypeScript**
* **Tailwind CSS v4**
* **Lucide React** (icons)

---

## 📂 Project Structure

```
invoice-generator/
│
├── src/
│   │
│   ├── app/
│   │   ├── invoice/
│   │   │   └── page.tsx            # Main invoice screen (Editor + Preview)
│   │   ├── globals.css             # Global + print styles (@page A4 config)
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Default landing page
│   │
│   ├── components/
│   │   ├── invoice/
│   │   │   ├── InvoiceEditor.tsx   # Left panel form UI
│   │   │   └── InvoicePaper.tsx    # Printable invoice template
│   │   │
│   │   └── ui/
│   │       ├── InputGroup.tsx      # Reusable labeled input component
│   │       └── Section.tsx         # Collapsible section header component
│   │
│   ├── hooks/
│   │   └── useInvoice.ts           # Invoice state + calculations logic
│   │
│   ├── lib/
│   │   └── utils.ts                # Sample data + number-to-words helper
│   │
│   └── types/
│       └── index.ts                # TypeScript type definitions
│
├── public/                         # Static assets
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── eslint.config.mjs               # ESLint configuration
└── README.md
```

---

## 🧠 Architecture Overview

This project follows a clean separation of concerns:

* **UI Layer** → Editor & Preview components
* **State Layer** → Custom React hook (`useInvoice`)
* **Utility Layer** → Helper functions & seed data
* **Type Layer** → Centralized TypeScript definitions

---

## 🔄 Data Flow Overview

1. User enters values inside **InvoiceEditor**.
2. Editor calls update methods from `useInvoice`.
3. `useInvoice` updates centralized invoice state.
4. `calculateTotals()` derives:

   * Taxable value
   * CGST total
   * SGST total
   * Total tax
   * Grand total
5. Updated state is passed to **InvoicePaper**.
6. Live preview updates instantly.
7. User clicks **Preview & Download** to print or save as PDF.

---

## 📌 Key Files Explained

### `src/app/invoice/page.tsx`

* Entry page for the invoice generator UI
* Connects `useInvoice` hook with:

  * `InvoiceEditor`
  * `InvoicePaper`
* Includes action buttons for:

  * Load sample data
  * Clear invoice
  * Print / Download

---

### `src/hooks/useInvoice.ts`

Core business logic layer:

* Stores invoice data state
* Updates top-level invoice fields
* Updates line-item fields
* Adds / removes items
* Computes totals:

  * Taxable total
  * Total CGST
  * Total SGST
  * Total tax
  * Grand total

This hook acts as the single source of truth for invoice data.

---

### `src/components/invoice/InvoiceEditor.tsx`

Form panel (left side):

* Grouped in collapsible sections
* Inputs for:

  * Seller details
  * Buyer / Consignee details
  * Logistics information
  * Line items
  * Footer & bank details
* Line-item area supports dynamic CGST/SGST tax rates

---

### `src/components/invoice/InvoicePaper.tsx`

Printable invoice preview (right side):

* Table-based invoice layout
* Renders:

  * Item details
  * Tax summaries
  * Grand total
* Styles optimized for:

  * Print consistency
  * A4 portrait format
  * PDF export

---

### `src/app/globals.css`

Global styling and print setup:

* Application-level font and layout defaults
* `@page` configuration for A4 size
* Custom margin setup
* Print-specific styling rules

---

### `src/lib/utils.ts`

Seed and utility layer:

* `EMPTY_DATA` → Fresh invoice state template
* `EXAMPLE_DATA` → Pre-filled sample invoice
* `numToWords()` → Converts numeric amounts into words

---

### `src/types/index.ts`

Centralized TypeScript definitions for:

* `LineItem`
* `InvoiceData`

Ensures strict typing across state, UI, and calculations.

---

## 🚀 Functional Techniques Used

* Custom React hook for centralized business logic
* Derived state calculations
* Controlled form inputs
* Collapsible UI grouping
* Print-specific CSS using `@page`
* Table-based PDF-friendly layout
* Strict TypeScript modeling
* Modular reusable UI components

---

## 🖨 Printing Workflow

The application uses the native browser print engine:

1. Click **Preview & Download**
2. Browser print dialog opens
3. Choose:

   * Destination → Save as PDF (optional)
   * Paper size → A4
   * Margins → Default (handled via CSS)

The layout is optimized for consistent rendering across modern browsers.

---

## 📦 Getting Started

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000/invoice
```

---

## 📄 License

This project is open-source and available for customization and extension.
