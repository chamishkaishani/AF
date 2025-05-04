import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Favorites from '../pages/Favorites';

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Favorites Component', () => {
  test('renders the Favorites component with initial countries', () => {
    render(<Favorites />);
    expect(screen.getByText('❤️ My Favorite Countries')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
  });

  test('displays a message when no favorite countries are present', () => {
    render(<Favorites />);
    fireEvent.click(screen.getAllByText('✖', { selector: 'button' })[0]); // Remove Japan
    fireEvent.click(screen.getAllByText('✖', { selector: 'button' })[0]); // Remove Australia
    expect(screen.getByText('No favorite countries added.')).toBeInTheDocument();
  });

  test('adds a new favorite country', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          name: { common: 'Canada' },
          flags: { png: 'https://flagcdn.com/w40/ca.png' },
        },
      ],
    });

    render(<Favorites />);
    fireEvent.change(screen.getByPlaceholderText('Country Name'), {
      target: { value: 'Canada' },
    });
    fireEvent.click(screen.getByText('➕ Add Country'));

    await waitFor(() => {
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('✅ Added Canada to favorites!')).toBeInTheDocument();
    });
  });

  test('removes a favorite country', () => {
    render(<Favorites />);
    fireEvent.click(screen.getAllByText('✖', { selector: 'button' })[0]); // Remove Japan
    expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    expect(screen.getByText('❌ Removed Japan from favorites')).toBeInTheDocument();
  });
  

  test('shows an error when trying to add a duplicate country', () => {
    render(<Favorites />);
    fireEvent.change(screen.getByPlaceholderText('Country Name'), {
      target: { value: 'Japan' },
    });
    fireEvent.click(screen.getByText('➕ Add Country'));
    expect(window.alert).toHaveBeenCalledWith('Country already in favorites!');
  });

  test('shows an error when trying to add a non-existent country', async () => {
    axios.get.mockRejectedValueOnce(new Error('Country not found.'));

    render(<Favorites />);
    fireEvent.change(screen.getByPlaceholderText('Country Name'), {
      target: { value: 'InvalidCountry' },
    });
    fireEvent.click(screen.getByText('➕ Add Country'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Country not found.');
    });
  });
});
