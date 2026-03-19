import React from 'react';
import { renderBlocks } from './Renderer.jsx';
import { slugify } from './Utils.js'; 
import Copyright from '../Copyright.jsx';


function Content({ activePage }) {
    return (
        <main className="flex-1 p-12 -mt-74 flex flex-col items-center h-screen pb-20 overflow-y-auto">
            <div className="w-full max-w-5xl flex flex-col flex-1">
                {activePage ? (() => {
                    let blocks = [];
                    try {
                        blocks = typeof activePage.content === 'string' ? JSON.parse(activePage.content).blocks : (activePage.content?.blocks || []);
                    } catch (e) {
                        blocks = [];
                    }
                    const id = activePage.slug || slugify(activePage.title) || activePage.id;
                    return (
                        <article className="font-nunito-sans text-lg text-gray-300 leading-relaxed" key={activePage.id}>
                            <h1 className="text-4xl font-extrabold font-nunito-sans text-blue-400 mb-10 -mt-4">{activePage.title}</h1>
                            {renderBlocks(blocks, id)}
                        </article>
                    );
                })() : <p className="text-gray-500">No page selected.</p>}
            </div>
            <div className="w-full max-w-5xl mb-5 mt-12">
                <Copyright />
            </div>
        </main>
    );
}

export default Content; 