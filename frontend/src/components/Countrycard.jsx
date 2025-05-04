import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="border rounded shadow hover:shadow-lg transition-transform hover:scale-105 bg-white">
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      </div>
    </Link>
  );
}