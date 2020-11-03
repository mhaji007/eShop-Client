import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // Resize image sent from server

    let files = e.target.files; // 3
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
          },
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
