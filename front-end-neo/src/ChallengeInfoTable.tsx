import styled from "styled-components";
import { IndexProps, TitleContentProps } from "./lib/interfaces";
import { colors } from "./lib/colors";
interface ChallengeInfoTableProps {
  challengeStartsAt: string;
  challengeEndsAt: string;
  challengeVerificationMethod: string;
  challengeVerificationFrequency: string;
  cryptoYield: number;
}

const ChallengeInfoTable = ({
  challengeStartsAt,
  challengeEndsAt,
  challengeVerificationMethod,
  challengeVerificationFrequency,
  cryptoYield,
}: ChallengeInfoTableProps) => {
  if (challengeVerificationMethod == "photo verification") {
    challengeVerificationMethod = "Take a picture";
  }
  return (
    <ChallengeInfoContainer>
      <ChallengeInfo
        index={1}
        title="Schedule"
        content={`${challengeStartsAt} - ${challengeEndsAt}`}
        // content={"Sep 11st -\nOct 11st"}
      />
      <ChallengeInfo
        index={2}
        title="How To"
        content={challengeVerificationMethod}
        // content="Take a picture"
      />

      <ChallengeInfo
        index={3}
        title="Complete"
        content={challengeVerificationFrequency}
      />
      <ChallengeInfo
        index={4}
        title="CryptoYield+"
        content={`+${cryptoYield}%`}
        // content="+1.86%"
      />
    </ChallengeInfoContainer>
  );
};

export default ChallengeInfoTable;

interface IndexTitleContentProps extends IndexProps, TitleContentProps {}

const ChallengeInfo = ({ index, title, content }: IndexTitleContentProps) => {
  return (
    <ChallengeInfoWrapper index={index}>
      <ChallengeInfoTitle>{title}</ChallengeInfoTitle>
      <ChallengeInfoContent style={{ whiteSpace: "pre-line" }} index={index}>
        {content}
      </ChallengeInfoContent>
    </ChallengeInfoWrapper>
  );
};

const ChallengeInfoContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 20px;
    height: 200px;
    width: 330px;
  }
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  background-color: ${colors.paleGray};
  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ChallengeInfoWrapper = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
  } */
  @media (max-width: 576px) {
    width: 160px;
    height: 95px;

    border-radius: 20px;
  }
  left: ${(props) => [1, 3].includes(props.index) && "0px"};
  right: ${(props) => [2, 4].includes(props.index) && "0px"};
  top: ${(props) => [1, 2].includes(props.index) && "0px"};
  bottom: ${(props) => [3, 4].includes(props.index) && "0px"};

  position: absolute;

  background-color: white;
`;

const ChallengeInfoTitle = styled.div`
  /* @media (max-width: 2160px) {
  } */
  @media (max-width: 576px) {
    font-size: 14px;
    font-weight: 400;
    margin-left: 16px;
    margin-top: 12px;
  }
  width: fit-content;
  color: black;

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeInfoContent = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
  } */
  @media (max-width: 576px) {
    font-size: 18px;
    font-weight: 600;
    margin-left: 16px;
    margin-top: 10px;
  }
  width: fit-content;
  color: ${(props) =>
    props.index == 4 ? `${colors.darkPurple}` : `${colors.black}`};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;
