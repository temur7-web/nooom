import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";
import { 
  Bold, Italic, Underline, Code, 
  Image as ImageIcon, Save, LogOut, 
  Globe, Lock, Plus, Calendar, Clock 
} from "lucide-react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const titleRef = useRef(null);

  // States
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("published"); 
  const [isDirty, setIsDirty] = useState(false); 
  const [showExitModal, setShowExitModal] = useState(false);
  const [visibility, setVisibility] = useState("Public");

  // Schedule vaqtlari
  const [scheduleDate, setScheduleDate] = useState("2026-01-28");
  const [scheduleTime, setScheduleTime] = useState("12:30");
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // EditorJS sozlamalari
  useEffect(() => {
    if (!holderRef.current || editorRef.current) return;
    
    const editor = new EditorJS({
      holder: holderRef.current,
      inlineToolbar: true,
      placeholder: 'Yozishni boshlang...',
      tools: {
        header: { class: Header, inlineToolbar: true },
        list: { class: List, inlineToolbar: true },
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                return Promise.resolve({
                  success: 1,
                  file: { url: URL.createObjectURL(file) },
                });
              },
            },
          },
        },
      },
      onChange: () => setIsDirty(true),
      onReady: () => { editorRef.current = editor; },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.isReady.then(() => editorRef.current.destroy()).catch(() => {});
        editorRef.current = null;
      }
    };
  }, []);

  // Postni saqlash mantiqi
  const savePost = async (exitAfterSave = false) => {
    if (!editorRef.current || !titleRef.current) return;
    
    const content = await editorRef.current.save();
    const title = titleRef.current.value.trim();

    if (!title) {
      alert("Iltimos, sarlavha kiriting!");
      return;
    }

    // Yangi post ob'ekti
    const post = {
      id: Date.now(),
      title,
      content,
      status, // "published", "draft", "scheduled"
      visibility,
      schedule: status === "scheduled" ? { date: scheduleDate, time: scheduleTime } : null,
      createdAt: new Date().toISOString(),
    };

    // LocalStorage-ga saqlash
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    
    setIsDirty(false);
    setToastMessage(`Muvaffaqiyatli saqlandi! ✨`);
    setShowToast(true);

    // To'g'ri tabga yo'naltirish
    setTimeout(() => {
      setShowToast(false);
      if (exitAfterSave) {
        navigate("/about");
      } else {
        if (status === "published") navigate("/about");
        else if (status === "draft") navigate("/about/draf");
        else if (status === "scheduled") navigate("/about/schet");
      }
    }, 500);
  };

  return (
    <div className="post-layout">
      {/* CHAP TOMON: EDITOR MAYDONI */}
      <div className="post-page">
        <button 
          className="back-btn" 
          onClick={() => (isDirty ? setShowExitModal(true) : navigate("/about"))}
        >
          ← Dashboard
        </button>
        
        <input 
          ref={titleRef} 
          className="title-input" 
          placeholder="Title" 
          onChange={() => setIsDirty(true)}
        />
        
        <div className="toolbar">
          <button title="Bold"><Bold size={18} /></button>
          <button title="Italic"><Italic size={18} /></button>
          <button title="Underline"><Underline size={18} /></button>
          <button onClick={() => editorRef.current?.blocks.insert("code")}><Code size={18} /></button>
          <button onClick={() => editorRef.current?.blocks.insert("image")}><ImageIcon size={18} /></button>
        </div>
        
        <div className="editor-container">
          <div ref={holderRef} className="editorjs-holder" />
        </div>
      </div>

      {/* O'NG TOMON: SIDEBAR (SAQLASH VA SOZLAMALAR) */}
      <div className="editor-sidebar">
        <div className="publish-group">
          <div className="publish-wrapper">
            <button className="publish-main-btn" onClick={() => savePost(false)}>
              {status === "published" ? "Publish now" : status === "draft" ? "Save as draft" : "Schedule"}
            </button>
            <button className="publish-dropdown-toggle" onClick={() => setOpen(!open)}>
              <RiArrowDownSLine className={`arrow ${open ? "rotate" : ""}`} />
            </button>
            
            {open && (
              <div className="publish-menu">
                <div onClick={() => { setStatus("published"); setOpen(false); }}>Publish now</div>
                <div onClick={() => { setStatus("draft"); setOpen(false); }}>Save as draft</div>
                <div onClick={() => { setStatus("scheduled"); setOpen(false); }}>Schedule</div>
              </div>
            )}
          </div>
          <p className="rules">This post must follow the <span>Content Guidelines.</span></p>
        </div>

        {/* SCHEDULE TANLANGANDA CHIQADIGAN OYNA */}
        {status === "scheduled" && (
          <div className="schedule-box animate-slide-down">
            <div className="schedule-input-wrapper">
              <Calendar size={18} className="sched-icon" />
              <input 
                type="date" 
                value={scheduleDate} 
                onChange={(e) => setScheduleDate(e.target.value)} 
              />
            </div>
            <div className="schedule-input-wrapper">
              <Clock size={18} className="sched-icon" />
              <input 
                type="time" 
                value={scheduleTime} 
                onChange={(e) => setScheduleTime(e.target.value)} 
              />
              <span className="timezone-tag">UTC</span>
            </div>
          </div>
        )}

        {/* VISIBILITY CARD */}
        <div className="sidebar-card">
          <h4>Who can see this post?</h4>
          <div className="visibility-box">
            <div className="select-icon">
              {visibility === "Public" ? <Globe size={18} /> : <Lock size={18} />}
            </div>
            <select 
              className="visibility-select" 
              value={visibility} 
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Members">Members only</option>
            </select>
          </div>
        </div>

        {/* CATEGORY CARD */}
        <div className="sidebar-card">
          <h4>Categories</h4>
          <div className="category-empty-state">
             <div className="category-icon-bg">
                <Plus size={20} color="#9ca3af" />
             </div>
             <p className="muted">Categories makes it easy to browse your posts.</p>
          </div>
          <button className="new-category-btn">+ New category</button>
        </div>
      </div>

      {/* CHIKISHNI TASDIQLASH MODAL OYNASI */}
      {showExitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="warning-icon">!</div>
            <h3>Saqlanmagan o'zgarishlar</h3>
            <p>Ma'lumotlarni saqlashni xohlaysizmi yoki shunchaki chiqib ketasizmi?</p>
            <div className="modal-actions">
              <button className="btn-save-exit" onClick={() => savePost(true)}>
                <Save size={18} /> Saqlash va chiqish
              </button>
              <button className="btn-exit-only" onClick={() => navigate("/about")}>
                <LogOut size={18} /> Saqlamasdan chiqish
              </button>
              <button className="btn-cancel" onClick={() => setShowExitModal(false)}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST XABARNOMASI */}
      {showToast && <div className="toast-notification">{toastMessage}</div>}
    </div>
  );
}

export default Contact;