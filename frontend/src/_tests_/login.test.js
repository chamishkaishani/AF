// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Login Component', () => {
    test('renders login form inputs', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/you@example\.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/•+/)).toBeInTheDocument(); // Matches '••••••••'
    });

    test('shows alert on login', () => {
        window.alert = jest.fn(); // Mock alert
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/you@example\.com/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/•+/), {
            target: { value: '123456' }
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(window.alert).toHaveBeenCalledWith('Logged in successfully!');
    });

    test('disables login button when inputs are empty', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeDisabled();
    });

    test('enables login button when inputs are filled', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/you@example\.com/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/•+/), {
            target: { value: '123456' }
        });

        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).not.toBeDisabled();
    });

    test('shows error message for invalid email format', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/you@example\.com/i);
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.blur(emailInput);

        expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });

    test('shows error message for short password', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const passwordInput = screen.getByPlaceholderText(/•+/);
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.blur(passwordInput);

        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
});
