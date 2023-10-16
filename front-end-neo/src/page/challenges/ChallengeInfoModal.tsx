import styled from "styled-components";
import DepositSlider from "../../DepositSlider";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  depositAmountState,
  paymentMethodState,
  registerChallengeIdState,
  userInfoIdState,
} from "../../lib/states";
import { IsOpenProps } from "../../lib/interfaces";
import { useRouter } from "next/router";
import depositFunds from "../../api/depositInfo";
import getUserChallengeIdByUserInfoIdNChallengeId from "../../api/userChallengeId";

interface ChallengeInfoModalProps {
  isChallengeInfoModalOpen: boolean;
  setIsChallengeInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChallengeInfoModal = ({
  isChallengeInfoModalOpen,
  setIsChallengeInfoModalOpen,
}: ChallengeInfoModalProps) => {
  const handleXButtonClick = () => {
    setIsChallengeInfoModalOpen(false);
  };
  const paymentMethod = useRecoilValue(paymentMethodState);
  const [depositAmount, setDepositAmount] = useRecoilState(depositAmountState);
  const calculatedDepositAmount = depositAmount * 10 ** 6;

  const [userInfoId, setUserInfoId] = useRecoilState(userInfoIdState);
  const [registerChallengeId, setRegisterChallengeId] = useRecoilState(
    registerChallengeIdState
  );

  const router = useRouter();

  async function updateDeposit() {
    router.push("/flow/connectwallet");
    console.log(userInfoId);
    console.log(registerChallengeId);
    const userChallengId = await getUserChallengeIdByUserInfoIdNChallengeId(
      userInfoId,
      registerChallengeId
    );
    await depositFunds(userChallengId, depositAmount);
  }

  const handleChargeDepositButtonClick = () => {
    if (paymentMethod == "crypto") {
      updateDeposit();
    }
    // else if (paymentMethod=="cash") //여기에 이제 payment 붙여야 함
  };

  return (
    <Modal isOpen={isChallengeInfoModalOpen}>
      <img
        src="/pages/challenges/diet/x.svg"
        width={24}
        height={24}
        style={{ left: 24, top: 24, position: "absolute" }}
        onClick={handleXButtonClick}
      />
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          marginTop: 44.5,

          height: 44.5,
        }}
      >
        Win Your Goal
      </div>
      <ModalChallengeInfoContainer>
        <ModalChallengeInfoWrapper>
          <div>Period</div>
          <div style={{ fontWeight: 700 }}>Sep 11st - Oct 11st</div>
        </ModalChallengeInfoWrapper>
        <ModalChallengeInfoWrapper>
          <div>Frequency</div>
          <div style={{ fontWeight: 700 }}>Everyday</div>
        </ModalChallengeInfoWrapper>
        <ModalChallengeInfoWrapper style={{ marginBottom: 0 }}>
          <div>Deposit</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: 700, marginRight: 15 }}>0</div>
            <DepositSlider />
            <div style={{ fontWeight: 700, marginLeft: 15 }}>200</div>
          </div>
        </ModalChallengeInfoWrapper>
      </ModalChallengeInfoContainer>
      <DepositWrapper>${depositAmount} USDT</DepositWrapper>
      <UserAverageWrapper>
        Members deposit &nbsp;<OrangeText>$ 150 USDT </OrangeText>&nbsp;/ 3 week
        in average
      </UserAverageWrapper>
      <BlackFixedButton onClick={handleChargeDepositButtonClick}>
        Charge Deposit
      </BlackFixedButton>
    </Modal>
  );
};

export default ChallengeInfoModal;

const Modal = styled.div<IsOpenProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    height: 390px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); // 그림자 추가
  }

  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;

  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.3s ease-in-out;
`;

const ModalChallengeInfoContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 20px;
    width: 343px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ModalChallengeInfoWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    height: 21px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DepositWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 48px;

    margin-top: 20px;
    padding-left: 12px;

    border-radius: 8px;
  }

  display: flex;
  align-items: center;
  text-align: center;

  border: 1px solid #ececec;
`;

const UserAverageWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 22px;
    font-size: 14px;
  }
  color: #898989;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const OrangeText = styled.span`
  color: #eb4826;
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
