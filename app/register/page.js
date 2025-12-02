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
    <>
      {/* add clear, specific classes so original css still exists untouched */}
      <div className="np-register-wrapper">
        <div className="np-card np-border">
          <h1 className="np-title">Create Account</h1>

          <input
            className="np-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
          />

          <button onClick={handleRegister} className="np-btn-main" type="button">
            Register
          </button>

          <p className="np-msg">{msg}</p>

          <p className="np-foot">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      {/* Minimal scoped fixes only — does NOT change your original global css */}
      <style jsx>{`
        /* center the wrapper without touching global body */
        .np-register-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        /* ensure your border is visible — higher specificity */
        .np-border {
          border: 2px solid #00ff88 !important;
          padding: 32px !important;
          border-top-right-radius: 40px !important;
          border-bottom-left-radius: 40px !important;
          background: rgba(0, 0, 0, 0.45); /* subtle glass so border pops */
        }

        /* card shadow + layout */
        .np-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          min-width: 320px;
          max-width: 420px;
        }

        .np-title {
          margin: 0;
          color: #00ff88;
          letter-spacing: 1px;
        }

        /* make input match and ensure border visible */
        .np-input {
          width: 100%;
          max-width: 320px;
          padding: 10px;
          background: transparent;
          color: #fff;
          border: 1px solid #00ff88;
          border-radius: 6px;
          outline: none;
        }

        .np-input:focus {
          border-color: #ffffff;
          box-shadow: 0 0 10px #00ff88aa;
        }

        /* button styling + hover animation (higher specificity than global) */
        .np-btn-main {
          width: 100%;
          max-width: 320px;
          padding: 12px 18px;
          background: linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6));
          color: #fff;
          border: 2px solid #00ff88;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        /* hover must be visible — add transform and glow */
        .np-btn-main:hover,
        .np-btn-main:focus {
          transform: translateY(-3px) scale(1.03);
          border-color: #ffffff;
          box-shadow: 0 8px 30px rgba(0, 255, 136, 0.18);
        }

        .np-msg {
          min-height: 1.2em;
          font-size: 0.95rem;
          text-align: center;
        }

        .np-foot {
          margin-top: 6px;
          font-size: 0.95rem;
        }

        /* make link underline animation respect your original link styles */
        .np-foot a {
          position: relative;
          color: inherit;
        }
        .np-foot a::after {
          content: "";
          display: block;
          height: 2px;
          width: 0;
          background: #00ff88;
          transition: width 0.28s ease;
        }
        .np-foot a:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
