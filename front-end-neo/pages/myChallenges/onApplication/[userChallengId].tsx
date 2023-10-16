import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import {
  IsOpenProps,
  BackgroundColorProps,
  TitleContentProps,
  IndexProps,
  IsClickedProps,
  HeightTypeProps,
  MyStatusProps,
  TotalStatusProps,
  ChallengeByIdProps,
} from "../../../src/lib/interfaces";

import { colors } from "../../../src/lib/colors";
import ChallengeInfoTable from "../../../src/ChallengeInfoTable";
import { useRouter } from "next/router";
import { getMyChallengeStatus } from "../../../src/api/myStatus";
import { daysBetweenDates } from "../../../src/lib/dates";
import { getMyChallengeTotalStatus } from "../../../src/api/totalStatus";
import { getChallengeInfo } from "../../../src/api/challengeById";

const IndividualMyChallengeOnApplication = () => {
  const [selectedMiddleBar, setSelctedMiddleBar] = useState("My");

  const [myChallengeStatus, setMyChallengeStatus] = useState<MyStatusProps>();
  const router = useRouter();
  const asPath = router.asPath;
  const parts = asPath.split("/");
  const userChallengeId = parts[parts.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      setMyChallengeStatus(
        await getMyChallengeStatus(userChallengeId as string)
      );
    };
    fetchData();
  }, [userChallengeId]); // challengeId가 변경될 때마다 useEffect 실행

  return (
    <Container heightType={selectedMiddleBar}>
      <ChallengeThumbnailImage
        src="/pages/challenges/diet/miracleMorningEx.svg"
        alt="miracleMorningChallengeThumbnail"
      />
      <TagsContainer>
        <TagWrapper backgroundColor="#ECECEC">
          {myChallengeStatus?.challengeVerificationFrequency}
        </TagWrapper>
        <TagWrapper backgroundColor="#D6C0F0">
          {daysBetweenDates(
            myChallengeStatus?.challengeEndsAt as string,
            myChallengeStatus?.challengeStartsAt as string
          )}
        </TagWrapper>
      </TagsContainer>
      <ChallengeContainer heightType={selectedMiddleBar}>
        <ChallengeTitle>{myChallengeStatus?.challengeName}</ChallengeTitle>
        <div
          style={{
            marginTop: "5px",
            width: "345px",
            display: "flex",
          }}
        >
          <ChallengeParticipants>
            {myChallengeStatus?.challengeParticipantsCount} Paticipants
          </ChallengeParticipants>
          <ChallengeTotalDeposit>
            ${myChallengeStatus?.challengeTotalDeposit}
          </ChallengeTotalDeposit>
        </div>
        <MiddleBarContainer>
          <MiddleBarWrapper
            isClicked={selectedMiddleBar === "My"}
            onClick={() => {
              setSelctedMiddleBar("My");
            }}
          >
            My
          </MiddleBarWrapper>
          <MiddleBarWrapper
            isClicked={selectedMiddleBar === "Total"}
            onClick={() => {
              setSelctedMiddleBar("Total");
            }}
          >
            Total
          </MiddleBarWrapper>
          <MiddleBarWrapper
            isClicked={selectedMiddleBar === "About"}
            onClick={() => {
              setSelctedMiddleBar("About");
            }}
          >
            About
          </MiddleBarWrapper>
        </MiddleBarContainer>
        {selectedMiddleBar == "My" && (
          <My myChallengeStatus={myChallengeStatus!} />
        )}
        {selectedMiddleBar == "Total" && (
          <Total userChallengeId={userChallengeId} />
        )}
        {selectedMiddleBar == "About" && (
          <About challengeId={myChallengeStatus?.challengeId as string} />
        )}
      </ChallengeContainer>
      <GrayFixedButton>Starting Soon</GrayFixedButton>
    </Container>
  );
};

export default IndividualMyChallengeOnApplication;

const My = ({ myChallengeStatus }: { myChallengeStatus: MyStatusProps }) => {
  return (
    <>
      <StatusTitle>My Status</StatusTitle>
      <MyStatusWrapper>
        <MyStatusSmallTitle index={0}>My Success Rate</MyStatusSmallTitle>
        <MyStautsSmallContent index={0}>
          {myChallengeStatus?.successRate}%
        </MyStautsSmallContent>
        <MyStatusSmallTitle index={1}>Target Success</MyStatusSmallTitle>
        <MyStautsSmallContent index={1}>100%</MyStautsSmallContent>
        <ProgressBar percentage={myChallengeStatus?.successRate}></ProgressBar>
      </MyStatusWrapper>
      <MyStatusWrapper>
        <MyStatusSmallTitle index={0}>Your Deposit</MyStatusSmallTitle>
        <MyStautsSmallContent index={0}>
          {" "}
          ${myChallengeStatus?.deposit}
        </MyStautsSmallContent>
        <MyStatusSmallTitle index={1}>Availability</MyStatusSmallTitle>
        <MyStautsSmallContent index={1}>23h 55m 50s</MyStautsSmallContent>
      </MyStatusWrapper>
    </>
  );
};

const Total = ({ userChallengeId }: { userChallengeId: string }) => {
  const [myChallengeTotalStatus, setMyChallengeTotalStatus] =
    useState<TotalStatusProps>();
  useEffect(() => {
    const fetchData = async () => {
      setMyChallengeTotalStatus(
        await getMyChallengeTotalStatus(userChallengeId as string)
      );
    };
    fetchData();
  }, [userChallengeId]); // challengeId가 변경될 때마다 useEffect 실행
  return (
    <>
      <StatusTitle>Total Status</StatusTitle>
      <TotalStatusWrapperGradient>
        <TotalStatusSmallTitle index={0}>
          Total Crypto Deposit
        </TotalStatusSmallTitle>
        <TotalStautsSmallContent index={0}>
          ${myChallengeTotalStatus?.challengeCryptoDeposit}
        </TotalStautsSmallContent>
        <TotalStatusSmallTitle index={1}>
          Crypto Yield Boost
        </TotalStatusSmallTitle>
        <TotalStautsSmallContent index={1}>
          +${myChallengeTotalStatus?.cryptoYieldBoost}
        </TotalStautsSmallContent>
      </TotalStatusWrapperGradient>
      <TotalStatusTwoBlocksWrapper>
        <TotalStatusWrapperOneOfTwoBlocks>
          <TotalStatusSmallTitleOneOfTwoBlocks>
            Over 80% Pool
          </TotalStatusSmallTitleOneOfTwoBlocks>
          <TotalStautsSmallContentOneOfTwoBlocks>
            ${myChallengeTotalStatus?.cryptoSuccessPool}
          </TotalStautsSmallContentOneOfTwoBlocks>
        </TotalStatusWrapperOneOfTwoBlocks>
        <TotalStatusWrapperOneOfTwoBlocks>
          <TotalStatusSmallTitleOneOfTwoBlocks>
            Undere 80% Pool
          </TotalStatusSmallTitleOneOfTwoBlocks>
          <TotalStautsSmallContentOneOfTwoBlocks>
            ${myChallengeTotalStatus?.cryptoFailPool}
          </TotalStautsSmallContentOneOfTwoBlocks>
        </TotalStatusWrapperOneOfTwoBlocks>
      </TotalStatusTwoBlocksWrapper>
      <TotalStatusWrapperLightPurple>
        <TotalStatusSmallTitle index={0}>
          Total Cash Deposit
        </TotalStatusSmallTitle>
        <TotalStautsSmallContent index={0}>
          ${myChallengeTotalStatus?.challengeTotalDeposit}
        </TotalStautsSmallContent>
      </TotalStatusWrapperLightPurple>
    </>
  );
};

const About = ({ challengeId }: { challengeId: string }) => {
  const [challengeInfo, setChallengeInfo] = useState<ChallengeByIdProps>();
  useEffect(() => {
    const fetchData = async () => {
      setChallengeInfo(await getChallengeInfo(challengeId as string));
    };
    fetchData();
  }, []); // challengeId가 변경될 때마다 useEffect 실행
  return (
    <>
      <StatusTitle>Info</StatusTitle>
      <ChallengeInfoTable
        challengeStartsAt={challengeInfo?.challengeStartsAt as string}
        challengeEndsAt={challengeInfo?.challengeEndsAt as string}
        challengeVerificationMethod={
          challengeInfo?.challengeVerificationMethod as string
        }
        challengeVerificationFrequency={
          challengeInfo?.challengeVerificationFrequency as string
        }
        cryptoYield={challengeInfo?.cryptoYield as number}
      />
      <StatusTitle>Description</StatusTitle>
      <Description>Snap your scale!!</Description>
    </>
  );
};

const Container = styled.div<HeightTypeProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: ${(props) => props.heightType == "My" && "380px"};
    height: ${(props) => props.heightType == "Total" && "750px"};
    height: ${(props) => props.heightType == "About" && "780px"};
  }

  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;

  /* background-color: red;
  border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeThumbnailImage = styled.img`
  position: absolute;
  width: 100%;

  top: 0px;
`;

const ChallengeContainer = styled.div<HeightTypeProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    /* height: 380px; */
    height: ${(props) => props.heightType == "My" && "380px"};
    height: ${(props) => props.heightType == "Total" && "490px"};

    top: 178px;
  }

  position: absolute;

  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagsContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 27px;
    top: 140px;
  }
  position: absolute;
  width: 100%;
  display: flex;
  z-index: 1;

  /* box-sizing: content-box;
  background-color: red;
  border: 1px solid black; */
`;

const TagWrapper = styled.div<BackgroundColorProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 3px;

    margin-right: 10px;

    height: 27px;

    border-radius: 10px;

    font-size: 14px;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
`;

const ChallengeTitle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    font-weight: 600;

    width: 345px;

    margin-top: 20px;
  }

  width: fit-content;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ChallengeParticipants = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    font-size: 14px;
    padding-right: 12px;
  }
  //border-right 설정해야 함.
  border-right: 1px solid black;
  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeTotalDeposit = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    font-size: 14px;
    margin-left: 12px;
  }
  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const GrayFixedButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 60px;

    border-radius: 20px;

    margin-bottom: 14px;
  }

  position: fixed;
  bottom: 0px;

  background-color: #dadada;
  &:hover {
    /* background-color: #3a3a3a; */
  }

  color: ${colors.black};

  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const MiddleBarContainer = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    /* top: 250px; */
    height: 30px;
    margin-top: 20px;
  }
  /* position: fixed;
  z-index: 100; */
  width: 100%;

  background-color: white;

  display: flex;

  /* border: 1px solid black;
    box-sizing: border-box; */
`;

const MiddleBarWrapper = styled.div<IsClickedProps>`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
  }
  width: 33.3%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-weight: 500;
  color: #6f7789;

  border-bottom: ${(props) =>
    props.isClicked
      ? `2px solid ${colors.black}`
      : `2px solid ${colors.lightGray}`};
  box-sizing: border-box;
`;

const StatusTitle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    font-weight: 800;

    width: 345px;

    margin-top: 20px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const MyStatusWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 95px;
    border-radius: 20px;
    margin-top: 10px;
  }
  background-color: ${colors.blockGray};
  position: relative;
  display: flex;
  justify-content: center;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const MyStatusSmallTitle = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
    font-weight: 500;
    top: 15px;
    left: ${(props) => props.index == 0 && "24px"};
    right: ${(props) => props.index == 1 && "24px"};
  }
  color: ${colors.black};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const MyStautsSmallContent = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    font-weight: 600;
    bottom: 15px;
    left: ${(props) => props.index == 0 && "24px"};
    right: ${(props) => props.index == 1 && "24px"};
  }
  color: ${colors.black};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ProgressBarContainer = styled.div`
  width: 140px;
  height: 20px;
  background-color: ${colors.gray};
  border-radius: 10px;
  bottom: 21px;
  position: absolute;
`;

const Filler = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${colors.darkPurple};
  border-radius: inherit;
  text-align: right;
`;

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <ProgressBarContainer>
      <Filler percentage={percentage}>
        {/* {percentage > 5 && `${percentage}%`} */}
      </Filler>
    </ProgressBarContainer>
  );
};

const TotalStatusWrapperGradient = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 95px;
    border-radius: 20px;
    margin-top: 10px;
  }
  background: linear-gradient(to right, #d6c0f0, #8a01d7);
  position: relative;
  display: flex;
  justify-content: center;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStatusSmallTitle = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
    font-weight: 500;
    top: 15px;
    left: ${(props) => props.index == 0 && "24px"};
    right: ${(props) => props.index == 1 && "24px"};
  }
  color: ${(props) => props.index == 0 && `${colors.black}`};
  color: ${(props) => props.index == 1 && "white"};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStautsSmallContent = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    font-weight: 600;
    bottom: 15px;
    left: ${(props) => props.index == 0 && "24px"};
    right: ${(props) => props.index == 1 && "24px"};
  }
  color: ${(props) => props.index == 0 && `${colors.black}`};
  color: ${(props) => props.index == 1 && "white"};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStatusTwoBlocksWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    margin-top: 10px;
  }
  display: flex;
  justify-content: space-between;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStatusWrapperOneOfTwoBlocks = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 168px;
    height: 95px;
    border-radius: 20px;
  }
  background: ${colors.blockGray};
  position: relative;
  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStatusSmallTitleOneOfTwoBlocks = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
    font-weight: 500;
    top: 15px;
    left: 24px;
  }
  color: ${colors.black};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStautsSmallContentOneOfTwoBlocks = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    font-weight: 600;
    bottom: 15px;
    left: 24px;
  }
  color: ${colors.black};
  position: absolute;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const TotalStatusWrapperLightPurple = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 95px;
    border-radius: 20px;
    margin-top: 10px;
  }
  background: ${colors.blockPurple};
  position: relative;
  display: flex;
  justify-content: center;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const Description = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 330px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
  }
`;
