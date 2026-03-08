import React from "react";


function Sidebar({ grouped, handleNavClick, activePage }) {
  return (
    <aside className="w-84 sticky top-0 h-screen overflow-y-auto  p-4 flex flex-col ml-5">
      <nav>
        {Object.keys(grouped).length === 0 && <p className="text-gray-400">No published pages yet.</p>}
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="mb-6">
            <h2 className="text-lg font-intel-mono font-semibold text-blue-400 uppercase mb-3">{cat}</h2>
            <ul className="border-l border-gray-300 pl-4 mb-4 font-crimson-pro">
              {list.map(page => (
                <li key={page.id} className="mb-2">
                  <a href={`#${page.slug}`}
                    onClick={(e) => handleNavClick(e, page)}
                    className={`block px-3 py-1 transition text-base font-nunito-sans ${activePage?.id === page.id
                        ? 'text-sky-200 border-l-2 border-blue-400 bg-gray-900 pl-2.5 rounded-sm'
                        : 'text-slate-600 hover:text-slate-100 border-l-2 border-transparent'
                      }`}
                  >{page.title}</a>
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