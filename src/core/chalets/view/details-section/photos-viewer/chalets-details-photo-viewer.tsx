import { Button, CardMedia } from "@mui/material";
import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { styled } from "styled-components";
import { HandlingSectionPaddingWrapper } from "~/bootstrap/helper/global-styles";
import * as palette from "~/bootstrap/helper/global-helper";
import {
  StyledSwiper,
  StyledSwiperSlide,
  CustomPrevButton,
  CustomNextButton,
} from "~/core/main/view/slides/style";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const images = [
  "https://c4.wallpaperflare.com/wallpaper/915/596/21/dicksam-plateau-socotra-island-yemen-dragon-trees-desert-landscape-desktop-wallpaper-hd-1920%C3%971080-wallpaper-preview.jpg",
  "https://c4.wallpaperflare.com/wallpaper/429/988/868/mountains-stones-village-yemen-wallpaper-preview.jpg",
  "https://img.freepik.com/free-photo/portrait-of-young-woman-with-natural-make-up_23-2149084942.jpg",
  "https://c4.wallpaperflare.com/wallpaper/237/180/1018/yemen-city-lights-sanaa-cityscape-wallpaper-preview.jpg",
  "https://i.etsystatic.com/28024432/r/il/0e5c32/2896175538/il_fullxfull.2896175538_pnjn.jpg",
  "https://c4.wallpaperflare.com/wallpaper/783/466/557/nature-trees-rock-dragon-blood-tree-wallpaper-preview.jpg",
];

/* ------------------------- First position styling ------------------------- */
const ChaletsDetailsPhotoAllImagesWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  gap: 8px;
  height: 500px;
  @media (max-width: ${palette.largeScreenSize}) {
    display: none;
  }
`;

const ChaletsDetailsPhotoMainImage = styled(CardMedia)`
  width: 50%;
  height: 100%;
`;

const ChaletsDetailsPhotoSmallImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 50%;
  justify-content: space-between;
  row-gap: 8px;
`;

const ChaletsDetailsPhotoSmallImage = styled(CardMedia)`
  height: 50%;
  width: 49.45%;
  object-fit: cover;
`;

/* ------------------------- Second position styling ------------------------ */
const TestSwiper = styled(StyledSwiper)`
  border-radius: 16px;
  overflow: hidden;
  display: none;
  height: 500px;
  @media (max-width: ${palette.largeScreenSize}) {
    display: block;
  }
  @media (max-width: ${palette.smallScreenSize}) {
    height: 350px;
  }
`;
/* ----------------------------- Implementation ----------------------------- */
const ChaletsDetailsPhotoViewer = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  /* ------------------------------- new styling ------------------------------ */
  return (
    <HandlingSectionPaddingWrapper>
      {/* First position */}
      <ChaletsDetailsPhotoAllImagesWrapper className="all-images">
        <ChaletsDetailsPhotoMainImage
          className="big-image"
          image={images[0]}
          onClick={() => openImageViewer(0)}
        />
        <ChaletsDetailsPhotoSmallImagesWrapper className="small-images">
          {images.slice(1, 5).map((image, index) => (
            <ChaletsDetailsPhotoSmallImage
              image={image}
              key={index}
              onClick={() => openImageViewer(index + 1)}
            />
          ))}
        </ChaletsDetailsPhotoSmallImagesWrapper>
      </ChaletsDetailsPhotoAllImagesWrapper>

      {/* second position */}
      <TestSwiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => {
          return (
            <StyledSwiperSlide
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => openImageViewer(index)}
            />
          );
        })}
        <CustomPrevButton className="swiper-button-prev" />
        <CustomNextButton className="swiper-button-next" />
      </TestSwiper>
      {/* open button */}
      <Button onClick={() => setIsViewerOpen(true)}>عرض المزيد من الصور</Button>
      {isViewerOpen && (
        <ImageViewer
          backgroundStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </HandlingSectionPaddingWrapper>
  );
};

export default ChaletsDetailsPhotoViewer;
