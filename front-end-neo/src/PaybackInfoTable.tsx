import styled from "styled-components";
import {
  IndexProps,
  PaybackStatusProps,
  TitleContentProps,
} from "./lib/interfaces";
import { colors } from "./lib/colors";

const PaybackInfoTable = ({
  paybackInfo,
}: {
  paybackInfo: PaybackStatusProps;
}) => {
  return (
    <PaybackInfoContainer>
      <PaybackInfo
        index={1}
        title="Total Payback"
        content={`$${paybackInfo?.totalPayback.toFixed(2)}`}
      />
      <PaybackInfo
        index={2}
        title="Profit / Loss"
        content={`${paybackInfo?.profit.toFixed(2)}`}
      />

      <PaybackInfo
        index={3}
        title="Challenge Reward"
        content={`${paybackInfo?.challengeReward.toFixed(2)}%`}
      />
      <PaybackInfo
        index={4}
        title="Crypto Yield Boost"
        content={`${paybackInfo?.cryptoYieldBoost.toFixed(2)}%`}
      />
    </PaybackInfoContainer>
  );
};

export default PaybackInfoTable;

interface IndexTitleContentProps extends IndexProps, TitleContentProps {}

const PaybackInfo = ({ index, title, content }: IndexTitleContentProps) => {
  return (
    <PaybackInfoWrapper index={index}>
      <PaybackInfoTitle>{title}</PaybackInfoTitle>
      <PaybackInfoContent style={{ whiteSpace: "pre-line" }} index={index}>
        {content}
      </PaybackInfoContent>
    </PaybackInfoWrapper>
  );
};

const PaybackInfoContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 30px;
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

const PaybackInfoWrapper = styled.div<IndexProps>`
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

  background-color: ${(props) =>
    props.index == 1 ? `${colors.blockPurple}` : "white"};
`;

const PaybackInfoTitle = styled.div`
  /* @media (max-width: 2160px) {
  } */
  @media (max-width: 576px) {
    font-size: 14px;
    font-weight: 600;
    margin-left: 16px;
    margin-top: 12px;
  }
  width: fit-content;
  color: black;

  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const PaybackInfoContent = styled.div<IndexProps>`
  /* @media (max-width: 2160px) {
  } */
  @media (max-width: 576px) {
    font-size: 36px;
    font-weight: 800;
    margin-left: 16px;
    margin-top: 10px;
  }
  width: fit-content;
  color: ${(props) =>
    props.index == 4 ? `${colors.darkPurple}` : `${colors.black}`};

  /* border: 1px solid green;
  box-sizing: border-box; */
`;
