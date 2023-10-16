import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

export default async function getPaybackInfo(userChallengeId: string) {
  //   const cookieValue = 'your_cookie_value_here'; // 실제 쿠키 값으로 대체

  const url = `${API_BASE_URL}/myChallenge/payback/${userChallengeId}`;

  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     Cookie: `cookie-session=${cookieValue}`,
    //   },
    // });
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data.payback;
    }
  } catch (error) {
    console.log(error);
  }
}
