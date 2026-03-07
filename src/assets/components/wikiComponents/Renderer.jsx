import React from 'react';
import { slugify } from './Utils.js';
import '../../css/Wiki.overrides.css';
function renderBlocks(blocks, pageSlug) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((b, i) => {
    const key = `${pageSlug || 'p'}-block-${i}`;
    switch (b.type) {
      case 'header': { 
  const level = b.data.level || 2;
  const Tag = `h${level}`;
  const id = `${pageSlug || 'p'}-${slugify(b.data.text || '')}-${i}`;
  const headingClass = {
    1: 'text-3xl font-bold  text-blue-400 mt-8 mb-4',
    2: 'text-2xl font-bold font-crimson-pro text-blue-400 mt-8 mb-3',
    3: 'text-xl font-semibold text-white mt-6 mb-2',
    4: 'text-lg font-semibold text-gray-200 mt-4 mb-2',
    5: 'text-base font-semibold text-gray-300 mt-3 mb-1',
    6: 'text-sm font-semibold text-gray-400 mt-2 mb-1',
  }[level] || 'text-xl font-bold text-white mt-6 mb-2';
  return React.createElement(Tag, { id, key, className: headingClass }, b.data.text);
}
      case 'paragraph':
        return (
          <p key={key} className="text-gray-300 font-nunito-sans font-normal text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: b.data.text || '' }} />
        );
      case 'list':
        if (b.data.style === 'ordered') {
          return (
            <ol key={key}>
              {(b.data.items || []).map((it, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: it }} />)}
            </ol>
          );
        }
        return (
          <ul key={key}>
            {(b.data.items || []).map((it, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: it }} />)}
          </ul>
        );
      case 'image':
        return (
          <div className="wiki-image" key={key}>
            <img src={b.data.file?.url} alt={b.data.caption || ''} />
            {b.data.caption ? <div className="caption">{b.data.caption}</div> : null}
          </div>
        );
      default:
        return (
          <pre key={key} className="wiki-unknown">{JSON.stringify(b, null, 2)}</pre>
        );
    }
  });
}

export { renderBlocks };