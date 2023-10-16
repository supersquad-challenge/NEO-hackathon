import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { colors } from "../../src/lib/colors";
import { SetterOrUpdater, useRecoilState } from "recoil";
import {
  isPaidWithCrpytoState,
  registerChallengeIdState,
  userInfoIdState,
} from "../../src/lib/states";
import AfterPayment from "../../src/page/flow/AfterPayment";
import { registerMyChallenge } from "../../src/api/myChallengeRegister";
import dotenv from "dotenv";
import { useNeoWallets } from "../../src/context/NeoLine";

dotenv.config();

export default function ConnectWallet() {
  const [isPaidWithCrypto, setIsPaidWithCrypto] = useRecoilState(
    isPaidWithCrpytoState
  );
  const [userInfoId, setUserInfoId] = useRecoilState(userInfoIdState);
  const [registerChallengeId, setRegisterChallengeId] = useRecoilState(
    registerChallengeIdState
  );
  if (typeof registerChallengeId === "string" && isPaidWithCrypto) {
    // challengeId가 string 타입인지 확인
    registerMyChallenge(userInfoId, registerChallengeId);
  }

  return isPaidWithCrypto ? (
    <AfterPayment />
  ) : (
    <PayingWithCrypto setIsPaidWithCrypto={setIsPaidWithCrypto} />
  );
}

interface PayingWithCryptoProps {
  setIsPaidWithCrypto: SetterOrUpdater<boolean>;
}

//지갑을 연결하는 페이지
const PayingWithCrypto = ({ setIsPaidWithCrypto }: PayingWithCryptoProps) => {
  const { connectWallet } = useNeoWallets() as any;

  return (
    <Container>
      <ContinueWith>Continue With</ContinueWith>
      <CustomWallet>
        <div style={{ display: "flex", alignItems: "center" }}>
          <WalletImg src="/pages/flow/connectwallet/neoline.png" />
          <WalletName onClick={connectWallet}>NeoLine</WalletName>
        </div>
      </CustomWallet>
    </Container>
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

  /* background-color: red;
  border: 1px solid green;
  box-sizing: border-box; */
`;

const ContinueWith = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 25px;
    font-weight: 700;

    width: 345px;

    margin-top: 40px;
    margin-bottom: 40px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const CustomWallet = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 345px;
    height: 50px;

    border-radius: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  border: 1px solid ${colors.black};
`;

const WalletImg = styled.img`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 22px;
    height: 22px;
    border-radius: 8px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const WalletName = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 17px;
    margin-left: 5px;
  }
  font-weight: 600;
`;

const BlackButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 170px;
    height: 44px;

    border-radius: 40px;

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
