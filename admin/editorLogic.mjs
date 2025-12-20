import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { db, storage } from '../src/firebase.config.js'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useWikiEditor = () => {
    const element = document.getElementById('editorjs');
    if (!element) return;
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

const onSave = async (title, category) => {
  if (!editorInstance.current) return;

  try {
    const editorData = await editorInstance.current.save();

    // CHECK: Stop the upload if there are no blocks or content
    if (!editorData.blocks || editorData.blocks.length === 0) {
      alert("The editor is empty. Please add some content before publishing.");
      return;
    }

    // Optional: Advanced check to see if the first block is just an empty paragraph
    const firstBlock = editorData.blocks[0];
    if (editorData.blocks.length === 1 && 
        firstBlock.type === 'paragraph' && 
        (!firstBlock.data.text || firstBlock.data.text.trim() === "")) {
      alert("Cannot publish an empty page.");
      return;
    }

    // Generates a URL-friendly slug
    const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    await addDoc(collection(db, "wikiPages"), {
      category: category.toLowerCase(), 
      content: JSON.stringify(editorData),
      published: false,
      slug: slug,
      title: title,
      updatedAt: serverTimestamp()
    });
    
    alert("Wiki page published successfully!");
  } catch (e) {
    console.error("Save failed:", e);
  }
};

  return { onSave };
};