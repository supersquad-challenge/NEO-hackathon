import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export default async function depositFunds(
  userChallengeId: string,
  depositAmount: number
) {
  const url = `${API_BASE_URL}/tx/deposit/`;
  //   const cookieValue = "your_cookie_value_here"; // 실제 쿠키 값으로 대체

  const parameters = {
    userChallengeId,
    depositMethod: "crypto",
    deposit: depositAmount,
  };

  try {
    // const response = await axios.post(url, parameters, {
    //   headers: {
    //     Cookie: `cookie-session=${cookieValue}`,
    //   },
    // });
    const response = await axios.post(url, parameters);

    if (response.status === 200) {
      console.log("정상적으로 deposit되었습니다.:", response.data);
    }
  } catch (error) {
    console.log(error);
  }
}
