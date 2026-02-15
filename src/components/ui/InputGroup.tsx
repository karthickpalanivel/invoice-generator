import React from "react";

export const InputGroup = ({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) => (
  <div className={`mb-3 ${className}`}>
    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all"
    />
  </div>
);
