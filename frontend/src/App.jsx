import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Hearder from './components/Header';


import Home from './pages/Home';

import Profile from './pages/Profile';


import Searchbar from './components/Searchbar';
import Filterbar from './components/Filterbar';
import Countrycard from './components/Countrycard';
import Login from './components/Login.jsx';
import CountryDetails from './pages/CountryDetails';
import Favourites from './pages/Favorites';

export default function App() {
  return (
    <BrowserRouter>

    <Hearder/>
     <Routes>

        <Route path="/" element={<Home />} />
 
        <Route path="/profile" element={<Profile/>} />
       
        <Route path="/searchbar" element={<Searchbar/>} />
        <Route path="/filterbar" element={<Filterbar/>} />
        <Route path="/countrycard" element={<Countrycard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/favourites" element={<Favourites />} />

     </Routes>
     </BrowserRouter>
    
  )
}
