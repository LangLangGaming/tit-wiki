import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./Editor.css";
import { useWikiEditor } from "../admin/editorLogic.mjs";
import { db } from "../src/firebase.config.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {Icon } from '@iconify/react';

const WikiEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Europe");
  const [customCategory, setCustomCategory] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const { onSave, fetchAllPages, loadContent } = useWikiEditor();

  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");

  const initialCategories = ["Organizations", "Europe", "Asia", "Americas", "Africa", "Oceania", "Other"];
  const [categories, setCategories] = useState(initialCategories);

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
      <aside className="editor-sidebar">
        <div className="sidebar-header">
          <h3>Page List</h3>
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
        <div key={cat} className="category-with-delete">
          <button
            className={`toggle-btn ${isActive ? "active" : ""}`}
            onClick={() => {
              setIsCreatingNew(false);
              setCategory(cat);
            }}
          >
            {cat}
          </button>
          <button
            className="category-delete-btn"
            onClick={async (e) => {
              e.stopPropagation();
              if (!window.confirm(`Delete category "${cat}"? This will not delete pages.`)) return;
              setCategories((prev) => prev.filter((c) => c !== cat));
              if (category === cat) {
                setCategory((prev) => (categories.length > 1 ? categories.find((c) => c !== cat) || "" : ""));
              }
            }}
            title={`Delete ${cat}`}
          >
            ×
          </button>
        </div>
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
              <div className="custom-create-row">
                <input
                  className="custom-category-input"
                  placeholder="New category..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
                <button
                  className="create-category-btn"
                  onClick={() => {
                    const trimmed = customCategory.trim();
                    if (!trimmed) return;
                    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
                      alert("Category already exists.");
                      return;
                    }
                    setCategories((prev) => [...prev, trimmed]);
                    setCategory(trimmed);
                    setIsCreatingNew(false);
                    setCustomCategory("");
                  }}
                  disabled={!customCategory.trim()}
                >
                  Create
                </button>
              </div>
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
<Icon 
    icon={selectedPageId ? "ic:sharp-update" : "ic:baseline-publish"} 
    width={20} height={20}
    style={{ marginRight: "8px" }}
  />
  {selectedPageId ? "Update Page" : "Upload to Firebase"}
</button>
          <button
            className="publish-toggle-btn"
            onClick={async () => {
              const page = pages.find((p) => p.id === selectedPageId);
              if (!page) return;
              const current = !!page.published;
              try {
                await updateDoc(doc(db, "wikiPages", selectedPageId), { published: !current });
                const data = await fetchAllPages();
                setPages(data);
                alert(`Published set to ${!current}`);
              } catch (e) {
                console.error("Failed to toggle published:", e);
              }
            }}
          >
            <Icon icon="ic:baseline-visibility" width={20} height={20} style={{ marginRight: "8px" }} />
            {pages.find((p) => p.id === selectedPageId)?.published ? "Unpublish" : "Publish"}
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
            <Icon icon="ic:baseline-delete-outline" width="24" height="24" style={{marginRight: "8px"}} />
            Delete Page
          </button>
        )}
        </footer>
      </div>
    </div>
  );
};

export default WikiEditor;