import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

describe('Register Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it('renders the Register form', () => {
    expect(screen.getByRole('heading', { name: /cadastro/i })).toBeInTheDocument();
  });

  it('renders the name input', () => {
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('renders the email input', () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the password input', () => {
    const passwordInput = screen.getByLabelText(/sua senha/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('shows error message when form is submitted without filling required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.click(submitButton);

    expect(await screen.findAllByText(/Campo Obrigatório/i)).toHaveLength(3); 
  });
});