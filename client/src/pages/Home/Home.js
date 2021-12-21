import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase/config";
import { useState } from "react";

export default function Home() {
  const { user } = useAuthContext();

  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
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
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        {user ? (
          <div>
            <h1>Welcome {user.displayName}</h1>
            <form style={{ marginTop: "2rem" }} onSubmit={formHandler}>
              <input type="file" />
              <button type="submit">Upload</button>
            </form>
            <h3 style={{ marginTop: "1rem" }}>Uploaded {progress}%</h3>
          </div>
        ) : (
          <div>
            <h2>HomePage</h2>
            <h3 style={{ marginTop: "2rem" }}>
              You need to sign in, in order to upload files
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
