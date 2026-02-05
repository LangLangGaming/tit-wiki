import React from "react";
import '../../css/Wiki.css';
import '../../css/Wiki.overrides.css'


function Sidebar({ grouped, handleNavClick }) {
    return (
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
    )
}

export default Sidebar;