import React from "react";


function Sidebar({ grouped, handleNavClick }) {
    return (
      <aside className="w-96 sticky top-0 h-screen overflow-y-auto border-r border-slate-700 p-4 flex flex-col">
        <nav>
          {Object.keys(grouped).length === 0 && <p className="text-gray-400">No published pages yet.</p>}
          {Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} className="mb-6">
              <h2 className="text-lg font-intel-mono font-normal text-blue-400 uppercase mb-3">{cat}</h2>
              <ul className="border-l border-gray-300 pl-4 mb-4">
                {list.map(page => (
                  <li key={page.id} className="mb-2">
                    <a href={`#${page.slug}`} onClick={(e) => handleNavClick(e, page)} className="text-gray-300 hover:text-white transition">{page.title}</a>
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