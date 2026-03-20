import React from "react";
import { Icon } from '@iconify/react';
import { db } from "../../src/firebase.config.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const ActionFooter = ({ selectedPageId, title, category, pages, onSave, onRefresh, onSelectPage }) => {
  
  const currentPage = pages.find(p => p.id === selectedPageId);

  const handlePublishToggle = async () => {
    if (!currentPage) return;
    await updateDoc(doc(db, "wikiPages", selectedPageId), { published: !currentPage.published });
    onRefresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this page?")) return;
    await deleteDoc(doc(db, "wikiPages", selectedPageId));
    onRefresh();
    onSelectPage("");
  };

  return (
    <footer className="flex justify-end gap-3 -mr-20 -mt-10 mb-10 ">
      <button className="py-2 px-6 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center gap-2" onClick={() => onSave(title, category, selectedPageId).then(onRefresh)}>
        <Icon icon={selectedPageId ? "ic:sharp-update" : "ic:baseline-publish"} width={20} />
        {selectedPageId ? "Update Page" : "Upload to Firebase"}
      </button>

      {selectedPageId && (
        <>
          <button className="py-2 px-6 rounded bg-slate-700 text-white font-bold hover:bg-slate-600 transition flex items-center gap-2" onClick={handlePublishToggle}>
            <Icon icon="ic:baseline-visibility" width={20} />
            {currentPage?.published ? "Unpublish" : "Publish"}
          </button>
          <button className="py-2 px-6 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition flex items-center gap-2" onClick={handleDelete}>
            <Icon icon="ic:baseline-delete-outline" width={24} />
            Delete Page
          </button>
        </>
      )}
    </footer>
  );
};

export default ActionFooter;