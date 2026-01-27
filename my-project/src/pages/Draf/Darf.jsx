import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Trash2, Pencil, Calendar } from "lucide-react";
import "./Draf.css";

function Darf() {
  const [posts, setPosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(data.filter(p => p.status === "draft")); // Faqat draftlarni olish
  };

  const deletePost = (id, e) => {
    e.stopPropagation();
    let all = JSON.parse(localStorage.getItem("posts")) || [];
    all = all.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(all));
    loadPosts();
    setOpenMenu(null);
  };

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📄</div>
        <h3>Manage your drafts</h3>
        <p>This is a place for all your unfinished posts. Save them as drafts.</p>
      </div>
    );
  }

  return (
    <div className="post-wrapper">
      {posts.map(post => (
        <div key={post.id} className="post-item" onClick={() => navigate(`/contact/${post.id}`)}>
          <div className="post-meta">
            <span className="post-date">
              <Calendar size={14} /> Last edited {new Date(post.lastEdited || post.createdAt).toLocaleString()}
            </span>
            <div className="menu-wrapper" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal
                className="menu-icon"
                onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
              />
              {openMenu === post.id && (
                <div className="dropdown">
                  <button className="drop-item edit" onClick={() => navigate(`/contact/${post.id}`)}>
                    <Pencil size={15} /> Edit Draft
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

export default Darf;