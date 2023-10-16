import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export const getChallengeInfo = async (challengeId: string) => {
  const url = `${API_BASE_URL}/challenge/${challengeId}`;
  //   const cookieSession = "YOUR_COOKIE_SESSION_VALUE_HERE";

  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     Cookie: `cookie-session=${cookieSession}`,
    //   },
    // });
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data.challengeInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
