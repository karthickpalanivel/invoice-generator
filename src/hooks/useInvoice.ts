import { useState, useEffect } from "react";
import { InvoiceData, LineItem } from "@/types/index";
import { EMPTY_DATA, EXAMPLE_DATA, numToWords } from "@/lib/utils";

export function useInvoice() {
  const [data, setData] = useState<InvoiceData>(EMPTY_DATA);

  // Auto-calculation Effect
  useEffect(() => {
    const { grandTotal } = calculateTotals();
    if (grandTotal > 0) {
      const wholePart = Math.floor(grandTotal);
      const decimalPart = Math.round((grandTotal - wholePart) * 100);
      let text = "INR " + numToWords(wholePart);
      if (decimalPart > 0) text += " and " + numToWords(decimalPart) + " Paise";
      text += " Only";
      setData((prev) => ({ ...prev, amountInWords: text }));
    }
  }, [data.items]);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
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

  const calculateTotals = () => {
    let taxableValue = 0,
      totalTax = 0,
      grandTotal = 0;
    data.items.forEach((item) => {
      const amount = item.quantity * item.rate;
      const tax = amount * ((item.cgstRate + item.sgstRate) / 100);
      taxableValue += amount;
      totalTax += tax;
      grandTotal += amount + tax;
    });
    return { taxableValue, totalTax, grandTotal };
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
