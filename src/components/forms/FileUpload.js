import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

// File resize and upload
const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // Resize images
    // e.target.files includes file name and
    // meta information for each of the files selected
    let files = e.target.files; // 3
    if (files) {
      for (let i = 0; i < files.length; i++) {
        // Resize each file based on width, height,
        // type, quality, rotation, and compress format
        // of the new image
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          // Callback function of the new image URI
          // At this time files have been resized
          (uri) => {
            console.log(uri);
          },
          // compress format of the new image
          "base64"
        );
      }
    }
  };

  // send the resized image back to server to upload to cloudinary
  // store urls in images[] in the parent component state (ProductCreate)

  return (
    <div className="row">
      {/* Warp input within the label
      and set the hiddent property to
      display only the label */}
      <label className="btn btn-info btn-raised mx-auto mt-5">
        Choose File
        <input
          type="file"
          multiple
          hidden
          //accept all the files
          // that starts with images
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
