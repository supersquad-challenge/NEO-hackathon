import React, { ReactElement } from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import { colors } from "./lib/colors";
import {
  AllChallengeProps,
  ImageProps,
  IndexProps,
  OnClickProps,
} from "./lib/interfaces";
import { useRouter } from "next/router";
import { daysBetweenDates } from "./lib/dates";

interface ChallengesCarouselProps {
  data: AllChallengeProps[];
}

const ChallengesCarousel: React.FC<ChallengesCarouselProps> = ({ data }) => {
  const router = useRouter();
  const items: ReactElement[] = data.map((datum, index) => (
    <Challenge
      onClick={() => {
        router.push(`/challenges/${datum.challengeId}`);
      }}
      datum={datum}
      key={index}
    />
  ));

  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible={false}
      animation="slide"
      cycleNavigation={true}
    >
      {chunkArray([...items], 2).map((chunk, index) => (
        <Item key={index} chunk={chunk} />
      ))}
    </Carousel>
  );
};

export default ChallengesCarousel;

function chunkArray(
  myArray: ReactElement[],
  chunk_size: number
): ReactElement[][] {
  let results: ReactElement[][] = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

interface ItemProps {
  chunk: ReactElement[];
}

const Item: React.FC<ItemProps> = ({ chunk }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {chunk.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
interface ChallengeProps extends OnClickProps {
  datum: AllChallengeProps;
}

const Challenge = ({ onClick, datum }: ChallengeProps) => {
  return (
    <ChallengeWrapper onClick={onClick}>
      <ChallengeThumbnail imageUrl="/pages/home/dietThumbnail.svg" />
      <ChallengeTitle>{datum.challengeName}</ChallengeTitle>
      <ChallengePeriod>
        {datum.challengeStartsAt} -{datum.challengeEndsAt}
      </ChallengePeriod>
      <div
        style={{
          display: "flex",
          marginTop: "5px",
        }}
      >
        <ChallengeParticipants>
          {datum.challengeParticipantsCount} particiants
        </ChallengeParticipants>
        <ChallengeTotalDeposit>
          ${datum.challengeTotalDeposit}
        </ChallengeTotalDeposit>
      </div>
      <ChallengeTagContainer>
        <ChallengeTag index={0}>
          {datum.challengeVerificationFrequency}
        </ChallengeTag>
        <ChallengeTag index={1}>
          {daysBetweenDates(datum.challengeEndsAt, datum.challengeStartsAt)}
        </ChallengeTag>
      </ChallengeTagContainer>
    </ChallengeWrapper>
  );
  // return (
  //   <ChallengeWrapper onClick={onClick}>
  //     <ChallengeThumbnail imageUrl="/pages/home/dietThumbnail.svg" />
  //     <ChallengeTitle>Lose 4lbs</ChallengeTitle>
  //     <ChallengePeriod>Sep 11st - Oct 11st</ChallengePeriod>
  //     <div
  //       style={{
  //         display: "flex",
  //         marginTop: "5px",
  //       }}
  //     >
  //       <ChallengeParticipants>30 particiants</ChallengeParticipants>
  //       <ChallengeTotalDeposit>$3,800</ChallengeTotalDeposit>
  //     </div>
  //     <ChallengeTagContainer>
  //       <ChallengeTag index={0}>Everyday</ChallengeTag>
  //       <ChallengeTag index={1}>1 Month</ChallengeTag>
  //     </ChallengeTagContainer>
  //   </ChallengeWrapper>
  // );
};

const ChallengeWrapper = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    width: 160px;
    height: 165px;
  }
  color: ${colors.black};
  position: relative;

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeThumbnail: React.FC<ImageProps> = ({ imageUrl }) => {
  return (
    <div
      style={{
        width: "160px", // 원하는 크기로 설정
        height: "100px",
        overflow: "hidden", // 이미지 영역을 넘어가는 부분은 보이지 않도록 설정
      }}
    >
      <img
        src={imageUrl}
        alt="Cropped Image"
        style={{
          width: "160px",
          objectFit: "cover", // 이미지 비율에 맞게 잘리도록 설정
        }}
      />
    </div>
  );
};

const ChallengeTitle = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    width: 160px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 5px;
  }
  color: ${colors.black};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengePeriod = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    width: 160px;
    font-size: 10px;
    font-weight: 500;
    margin-top: 5px;
  }
  color: ${colors.gray};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeParticipants = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 10px;
    font-weight: 500;
    height: 12px;
  }
  color: ${colors.black};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeTotalDeposit = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 10px;
    font-weight: 500;
    margin-left: 10px;

    height: 12px;
  }
  color: ${colors.black};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeTagContainer = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    left: 6px;
    top: 8px;
  }
  width: fit-content;
  height: fit-content;

  color: ${colors.lightGray};

  display: flex;

  position: absolute;
  z-index: 1;

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeTag = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 8px;
    font-weight: 400;

    padding-left: 10px;
    padding-right: 10px;

    height: 16px;

    margin-right: 4px;

    border-radius: 10px;
  }
  background-color: ${(props) => props.index == 0 && colors.lightGray};
  background-color: ${(props) => props.index == 1 && colors.lightPurple};
  color: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* border: 1px solid green;
  box-sizing: border-box; */
`;
