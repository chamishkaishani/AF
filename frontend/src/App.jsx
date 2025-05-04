import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Hearder from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './components/User';
import Home from './pages/Home';
import Admindashboard from './components/Admindashboard';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Userdashboard from './components/Userdashboard';
import Membership from './pages/Chamishka/Membership';
import Addemoji from './pages/Lahiru/Addemoji';
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
        <Route path="/signin" element={<Signin/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admindashboard" element={<Admindashboard/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
        <Route path="/Membership" element={<Membership/>} />
        <Route path="/addemoji" element={<Addemoji/>} />
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
