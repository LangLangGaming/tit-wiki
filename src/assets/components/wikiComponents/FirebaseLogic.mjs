import { useEffect, useState } from "react";
import { db } from '../../../firebase.config.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { slugify } from "./Utils.js";
import Wiki from "../../../pages/Wiki.jsx";

export function useFirebaseLogic() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grouped, setGrouped] = useState({});

      useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'wikiPages'), where('published', '==', true), orderBy('title'));
        let docs = [];
        try {
          const snap = await getDocs(q);
          docs = snap.docs.map(d => {
            const data = d.data();
            const slug = data.slug || slugify(data.title || d.id);
            return { id: d.id, ...data, slug };
          });
        } catch (queryErr) {
          console.warn('Primary query failed, falling back to unfiltered fetch:', queryErr);
          const snapAll = await getDocs(collection(db, 'wikiPages'));
          const all = snapAll.docs.map(d => {
            const data = d.data();
            const slug = data.slug || slugify(data.title || d.id);
            return { id: d.id, ...data, slug };
          });
          docs = all.filter(d => !!d.published);
        }

        console.log('Loaded wiki pages:', docs.length, docs.map(d => d.title));
        setPages(docs);
        const g = docs.reduce((acc, p) => {
          const cat = (p.category || 'uncategorized').toLowerCase();
          acc[cat] = acc[cat] || [];
          acc[cat].push(p);
          return acc;
        }, {});
        setGrouped(g);
        setLoading(false);
      } catch (e) {
        console.error('Failed to load wiki pages', e);
        setLoading(false);
      }
    };
    load();
  }, []);


return { pages, loading, grouped };
}