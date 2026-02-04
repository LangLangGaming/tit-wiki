import React, { useEffect, useState } from "react";
import '../assets/css/Wiki.css';
import '../assets/css/Wiki.overrides.css'
import { db } from '../firebase.config.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Copyright from "../assets/components/Copyright.jsx";
import Loading from "../assets/components/Loading.jsx";

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^-\w\s-]/g, '')
    .replace(/[-\s]+/g, '-');
}

function renderBlocks(blocks, pageSlug) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((b, i) => {
    const key = `${pageSlug || 'p'}-block-${i}`;
    switch (b.type) {
      case 'header': {
        const level = b.data.level || 2;
        const Tag = `h${level}`;
        const id = `${pageSlug || 'p'}-${slugify(b.data.text || '')}-${i}`;
        return React.createElement(Tag, { id, key }, b.data.text);
      }
      case 'paragraph':
        return (
          <p key={key} dangerouslySetInnerHTML={{ __html: b.data.text || '' }} />
        );
      case 'list':
        if (b.data.style === 'ordered') {
          return (
            <ol key={key}>
              {(b.data.items || []).map((it, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: it }} />)}
            </ol>
          );
        }
        return (
          <ul key={key}>
            {(b.data.items || []).map((it, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: it }} />)}
          </ul>
        );
      case 'image':
        return (
          <div className="wiki-image" key={key}>
            <img src={b.data.file?.url} alt={b.data.caption || ''} />
            {b.data.caption ? <div className="caption">{b.data.caption}</div> : null}
          </div>
        );
      default:
        return (
          <pre key={key} className="wiki-unknown">{JSON.stringify(b, null, 2)}</pre>
        );
    }
  });
}

const Wiki = () => {
  const [pages, setPages] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [activeSlug, setActiveSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'wikiPages'), where('published', '==', true), orderBy('title'));
        let docs = [];
        try {
          const snap = await getDocs(q);
          docs = snap.docs.map(d => {
            const data = d.data();
            const slug = data.slug || slugify(data.title || d.id);
            return { id: d.id, ...data, slug };
          });
        } catch (queryErr) {
          console.warn('Primary query failed, falling back to unfiltered fetch:', queryErr);
          const snapAll = await getDocs(collection(db, 'wikiPages'));
          const all = snapAll.docs.map(d => {
            const data = d.data();
            const slug = data.slug || slugify(data.title || d.id);
            return { id: d.id, ...data, slug };
          });
          docs = all.filter(d => !!d.published);
        }

        console.log('Loaded wiki pages:', docs.length, docs.map(d => d.title));
        setPages(docs);
        if (docs.length && !activeSlug) setActiveSlug(docs[0].slug);
        const g = docs.reduce((acc, p) => {
          const cat = (p.category || 'uncategorized').toLowerCase();
          acc[cat] = acc[cat] || [];
          acc[cat].push(p);
          return acc;
        }, {});
        setGrouped(g);
        setLoading(false);
      } catch (e) {
        console.error('Failed to load wiki pages', e);
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    const el = document.getElementById(page.slug);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSlug(page.slug);
  };

  const tocFor = (page) => {
    if (!page) return [];
    let blocks = [];
    try {
      blocks = typeof page.content === 'string' ? JSON.parse(page.content).blocks : (page.content?.blocks || []);
    } catch (e) { blocks = []; }
    return blocks
      .map((b, idx) => ({ ...b, _idx: idx }))
      .filter(b => b.type === 'header')
      .map(b => ({ text: b.data.text || '', level: b.data.level || 2, id: `${page.slug}-${slugify(b.data.text || '')}-${b._idx}` }));
  };

  const activePage = pages.find(p => p.slug === activeSlug) || pages[0];

  return (
    <div className="wiki-layout">
      {loading && <Loading />}
      <aside className="wiki-sidebar">
        <nav>
          {Object.keys(grouped).length === 0 && <p>No published pages yet.</p>}
          {Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} className="wiki-category">
              <h2>{cat}</h2>
              <ul>
                {list.map(page => (
                  <li key={page.id}>
                    <a href={`#${page.slug}`} onClick={(e) => handleNavClick(e, page)}>{page.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="wiki-main">
        <div className="wiki-listing">
          {activePage ? (() => {
            let blocks = [];
            try { blocks = typeof activePage.content === 'string' ? JSON.parse(activePage.content).blocks : (activePage.content?.blocks || []); } catch (e) { blocks = []; }
            const id = activePage.slug || slugify(activePage.title) || activePage.id;
            return (
              <article className="wiki-content" id={id} key={activePage.id}>
                <h1>{activePage.title}</h1>
                {renderBlocks(blocks, id)}
              </article>
            );
          })() : <p className="no-page">No page selected.</p>}
        </div>
      </main>

      <aside className="toc-panel">
        <div className="toc-header"><h3>On this page</h3></div>
        <nav className="toc-list">
          <ul>
            {tocFor(activePage).map((t, idx) => (
              <li key={idx} className={`toc-item level-${t.level}`}>
                <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); const el = document.getElementById(t.id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>{t.text}</a>
              </li>
            ))}
            {tocFor(activePage).length === 0 && <li className="toc-empty">No headings</li>}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Wiki;
