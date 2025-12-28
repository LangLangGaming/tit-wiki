import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { db, storage } from '../src/firebase.config.js'; 
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useWikiEditor = () => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a subheading...',
              levels: [2, 3],
              defaultLevel: 2,
            },
          },
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  const storageRef = ref(storage, `wiki-images/${Date.now()}_${file.name}`);
                  await uploadBytes(storageRef, file);
                  const url = await getDownloadURL(storageRef);
                  return { success: 1, file: { url } };
                }
              }
            }
          }
        }
      });
      editorInstance.current = editor;
      // Paste handler: upload images from clipboard to Firebase Storage and insert as image blocks
      const handlePaste = async (e) => {
        if (!e.clipboardData || !editorInstance.current) return;
        const items = Array.from(e.clipboardData.items || []);
        const imageItems = items.filter(i => i.type && i.type.startsWith('image/'));
        if (imageItems.length === 0) return; // nothing to do
        e.preventDefault();
        for (const item of imageItems) {
          try {
            const file = item.getAsFile();
            if (!file) continue;
            const storageRef = ref(storage, `wiki-images/pasted_${Date.now()}_${file.name || 'clipboard.png'}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await editorInstance.current.isReady;
            // Insert image block using Image tool format
            await editorInstance.current.blocks.insert('image', { file: { url } });
          } catch (err) {
            console.error('Failed to upload pasted image:', err);
          }
        }
      };

      document.addEventListener('paste', handlePaste);
    }

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
      // remove paste listener on cleanup
      try { document.removeEventListener('paste', handlePaste); } catch (e) {}
    };
  }, []);


  const fetchAllPages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "wikiPages"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching pages:", error);
      return [];
    }
  };
const loadContent = async (contentData) => {
  if (!editorInstance.current) return;
  try {
    let data;
 
    if (typeof contentData === 'string') {
      try {
        data = JSON.parse(contentData);
      } catch (e) {
    
        data = {
          blocks: [{
            type: "paragraph",
            data: { text: contentData }
          }]
        };
      }
    } else {
      data = contentData;
    }

    await editorInstance.current.isReady;
    await editorInstance.current.render(data);
  } catch (e) {
    console.error("Failed to load content:", e);
  }
};
const onSave = async (title, category, existingId = null) => {
  if (!editorInstance.current) return;

  try {
    const editorData = await editorInstance.current.save();

    const slug = title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-');
    
    const pageData = {
      category: category.toLowerCase(), 
      content: JSON.stringify(editorData),
      slug: slug,
      title: title,
      updatedAt: serverTimestamp()
    };

    if (existingId) {
      const docRef = doc(db, "wikiPages", existingId);
      await updateDoc(docRef, pageData);
    } else {
      await addDoc(collection(db, "wikiPages"), {
        ...pageData,
        published: true, 
        createdAt: serverTimestamp()
      });
    }
    alert("Saved successfully!");
  } catch (e) {
    console.error("Save failed:", e);
  }
};

  // Make sure EVERYTHING is returned here
  return { onSave, fetchAllPages, loadContent };
};