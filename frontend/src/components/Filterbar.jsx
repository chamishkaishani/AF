import React from 'react';

export default function FilterBar({ regions, selectedRegion, onRegionChange }) {
  return (
    <div className="p-4 bg-slate-100 rounded">
      <label className="block mb-2 font-semibold">Filter by Region:</label>
      <select
        value={selectedRegion}
        onChange={onRegionChange}
        className="border p-2 rounded w-full"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    </div>
  );
}