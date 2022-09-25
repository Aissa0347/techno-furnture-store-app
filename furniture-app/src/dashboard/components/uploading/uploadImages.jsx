import { uuidv4 } from "@firebase/util";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { Button, LoadingOverlay } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import UploadedImagesSlider from "../sliders/sliders";
import { operationSuccess } from "../icons";

function UploadImages({
  submitImages,
  isImagesUploaded,
  setIsImagesUploaded,
  deleteImages,
  primaryImages,
  newImageList,
  setNewImageList,
  isUploadImagesLoading,
  typeOfForm,
}) {
  const [files, setFiles] = useState([]);
  const [isUpdate, setIsUpdate] = useState(typeOfForm == "edit" ? true : false);
  const {
    acceptedFiles,
    getInputProps,
    getRootProps,
    isDragReject,
    isDragAccept,
    isFocused,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
            id: uuidv4(),
          })
        ),
      ]);
    },
  });

  console.log("after changes : ", primaryImages, "/n then files : ", files);

  useEffect(() => {
    if (primaryImages)
      setFiles(primaryImages.map((imgObj) => ({ ...imgObj, id: uuidv4() })));
    console.log("newImageList files", newImageList, files);
  }, [primaryImages]);

  function editImages() {
    deleteImages();
    setNewImageList([]);
    setIsUpdate(true);
    setIsImagesUploaded(false);
  }

  console.log(files);

  const acceptDragStyle = isDragAccept ? "acceptDragStyle" : "";
  const focusedStyle = isFocused ? "focusedStyle" : "";
  const failedDragStyle = isDragReject ? "failedDragStyle" : "";

  return (
    <section>
      <div
        {...getRootProps({
          className: ` dropzone dropzone-container ${acceptDragStyle} ${focusedStyle} ${failedDragStyle}`,
        })}
      >
        {isImagesUploaded && (
          <div className="upload-success">
            <img src={operationSuccess} />
          </div>
        )}
        <LoadingOverlay
          visible={isUploadImagesLoading}
          className="image-upload-loading"
          overlayBlur={2}
        />
        <input {...getInputProps()} />
        <p>drag it here</p>
      </div>
      <UploadedImagesSlider
        files={files}
        setFiles={setFiles}
        isImagesUploaded={isImagesUploaded}
      />
      {!isImagesUploaded ? (
        <div>
          <Button
            className="cancel-btn"
            variant="subtle"
            radius="xs"
            size="sm"
            color={"red"}
            onClick={() => {
              deleteImages();
              setFiles([]);
            }}
          >
            Remove All
          </Button>
          {!isUpdate ? (
            <Button
              className="submit-btn"
              variant="light"
              radius="xs"
              size="sm"
              onClick={() => {
                submitImages(files);
              }}
            >
              Upload
            </Button>
          ) : (
            <Button
              className="submit-btn"
              variant="light"
              radius="xs"
              size="sm"
              onClick={() => submitImages(files)}
            >
              update
            </Button>
          )}
        </div>
      ) : (
        <div>
          <Button
            className="submit-btn"
            variant="light"
            radius="xs"
            size="sm"
            onClick={editImages}
            color="green"
          >
            edit
          </Button>
        </div>
      )}
    </section>
  );
}

export default UploadImages;
