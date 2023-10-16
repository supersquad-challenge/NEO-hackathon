import styled from "styled-components";
import DepositSlider from "../../DepositSlider";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { IsOpenProps, IsClickedProps } from "../../lib/interfaces";
import { colors } from "../../lib/colors";
import { paymentMethodState } from "../../lib/states";

interface PaymentMethodModalProps {
  isPaymentMethodModalOpen: boolean;
  setIsPaymentMethodModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoOnButtonClick: any;
}

const PaymentMethodModal = ({
  isPaymentMethodModalOpen,
  setIsPaymentMethodModalOpen,
  handleGoOnButtonClick,
}: PaymentMethodModalProps) => {
  const handleXButtonClick = () => {
    setIsPaymentMethodModalOpen(false);
  };
  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodState);
  return (
    <Modal isOpen={isPaymentMethodModalOpen}>
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
        You are paying with
      </div>
      <ModalPaymentMethodContainer>
        <ModalPaymentMethodWrapper>
          <div
            style={{
              width: "fit-content",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckButton
              isClicked={paymentMethod == "crypto"}
              onClick={() => {
                if (paymentMethod == "" || paymentMethod == "cash") {
                  setPaymentMethod("crypto");
                } else {
                  setPaymentMethod("");
                }
              }}
            />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <PaymentMethod>a crypto Wallet</PaymentMethod>
            <PaymentMethodDetail>
              Deposit $USDC to enforce your goals
            </PaymentMethodDetail>
          </div>
        </ModalPaymentMethodWrapper>
        <ModalPaymentMethodWrapper style={{ marginTop: "20px" }}>
          <div
            style={{
              width: "fit-content",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckButton
              isClicked={paymentMethod == "cash"}
              onClick={() => {
                if (paymentMethod == "" || paymentMethod == "crypto") {
                  setPaymentMethod("cash");
                } else {
                  setPaymentMethod("");
                }
              }}
            />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <PaymentMethod>already deposited cash</PaymentMethod>
            <PaymentMethodDetail>Sign up to continue</PaymentMethodDetail>
          </div>
        </ModalPaymentMethodWrapper>
      </ModalPaymentMethodContainer>

      <BlackFixedButton onClick={handleGoOnButtonClick}>Go On</BlackFixedButton>
    </Modal>
  );
};

export default PaymentMethodModal;

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

const ModalPaymentMethodContainer = styled.div`
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

const ModalPaymentMethodWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    height: 56px;
  }
  width: 100%;
  display: flex;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const CheckButton = styled.div<IsClickedProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  z-index: 201;
  background-color: ${(props) =>
    props.isClicked ? `${colors.lightPurple}` : "white"};

  border: ${(props) => !props.isClicked && `${colors.lightGray}`};
  box-sizing: border-box;
`;

const PaymentMethod = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 3px;
    font-size: 18px;
    font-weight: 500;
  }
  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const PaymentMethodDetail = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
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
