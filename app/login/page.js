"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMsg(error.message);
    else router.push("/dashboard");
  };

  return (
    <>
      <div className="card border" style={{ width: 350 }}>
        <h1 className="text-center">Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="button-link">
          Login
        </button>

        <p style={{ color: "red" }}>{msg}</p>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>

      {/* FULL CSS HERE */}
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

/* Responsive body with gradient background */
body {
  min-height: 100vh;
  background: radial-gradient(circle at 0% 0%, #ff0000 0%, transparent 18%), radial-gradient(circle at 100% 0%, #00ff6a 0%, transparent 18%), radial-gradient(circle at 0% 100%, #00ff6a 0%, transparent 18%), radial-gradient(circle at 100% 100%, #ff000080 0%, transparent 18%), #000;
  color: #f5f5f5;
  line-height: 1.6;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Stylish headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #00ff88;
  letter-spacing: 1px;
  margin-bottom: 0.5em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.border {
  border: 2px solid #00ff88;
  padding: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
}

/* Card effect for sections/divs */
.card {
  background: rgba(0, 0, 0, 0);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 255, 13, 0);
  padding: 2em;
  margin: 1em 0;
  border: 1px solid rgba(0, 255, 64, 1);
  backdrop-filter: blur(4px);
}

/* Advanced link styles */
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

/* Button-style links */
.button-link {
  padding: 14px 36px;
  font-size: 1.15rem;
  background: linear-gradient(90deg, #000000ff 0%, #000000ff 100%);
  color: #fff;
  border-radius: 8px;
  border: 2px solid #00ff88;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 4px 16px #00ff8844;
  transition: background 0.4s, transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.button-link:hover {
  background: linear-gradient(90deg, #000000ff 0%, #000000ff 100%);
  transform: scale(1.08);
  border-color: #fff;
  box-shadow: 0 6px 24px #00e1ffff;
  outline: none;
}

/* Animated underline for all links */
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

/* Responsive images */
img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #00ff88;
  border-radius: 8px;
}

/* Inputs and forms */
input,
select,
textarea,
button {
  font-family: inherit;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #00ff88;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  background: #000000;
  color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  border-color: #fff;
  box-shadow: 0 0 8px #00ff88;
  outline: none;
}

/* Utility classes */
.mt-2 {
  margin-top: 2em;
}

.mb-2 {
  margin-bottom: 2em;
}

.p-2 {
  padding: 2em;
}

.text-center {
  text-align: center;
}

.rounded {
  border-radius: 12px;
}

.shadow {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}

