import "./AddFile.css";

import FolderCard from "../FolderCard/FolderCard";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
export default function AddFile({ folders, gettingFolders, listFile }) {
  const [foldersAndFiles, setFoldersAndFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  // {gettingFolders
  //   ? "loading..."
  //   : folders.length < 1
  //   ? "klasör bulunmamaktadır."
  //   : ""}
  // {folders &&
  //   folders.map((folderName, i) => (
  //     <div key={i}>
  //       <button onClick={() => setSelectedFolder(folderName)}>
  //         <i className="fas fa-folder"></i>
  //       </button>
  //       <p style={{ fontSize: "16px" }} key={folderName}>
  //         {folderName}
  //       </p>
  //     </div>
  //   ))}

  useEffect(() => {
    if (!gettingFolders) {
      setLoading(true);
      folders.forEach((folder) => {
        const urls = listFile(`${user.uid}/${folder}`);
        setFoldersAndFiles((prevFoldersAndFiles) => {
          return [...prevFoldersAndFiles, { folder, urls }];
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  }, [gettingFolders]);

  console.log(foldersAndFiles);

  return (
    <div className="add-file">
      <h3>Dosya Yükle</h3>
      <div className="my-hr"></div>
      <h4>Klasör Seç</h4>
      <div className="folder-card-wrapper">
        {loading && "loading..."}
        {!loading &&
          foldersAndFiles.map((folderAndFiles) => (
            <FolderCard
              key={folderAndFiles.folder}
              folderAndFiles={folderAndFiles}
            />
          ))}
      </div>
    </div>
  );
}
