import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Upload file lên Firebase Storage
 * @param file - File cần upload
 * @returns URL của file sau khi upload
 */
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    // 1️⃣ Tạo đường dẫn lưu trữ file trong Firebase Storage
    const fileRef = ref(storage, `ecommerce_project1/images/${Date.now()}-${file.name}`);

    // 2️⃣ Bắt đầu upload file
    const uploadTask = uploadBytesResumable(fileRef, file);

    // 3️⃣ Lắng nghe sự kiện upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress.toFixed(2)}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => reject(error), // 4️⃣ Bắt lỗi nếu upload thất bại
      async () => {
        // 5️⃣ Lấy URL sau khi upload thành công
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
