import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { useRouter } from "next/router";
import SubHeaderBar from "../../src/SubHeaderBar";
import { SubHeaderBarPlaceholder } from "../../src/PlaceHolder";
import { colors } from "../../src/lib/colors";

import ChallengesCarousel from "../../src/ChallengesCarousel";
import NavigationBar from "../../src/NavigationBar";
import axios from "axios";
import getAllChallenges from "../../src/api/allChallenge";
import { AllChallengeProps } from "../../src/lib/interfaces";

export default function OnApplication() {
  const router = useRouter();
  const [allChallengesData, setAllChallengesData] = useState<
    AllChallengeProps[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = "YOUR_JWT_TOKEN_HERE";
      const data = await getAllChallenges(token);

      const onApplicationChallenges = data.filter(
        (challenge: AllChallengeProps) =>
          challenge.challengeStatus === "onApplication"
      );
      setAllChallengesData(onApplicationChallenges);
    };

    fetchData();
  }, []);
  // console.log(allChallengesData);

  ////
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
