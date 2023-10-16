import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

export const getMyChallengeTotalStatus = async (userChallengeId: string) => {
  try {
    // const config = {
    //   headers: {
    //     Cookie: "cookie-session=your_session_value_here", // 세션 쿠키 값을 여기에 넣으세요
    //   },
    // };

    const response = await axios.get(
      `${API_BASE_URL}/myChallenge/totalStatus/${userChallengeId}`
    );

    if (response.status === 200) {
      //   console.log("Total status found:", response.data.totalStatus);
      return response.data.totalStatus;
    }
  } catch (error) {
    console.log(error);
  }
};
