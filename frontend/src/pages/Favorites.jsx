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
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-yellow-100 p-24 relative">
      <div className="max-w-md mx-auto bg-white rounded shadow p-12">
        <h2 className="text-2xl font-bold mb-4 text-orange-700">❤️ My Favorite Countries</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Country Name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addFavorite}
            disabled={loading}
            className={`w-full px-4 py-2 rounded ${
              loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
            } text-white`}
          >
            {loading ? 'Adding...' : '➕ Add Country'}
          </button>
        </div>

        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite countries added.</p>
        ) : (
          favorites.map((country) => (
            <div key={country.name} className="flex justify-between items-center border-b py-2">
              <div className="flex gap-2 items-center">
                <img src={country.flag} alt={country.name} className="w-6" />
                <span>{country.name}</span>
              </div>
              <button
                aria-label={`Remove ${country.name}`}
                onClick={() => removeFavorite(country.name)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-2 rounded shadow-lg text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
