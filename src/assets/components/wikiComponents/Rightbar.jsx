import React from "react";
import '../../css/Wiki.css';
import '../../css/Wiki.overrides.css'

function Rightbar({ activePage, tocFor }) {

    return (
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
    )
}

export default Rightbar;