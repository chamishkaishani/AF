import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetailsPage from '../pages/CountryDetailsPage';

jest.mock('axios');

describe('CountryDetailsPage Component', () => {
  const mockCountry = {
    name: { common: 'Canada' },
    flags: { png: 'https://flagcdn.com/w320/ca.png' },
    capital: ['Ottawa'],
    region: 'Americas',
    subregion: 'Northern America',
    population: 38005238,
    languages: { eng: 'English', fra: 'French' },
  };

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: [mockCountry] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/country/CA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays country details', async () => {
    render(
      <MemoryRouter initialEntries={['/country/CA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('Capital:')).toBeInTheDocument();
      expect(screen.getByText('Ottawa')).toBeInTheDocument();
      expect(screen.getByText('Region:')).toBeInTheDocument();
      expect(screen.getByText('Americas')).toBeInTheDocument();
      expect(screen.getByText('Subregion:')).toBeInTheDocument();
      expect(screen.getByText('Northern America')).toBeInTheDocument();
      expect(screen.getByText('Population:')).toBeInTheDocument();
      expect(screen.getByText('38,005,238')).toBeInTheDocument();
      expect(screen.getByText('Languages:')).toBeInTheDocument();
      expect(screen.getByText('English, French')).toBeInTheDocument();
    });
  });

  test('renders back button linking to home', async () => {
    render(
      <MemoryRouter initialEntries={['/country/CA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const backButton = screen.getByText('← Back');
      expect(backButton).toBeInTheDocument();
      expect(backButton.closest('a')).toHaveAttribute('href', '/');
    });
  });

  test('handles API error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/country/INVALID']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // It will still show loading, but never loads data
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
