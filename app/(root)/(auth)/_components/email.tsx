"use client";

import { useState } from 'react';
import universities from './universities.json';
import { FormWrapper } from '@/components/shared/form-wrapper';

export const EmailVerificationForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Assuming universities.json exports an array of domain strings like: ["university.edu", "college.edu"]
  const allowedDomains: string[] = Object.keys(universities);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setMessage('Please enter a valid email address.');
      return;
    }
    const domain = emailParts[1].toLowerCase();

    if (allowedDomains.some(allowedDomain => allowedDomain.toLowerCase() === domain)) {
      setMessage('Email verified!');
    } else {
      setMessage('Email domain is not recognized as a valid university domain.');
    }
  };

  return (
    <FormWrapper headerLabel="Email Verification" backButtonLabel="Back to login" backButtonHref="/signin">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ display: 'block', marginTop: '1rem' }}>
          Verify
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </FormWrapper>
  );
};

export default EmailVerificationForm;