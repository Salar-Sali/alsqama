import axios from "axios";
import { useEffect, useState } from "react";
import { endpointsUrl } from "~/bootstrap/helper/endpoints";
import AppartmentsCardsCard from "~/core/Apartments/view/cards-section/card/appartments-cards-card";
import ApartmentsFilterationWrapper from "~/core/Apartments/view/filtration-section/wrapper/apartments-filteration-wrapper";
import {
  ChaletsCardsWrapperMessages,
  StyledChaletsCardsWrapper,
} from "~/core/chalets/view/cards-section/wrapper/style";
import CircularLoader from "~/generic/components/circular-loader/circular-loader";

export type Appartment = {
  id: string;
  images: string[];
  name: string;
  location: string;
  pricePerNight: number;
  numberOfRooms?: number;
  reservedDates: string[];
};

const AppartmentsCardsWrapper = () => {
  const [appartments, setAppartments] = useState<Appartment[]>([]);

  const [filteredAppartments, setFilteredAppartments] = useState<Appartment[]>(
    []
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppartmentsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${endpointsUrl.allAppartments}`);
      if (response.status === 200) {
        const appartments: Appartment[] = response.data;

        setAppartments(appartments);
        setIsError(false);
      }
    } catch (errro) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAppartmentsData();
  }, []);

  if (isLoading) return <CircularLoader />;
  return (
    <StyledChaletsCardsWrapper>
      <ApartmentsFilterationWrapper
        setFilteredAppartments={setFilteredAppartments}
        appartments={appartments}
      />
      {isError ? (
        <ChaletsCardsWrapperMessages>
          المعذرة حصل خطأ، يرجى المحاولة لاحقا
        </ChaletsCardsWrapperMessages>
      ) : appartments.length === 0 ? (
        <ChaletsCardsWrapperMessages>
          لم يتم العثور على أية شاليه
        </ChaletsCardsWrapperMessages>
      ) : (
        filteredAppartments.map((hall: Appartment, index: number) => (
          <AppartmentsCardsCard key={index} appartment={hall} />
        ))
      )}
    </StyledChaletsCardsWrapper>
  );
};

export default AppartmentsCardsWrapper;
