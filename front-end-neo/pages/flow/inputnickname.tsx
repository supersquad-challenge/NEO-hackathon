//Sign Up & Sign In 했을 때 DB에 저장된 정보가 없는 경우(Sign Up)
import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { colors } from "../../src/lib/colors";

export default function InputNickname() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e: any) => {
    setNickname(e.target.value);
  };

  const handleClearInput = () => {
    setNickname("");
  };

  const [showWarning, setShowWaning] = useState(false);

  const handleSignUpButton = () => {
    if (nickname == "") {
      setShowWaning(true);
    } else {
      // console.log(nickname);
    }
  };

  return (
    <Container>
      <WhatIsYour>What is your Nickname?</WhatIsYour>
      <NicknameString>Nickname</NicknameString>
      <NicknameInputWrapper>
        <NicknameInput
          type="text"
          value={nickname}
          onChange={handleInputChange}
        />
        {nickname && <ClearButton onClick={handleClearInput}>x</ClearButton>}
      </NicknameInputWrapper>
      {showWarning && <WarningString>Please fill in to continue</WarningString>}
      <BlackFixedButton onClick={handleSignUpButton}>Sign Up</BlackFixedButton>
    </Container>
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

  /* background-color: red;
  border: 1px solid green;
  box-sizing: border-box; */
`;

const WhatIsYour = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 29px;
    font-weight: 600;

    width: 345px;

    margin-top: 40px;
    margin-bottom: 40px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const NicknameString = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 13px;
    font-weight: 400;

    width: 345px;
  }
  color: ${colors.gray};

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const NicknameInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const NicknameInput = styled.input`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 29px;
    font-weight: 400;

    width: 345px;
    height: 48px;

    margin-top: 10px;
    border-radius: 8px;
    padding-left: 5px;
  }

  color: ${colors.black};
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 53%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: red;
`;

const WarningString = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 13px;
    font-weight: 400;

    width: 345px;

    margin-top: 10px;
  }
  color: red;

  /* border: 1px solid black;
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
