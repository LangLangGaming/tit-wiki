import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./Editor.css";
import { useWikiEditor } from "../admin/editorLogic.mjs";
import { db } from "../src/firebase.config.js";
import { doc, deleteDoc } from "firebase/firestore";

const WikiEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Europe");
  const [customCategory, setCustomCategory] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const { onSave, fetchAllPages, loadContent } = useWikiEditor();

  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");

  const categories = ["Organizations", "Europe", "Asia", "Americas", "Africa", "Oceania", "Other"];

  useEffect(() => {
    const getExistingPages = async () => {
      try {
        const data = await fetchAllPages();
        setPages(data);
      } catch (err) {
        console.error("Failed to fetch pages:", err);
      }
    };
    getExistingPages();
  }, [fetchAllPages]);

  const handleSelectPage = (pageId) => {
    setSelectedPageId(pageId);
    if (pageId === "") {
      setTitle("");
      const defaultData = {
      blocks: [
        {
          type: "paragraph",
          data: { text: "" }
        }
      ]
    };
      loadContent(JSON.stringify(defaultData));
      return;
    }
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      setTitle(page.title);
      setCategory(page.category.charAt(0).toUpperCase() + page.category.slice(1));
      loadContent(page.content);
    }
  };

  const finalCategory = isCreatingNew ? customCategory : category;

  return (
    <div className="wiki-container-layout">
      {/* SIDEBAR */}
      <aside className="editor-sidebar">
        <div className="sidebar-header">
          <h3>Wiki Pages</h3>
          <button 
            className={`new-page-btn ${selectedPageId === "" ? "active" : ""}`}
            onClick={() => handleSelectPage("")}
          >
            + Create New Page
          </button>
        </div>
        <nav className="page-list">
          {pages.map((page) => (
            <button
              key={page.id}
              className={`sidebar-item ${selectedPageId === page.id ? "active" : ""}`}
              onClick={() => handleSelectPage(page.id)}
            >
              <span className="item-title">{page.title}</span>
              <span className="item-meta">{page.category}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="wiki-editor-wrapper">
        <header className="editor-header">
          <div className="category-row">
<div className="button-scroll-container">
  {categories.map((cat) => {
  
    const isActive = !isCreatingNew && category?.toLowerCase() === cat.toLowerCase();
    
    return (
      <button
        key={cat}
        className={`toggle-btn ${isActive ? "active" : ""}`}
        onClick={() => {
          setIsCreatingNew(false);
          setCategory(cat); 
        }}
      >
        {cat}
      </button>
    );
  })}
  
  <button 
    className={`toggle-btn ${isCreatingNew ? "active" : ""}`}
    onClick={() => setIsCreatingNew(true)}
  >
    + Custom
  </button>
</div>
            
            {isCreatingNew && (
              <input 
                className="custom-category-input"
                placeholder="New category..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>

          <input 
            className="wiki-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Page Title..."
          />
        </header>

        <main className="editor-content">
          <div id="editorjs"></div>
        </main>

        <footer className="editor-actions">
<button 
  className="publish-btn" 
  onClick={async () => {
    await onSave(title, finalCategory, selectedPageId);
    if (isCreatingNew) {
      setCategory(customCategory);
      setIsCreatingNew(false);
      setCustomCategory("");
    }
  }}
  disabled={!title || (isCreatingNew && !customCategory)}
>
  {selectedPageId ? "Update Wiki Page" : "Publish to Firebase"}
</button>
        {selectedPageId && (
          <button
            className="delete-btn"
            onClick={async () => {
              if (!window.confirm("Delete this page? This action cannot be undone.")) return;
              try {
                await deleteDoc(doc(db, "wikiPages", selectedPageId));
                const data = await fetchAllPages();
                setPages(data);
                handleSelectPage("");
                alert("Deleted successfully!");
              } catch (e) {
                console.error("Delete failed:", e);
              }
            }}
          >
            Delete Page
          </button>
        )}
        </footer>
      </div>
    </div>
  );
};

export default WikiEditor;