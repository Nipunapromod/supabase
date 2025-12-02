"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    setMsg("Sending verification email...");

    const { error } = await supabase.auth.signUp({
      email,
      password: "temp12345",
      options: {
        emailRedirectTo: `${location.origin}/verify`,
      },
    });

    if (error) setMsg(error.message);
    else setMsg("Check your email for the verification link.");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Account</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: 250 }}
      />

      <br />
      <br />

      <button onClick={handleRegister} style={{ padding: 10 }}>
        Register
      </button>

      <p>{msg}</p>

      {/* Combined link here */}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>

      <style jsx global>{`
        html {
          box-sizing: border-box;
          font-family: 'Segoe UI', 'Arial', sans-serif;
          scroll-behavior: smooth;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
          margin: 0;
          padding: 0;
        }

        body {
          min-height: 100vh;
          background: radial-gradient(circle at 0% 0%, #ff0000 0%, transparent 18%),
            radial-gradient(circle at 100% 0%, #00ff6a 0%, transparent 18%),
            radial-gradient(circle at 0% 100%, #00ff6a 0%, transparent 18%),
            radial-gradient(circle at 100% 100%, #ff000080 0%, transparent 18%), #000;
          color: #f5f5f5;
          line-height: 1.6;
          font-size: 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          color: #00ff88;
          letter-spacing: 1px;
          margin-bottom: 0.5em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        a {
          color: #00ff88;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
          display: inline-block;
          position: relative;
          padding: 2px 4px;
          border-radius: 4px;
        }

        a:hover {
          color: #fff;
          transform: scale(1.12);
          box-shadow: 0 2px 12px #00ff8855;
        }

        a::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #00ff88;
          transition: width 0.3s;
        }

        a:hover::after {
          width: 100%;
        }

        input,
        button {
          font-family: inherit;
          font-size: 1em;
          border-radius: 4px;
          border: 1px solid #00ff88;
          padding: 0.5em 1em;
          margin: 0.5em 0;
          background: #000;
          color: #fff;
        }

        input:focus,
        button:focus {
          border-color: #fff;
          box-shadow: 0 0 8px #00ff88;
          outline: none;
        }
      `}</style>
    </div>
  );
}
