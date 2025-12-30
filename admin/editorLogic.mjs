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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const useWikiEditor = () => {
  const editorInstance = useRef(null);
  const imagesRef = useRef(new Set());

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
      // track image URLs present in the editor so we can delete storage objects when removed
      let changeTimer = null;
      const urlToStoragePath = (url) => {
        if (!url) return null;
        try {
          const m = url.match(/\/o\/([^?]+)/);
          if (m && m[1]) return decodeURIComponent(m[1]);
        } catch (e) { }
        return null;
      };

      const detectRemovedImages = async () => {
        if (!editorInstance.current) return;
        try {
          const data = await editorInstance.current.save();
          const currentImages = new Set();
          (data.blocks || []).forEach((b) => {
            if (b.type === 'image' && b.data && b.data.file && b.data.file.url) {
              currentImages.add(b.data.file.url);
            }
          });

          const prev = imagesRef.current || new Set();
          for (const url of prev) {
            if (!currentImages.has(url)) {
              // removed — delete from Firebase Storage if it looks like our uploaded path
              try {
                const storagePath = urlToStoragePath(url);
                if (storagePath && storagePath.startsWith('wiki-images/')) {
                  const storageRef = ref(storage, storagePath);
                  await deleteObject(storageRef);
                  console.log('Deleted removed image from storage:', storagePath);
                }
              } catch (delErr) {
                console.warn('Failed to delete removed image:', delErr);
              }
            }
          }

          imagesRef.current = currentImages;
        } catch (e) {
          console.error('Failed to detect removed images:', e);
        }
      };

      const scheduleDetect = () => {
        if (changeTimer) clearTimeout(changeTimer);
        changeTimer = setTimeout(detectRemovedImages, 800);
      };

      // EditorJS emits change events via editor.events
      try {
        editor.isReady.then(() => {
          if (editor.events && typeof editor.events.on === 'function') {
            editor.events.on('change', scheduleDetect);
          }
        });
      } catch (e) { /* ignore if events API isn't available */ }
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
            await editorInstance.current.blocks.insert('image', { file: { url } });
            // record the newly-inserted image URL
            imagesRef.current.add(url);
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
    // update tracked images from the rendered content
    try {
      const blocks = data.blocks || [];
      const imgs = new Set();
      blocks.forEach((b) => {
        if (b.type === 'image' && b.data && b.data.file && b.data.file.url) imgs.add(b.data.file.url);
      });
      imagesRef.current = imgs;
    } catch (e) { imagesRef.current = new Set(); }
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
        published: false,
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