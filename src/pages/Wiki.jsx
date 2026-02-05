import React, { useEffect, useState } from "react";
import '../assets/css/Wiki.css';
import '../assets/css/Wiki.overrides.css'
import Copyright from "../assets/components/Copyright.jsx";
import Loading from "../assets/components/Loading.jsx";
import { slugify } from '../assets/components/wikiComponents/Utils.js';
import { renderBlocks } from '../assets/components/wikiComponents/Renderer.jsx';
import { useFirebaseLogic } from '../assets/components/wikiComponents/FirebaseLogic.mjs';
import Sidebar from '../assets/components/wikiComponents/Sidebar.jsx';
import Content from '../assets/components/wikiComponents/Content.jsx';
import Rightbar from '../assets/components/wikiComponents/Rightbar.jsx';


const Wiki = () => {
  const [activeSlug, setActiveSlug] = useState(null);
  const { pages, loading, grouped } = useFirebaseLogic();

  const handleNavClick = (e, page) => {
    e.preventDefault();
    const el = document.getElementById(page.slug);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSlug(page.slug);
  };

  const activePage = pages.find(p => p.slug === activeSlug) || pages[0];

  const tocFor = (page) => {
    if (!page) return [];
    let blocks = [];
    try {
      blocks = typeof page.content === 'string' ? JSON.parse(page.content).blocks : (page.content?.blocks || []);
    } catch (e) {
      blocks = [];
    }
    return blocks
      .map((b, idx) => ({ ...b, _idx: idx }))
      .filter(b => b.type === 'header')
      .map(b => ({ text: b.data.text || '', level: b.data.level || 2, id: `${page.slug}-${slugify(b.data.text || '')}-${b._idx}` }));
  };

  return (
    <div className="wiki-layout">
      {loading && <Loading />}
      <Sidebar grouped={grouped} handleNavClick={handleNavClick} />
      <Content activePage={activePage} />
      <Rightbar activePage={activePage} tocFor={tocFor} />
    </div>
  );
};

export default Wiki;
