import React from 'react';
import { renderBlocks } from './Renderer.jsx';
import { slugify } from './Utils.js';


function Content({ activePage }) {
    return (
        <main className="flex-1 p-12\">
            <div>
                {activePage ? (() => {
                    let blocks = [];
                    try {
                        blocks = typeof activePage.content === 'string' ? JSON.parse(activePage.content).blocks : (activePage.content?.blocks || []);
                    } catch (e) {
                        blocks = [];
                    }
                    const id = activePage.slug || slugify(activePage.title) || activePage.id;
                    return (
                        <article className="font-nunito-sans text-lg text-gray-300 leading-relaxed" id={id} key={activePage.id}>
                            <h1 className="text-5xl font-bold font-crimson-pro text-blue-300 mb-4">{activePage.title}</h1>
                            {renderBlocks(blocks, id)}
                        </article>
                    );
                })() : <p className="text-gray-500">No page selected.</p>}
            </div>
        </main>
    );
}

export default Content;