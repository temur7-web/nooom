import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Trash2, Pencil, Calendar } from "lucide-react";
import "./Pub.css";

function Pub() {
  const [posts, setPosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    // Darf.js da "draft", Schet.js da "scheduled" qilib o'zgartir
    setPosts(data.filter(p => p.status === "published")); 
  }, []);

  const deletePost = (id, e) => {
    e.stopPropagation();
    let all = JSON.parse(localStorage.getItem("posts")) || [];
    all = all.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(all));
    window.location.reload(); // Ro'yxatni yangilash
  };

  return (
    <div className="post-wrapper">
      {posts.map(post => (
        <div key={post.id} className="post-item" onClick={() => navigate(`/contact/${post.id}`)}>
          <div className="post-meta">
            <span className="post-date"><Calendar size={14} /> {new Date(post.createdAt).toLocaleString()}</span>
            <div className="menu-wrapper" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="menu-icon" onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)} />
              {openMenu === post.id && (
                <div className="dropdown">
                  <button className="drop-item edit" onClick={() => navigate(`/contact/${post.id}`)}>
                    <Pencil size={15} /> Edit
                  </button>
                  <button className="drop-item delete" onClick={(e) => deletePost(post.id, e)}>
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <h3 className="post-title">{post.title}</h3>
        </div>
      ))}
    </div>
  );
}
export default Pub;