import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";
import { useRecoilState } from "recoil";
import { isSignedInState } from "../../src/lib/states";
import Image from "next/image";
import dynamic from "next/dynamic";

dotenv.config();

const GOOGLE_LOGIN_URL = process.env.GOOGLE_LOGIN_URL;


export default function Login() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      setIsMounted(true);
    }
  }, [])

  return (
    <>
      {isMounted && (
        <Container>
        
        <SignUpNSignInWithGoogle>Sign Up & Sign In</SignUpNSignInWithGoogle>
        <GoogleSignIn />
        </Container>
      )}

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

  /* background-color: red;
  border: 1px solid green;
  box-sizing: border-box; */
`;

const SignUpNSignInWithGoogle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 25px;
    font-weight: 700;

    width: 345px;

    margin-top: 40px;
    margin-bottom: 50px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const GoogleSignIn: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') { 
      setIsMounted(true);
    }
  }, [])
  return (
    <> {isMounted && (
        <GoogleButtonWrapper>
          <Image
            src="/pages/flow/connectwallet/btn_google_signin_light_normal_web@2x.png"
            alt="googleSignIn"
            width={300}
            height={70}
            onClick={() => {
              setIsSignedIn(true);
              console.log(isSignedIn);
              console.log("안녕");
              window.location.href = GOOGLE_LOGIN_URL!; // 외부 URL로 이동
            }}
          />
      </GoogleButtonWrapper>
    )}
    </>
  );
};

const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
