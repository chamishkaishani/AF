import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../Image/logo.jpg';
import { GrHomeRounded } from "react-icons/gr";
import React, { useRef, useState, useEffect } from 'react';
import { signOutUserSuccess } from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.email === 'admin@gmail.com';
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleLogout = () => {
    dispatch(signOutUserSuccess());
    localStorage.clear();
    setShowMenu(false);
    navigate('/login');
  };

  return (
    <header className='bg-black shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>  
        <Link to='/'>
          <div className='flex justify-between'>
            <img 
              src={logo}
              className='rounded-full w-7 h-7 me-2' 
              alt="Logo"
            />
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-blue-500'>Country</span>
              <span className='text-white'>Explorer</span>
            </h1>
          </div>
        </Link>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:text-blue-500 font-semibold'>
              <div className='flex justify-between'>
                <GrHomeRounded className='me-2 my-1' />Home
              </div>
            </li>
          </Link>

          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <img
                src="https://media.istockphoto.com/id/1201057384/vector/network-concept-orange.jpg?s=612x612&w=0&k=20&c=pGrIzZE2xMiLui2vN5oJOimxidok50WlvHA9T3BiJxY="
                alt={currentUser.name}
                title={currentUser.name}
                className='rounded-full w-7 h-7 object-cover cursor-pointer'
                onClick={() => setShowMenu((v) => !v)}
              />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login'>
              <li className='text-white hover:text-blue-500 font-semibold'>Log In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
