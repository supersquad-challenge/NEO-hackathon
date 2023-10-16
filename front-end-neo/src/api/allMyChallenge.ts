import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export const getAllMyChallenges = async (userInfoId: string) => {
  try {
    const url = `${API_BASE_URL}/myChallenge/allMychallenge/${userInfoId}`;
    // const config = {
    //   headers: {
    //     Cookie: "cookie-session=your_session_cookie_here", // 세션 쿠키를 여기에 넣으세요
    //   },
    // };

    // const response = await axios.post(url, {}, config);
    const response = await axios.get(url, {});

    if (response.status === 200) {
      // console.log("My challenge found:", response.data.userChallengeId);
      return response.data.userChallengeId;
    }
  } catch (error) {
    console.log(error);
  }
};
