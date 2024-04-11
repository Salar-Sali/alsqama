import Card from "@mui/material/Card/Card";
import CardActions from "@mui/material/CardActions/CardActions";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import styled from "styled-components";
import * as palette from "~/bootstrap/helper/global-helper";
import { StyledMainAppButton } from "~/bootstrap/helper/global-styles";
import StarIcon from "@mui/icons-material/Star";

export const ChaletsCardsCardActions = styled(CardActions)`
  && {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-top: 0;
  }
`;

export const ChaletsCardsCardActionsButton = styled(StyledMainAppButton)`
  && {
    flex: 1;
    margin: 0;
    line-height: 1.5;
    padding-top: 9px;
  }
`;
export const ChaletsCardsCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

export const ChaletsCardsCardTitle = styled.span`
  color: ${palette.primaryColor};
  font-size: 22px;
  font-weight: bold;
`;

export const ChaletsCardsCardRatingWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

export const ChaletsCardsCardStarIcon = styled(StarIcon)`
  color: ${palette.secondaryColor};
`;

export const ChaletsCardsCardFeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
`;

export const ChaletsCardsCardFeature = styled.span`
  width: 48%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ChaletsCardsCardFeatureTitle = styled.span`
  padding-top: 7px;
  line-height: 0.8;
`;

export const StyledChaletsCardsCard = styled(Card)`
  && {
    max-width: 355px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledChaletsCardsCardMedia = styled(CardMedia)`
  && {
    height: 190px;
  }
`;

export const ChaletsCardsCardRatingStars = styled.span`
  padding-top: 9px;
`;

export const ChaletsCardsCardFeatureIcon = styled.img`
  width: 24px;
`;
