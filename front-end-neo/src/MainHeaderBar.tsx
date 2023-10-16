import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { colors } from "./lib/colors";
import { useRecoilState } from "recoil";
import { isSignedInState, userInfoIdState } from "./lib/states";
import logout from "./api/logout";

const shouldShowLogoDBSIPath = ["/home/onApplication", "/home/ongoing"];

const shouldShowBackDBSIPathStartsWith = ["/challenges/", "/myChallenges/"];

const shouldShowBackPath = [
  "/flow/connectwallet",
  "/flow/inputnickname",
  "/flow/signin",
  "/proove/diet",
];

const shouldShowNaviBarNameDBSIPath: { [key: string]: string } = {
  "/myChallenges/ongoing": "My Challenges",
  "/myChallenges/onApplication": "My Challenges",
  "/myChallenges/completed": "My Challenges",
};

const MainHeaderBar = () => {
  const router = useRouter();
  const { pathname } = router;
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const shouldShowBackDBSI = shouldShowBackDBSIPathStartsWith.some((path) =>
    router.pathname.startsWith(path)
  ); //bool

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [userInfoId, setUserInfoId] = useRecoilState(userInfoIdState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const shouldShowNaviBarName = Object.keys(
    shouldShowNaviBarNameDBSIPath
  ).includes(router.pathname)
    ? router.pathname
    : null; //string
  // console.log(isSignedIn);
  const Logo_DifferBySignIn = () => {
    return (
      <>
        {isMounted && (
          <Container>
            <SuperSquad>SuperSquad</SuperSquad>
            {isSignedIn ? (
              <>
                <ProfileImage
                  src="/PageHeaderBar/profileEx.svg"
                  alt="profileEx"
                  onClick={() => {
                    setIsSignedIn(false);
                    // logout(userInfoId);
                  }}
                />
                <NotificationButton
                  src="/PageHeaderBar/notification.svg"
                  alt="notification"
                />
              </>
            ) : (
              <SignInButton
                onClick={() => {
                  router.push("/flow/signin");
                }}
              >
                Sign In
              </SignInButton>
            )}
          </Container>
        )}
      </>
    );
  };

  //Profile이 있다는 건 login을 했다는 것.
  const Back_DifferBySignIn = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsMounted(true);
      }
    }, []);
    return (
      <>
        {isMounted && (
          <Container>
            <GoBackButton
              src="/PageHeaderBar/chevron-left.svg"
              alt="goBack"
              onClick={() => {
                router.push("/home"); //이건 나중에 수정하면 될 듯.
              }}
            />

            {isSignedIn ? (
              <>
                <ProfileImage
                  src="/PageHeaderBar/profileEx.svg"
                  alt="profileEx"
                  onClick={() => {
                    setIsSignedIn(false);
                    // logout(userInfoId);
                  }}
                />
                <NotificationButton
                  src="/PageHeaderBar/notification.svg"
                  alt="notification"
                />
              </>
            ) : (
              <SignInButton
                onClick={() => {
                  router.push("/flow/signin");
                }}
              >
                Sign In
              </SignInButton>
            )}
          </Container>
        )}
      </>
    );
  };

  const Back = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsMounted(true);
      }
    }, []);
    return (
      <>
        {isMounted && (
          <Container>
            <GoBackButton
              src="/PageHeaderBar/chevron-left.svg"
              alt="goBack"
              onClick={() => {
                router.push("/home");
              }}
            />
          </Container>
        )}
      </>
    );
  };
  const NaviBarName_DifferBySignIn = ({
    shouldShowNaviBarName,
  }: {
    shouldShowNaviBarName: string;
  }) => {
    const title = shouldShowNaviBarNameDBSIPath[shouldShowNaviBarName];

    return (
      <Container>
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {isSignedIn ? (
          <>
            <ProfileImage
              src="/PageHeaderBar/profileEx.svg"
              alt="profileEx"
              onClick={() => {
                setIsSignedIn(false);
                // logout(userInfoId);
              }}
            />
            <NotificationButton
              src="/PageHeaderBar/notification.svg"
              alt="notification"
            />
          </>
        ) : (
          <SignInButton
            onClick={() => {
              router.push("/flow/signin");
            }}
          >
            Sign In
          </SignInButton>
        )}
      </Container>
    );
  };

  return (
    <>
      {shouldShowLogoDBSIPath.includes(router.pathname) && (
        <Logo_DifferBySignIn />
      )}
      {shouldShowBackDBSI && <Back_DifferBySignIn />}
      {shouldShowNaviBarName && (
        <NaviBarName_DifferBySignIn
          shouldShowNaviBarName={shouldShowNaviBarName}
        />
      )}
      {shouldShowBackPath.includes(router.pathname) && <Back />}
    </>
  );
};

export default MainHeaderBar;

const Container = styled.div`
  position: fixed;
  z-index: 100;

  width: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;

  @media (max-width: 2160px) {
    //PC
    height: 96px;
  }
  @media (max-width: 576px) {
    //mobile
    height: 48px;
  }

  background-color: white;
`;

const GoBackButton = styled.img`
  position: absolute;
  @media (max-width: 2160px) {
    //PC
    width: 48px;
    height: 48px;

    left: 48px;
  }
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;

    left: 24px;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 33px;
    height: 33px;
    right: 24px;
  }
`;

const NotificationButton = styled.img`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;
    right: 65px;
  }
`;

const SearchButton = styled.img`
  //나중에 검색 기능이 추가될 수 있으니 지우지는 않겠음.
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;
    right: 97px;
  }
`;

const SuperSquad = styled.div`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    left: 24px;
    font-size: 24px;
    font-weight: 500;
  }
`;

const SignInButton = styled.button`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    right: 24px;
    font-size: 12px;
    font-weight: 500;
    width: 60px;
    height: 32px;
    border-radius: 10px;
  }
  border: 2px solid ${colors.darkPurple};
  color: ${colors.darkPurple};
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PageHeaderTitle = styled.div`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    left: 30px;
    font-size: 24px;
    font-weight: 500;
  }
`;
