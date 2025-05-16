import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : 'Invalid email format');
  };

  const validatePassword = (value) => {
    setPasswordError(value.length >= 6 ? '' : 'Password must be at least 6 characters');
  };

  const handleLogin = () => {
    if (emailError || passwordError || !email || !password) return;

    localStorage.setItem('user', JSON.stringify({ email }));
    // Dispatch to Redux
    dispatch(signInSuccess({ email }));
    alert('Logged in successfully!');
    navigate('/favourites');
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">🔐 Welcome Back</h2>
          <p className="text-gray-600">Login to continue exploring countries</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1" role="alert">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(password)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1" role="alert">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full text-white font-semibold py-2 rounded transition duration-200 ${
              isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
        </div>
      </div>
    </div>
  );
}
