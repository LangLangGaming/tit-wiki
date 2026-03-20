import React, { useState } from "react";


const CategoryBar = ({ categories, setCategories, activeCategory, setActiveCategory }) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [customInput, setCustomInput] = useState("");

const handleAddCustom = () => {
  const trimmedInput = customInput.trim();
  if (!trimmedInput) return;

  // Check if it already exists (case-insensitive)
  const exists = categories.find(
    (cat) => cat.toLowerCase() === trimmedInput.toLowerCase()
  );

  if (!exists) {
    setCategories([...categories, trimmedInput]);
  }
  
  setActiveCategory(exists || trimmedInput);
  setCustomInput("");
  setIsCreatingNew(false);
};

  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`py-2 px-4 rounded-full text-sm font-bold transition ${activeCategory === cat ? 'bg-blue-600 text-white' : 'border border-gray-500 text-gray-400 hover:bg-slate-700'}`}
            onClick={() => { setActiveCategory(cat); setIsCreatingNew(false); }}
          >
            {cat}
          </button>
        ))}
        <button className="py-2 px-4 rounded-full text-sm font-bold border border-gray-500 text-gray-400 hover:bg-slate-700 transition" onClick={() => setIsCreatingNew(true)}>+ Custom</button>
      </div>
      {isCreatingNew && (
        <div className="flex gap-2 items-center">
          <input value={customInput} onChange={(e) => setCustomInput(e.target.value)} placeholder="New Category..." className="px-3 py-2 rounded bg-slate-700 text-white outline-none" />
          <button onClick={handleAddCustom} className="py-2 px-4 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Create</button>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;