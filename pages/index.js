// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [pwd, setPwd] = useState('');
  const [coords, setCoords] = useState('');
  const [instr, setInstr] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('…deciphering…');
    setCoords('');
    setInstr('');
    const res = await fetch('/api/coords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd.trim() })
    });
    const data = await res.json();
    if (res.ok) {
      setCoords(data.coordinates);
      setInstr(data.instructions);
      setError('');
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <Head>
        <title>forest rave</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="enter passkey…"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>

        {error && <p className="error">{error}</p>}
        {coords && <p className="coordinates">{coords}</p>}
        {instr && (
          <>
            <p className="message">{instr}</p>
            <a
              href="https://partiful.com/e/AMXAh9XnIczB8Bm8bCxI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rsvpbtn">rsvp</button>
            </a>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0a0f06, #000000);
          font-family: 'Cinzel Decorative', serif;
          color: #a2fca3;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 280px;
          padding: 0 1.5rem;
        }
        input,
        button {
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 4px;
          outline: none;
          text-shadow: 0 0 4px #3aff7f;
        }
        input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #3aff7f;
          color: #a2fca3;
        }
        input::placeholder {
          color: #6bbf6b;
        }
        button {
          background: transparent;
          border: 1px solid #a2fca3;
          color: #a2fca3;
          cursor: pointer;
          transition: transform 0.1s ease-in-out, box-shadow 0.2s;
        }
        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 8px #a2fca3;
        }

        .coordinates {
          margin-top: 1rem;
          font-size: 1.125rem;
          text-shadow: 0 0 4px #3aff7f;
          font-family: Arial, sans-serif;
        }

        .message {
          max-width: 280px;
          padding: 0 1.5rem;
          margin-top: 0.5rem;
          opacity: 0;
          animation: fadeIn 0.8s ease-in forwards;
          animation-delay: 1s;
          font-family: Arial, sans-serif;
          font-size: 1rem;
        }

        .rsvpbtn {
          width: 100%;
          margin: 1.25rem 0;
          padding: 0.25rem 4.0rem;
          font-size: 1rem;
          border-radius: 4px;
          outline: none;
          text-shadow: 0 0 4px #3aff7f;
          background: transparent;
          border: 1px solid #a2fca3;
          color: #a2fca3;
          cursor: pointer;
          opacity: 0;
          animation: fadeIn 0.8s ease-in forwards;
          animation-delay: 1s;
        }
        .rsvpbtn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 8px #a2fca3;
        }

        .error {
          margin-top: 1rem;
          color: #ff6b6b;
          font-family: Arial, sans-serif;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html,
        body {
          width: 100%;
          height: 100%;
          background: #000;
        }
      `}</style>
    </>
  );
}
