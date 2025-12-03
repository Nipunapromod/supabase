"use client";
import { useState } from "react";
import Head from "next/head";             // TITLE SUPPORT
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
    <>

      <div
        className="card border"
        style={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1>Register</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%" }}
        />

        <button onClick={handleRegister} className="button-link" style={{ width: "100%" }}>
          Register
        </button>

        <p style={{ textAlign: "center" }}>{msg}</p>

        <p style={{ textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* LOGIN CSS APPLIED HERE */}
      <style jsx global>{`
        html {
          box-sizing: border-box;
          font-family: "Segoe UI", "Arial", sans-serif;
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
            radial-gradient(circle at 100% 100%, #ff000080 0%, transparent 18%),
            #000;
          color: #f5f5f5;
          line-height: 1.6;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        h1 {
          color: #00ff88;
          margin-bottom: 10px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .border {
          border: 2px solid #00ff88;
          padding: 50px;
          border-bottom-left-radius: 60px;
          border-top-right-radius: 60px;
        }

        .card {
          background: rgba(0, 0, 0, 0);
          border-radius: 16px;
          box-shadow: 0 8px 32px 0 rgba(0, 255, 13, 0);
          padding: 2em;
          margin: 1em 0;
          border: 1px solid rgba(0, 255, 64, 1);
          backdrop-filter: blur(4px);
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
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus {
          border-color: #fff;
          box-shadow: 0 0 8px #00ff88;
          outline: none;
        }

        .button-link {
          padding: 14px 36px;
          font-size: 1.15rem;
          background: #000;
          color: #fff;
          border-radius: 8px;
          border: 2px solid #00ff88;
          cursor: pointer;
          font-weight: bold;
          letter-spacing: 1px;
          box-shadow: 0 4px 16px #00ff8844;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }

        .button-link:hover {
          transform: scale(1.08);
          border-color: #fff;
          box-shadow: 0 6px 24px #00e1ffff;
        }

        a {
          color: #00ff88;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
          display: inline-block;
          padding: 2px 4px;
          border-radius: 4px;
        }

        a:hover {
          color: #fff;
          transform: scale(1.12);
          box-shadow: 0 2px 12px #00ff8855;
        }

        a::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background: #00ff88;
          transition: width 0.3s;
          margin-top: 2px;
        }

        a:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}


