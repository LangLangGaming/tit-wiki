import React from "react";
import "../Dashboard.css";

const Sidebar = ({ pages, selectedPageId, onSelectPage, categories }) => {
  const grouped = pages.reduce((acc, p) => {
    const key = (p.category || "Other").charAt(0).toUpperCase() + (p.category || "Other").slice(1);
    acc[key] = acc[key] || [];
    acc[key].push(p);
    return acc;
  }, {});

  const orderedCats = [...categories.filter(c => grouped[c]), ...Object.keys(grouped).filter(k => !categories.includes(k))];

  return (
    <aside className="editor-sidebar">
      <div className="sidebar-header">
        <h3>Page List</h3>
        <button onClick={() => onSelectPage("")} className={`new-page-btn ${!selectedPageId ? "active" : ""}`}>
          + Create New Page
        </button>
      </div>
      <nav className="page-list">
        {orderedCats.map(cat => (
          <div key={cat} className="sidebar-category">
            <h4 className="sidebar-category-title">{cat}</h4>
            <ul>
              {grouped[cat].map(page => (
                <li key={page.id}>
                  <button 
                    onClick={() => onSelectPage(page.id)} 
                    className={`sidebar-item ${selectedPageId === page.id ? "active" : ""}`}
                  >
                    <span className="item-title">{page.title}</span>
                    <small className="item-meta">{page.published ? "Published" : "Draft"}</small>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;