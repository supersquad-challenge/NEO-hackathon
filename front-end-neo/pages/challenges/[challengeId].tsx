import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  IsOpenProps,
  BackgroundColorProps,
  TitleContentProps,
  IndexProps,
  IsClickedProps,
  ChallengeByIdProps,
} from "../../src/lib/interfaces";
import { colors } from "../../src/lib/colors";
import ChallengeInfoModal from "../../src/page/challenges/ChallengeInfoModal";
import PaymentMethodModal from "../../src/page/challenges/PaymentMethodModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  paymentMethodState,
  registerChallengeIdState,
  registerUserChallengeIdState,
} from "../../src/lib/states";
import ChallengeInfoTable from "../../src/ChallengeInfoTable";
import { useRouter } from "next/router";
import { getChallengeInfo } from "../../src/api/challengeById";
import { daysBetweenDates } from "../../src/lib/dates";
import AfterPayment from "../../src/page/flow/AfterPayment";
import { getUserInfo } from "../../src/api/userInfo";

//PaymentMethodModal => ChallengeInfoModal

const IndividualChallenge = () => {
  const [isCashSelected, SetIsCashSelected] = useState(false);

  const [registerChallengeId, setRegisterChallengeId] = useRecoilState(
    registerChallengeIdState
  );

  const [isChallengeInfoModalOpen, setIsChallengeInfoModalOpen] =
    useState(false);

  const handleIAmInButtonClick = () => {
    // setIsChallengeInfoModalOpen(true);
    setIsPaymentMethodModalOpen(true);
  };
  let paymentMethod = useRecoilValue(paymentMethodState);

  //paymentMethodModal
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
    useState(false);

  const handleGoOnButtonClick = () => {
    if (paymentMethod !== "") {
      setIsPaymentMethodModalOpen(false);
      if (paymentMethod == "crypto") {
        setIsChallengeInfoModalOpen(true);
      }
      if (paymentMethod == "cash") {
        SetIsCashSelected(true);
      }
    }
  };

  const router = useRouter();
  const { challengeId } = router.query; // URL에서 challengeId 가져오기
  setRegisterChallengeId(challengeId as string);
  const [challengeInfo, setChallengeInfo] = useState<ChallengeByIdProps>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChallengeInfo(challengeId as string);
      setChallengeInfo(data);
    };
    if (challengeId !== undefined) {
      fetchData();
    }
  }, [challengeId]); // challengeId가 변경될 때마다 useEffect 실행

  return isCashSelected ? (
    <AfterPayment />
  ) : (
    <Container>
      <ChallengeThumbnailImage
        src="/pages/challenges/diet/miracleMorningEx.svg"
        alt="miracleMorningChallengeThumbnail"
      />
      <TagsContainer>
        <TagWrapper backgroundColor="#ECECEC">
          {challengeInfo?.challengeVerificationFrequency}
        </TagWrapper>
        <TagWrapper backgroundColor="#D6C0F0">
          {daysBetweenDates(
            challengeInfo?.challengeEndsAt as string,
            challengeInfo?.challengeStartsAt as string
          )}
        </TagWrapper>
      </TagsContainer>
      {isChallengeInfoModalOpen == false && (
        <>
          <ChallengeContainer>
            <ChallengeTitle>{challengeInfo?.challengeName}</ChallengeTitle>
            <div
              style={{
                marginTop: "5px",
                width: "345px",
                display: "flex",
              }}
            >
              <ChallengeParticipants>
                {challengeInfo?.challengeParticipantsCount} Paticipants
              </ChallengeParticipants>
              <ChallengeTotalDeposit>
                ${challengeInfo?.challengeTotalDeposit}
              </ChallengeTotalDeposit>
            </div>
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
          </ChallengeContainer>
          <BlackFixedButton onClick={handleIAmInButtonClick}>
            I am in!
          </BlackFixedButton>
        </>
      )}
      <PaymentMethodModal
        isPaymentMethodModalOpen={isPaymentMethodModalOpen}
        setIsPaymentMethodModalOpen={setIsPaymentMethodModalOpen}
        handleGoOnButtonClick={handleGoOnButtonClick}
      />

      <ChallengeInfoModal
        isChallengeInfoModalOpen={isChallengeInfoModalOpen}
        setIsChallengeInfoModalOpen={setIsChallengeInfoModalOpen}
      />
    </Container>
  );
};

export default IndividualChallenge;

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

const ChallengeContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: 380px;

    background-color: white;

    top: 290px;
  }

  position: absolute;

  width: 100%;

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
    margin-top: 20px;
    top: 230px;
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

const BlackFixedButton = styled.div`
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
