import React from 'react';
import { renderBlocks } from './Renderer.jsx';
import { slugify } from './Utils.js';


function Content({ activePage }) {
    return (
        <main className="wiki-main">
            <div className="wiki-listing">
                {activePage ? (() => {
                    let blocks = [];
                    try {
                        blocks = typeof activePage.content === 'string' ? JSON.parse(activePage.content).blocks : (activePage.content?.blocks || []);
                    } catch (e) {
                        blocks = [];
                    }
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
    );
}

export default Content;