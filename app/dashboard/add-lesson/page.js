"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddLesson() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [video,setVideo]=useState("");
  const [user,setUser]=useState(null);
  const router = useRouter();

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(!data.session || data.session.user.role!=="admin") return router.push("/dashboard");
      setUser(data.session.user);
    });
  },[]);

  const handleAdd = async ()=>{
    const {error} = await supabase.from("lessons").insert([{title, description:desc, video_url:video}]);
    if(!error){
      setTitle(""); setDesc(""); setVideo("");
      router.push("/dashboard"); // redirect after add
    } else alert(error.message);
  };

  if(!user) return <p>Loading...</p>;

  return (
    <div style={{padding:40}}>
      <h1>Add New Lesson</h1>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /><br/><br/>
      <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} /><br/><br/>
      <input placeholder="Video URL" value={video} onChange={e=>setVideo(e.target.value)} /><br/><br/>
  <h1>
      <button onClick={handleAdd}>Add Lesson</button>
  </h1>
    </div>
  );
}
