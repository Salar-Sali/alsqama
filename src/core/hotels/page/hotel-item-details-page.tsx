import axios from "axios";
import { useEffect, useState } from "react";
import { endpointsUrl } from "~/bootstrap/helper/endpoints";
import { ReviewType } from "~/core/chalets/page/chalet-details-page";
import { DetailsPageEdgeCaseMessage } from "~/core/chalets/page/style";
import ChaletsDetailsDescriptionWrapper from "~/core/chalets/view/details-section/description-section/wrapper/chalets-details-description-wrapper";
import ChaletsDetailsInfoTabsAndBookingCardWrapper from "~/core/chalets/view/details-section/info-tabs-and-booking-card-section/wrapper/chalets-details-info-tabs-and-booking-card-wrapper";
import ChaletsDetailsPhotoViewer from "~/core/chalets/view/details-section/photos-viewer/chalets-details-photo-viewer";
import ChaletsDetailsTitleWrapper from "~/core/chalets/view/details-section/title-section/wrapper/chalets-details-title-wrapper";
import CircularLoader from "~/generic/components/circular-loader/circular-loader";
import DetailsPageFastDescriptionAndShare from "~/generic/components/fast-description-and-share/details-page-fast-description-and-share";
import PlaceIcon from "@mui/icons-material/Place";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StarIcon from "@mui/icons-material/Star";

export type HotelItemDetailType = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  coordinates: { latitude: number; longitude: number };
  images: string[];
  videos: string[];
  bookingConditions: string;
  cancellingConditions: string;
  hotelPhoneNumber: number;
  features: string[];
  reviews: ReviewType[];
  availableTimes: string[];
};
const HotelItemDetailsPage = () => {
  const [hotelItemDetail, setHotelItemDetail] = useState<HotelItemDetailType>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChaletsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${endpointsUrl.hotelItemDetails}`);
      if (response.status === 200) {
        const hotelItemDetail: HotelItemDetailType = response.data;
        setHotelItemDetail(hotelItemDetail);
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
  return (
    <div>
      <ChaletsDetailsTitleWrapper title={hotelItemDetail?.name || ""} />
      <DetailsPageFastDescriptionAndShare
        items={[
          {
            icon: PlaceIcon,
            title: `يمن - عدن - شارع الجمهورية`,
          },
          {
            icon: StarIcon,
            title: `4.5 نجمة`,
          },
          {
            icon: SpaceDashboardIcon,
            title: `سرير مزودج`,
          },
        ]}
      />
      <ChaletsDetailsPhotoViewer
        images={hotelItemDetail?.images || []}
        video={hotelItemDetail?.videos[0] || ""}
      />
      <ChaletsDetailsDescriptionWrapper
        name={hotelItemDetail?.name || ""}
        description={hotelItemDetail?.description || ""}
      />
      <ChaletsDetailsInfoTabsAndBookingCardWrapper
        infoTabs={{
          features: hotelItemDetail?.features || [],
          bookingConditions: hotelItemDetail?.bookingConditions || "",
          cancellingConditions: hotelItemDetail?.cancellingConditions || "",
          coordinates: hotelItemDetail?.coordinates || {
            latitude: 0,
            longitude: 0,
          },
          reviews: hotelItemDetail?.reviews || [],
        }}
        pricePerNight={hotelItemDetail?.pricePerNight || 0}
        name={hotelItemDetail?.name || ""}
      />
    </div>
  );
};

export default HotelItemDetailsPage;
