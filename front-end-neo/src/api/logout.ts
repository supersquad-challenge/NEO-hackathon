import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

const logout = async (userInfoId: string) => {
  const url = `${API_BASE_URL}/user/${userInfoId}`;
  //   const cookie = "cookie-session"; // Replace with your actual session cookie

  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     Cookie: cookie,
    //   },
    // });
    const response = await axios.get(url);

    // Handle success
    if (response.status === 200) {
      console.log("Logout successful:", response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default logout;
