export interface IsClickedProps {
  isClicked: boolean;
}

export interface IsOpenProps {
  isOpen: boolean;
}

export interface BackgroundColorProps {
  backgroundColor: string;
}

export interface TitleContentProps {
  title: string;
  content: string;
}

export interface ImageProps {
  imageUrl: string;
}

export interface IndexProps {
  index: number;
}

export interface OnClickProps {
  onClick: any;
}

export interface HeightTypeProps {
  heightType: string;
}

export interface AllChallengeProps {
  category: string;
  challengeEndsAt: string;
  challengeId: string;
  challengeName: string;
  challengeParticipantsCount: number;
  challengeStartsAt: string;
  challengeStatus: string;
  challengeThumbnail: string;
  challengeTotalDeposit: number;
  challengeVerificationFrequency: string;
}

export interface ChallengeByIdProps {
  challengeEndsAt: string;
  challengeId: string;
  challengeName: string;
  challengeParticipantsCount: number;
  challengeStartsAt: string;
  challengeThumbnail: string;
  challengeTotalDeposit: number;
  challengeVerificationFrequency: string;
  challengeVerificationMethod: string;
  cryptoYield: number;
}

export interface MyStatusProps {
  userChallengeId: string;
  successRate: number;
  deposit: number;
  challengeStatus: string;
  challengeVerificationFrequency: string;
  challengeStartsAt: string;
  challengeEndsAt: string;
  challengeName: string;
  challengeId: string;
  challengeParticipantsCount: number;
  challengeTotalDeposit: number;
}

export interface TotalStatusProps {
  cashFailPool: number;
  cashSuccessPool: number;
  challengeCryptoDeposit: number;
  challengeId: string;
  challengeTotalDeposit: number;
  cryptoFailPool: number;
  cryptoSuccessPool: number;
  cryptoYieldBoost: number;
}

export interface PaybackStatusProps {
  successRate: number;
  totalPayback: number;
  profit: number;
  challengeReward: number;
  cryptoYieldBoost: number;
}
