import React, { useState, useEffect } from "react";
import { useWikiEditor } from "./editorComponents/editorLogic.mjs";

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
useEffect(() => {
  if (pages.length > 0) {
    const defaultCats = ["Organizations", "Europe", "Asia", "Americas", "Africa", "Oceania", "Other"];
    
    // Extract unique categories from saved pages
    const savedCats = pages.map(p => 
      p.category.charAt(0).toUpperCase() + p.category.slice(1)
    );

    // Merge defaults + saved categories and remove duplicates
    const unifiedCategories = Array.from(new Set([...defaultCats, ...savedCats]));
    
    setCategories(unifiedCategories);
  }
}, [pages]); // This fires every time 'pages' is updated from the API

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
    <div className="flex gap-4 text-white h-screen overflow-hidden">
      {loading && <Loading />}
      
      <Sidebar 
        pages={pages} 
        selectedPageId={selectedPageId} 
        onSelectPage={handleSelectPage} 
        categories={categories} 
      />

      <div className="flex-1 flex flex-col p-5 h-full overflow-hidden min-w-0">
        <header className="mb-6 flex-none">
          <CategoryBar 
            categories={categories} 
            setCategories={setCategories}
            activeCategory={category} 
            setActiveCategory={setCategory} 
          />
          <input 
            className="w-full text-4xl font-bold font flex-none-nunito-sans border-b border-gray-600 bg-transparent text-white outline-none p-2 mb-6" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter Page Title..." 
          />
        </header>

        <main className="flex-1 w-full border border-gray-600 font-nunito-sans min-h-0 rounded p-4 overflow-y-auto ">
          <div id="editorjs"></div> 
        </main>
        <div className="flex-none p-20">
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
    </div>
  );
};

export default Dashboard;