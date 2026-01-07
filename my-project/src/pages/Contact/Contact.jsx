import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import CodeTool from "@editorjs/code";
import ImageTool from "@editorjs/image";

import {
  Bold,
  Italic,
  Underline,
  Code,
  Image,
  Plus,
} from "lucide-react";

import "./Contact.css";

function Contact() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const isMounted = useRef(false);

  /* ================= INIT EDITOR ================= */
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const editor = new EditorJS({
      holder: "editorjs",
      inlineToolbar: true,

      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
        },
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                return Promise.resolve({
                  success: 1,
                  file: {
                    url: URL.createObjectURL(file),
                  },
                });
              },
            },
          },
        },
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  /* ================= INLINE FORMAT (FIXED) ================= */
  const format = async (command) => {
    const editor = editorRef.current;
    if (!editor) return;

    const index = editor.blocks.getCurrentBlockIndex();

    if (index === -1) {
      await editor.blocks.insert("paragraph");
    }

    editor.focus();

    setTimeout(() => {
      document.execCommand(command);
    }, 0);
  };

  /* ================= SAVE ================= */
  const publish = async () => {
    if (!editorRef.current) return;
    const data = await editorRef.current.save();
    console.log("EDITOR DATA:", data);
  };

  return (
    <div className="post-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/about")}>
          ← Dashboard
        </button>
        <button className="publish-btn" onClick={publish}>
          Publish
        </button>
      </div>

      {/* TITLE */}
      <input className="title-input" placeholder="Title" />

      {/* TOOLBAR */}
      <div className="toolbar">
        <button onClick={() => format("bold")}>
          <Bold />
        </button>

        <button onClick={() => format("italic")}>
          <Italic />
        </button>

        <button onClick={() => format("underline")}>
          <Underline />
        </button>

        <button onClick={() => editorRef.current?.blocks.insert("code")}>
          <Code />
        </button>

        <button onClick={() => editorRef.current?.blocks.insert("image")}>
          <Image />
        </button>

        <button
          className="add-btn"
          onClick={() => editorRef.current?.focus()}
        >
          <Plus /> Add
        </button>
      </div>

      {/* EDITOR */}
      <div id="editorjs" className="content-input"></div>
    </div>
  );
}

export default Contact;
