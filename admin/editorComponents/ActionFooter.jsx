import React from "react";
import { Icon } from '@iconify/react';
import { db } from "../../src/firebase.config.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import "../Dashboard.css";

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
    <footer className="editor-actions">
      <button className="publish-btn" onClick={() => onSave(title, category, selectedPageId).then(onRefresh)}>
        <Icon icon={selectedPageId ? "ic:sharp-update" : "ic:baseline-publish"} width={20} />
        {selectedPageId ? "Update Page" : "Upload to Firebase"}
      </button>

      {selectedPageId && (
        <>
          <button className="publish-toggle-btn" onClick={handlePublishToggle}>
            <Icon icon="ic:baseline-visibility" width={20} />
            {currentPage?.published ? "Unpublish" : "Publish"}
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <Icon icon="ic:baseline-delete-outline" width={24} />
            Delete Page
          </button>
        </>
      )}
    </footer>
  );
};

export default ActionFooter;