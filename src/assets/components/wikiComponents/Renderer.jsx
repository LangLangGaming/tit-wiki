import React from 'react';
import { slugify } from './Utils.js';
function renderBlocks(blocks, pageSlug) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((b, i) => {
    const key = `${pageSlug || 'p'}-block-${i}`;
    switch (b.type) {
      case 'header': {
        const level = b.data.level || 2;
        const Tag = `h${level}`;
        const id = `${pageSlug || 'p'}-${slugify(b.data.text || '')}-${i}`;
        return React.createElement(Tag, { id, key }, b.data.text);
      }
      case 'paragraph':
        return (
          <p key={key} dangerouslySetInnerHTML={{ __html: b.data.text || '' }} />
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