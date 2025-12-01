"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [user,setUser] = useState(null);
  const [lessons,setLessons] = useState([]);
  const [loading,setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(!data.session) return router.push("/login");
      setUser(data.session.user);
    });
  },[]);

  useEffect(()=>{
    if(user){
      supabase.from("lessons").select("*").order("created_at",{ascending:false})
        .then(({data,error})=>{
          if(!error)setLessons(data);
          setLoading(false);
        });
    }
  },[user]);

  if(!user || loading) return <p>Loading...</p>;

  return (
    <div style={{padding:40}}>
      <h1>Welcome, {user.email}</h1>
      {user.role==="admin" && <a href="/dashboard/add-lesson">Add Lesson</a>}
      <div style={{marginTop:20}}>
        {lessons.map(l=>(
          <div key={l.id} style={{border:"1px solid #ccc", padding:15, marginBottom:10, borderRadius:8}}>
            <h2>{l.title}</h2>
            <p>{l.description}</p>
            <a href={l.video_url} target="_blank" rel="noreferrer">Watch Video</a>
          </div>
        ))}
      </div>
    </div>
  );
}
