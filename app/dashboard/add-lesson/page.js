"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddLesson() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session || data.session.user.role !== "admin") return router.push("/dashboard");
      setUser(data.session.user);
    });
  }, []);

  const handleAdd = async () => {
    const { error } = await supabase.from("lessons").insert([{ title, description, video_url: video }]);
    if (!error) router.push("/dashboard");
    else alert(error.message);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Add New Lesson</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <br /><br />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <br /><br />
      <input placeholder="Video URL" value={video} onChange={e => setVideo(e.target.value)} />
      <br /><br />
      <button onClick={handleAdd}>Add Lesson</button>
    </div>
  );
}
