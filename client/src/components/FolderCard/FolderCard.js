import "./FolderCard.css";

import folderIcon from "../../assets/folder-icon.png";

export default function FolderCard({ folderAndFiles }) {
  console.log(folderAndFiles);
  return (
    <div className="folder-card">
      <img src={folderIcon} alt={folderAndFiles.folder} />
      <p className="folder-name">{folderAndFiles.folder}</p>
      <p className="file-length">{folderAndFiles.urls.length} files</p>
    </div>
  );
}
