import { CloseButton } from "@mantine/core";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

function UploadedImagesSlider({ files, setFiles, isImagesUploaded }) {
  console.log("those are files : ", files);
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={"auto"}
      className="dropzone-uploaded-images"
    >
      {files.map((file) => {
        return (
          <SwiperSlide className="image-wrapper">
            {!isImagesUploaded && (
              <CloseButton
                className="image-close"
                radius={"none"}
                color={"red"}
                onClick={() =>
                  setFiles((prevFiles) => {
                    console.log(prevFiles);
                    return prevFiles.filter((image) => image.id !== file.id);
                  })
                }
              />
            )}
            <img loading="lazy" src={file.url} alt={file.name} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default UploadedImagesSlider;
