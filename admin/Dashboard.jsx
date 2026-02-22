import React, { useState, useEffect } from "react";
import { useWikiEditor } from "./editorComponents/editorLogic.mjs";
import { db } from "../src/firebase.config.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// Sub-components
import Sidebar from "./editorComponents/Sidebar";
import CategoryBar from "./editorComponents/CategoryBar";
import ActionFooter from "./editorComponents/ActionFooter";
import Loading from "../src/assets/components/Loading.jsx";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Europe");
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["Organizations", "Europe", "Asia", "Americas", "Africa", "Oceania", "Other"]);

  const { onSave, fetchAllPages, loadContent } = useWikiEditor();

  const refreshPages = async () => {
    const data = await fetchAllPages();
    setPages(data);
    setLoading(false);
  };

  useEffect(() => { refreshPages(); }, [fetchAllPages]);

  const handleSelectPage = (pageId) => {
    setSelectedPageId(pageId);
    if (!pageId) {
      setTitle("");
      loadContent(JSON.stringify({ blocks: [{ type: "paragraph", data: { text: "" } }] }));
    } else {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        setTitle(page.title);
        setCategory(page.category.charAt(0).toUpperCase() + page.category.slice(1));
        loadContent(page.content);
      }
    }
  };

  return (
    <div className="flex gap-4 text-white min-h-screen ">
      {loading && <Loading />}
      
      <Sidebar 
        pages={pages} 
        selectedPageId={selectedPageId} 
        onSelectPage={handleSelectPage} 
        categories={categories} 
      />

      <div className="flex-1 flex flex-col p-5 min-w-0">
        <header className="mb-6">
          <CategoryBar 
            categories={categories} 
            setCategories={setCategories}
            activeCategory={category} 
            setActiveCategory={setCategory} 
          />
          <input 
            className="w-full text-4xl font-bold font-nunito-sans border-b border-gray-600 bg-transparent text-white outline-none p-2 mb-6" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter Page Title..." 
          />
        </header>

        <main className="flex-1">
          <div id="editorjs"></div> 
        </main>

        <ActionFooter 
          selectedPageId={selectedPageId}
          title={title}
          category={category}
          pages={pages}
          onSave={onSave}
          onRefresh={refreshPages}
          onSelectPage={handleSelectPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;