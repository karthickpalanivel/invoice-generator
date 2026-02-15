import { useState } from "react";
import { InvoiceData, LineItem } from "@/types/index";
import { EMPTY_DATA, EXAMPLE_DATA } from "@/lib/utils";

export function useInvoice() {
  const [data, setData] = useState<InvoiceData>(EMPTY_DATA);

  const calculateTotals = () => {
    let taxableValue = 0;
    let totalTax = 0;
    let grandTotal = 0;

    data.items.forEach((item) => {
      const amount = item.quantity * item.rate;
      const tax = amount * ((item.cgstRate + item.sgstRate) / 100);
      taxableValue += amount;
      totalTax += tax;
      grandTotal += amount + tax;
    });

    return { taxableValue, totalTax, grandTotal };
  };

  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateItem = <K extends keyof LineItem>(
    index: number,
    field: K,
    value: LineItem[K],
  ) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Math.random().toString(),
          description: "",
          hsn: "",
          quantity: 0,
          rate: 0,
          per: "Nos",
          cgstRate: 9,
          sgstRate: 9,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const loadExample = () => {
    if (confirm("Load example data?")) setData(EXAMPLE_DATA);
  };

  const clearForm = () => {
    if (confirm("Clear all data?")) setData(EMPTY_DATA);
  };

  return {
    data,
    updateField,
    updateItem,
    addItem,
    removeItem,
    calculateTotals,
    loadExample,
    clearForm,
  };
}
