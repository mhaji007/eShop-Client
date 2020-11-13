import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
// Since this component is not a route component
// we do not have access to history in the props
// hence, the use of useHistory hook here
import {useHistory} from 'react-router-dom';

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();

  // Function for conditonally rendering ratings modal
  // based on user's login status
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push("/login");
    }
  }

  return (
    <>
      {/* <div onClick={() => setModalVisible(true)}> */}
      {/* Instead of always displaying the model on click
       regardless of log in statues, conditionally render
       the modal  */}
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave a rating" : "Login to leave a rating"}
      </div>
      <Modal
        title="Leave a rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success(" Thank you for your review. Your rating has been submitted.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
