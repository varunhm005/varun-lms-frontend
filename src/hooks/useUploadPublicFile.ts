import { ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { storage } from '../configs/firebase';
import { useMakeFilePublicMutation } from '../graphql/@generated/graphql';

export const useUploadPublicFile = () => {
  const [makePublic] = useMakeFilePublicMutation();
  const [loading, setLoading] = useState(false);

  const uploadPublicFile = async (image: File) => {
    try {
      const id = nanoid(5);
      setLoading(true);
      const imagesRef = ref(storage, `public/${id}_-_${image.name}`);
      await uploadBytes(imagesRef, image);
      const result = await makePublic({
        variables: {
          path: imagesRef.fullPath,
        },
      });

      return result.data!.makeFilePublic.url;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return { uploadPublicFile, loading };
};
