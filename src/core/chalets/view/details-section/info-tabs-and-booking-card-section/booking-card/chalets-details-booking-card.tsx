import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar";
import { useEffect, useState } from "react";
import {
  StyledAppDivider,
  StyledAppSubTitleWrapper,
} from "~/bootstrap/helper/global-styles";
import { ResservedDateType } from "~/bootstrap/helper/global-types";
import ChaletsDetailsBookingCardBookingDate from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/booking-card/chalets-details-booking-card-booking-date";
import ChaletsDetailsBookingCardConditionSection from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/booking-card/chalets-details-booking-card-condition-section";
import ChaletsDetailsBookingCardPayTotalMoneySection from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/booking-card/chalets-details-booking-card-pay-total-money-section";
import ChaletsDetailsBookingCardPersonalInfo from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/booking-card/chalets-details-booking-card-personal-info";
import { DetailsBookingCardDiv } from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/booking-card/style";

interface IChaletsDetailsBookingCardProps {
  name: string;
  pricePerNight: number;
  reservedDates: ResservedDateType[];
  chaletSectionId?: string;
}

export type BookingCardPersonalInfo = {
  name: string;
  phoneNumber: string;
};

export const ChaletsDetailsBookingCard = (
  props: IChaletsDetailsBookingCardProps
) => {
  const { name, pricePerNight, reservedDates, chaletSectionId } = props;

  const [checked, setChecked] = useState(false);
  const [numberOfReservedDays, setNumberOfReservedDays] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<
    BookingCardPersonalInfo | undefined
  >();

  /* ---------------------------------- dates --------------------------------- */
  const today = dayjs(new Date());
  const tomorrow = dayjs().add(1, "day");
  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const [endDate, setEndDate] = useState<Dayjs | null>(tomorrow);

  useEffect(() => {
    if (!(startDate && endDate)) {
      setNumberOfReservedDays(-1);
      return;
    }
    const numberOfReservedDays = endDate.diff(startDate, "day");
    if (numberOfReservedDays <= 0) {
      setNumberOfReservedDays(-1);
      return;
    }
    setNumberOfReservedDays(numberOfReservedDays);
  }, [startDate, endDate]);

  /* --------------------------- reset after success -------------------------- */
  const resetAfterSuccess = () => {
    setPersonalInfo({
      phoneNumber: "",
      name: "",
    });
    setChecked(false);
    setStartDate(today);
    setEndDate(tomorrow);
  };
  return (
    <DetailsBookingCardDiv>
      <StyledAppSubTitleWrapper>أحجز {name}</StyledAppSubTitleWrapper>
      <StyledAppDivider />
      <ChaletsDetailsBookingCardPersonalInfo
        setPersonalInfo={setPersonalInfo}
        personalInfo={personalInfo}
      />
      <StyledAppDivider />
      <ChaletsDetailsBookingCardBookingDate
        pricePerNight={pricePerNight}
        numberOfReservedDays={numberOfReservedDays}
        reservedDates={reservedDates}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <ChaletsDetailsBookingCardConditionSection
        setChecked={setChecked}
        checked={checked}
      />
      <StyledAppDivider />
      <ChaletsDetailsBookingCardPayTotalMoneySection
        checked={checked}
        pricePerNight={pricePerNight}
        numberOfReservedDays={numberOfReservedDays}
        personalInfo={personalInfo}
        startAndEndDates={{ startDate, endDate }}
        chaletSectionId={chaletSectionId}
        resetAfterSuccess={resetAfterSuccess}
      />
    </DetailsBookingCardDiv>
  );
};

export default ChaletsDetailsBookingCard;
