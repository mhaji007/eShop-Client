import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import {Avatar} from "antd";

// File resize and upload
const FileUpload = ({values, setValues, setLoading}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {

    // console.log(e.target.files);
    // Resize images

    // e.target.files includes file name and
    // meta information for each of the files selected
    let files = e.target.files;
    // Variable for storing all the uploaded images
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
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
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image:uri},
            {headers: {
              authtoken: user ? user.token: ""
            }}).then (res => {
              console.log('Image upload response data', res);
              setLoading(false);
              // Push the new image to the image array
              allUploadedFiles.push(res.data);
              // Update the state with all the uploaded images
              setValues({...values, image: allUploadedFiles});
            })
            .catch(err => {
              setLoading(false);
              console.log("Cloudinary upload error", err);
            })
          },
          // compress format of the new image
          "base64"
        );
      }
    }
  };

  // send the resized image back to server to upload to cloudinary
  // store urls in images[] in the parent component state (ProductCreate)

  return(
  <>
    <div className="row">

      {/* Warp input within the label
      and set the hiddent property to
      display only the label */}
      <label className="btn btn-info btn-raised mx-auto my-auto">
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
         {values.images && values.images.map((image) => { return (
        <Avatar key={image.public_id} src={image.url} size={60}/>
      )
      })}
    </div>
    </>
  );
};

export default FileUpload;
