/* eslint-disable react-hooks/exhaustive-deps */
import PlaceIcon from "@mui/icons-material/Place";
// import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ChaletSectionsResponse,
  getChaletSectionsDTO,
} from "~/core/chalets/page/get-chalet-sections-dto";
import { DetailsPageEdgeCaseMessage } from "~/core/chalets/page/style";
import ChaletsDetailsDescriptionWrapper from "~/core/chalets/view/details-section/description-section/wrapper/chalets-details-description-wrapper";
import ChaletsDetailsInfoTabsAndBookingCardWrapper from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/wrapper/chalets-details-info-tabs-and-booking-card-wrapper";
import ChaletsDetailsPhotoViewer from "~/core/chalets/view/details-section/photos-viewer/chalets-details-photo-viewer";
import ChaletsDetailsTitleWrapper from "~/core/chalets/view/details-section/title-section/wrapper/chalets-details-title-wrapper";
import CircularLoader from "~/generic/components/circular-loader/circular-loader";
import DetailsPageFastDescriptionAndShare from "~/generic/components/fast-description-and-share/details-page-fast-description-and-share";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { ResservedDateType } from "~/bootstrap/helper/global-types";
import ReviewSection from "~/generic/components/review-section/review-section";

export type ReviewType = {
  reviewerName: string;
  givenStars: number;
  reviewBody: string;
};

export type ChaletSectionType = {
  id: string;
  name: string;
  numberOfRooms?: string; // fast description
  numberOfStars?: string; // fast description
  location?: string; // fast description
  pricePerNight: number;
  description: string;
  images: string[];
  videos: string[];
  features: string[];
  bookingConditions: string;
  cancellingConditions: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reviews: ReviewType[];
  reservedDates: ResservedDateType[];
};

const ChaletDetailsPage = () => {
  const [chaletSections, setChaletSections] = useState<ChaletSectionType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id: chaletId } = useParams();
  const fetchChaletsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://backend.hajjzi.com/public/api/accommodations/${chaletId}/chalet-sections`
      );
      if (response.status === 200) {
        const chaletSections: ChaletSectionsResponse[] = response.data;
        const chaletSectionsDto = getChaletSectionsDTO(chaletSections);
        setChaletSections(chaletSectionsDto);
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

  if (isError)
    return (
      <DetailsPageEdgeCaseMessage>
        يرجى المحاولة لاحقا
      </DetailsPageEdgeCaseMessage>
    );
  if (isLoading) return <CircularLoader />;
  if (chaletSections.length === 0)
    return (
      <DetailsPageEdgeCaseMessage>
        لا يوجد جناحات في هذا الشاليه
      </DetailsPageEdgeCaseMessage>
    );
  return (
    <div>
      {chaletSections.map((chaletSection: ChaletSectionType, index: number) => {
        return (
          <div key={index}>
            <ChaletsDetailsTitleWrapper title={chaletSection?.name || ""} />
            <DetailsPageFastDescriptionAndShare
              items={[
                {
                  icon: PlaceIcon,
                  title: chaletSection?.location,
                },
                {
                  icon: StarIcon,
                  title: chaletSection.numberOfStars
                    ? `${chaletSection.numberOfStars} نجمة`
                    : undefined,
                },
                {
                  icon: OtherHousesIcon,
                  title: chaletSection.numberOfRooms
                    ? `${chaletSection.numberOfRooms} غرفة`
                    : undefined,
                },
              ]}
            />
            <ChaletsDetailsPhotoViewer
              images={chaletSection?.images || []}
              video={chaletSection?.videos[0] || ""}
            />
            {chaletSection?.description && (
              <ChaletsDetailsDescriptionWrapper
                name={chaletSection?.name || ""}
                description={chaletSection?.description || ""}
              />
            )}
            <ChaletsDetailsInfoTabsAndBookingCardWrapper
              infoTabs={{
                features: chaletSection?.features || [],
                bookingConditions: chaletSection?.bookingConditions || "",
                cancellingConditions: chaletSection?.cancellingConditions || "",
                coordinates: chaletSection?.coordinates || {
                  latitude: 0,
                  longitude: 0,
                },
                reviews: chaletSection?.reviews || [],
              }}
              pricePerNight={chaletSection?.pricePerNight}
              name={chaletSection?.name}
              reservedDates={chaletSection.reservedDates || []}
              chaletSectionId={chaletSection.id || ""}
            />
            <ReviewSection chaletSectionId={chaletSection.id} />
          </div>
        );
      })}
    </div>
  );
};

export default ChaletDetailsPage;
