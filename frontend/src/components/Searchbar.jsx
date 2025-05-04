import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-900 p-4">
        <h1 className="text-white text-xl font-bold">Search</h1>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search countries by name..."
          value={value}
          onChange={onChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}