import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CountryCard from '../components/Countrycard';
import SearchBar from '../components/Searchbar';
import FilterBar from '../components/Filterbar';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.email === 'admin@gmail.com';

  const handleMouseMove = (e) => {
    if (e.clientX < 50) {
      setIsSidebarVisible(true);
    } else if (e.clientX > 250) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const url = search
        ? `https://restcountries.com/v3.1/name/${search}`
        : region
        ? `https://restcountries.com/v3.1/region/${region}`
        : 'https://restcountries.com/v3.1/all';
      const res = await axios.get(url);
      setCountries(res.data);
    };
    fetchCountries();
  }, [search, region]);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="flex h-screen" onMouseMove={handleMouseMove}>
      

      <div className="flex-1 overflow-y-auto ml-auto p-4">
        <header className="flex items-center justify-between bg-white rounded shadow p-4 mb-4">
          <h1 className="text-xl font-bold text-slate-900">🌐 Country Explorer</h1>
          <button className="text-slate-700 text-2xl">☰</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <FilterBar regions={regions} selectedRegion={region} onRegionChange={(e) => setRegion(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}