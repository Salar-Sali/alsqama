import styled from "styled-components";
import * as palette from "~/bootstrap/helper/global-helper";

export const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

export const StyledMainHeader = styled.div`
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: white;

  padding: 0 ${palette.paddingBigScreens};
  height: ${palette.appHeaderHeight};

  @media (max-width: ${palette.mediumScreenSize}) {
    padding: 0 ${palette.paddingMediumScreens};
  }

  @media (max-width: ${palette.smallScreenSize}) {
    padding: 0 ${palette.paddingSmallScreens};
  }
`;

export const StyledLocalizationAndLoginSignup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
