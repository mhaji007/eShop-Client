import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave rating"
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
