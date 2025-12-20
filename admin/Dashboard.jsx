import React, { useState } from "react"; // Combined imports
import "./Dashboard.css";
import { useWikiEditor } from "../admin/editorLogic.mjs";

// MOVE THIS OUTSIDE of the Dashboard function
const WikiEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Europe");
  const [customCategory, setCustomCategory] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  const { onSave } = useWikiEditor();

  const finalCategory = isCreatingNew ? customCategory : category;

  return (
    <div className="wiki-editor-wrapper">
      <header className="editor-header">
        <div className="meta-inputs">
          <select 
            className="category-select" 
            onChange={(e) => {
              if (e.target.value === "NEW") {
                setIsCreatingNew(true);
              } else {
                setIsCreatingNew(false);
                setCategory(e.target.value);
              }
            }} 
            value={isCreatingNew ? "NEW" : category}
          >
            <option value="Organizations">Organizations</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Americas">Americas</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Other">Other</option>
            <option value="NEW">+ Create New Category...</option>
          </select>

          {isCreatingNew && (
            <input 
              className="custom-category-input"
              placeholder="New category name..."
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
        <hr className="wiki-hr" />
      </header>

      <main>
        {/* This ID MUST match the 'holder' in editorLogic.mjs */}
        <div id="editorjs"></div>
      </main>

      <footer className="editor-actions">
        <button 
          className="publish-btn" 
          onClick={() => onSave(title, finalCategory)}
          disabled={!title || (isCreatingNew && !customCategory)}
        >
          Publish to Firebase
        </button>
      </footer>
    </div>
  );
};

function Dashboard() {
    return (
        <div className="dashboard-container" style={{paddingTop: "120px"}}>
            {/* CALL the component here */}
            <WikiEditor />
        </div>
    );
}

export default Dashboard;