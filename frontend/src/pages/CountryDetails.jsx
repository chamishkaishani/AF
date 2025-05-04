import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CountryDetailsPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => setCountry(res.data[0]));
  }, [code]);

  if (!country) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-100 p-20">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        
        {/* Back Button */}
        <Link
          to="/"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          ← Back
        </Link>

        <h2 className="text-2xl font-bold mb-4 text-center">{country.name.common}</h2>

        {/* Centered Flag */}
        <div className="flex justify-center mb-6">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-64 h-40 object-contain rounded border"
          />
        </div>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
