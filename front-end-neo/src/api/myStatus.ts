import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export const getMyChallengeStatus = async (userChallengeId: string) => {
  try {
    const url = `${API_BASE_URL}/myChallenge/myStatus/${userChallengeId}`;

    // const config = {
    //   headers: {
    //     Cookie: "cookie-session=your_session_cookie_here", // 세션 쿠키를 여기에 넣으세요
    //   },
    // };

    // const response = await axios.get(url, config);

    const response = await axios.get(url);

    if (response.status === 200) {
      // console.log("My status found:", response.data.myStatus);
      return response.data.myStatus;
    }
  } catch (error) {
    console.log(error);
  }
};
