import { useState, useEffect } from "react";
import { storage } from "../../firebase/config";

import Navbar from "../../components/Navbar/Navbar";
import AddFile from "../../components/AddFile/AddFile";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import ProgressBar from "@ramonak/react-progress-bar";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "@firebase/storage";

import "./Home.css";

export default function Home() {
  let navigate = useNavigate();

  const { user } = useAuthContext();

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [progress, setProgress] = useState(0);

  const [folderName, setFolderName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [gettingFolders, setGettingFolders] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    if (!selectedFolder) {
      setUploadError("lütfen dosyanın yükleneceği klasörü seçiniz");
      return;
    }
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(
      storage,
      `${user.uid}/${selectedFolder}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
    setUploadError("");
    setSelectedFolder("");
    listFolders();
  };

  const listFile = (fileName) => {
    const urls = [];
    const listRef = ref(storage, fileName);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(ref(storage, itemRef)).then((url) => {
            urls.push(url);
            // setFiles((prevFiles) => {
            //   return [
            //     ...prevFiles,
            //     {
            //       name: itemRef._location.path_.substring(fileName.length + 1),
            //       downloadUrl: url,
            //     },
            //   ];
            // });
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    return urls;
  };

  const listFolders = () => {
    setGettingFolders(true);
    const listRef = ref(storage, user.uid);
    listAll(listRef).then((res) => {
      res.prefixes.forEach((folderRef) => {
        setFolders((prevFolders) => {
          return [
            ...prevFolders,
            folderRef._location.path_.substring(user.uid.length + 1),
          ];
        });
      });
      setGettingFolders(false);
    });
  };

  const onKlasorSubmit = (e) => {
    e.preventDefault();
    setUploadError("");
    setSelectedFolder(folderName);
    setFolderName("");
  };

  useEffect(() => {
    if (user) {
      listFolders();
      listFile();
    } else {
      navigate("signin");
    }
  }, []);

  return (
    <div>
      <div className="home-container" style={{ textAlign: "center" }}>
        {user && (
          <>
            <Navbar />
            <div className="home-left">
              <h3>Dosya Yükle</h3>
              <div className="folders-wrapper">
                {gettingFolders
                  ? "loading..."
                  : folders.length < 1
                  ? "klasör bulunmamaktadır."
                  : ""}
                {folders &&
                  folders.map((folderName, i) => (
                    <div key={i}>
                      <button onClick={() => setSelectedFolder(folderName)}>
                        <i className="fas fa-folder"></i>
                      </button>
                      <p style={{ fontSize: "16px" }} key={folderName}>
                        {folderName}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="klasorForm">
                <form onSubmit={onKlasorSubmit}>
                  <label style={{ fontSize: "18px" }}>
                    Yeni Klasör
                    <input
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      style={{ marginLeft: ".5rem" }}
                      type="text"
                    ></input>
                  </label>
                  <button type="submit" className="btn btn-klasor">
                    ekle
                  </button>
                </form>
              </div>
              <p style={{ fontSize: "18px" }}>
                Eklenecek Klasör : {selectedFolder}
              </p>
              <form onSubmit={formHandler}>
                <input type="file" />
                <button type="submit">Upload</button>
              </form>

              <div
                style={{
                  marginTop: "20px",
                  width: "50%",
                  border: "1px solid #0186f7",
                  borderRadius: "20px",
                }}
              >
                <ProgressBar completed={progress} />
              </div>
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
            </div>
            {/* <div className="home-right">
              <h2>Dosyalar</h2>
              {files.map((file) => (
                <div style={{ marginTop: "2rem" }} key={file.downloadUrl}>
                  <p>{file.name}</p>
                  <a target="_blank" rel="noreferrer" href={file.downloadUrl}>
                    download
                  </a>
                </div>
              ))}
            </div> */}
            <AddFile
              folders={folders}
              gettingFolders={gettingFolders}
              listFile={listFile}
            />
          </>
        )}
      </div>
    </div>
  );
}
