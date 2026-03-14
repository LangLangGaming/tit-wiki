import React from "react";

function Rightbar({ activePage, tocFor }) {


    return (
        <aside className="w-72 sticky top-0 h-screen overflow-y-auto 0 p-4 mr-20">
            <div className="mb-6"><h3 className="text-lg font-intel-mono font-normal text-blue-400 uppercase mb-4">On this page</h3></div>
            <nav>
                <ul className="space-y-2">
                    {tocFor(activePage).map((t, idx) => (
                        <li key={idx} className={`level-${t.level}`}>
                            {(() => {
                                const levelStyle = {
                                    2: 'text-base font-semibold font-nunito-sans text-gray-400',
                                    3: 'text-sm font-semibold font-nunito-sans text-gray-500 pl-3',
                                    4: 'text-sm font-semibold font-nunito-sans text-gray-600 pl-6',
                                }[t.level] || 'text-sm text-gray-400';
                                return (
                                    <a href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById(t.id);
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`hover:text-white transition ${levelStyle}`}
                                    >{t.text}</a>
                                );
                            })()}
                        </li> 
                    ))}
                    {tocFor(activePage).length === 0 && <li className="text-gray-500 text-sm">No headings</li>}
                </ul>
            </nav>
        </aside>
    )
}

export default Rightbar;