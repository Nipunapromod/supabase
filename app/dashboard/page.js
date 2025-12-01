"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    supabase
      .from("lessons")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setLessons(data);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <div style={{ marginTop: 20 }}>
        {lessons.map((l) => (
          <div key={l.id} style={{ marginBottom: 15, padding: 15, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>{l.title}</h2>
            <p>{l.description}</p>
            <a href={l.video_url} target="_blank" rel="noreferrer">Watch Video</a>
          </div>
        ))}
      </div>
    </div>
  );
}

