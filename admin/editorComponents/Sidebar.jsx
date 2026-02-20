import React from "react";

const Sidebar = ({ pages, selectedPageId, onSelectPage, categories }) => {
  const grouped = pages.reduce((acc, p) => {
    const key = (p.category || "Other").charAt(0).toUpperCase() + (p.category || "Other").slice(1);
    acc[key] = acc[key] || [];
    acc[key].push(p);
    return acc;
  }, {});

  const orderedCats = [...categories.filter(c => grouped[c]), ...Object.keys(grouped).filter(k => !categories.includes(k))];

  return (
    <aside className="w-80 bg-slate-800 border-r border-slate-700 p-4 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto flex flex-col">
      <div className="mb-4 pb-4 border-b border-slate-700">
        <h3 className="text-xl font-nunito-sans font-bold mb-3">Page List</h3>
        <button onClick={() => onSelectPage("")} className={`w-full py-2 px-3 rounded text-sm font-bold transition ${!selectedPageId ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
          + Create New Page
        </button>
      </div>
      <nav className="flex-1">
        {orderedCats.map(cat => (
          <div key={cat} className="mb-4">
            <h4 className="text-sm font-intel-mono font-bold text-blue-400 uppercase mb-2">{cat}</h4>
            <ul className="space-y-1">
              {grouped[cat].map(page => (
                <li key={page.id}>
                  <button 
                    onClick={() => onSelectPage(page.id)} 
                    className={`w-full text-left py-2 px-3 rounded text-sm transition ${selectedPageId === page.id ? 'bg-blue-600 bg-opacity-20 border-l-2 border-blue-500' : 'hover:bg-slate-700'}`}
                  >
                    <div className="font-semibold text-gray-200">{page.title}</div>
                    <small className="text-xs text-blue-400">{page.published ? "Published" : "Draft"}</small>
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