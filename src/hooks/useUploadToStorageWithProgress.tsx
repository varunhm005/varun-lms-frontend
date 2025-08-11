// Hook to upload files to Firebase Storage
// https://firebase.google.com/docs/storage/web/upload-files

import { useState } from 'react';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from '../configs/firebase';

export default function useUploadToStorageWithProgress() {
  const [uploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState('');

  const [url, setUrl] = useState('');

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(prog);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return { uploading, progress, error, url, uploadFile };
}
