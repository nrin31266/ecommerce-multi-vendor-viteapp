import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import Resizer from "react-image-file-resizer";
const resizeFile = (file: File): Promise<File> => {
  const MAX_SIZE = 200 * 1024; // 200 KB

  // Nếu ảnh nhỏ hơn 200KB thì không cần resize
  if (file.size <= MAX_SIZE) {
    return Promise.resolve(file);
  }

  return new Promise<File>((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      720,
      "WEBP", // Định dạng nhẹ hơn JPEG
      80,     // Giảm chất lượng để tối ưu size
      0,
      (resizedFile) => resolve(resizedFile as File),
      "file"
    );
  });
};
  

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No file selected");
  }

  const resizedFile = await resizeFile(file);

  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, resizedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress.toFixed(2)}% done`);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
