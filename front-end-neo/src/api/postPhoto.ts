import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

const postPhoto = async (
  userChallengeId: string,
  uploadedFile: object | null | string
) => {
  const url = `${API_BASE_URL}/verify/postPhoto`;
  //   const cookie = "cookie-session"; // Replace with your actual session cookie

  if (uploadedFile === null) {
    console.error("uploadFile is null");
    return;
  }
  const formData = new FormData();
  formData.append("userChallengeId", userChallengeId);
  if (uploadedFile instanceof File) {
    formData.append("veriPhoto", uploadedFile);
  } else if (uploadedFile instanceof Blob) {
    formData.append("veriPhoto", uploadedFile);
  } else {
    console.error("Unsupported type for uploadFile");
    return;
  }
  try {
    // const response = await axios.post(url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Cookie: cookie,
    //     ...formData.getHeaders(),
    //   },
    // });
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle success
    if (response.status === 200) {
      console.log("Photo uploaded:", response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default postPhoto;
