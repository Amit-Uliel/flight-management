"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [militaryId, setMilitaryId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ militaryId, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/dashboard'); // Redirect to a protected page
    } else {
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={militaryId}
        onChange={(e) => setMilitaryId(e.target.value)}
        placeholder="Military ID"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}