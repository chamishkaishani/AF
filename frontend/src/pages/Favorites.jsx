import React, { useState } from 'react';
import axios from 'axios';

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      name: 'Japan',
      flag: 'https://flagcdn.com/w40/jp.png',
    },
    {
      name: 'Australia',
      flag: 'https://flagcdn.com/w40/au.png',
    },
  ]);
  const [countryName, setCountryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const removeFavorite = (name) => {
    setFavorites(favorites.filter((country) => country.name !== name));
    showToast(`❌ Removed ${name} from favorites`, 'error');
  };

  const addFavorite = async () => {
    if (!countryName) return;
    const exists = favorites.some(
      (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
    if (exists) return alert('Country already in favorites!');
    try {
      setLoading(true);
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = res.data[0];
      const name = data.name.common;
      const flag = data.flags.png;

      setFavorites([...favorites, { name, flag }]);
      setCountryName('');
      showToast(`✅ Added ${name} to favorites!`);
    } catch (error) {
      alert('Country not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-yellow-100 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl font-extrabold mb-6 text-orange-700 text-center tracking-tight">❤️ My Favorite Countries</h2>

        <div className="mb-8 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Country Name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <button
            onClick={addFavorite}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white`}
          >
            {loading ? 'Adding...' : '➕ Add Country'}
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No favorite countries added.</p>
          ) : (
            favorites.map((country) => (
              <div
                key={country.name}
                className="flex justify-between items-center py-4 transition hover:bg-orange-50 rounded-lg px-2"
              >
                <div className="flex gap-3 items-center">
                  <img src={country.flag} alt={country.name} className="w-8 h-8 rounded shadow" />
                  <span className="font-medium text-gray-800">{country.name}</span>
                </div>
                <button
                  aria-label={`Remove ${country.name}`}
                  onClick={() => removeFavorite(country.name)}
                  className="text-red-500 hover:text-red-700 text-xl transition"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl text-white text-base font-semibold z-50 ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
