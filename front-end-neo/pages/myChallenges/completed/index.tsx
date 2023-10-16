import styled from "styled-components";
import React from "react";

import { useEffect, useState } from "react";

import SubHeaderBar from "../../../src/SubHeaderBar";
import { SubHeaderBarPlaceholder } from "../../../src/PlaceHolder";

import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  isImageUploadedState,
  isPaybackReceivedState,
  userInfoIdState,
} from "../../../src/lib/states";
import { colors } from "../../../src/lib/colors";
import { MyStatusProps } from "../../../src/lib/interfaces";
import { getAllMyChallenges } from "../../../src/api/allMyChallenge";
import { getMyChallengeStatus } from "../../../src/api/myStatus";
import { daysBetweenDates } from "../../../src/lib/dates";

const MyChallengesCompleted = () => {
  const router = useRouter();
  const [isPaybackReceived, setIsPaybackReceived] = useRecoilState(
    isPaybackReceivedState
  );
  const [userInfoId, setUserInfoId] = useRecoilState(userInfoIdState);
  const [allMyUserChallengeIds, setAllMyUserChallengeIds] = useState([]);
  const [allMyChallenges, setAllMyChallenges] = useState<MyStatusProps[]>([]);

  const addObject = (obj: MyStatusProps) => {
    setAllMyChallenges((prevArray) => {
      // 이미 존재하는 객체인지 확인
      const exists = prevArray.some(
        (existingObj) => existingObj.userChallengeId === obj.userChallengeId
      );

      const statusIsCompleted = obj.challengeStatus == "completed";

      // 존재하지 않으면 추가
      if (!exists && statusIsCompleted) {
        return [...prevArray, obj];
      }

      // 존재하면 기존 배열을 그대로 반환
      return prevArray;
    });
  };

  const fetchData = async () => {
    const data = await getAllMyChallenges(userInfoId as string);
    setAllMyUserChallengeIds(data);

    const statusPromises = data.map((userChallengeId: string) =>
      getMyChallengeStatus(userChallengeId)
    );
    const statuses = await Promise.all(statusPromises);

    statuses.forEach((status) => addObject(status));
  };

  useEffect(() => {
    fetchData();
  }, []); // dependency 배열

  return (
    <>
      <Head>
        <title>My Challenges / SuperSquad</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SubHeaderBar />
      <SubHeaderBarPlaceholder />
      <Container>
        {allMyChallenges.map((myChallenge) => (
          <MyChallenge
            key={myChallenge.userChallengeId}
            myChallenge={myChallenge}
            isPaybackReceived={isPaybackReceived}
          />
        ))}
      </Container>
    </>
  );
};

export default MyChallengesCompleted;

const MyChallenge: React.FC<{
  myChallenge: MyStatusProps;
  isPaybackReceived: boolean;
}> = ({ myChallenge, isPaybackReceived }) => {
  const router = useRouter();
  const userChallengeId = myChallenge.userChallengeId;
  return (
    <MyChllengeWrapper
      onClick={() => {
        router.push(`/myChallenges/completed/${userChallengeId}`);
      }}
    >
      <MyChallengeThumbnail src="/pages/myChallenges/dietExSmall.svg" />
      <MyChallengeInfoWrapper>
        <MyChallengeTitle>{myChallenge.challengeName}</MyChallengeTitle>
        <MyChallengeDuration>
          {" "}
          {myChallenge.challengeVerificationFrequency}|{" "}
          {daysBetweenDates(
            myChallenge?.challengeEndsAt as string,
            myChallenge?.challengeStartsAt as string
          )}
        </MyChallengeDuration>
        {isPaybackReceived ? (
          <GrayButton
            onClick={() => {
              router.push(`/myChallenges/completed/${userChallengeId}`);
            }}
          >
            Mission Completed
          </GrayButton>
        ) : (
          <PurpleButton
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/myChallenges/completed/${userChallengeId}`);
            }}
          >
            Get Payback
          </PurpleButton>
        )}
      </MyChallengeInfoWrapper>
      <GoDetailButton src="/pages/myChallenges/goDetail.svg" alt="goDetail" />
    </MyChllengeWrapper>
  );
};

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

const MyChllengeWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 115px;
    border-radius: 20px;
    margin-top: 20px;
  }
  position: relative;

  background-color: #f6f6f6;
`;

const MyChallengeThumbnail = styled.img`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    left: 15px;
    top: 15px;
  }
  position: absolute;
`;

const MyChallengeInfoWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 188px;

    left: 122px;
    top: 15px;
  }
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const MyChallengeTitle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: 25px;

    font-size: 18px;
  }
  font-weight: 600;
  color: #121212;
`;

const MyChallengeDuration = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: 18px;

    font-size: 14px;

    margin-top: 4px;
  }
  font-weight: 400;
  color: #898989;
`;

const ValuesWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
  }
  height: 100%;
  width: 50%;

  /* border: 1px solid red;
  box-sizing: border-box; */
`;

const PurpleButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 171px;
    height: 34px;
    margin-top: 10px;

    font-size: 14px;
    font-weight: 400;

    border-radius: 50px;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  background-color: #8201ca;

  &:hover {
    background-color: #9c23d1;
  }

  color: white;
`;

const GrayButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 171px;
    height: 34px;
    margin-top: 10px;

    font-size: 14px;
    font-weight: 400;

    border-radius: 50px;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  background-color: #dadada;

  color: ${colors.black};
`;

const GoDetailButton = styled.img`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 5px;
    height: 10px;

    right: 12px;
    top: 50px;
  }
  position: absolute;
`;
