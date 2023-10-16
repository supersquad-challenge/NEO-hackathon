import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export default async function postPaybackClaimInfo(userChallengeId: string) {
  const url = `${API_BASE_URL}/tx/claim/`;
  //   const cookieValue = "your_cookie_value_here"; // 실제 쿠키 값으로 대체

  const parameters = {
    userChallengeId,
  };

  try {
    // const response = await axios.post(url, parameters, {
    //   headers: {
    //     Cookie: `cookie-session=${cookieValue}`,
    //   },
    // });
    const response = await axios.post(url, parameters);

    if (response.status === 200) {
      console.log("Payback provided:", response.data.paybackInfo);
    }
  } catch (error) {
    console.log(error);
  }
}
