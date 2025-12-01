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
        emailRedirectTo: `${location.origin}/verify`
      }
    });

    if (error) setMsg(error.message);
    else setMsg("Check your email for the verification link.");
  };

  return (
    <div style={{ padding:40 }}>
      <h1>Create Account</h1>
      <input placeholder="Email"
             value={email}
             onChange={e=>setEmail(e.target.value)}
             style={{ padding:10, width:250 }} />
      <br/><br/>
      <button onClick={handleRegister} style={{ padding:10 }}>
        Register
      </button>
      <p>{msg}</p>
    </div>
  );
}
