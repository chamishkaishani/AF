import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Image/logo.png';
import { GrHomeRounded } from "react-icons/gr";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.email === 'admin@gmail.com'; // Check if the user is admin

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
              <span className='text-red-500'>Country</span>
              <span className='text-white'>Explorer</span>
            </h1>
          </div>
        </Link>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:text-red-500 font-semibold'>
              <div className='flex justify-between'>
                <GrHomeRounded className='me-2 my-1' />Home
              </div>
            </li>
          </Link>

          {currentUser ? (
            <Link to={isAdmin ? '/admin' : '/profile'}> {/* Conditional navigation */}
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                title={currentUser.name} 
                className='rounded-full w-7 h-7 object-cover' 
              />
            </Link>
          ) : (
            <Link to='/login'>
              <li className='text-white hover:text-red-500 font-semibold'>Log In</li>
            </Link>
          )}
        </ul>

        
      </div>
    </header>
  );
}
