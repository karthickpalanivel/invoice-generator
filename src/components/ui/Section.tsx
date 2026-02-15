import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SectionHeader = ({
  title,
  isOpen,
  toggle,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
}) => (
  <button
    onClick={toggle}
    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 transition-colors"
  >
    <span className="font-semibold text-gray-700">{title}</span>
    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  </button>
);
