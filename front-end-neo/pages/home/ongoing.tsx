import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { useRouter } from "next/router";
import SubHeaderBar from "../../src/SubHeaderBar";
import { SubHeaderBarPlaceholder } from "../../src/PlaceHolder";
import { AllChallengeProps } from "../../src/lib/interfaces";
import getAllChallenges from "../../src/api/allChallenge";
import { colors } from "../../src/lib/colors";
import ChallengesCarousel from "../../src/ChallengesCarousel";

export default function Ongoing() {
  const router = useRouter();
  const [allChallengesData, setAllChallengesData] = useState<
    AllChallengeProps[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = "YOUR_JWT_TOKEN_HERE";
      const data = await getAllChallenges(token);

      const ongoingChallenges = data.filter(
        (challenge: AllChallengeProps) =>
          challenge.challengeStatus === "ongoing"
      );
      setAllChallengesData(ongoingChallenges);
    };

    fetchData();
  }, []);
  // console.log(allChallengesData);

  return (
    <>
      <Head>
        <title>Home / SuperSquad</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SubHeaderBar />
      <SubHeaderBarPlaceholder />
      <Container>
        <ChallengeSection>
          <ChallengeTag>#Diet</ChallengeTag>
          <ChallengesCarousel data={allChallengesData} />
        </ChallengeSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    height: fit-content;
  }

  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: red; */
  /* border: 1px solid green;
    box-sizing: border-box; */
`;

const BlackButton = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    width: 151px;
    height: 44px;

    border-radius: 50px;

    margin-top: 20px;
  }

  background-color: #121212;
  &:hover {
    background-color: #3a3a3a;
  }

  color: white;

  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const ChallengeSection = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    height: 245px;
    margin-top: 20px;
    width: 90%;
  }

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeTag = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 30px;
    margin-bottom: 10px;
  }
  font-weight: 800;
  color: ${colors.black};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;
