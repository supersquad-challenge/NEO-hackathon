import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isImageUploadedState = atom<boolean>({
  key: "IsImageUploadedState",
  default: false,
});

export const depositAmountState = atom<number>({
  key: "DepositAmountState",
  default: 0,
});

export const paymentMethodState = atom<string>({
  key: "PaymentMethodState",
  default: "",
});

export const isSignedInState = atom({
  key: "IsSignedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isPaidWithCrpytoState = atom<boolean>({
  key: "IsPaidWithCrpytoState",
  default: false,
});

export const isPaybackReceivedState = atom<boolean>({
  key: "IsPaybackReceivedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoIdState = atom<string>({
  key: "UserInfoIdState",
  default: "651920e49f321ba6780cae07",
});
export const registerChallengeIdState = atom<string>({
  key: "RegisterchallengeIdState",
  default: "",
});

export const registerUserChallengeIdState = atom<string>({
  key: "RegisterUserChallengeIdState",
  default: "",
});
