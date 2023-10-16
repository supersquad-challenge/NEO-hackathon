import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

// JWT 토큰을 인자로 받아서 사용
const getAllChallenges = async (token: string) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // const response = await api.get("/challenge", config); // api 인스턴스 사용
    const response = await axios.get(`${API_BASE_URL}/challenge`); // api 인스턴스 사용

    if (response.status === 200) {
      return response.data.challenges;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAllChallenges;
