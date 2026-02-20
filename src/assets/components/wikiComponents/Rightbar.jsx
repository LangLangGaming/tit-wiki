import React from "react";

function Rightbar({ activePage, tocFor }) {

    return (
        <aside className="w-72 sticky top-0 h-screen overflow-y-auto border-l border-slate-700 p-4">
            <div className="mb-6"><h3 className="text-lg font-intel-mono font-normal text-blue-400 uppercase mb-4">On this page</h3></div>
            <nav>
                <ul className="space-y-2">
                    {tocFor(activePage).map((t, idx) => (
                        <li key={idx} className={`level-${t.level}`}>
                            <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); const el = document.getElementById(t.id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition text-sm">{t.text}</a>
                        </li>
                    ))}
                    {tocFor(activePage).length === 0 && <li className="text-gray-500 text-sm">No headings</li>}
                </ul>
            </nav>
        </aside>
    )
}

export default Rightbar;