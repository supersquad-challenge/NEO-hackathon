import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export default async function getUserChallengeIdByUserInfoIdNChallengeId(
  userInfoId: string,
  challengeId: string
) {
  const url = `${API_BASE_URL}/myChallenge/userChallengeId`;
  //   const cookieValue = "your_cookie_value_here"; // 실제 쿠키 값으로 대체

  const parameters = {
    userInfoId,
    challengeId,
  };

  try {
    // const response = await axios.post(url, parameters, {
    //   headers: {
    //     Cookie: `cookie-session=${cookieValue}`,
    //   },
    // });
    const response = await axios.post(url, parameters);

    if (response.status === 200) {
      console.log("성공 응답:", response.data.userChallengeId);
      return response.data.userChallengeId;
    }
  } catch (error) {
    console.log(error);
  }
}
