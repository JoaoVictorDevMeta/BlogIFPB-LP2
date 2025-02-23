import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it('renders the Login form', () => {
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders the email input', () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the password input', () => {
    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('shows error message when form is submitted without filling required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /logar/i });
    fireEvent.click(submitButton);

    expect(await screen.findAllByText(/Campo Obrigatório/i)).toHaveLength(2); // Adjust the length based on the number of required fields
  });

  it('submits the form when all fields are filled correctly', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /logar/i });

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitButton);
  });
});