import { useState } from 'react';

export default function Home() {
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('…checking…');
    const res = await fetch('/api/coords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd })
    });
    const data = await res.json();
    setMessage(res.ok ? data.coordinates : data.error);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      height: '100vh', fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter passkey"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{ marginLeft: '8px', padding: '8px 12px', fontSize: '16px' }}
        >
          Get Coordinates
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>{message}</p>
      )}
    </div>
  );
}
