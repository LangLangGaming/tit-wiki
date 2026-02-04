import React, { useState } from "react";
import "../Dashboard.css";

const CategoryBar = ({ categories, setCategories, activeCategory, setActiveCategory }) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    if (!customInput.trim()) return;
    setCategories([...categories, customInput]);
    setActiveCategory(customInput);
    setCustomInput("");
    setIsCreatingNew(false);
  };

  return (
    <div className="category-row">
      <div className="button-scroll-container">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`toggle-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => { setActiveCategory(cat); setIsCreatingNew(false); }}
          >
            {cat}
          </button>
        ))}
        <button className="toggle-btn" onClick={() => setIsCreatingNew(true)}>+ Custom</button>
      </div>
      {isCreatingNew && (
        <div className="custom-create-row">
          <input value={customInput} onChange={(e) => setCustomInput(e.target.value)} placeholder="New Category..." />
          <button onClick={handleAddCustom}>Create</button>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;