"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function VerifyPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setMsg("Click the link in your email first.");
    });
  }, []);

  const setFinalPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message);
    else setMsg("Password set! You can now log in.");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Verify Email</h1>
      <p>Set your final password:</p>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, width: 250 }}
      />

      <br /><br />

      <button onClick={setFinalPassword} style={{ padding: 10 }}>
        Save Password
      </button>

      <p>{msg}</p>
    </div>
  );
}
