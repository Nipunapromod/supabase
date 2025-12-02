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
      <div className="card border">
        <h1>Register</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> {/* fixed break line */}

        <button onClick={handleRegister} className="btn-main">
          Register
        </button>

        <p>{msg}</p>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* GLOBAL CSS FIXED */}
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        /* Border + Card Effect */
        .border {
          border: 2px solid #00ff88;
          padding: 40px;
          border-top-right-radius: 40px;
          border-bottom-left-radius: 40px;
        }

        .card {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 16px;
          backdrop-filter: blur(4px);
          box-shadow: 0 8px 32px rgba(0, 255, 64, 0.2);
        }

        h1 {
          color: #00ff88;
          margin-bottom: 20px;
        }

        /* ⭐ Inputs */
        input {
          width: 250px;
          padding: 10px;
          background: #000;
          color: #fff;
          border: 1px solid #00ff88;
          border-radius: 6px;
          margin-bottom: 15px;
        }

        input:focus {
          border-color: #fff;
          box-shadow: 0 0 8px #00ff88;
          outline: none;
        }

        /* ⭐ Button */
        .btn-main {
          padding: 12px 20px;
          width: 250px;
          background: #000;
          color: white;
          border: 2px solid #00ff88;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        /* Button Hover Animation */
        .btn-main:hover {
          transform: scale(1.08);
          border-color: #fff;
          box-shadow: 0 6px 20px #00ff8844;
        }

        /* Link Animation */
        a {
          color: #00ff88;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
          display: inline-block;
          position: relative;
          padding: 2px 4px;
          border-radius: 4px;
        }

        a:hover,
        a:focus {
          color: #fff;
          transform: scale(1.12);
          box-shadow: 0 2px 12px #00ff8855;
          outline: none;
        }

        /* Extra underline effect */
        a::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #00ff88;
          transition: width 0.3s;
          border-radius: 2px;
          margin-top: 2px;
        }

        a:hover::after,
        a:focus::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}

