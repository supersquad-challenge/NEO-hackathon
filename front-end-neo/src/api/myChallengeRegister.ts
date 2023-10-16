import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

export const registerMyChallenge = async (
  userInfoId: string,
  challengeId: string
) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 여기에 필요한 경우 추가 헤더를 넣을 수 있습니다.
    //   },
    //   withCredentials: true, // 쿠키를 첨부하기 위해 이 옵션을 true로 설정
    // };

    const body = {
      userInfoId,
      challengeId,
    };

    // const response = await axios.post(
    //   "http://52.65.222.108:8080/myChallenge/register",
    //   body,
    //   config
    // );

    const response = await axios.post(
      `${API_BASE_URL}/myChallenge/register`,
      body
    );

    if (response.status === 200) {
      // console.log("My challenge registered:", response.data.userChallengeId);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
