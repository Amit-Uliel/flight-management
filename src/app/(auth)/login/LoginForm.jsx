"use client";

import { useState } from 'react';
import { login } from './actions';

export default function LoginForm() {
  const [militaryId, setMilitaryId] = useState('');
  const [password, setPassword] = useState('');

  return ( 
    <form action={login}>
      <input
        type="text"
        value={militaryId}
        onChange={(e) => setMilitaryId(e.target.value)}
        placeholder="Military ID"
        name="militaryId"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        name="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}