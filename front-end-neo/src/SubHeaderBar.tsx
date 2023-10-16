import styled from "styled-components";
import React from "react";
import { IsClickedProps } from "./lib/interfaces";
import { useRouter } from "next/router";

const SubHeaderBar = () => {
  const router = useRouter();
  const { pathname } = router;

  const HomeSubHeaderBar = () => {
    return (
      <SubHeaderBarContainer>
        <HomeSubHeaderBarWrapper
          isClicked={pathname === "/home/onApplication"}
          onClick={() => {
            router.push("/home/onApplication");
          }}
        >
          OnApplication
        </HomeSubHeaderBarWrapper>
        <HomeSubHeaderBarWrapper
          isClicked={pathname === "/home/ongoing"}
          onClick={() => {
            router.push("/home/ongoing");
          }}
        >
          Ongoing
        </HomeSubHeaderBarWrapper>
      </SubHeaderBarContainer>
    );
  };

  //여기는 바뀌어야함.
  const MyChallengesSubHeaderBar = () => {
    return (
      <SubHeaderBarContainer>
        <MyChallengesSubHeaderBarWrapper
          isClicked={pathname === "/myChallenges/onApplication"}
          onClick={() => {
            router.push("/myChallenges/onApplication");
          }}
        >
          On Application
        </MyChallengesSubHeaderBarWrapper>
        <MyChallengesSubHeaderBarWrapper
          isClicked={pathname === "/myChallenges/ongoing"}
          onClick={() => {
            router.push("/myChallenges/ongoing");
          }}
        >
          Ongoing
        </MyChallengesSubHeaderBarWrapper>
        <MyChallengesSubHeaderBarWrapper
          isClicked={pathname === "/myChallenges/completed"}
          onClick={() => {
            router.push("/myChallenges/completed");
          }}
        >
          Completed
        </MyChallengesSubHeaderBarWrapper>
      </SubHeaderBarContainer>
    );
  };

  return (
    <>
      {pathname.startsWith("/home/") && <HomeSubHeaderBar />}
      {pathname.startsWith("/myChallenges/") && <MyChallengesSubHeaderBar />}
    </>
  );
};

export default SubHeaderBar;

const SubHeaderBarContainer = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    top: 68px;
    height: 30px;
  }
  position: fixed;
  z-index: 100;
  width: 100%;

  background-color: white;

  display: flex;

  /* border: 1px solid black;
    box-sizing: border-box; */
`;

const HomeSubHeaderBarWrapper = styled.div<IsClickedProps>`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
  }
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-weight: 500;
  color: #6f7789;

  border-bottom: ${(props) => (props.isClicked ? "1px solid #121212" : "none")};
  box-sizing: border-box;
`;

const MyChallengesSubHeaderBarWrapper = styled.div<IsClickedProps>`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
  }
  width: 33%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-weight: 500;
  color: #6f7789;

  border-bottom: ${(props) => (props.isClicked ? "1px solid #121212" : "none")};
  box-sizing: border-box;
`;
