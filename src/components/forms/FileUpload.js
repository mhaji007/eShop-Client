import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // Resize image sent from server
    // send the resized image back to server to upload to cloudinary
    // store urls in images[] in the parent component state (ProductCreate)
  };

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
