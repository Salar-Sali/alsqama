/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import ChaletsDetailsPhotoViewer from "~/core/chalets/view/details-section/photos-viewer/chalets-details-photo-viewer";
import ChaletsDetailsTitleWrapper from "~/core/chalets/view/details-section/title-section/wrapper/chalets-details-title-wrapper";
import CircularLoader from "~/generic/components/circular-loader/circular-loader";

export type ReviewType = {
  reviewerName: string;
  givenStars: number;
  reviewBody: string;
};

export type ChaletSectionType = {
  id: string;
  name: string;
  numberOfRooms: number;
  pricePerNight: number;
  nearestAvailableTime: string;
  numberOfStars: number;
  description: string;
  images: string[];
  videos: string[];
  availableTimes: string[];
  features: string[];
  bookingConditions: string;
  cancelingConditions: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reviews: ReviewType[];
};

const ChaletDetailsPage = () => {
  // TODO call based on this id
  // const { id } = useParams();
  const [chaletSections, setChaletSections] = useState<ChaletSectionType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChaletsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://run.mocky.io/v3/d86bfdca-7717-43de-b60e-89bdb5c99a92`
      );
      if (response.status === 200) {
        const chaletSections: ChaletSectionType[] = response.data;
        setChaletSections(chaletSections);
        setIsError(false);
      }
    } catch (errro) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChaletsData();
  }, []);

  if (isError) return <div>يرجى المحاولة لاحقا</div>;
  if (isLoading) return <CircularLoader />;
  return (
    <div>
      <ChaletsDetailsTitleWrapper title={chaletSections[0]?.name || ""} />
      <ChaletsDetailsPhotoViewer />
    </div>
  );
};

export default ChaletDetailsPage;
