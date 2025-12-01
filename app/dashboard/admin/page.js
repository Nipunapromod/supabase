"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminPage() {
  const [user,setUser] = useState(null);
  const [lessons,setLessons] = useState([]);
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [video,setVideo] = useState("");

  const router = useRouter();

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(!data.session) return router.push("/login");
      setUser(data.session.user);
    });
  },[]);

  useEffect(()=>{
    if(!user) return;
    supabase.from("lessons").select("*").order("created_at",{ascending:false}).then(({data,error})=>{if(!error)setLessons(data);});
    supabase.from("profiles").select("*").then(({data,error})=>{if(!error)setUsers(data); setLoading(false);});
  },[user]);

  if(!user || loading) return <p>Loading...</p>;
  if(user.role!=="admin") { router.push("/dashboard"); return null; }

  const handleAddLesson = async ()=>{
    const {error} = await supabase.from("lessons").insert([{title, description, video_url:video}]);
    if(!error){
      setTitle(""); setDescription(""); setVideo("");
      setLessons(await supabase.from("lessons").select("*").order("created_at",{ascending:false}).then(res=>res.data));
    } else alert(error.message);
  };

  const handleDeleteLesson = async (id)=>{
    await supabase.from("lessons").delete().eq("id",id);
    setLessons(lessons.filter(l=>l.id!==id));
  };

  const handleRoleChange = async (id,newRole)=>{
    await supabase.from("profiles").update({role:newRole}).eq("id",id);
    setUsers(users.map(u=>u.id===id?{...u,role:newRole}:u));
  };

  return (
    <div style={{padding:40}}>
      <h1>Admin Dashboard</h1>

      <h2>Add Lesson</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /><br/><br/>
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} /><br/><br/>
      <input placeholder="Video URL" value={video} onChange={e=>setVideo(e.target.value)} /><br/><br/>
      <button onClick={handleAddLesson}>Add Lesson</button>

      <h2 style={{marginTop:40}}>Existing Lessons</h2>
      {lessons.map(l=>(
        <div key={l.id} style={{border:"1px solid #ccc", padding:15, marginBottom:10, borderRadius:8}}>
          <h3>{l.title}</h3>
          <p>{l.description}</p>
          <a href={l.video_url} target="_blank" rel="noreferrer">Watch Video</a><br/>
          <button onClick={()=>handleDeleteLesson(l.id)} style={{marginTop:5}}>Delete</button>
        </div>
      ))}

      <h2 style={{marginTop:40}}>Users</h2>
      {users.map(u=>(
        <div key={u.id} style={{border:"1px solid #ccc", padding:10, marginBottom:5, borderRadius:8}}>
          <p>{u.email} - Role: {u.role}</p>
          <button onClick={()=>handleRoleChange(u.id,u.role==="admin"?"student":"admin")}>
            Make {u.role==="admin"?"Student":"Admin"}
          </button>
        </div>
      ))}
    </div>
  );
}
