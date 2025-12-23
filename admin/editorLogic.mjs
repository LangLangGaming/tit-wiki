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
    }

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  // --- NEW: Fetch all pages from Firestore ---
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
    // Check if it's already an object or a stringified JSON
    if (typeof contentData === 'string') {
      try {
        data = JSON.parse(contentData);
      } catch (e) {
        // If parsing fails, it's a legacy plain string. Wrap it in a block.
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
  // --- UPDATED: onSave (Handles both Create and Update) ---
  const onSave = async (title, category, existingId = null) => {
    if (!editorInstance.current) return;

    try {
      const editorData = await editorInstance.current.save();

      if (!editorData.blocks || editorData.blocks.length === 0) {
        alert("The editor is empty.");
        return;
      }

      const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
      
      const pageData = {
        category: category.toLowerCase(), 
        content: JSON.stringify(editorData),
        slug: slug,
        title: title,
        updatedAt: serverTimestamp()
      };

      if (existingId) {
        // UPDATE existing document
        const docRef = doc(db, "wikiPages", existingId);
        await updateDoc(docRef, pageData);
        alert("Wiki page updated successfully!");
      } else {
        // CREATE new document
        await addDoc(collection(db, "wikiPages"), {
          ...pageData,
          published: false,
          createdAt: serverTimestamp()
        });
        alert("Wiki page published successfully!");
      }
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  // Make sure EVERYTHING is returned here
  return { onSave, fetchAllPages, loadContent };
};