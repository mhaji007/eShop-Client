import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import styles from "./CreateCouponPage.module.scss";
import classnames from "classnames";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 justify-content-center" align="center">
        <h4 className="mt-5 mb-0"> Create A Coupon</h4>
        <form
          autoComplete="off"
          className={classnames(styles.form)}

          onSubmit={handleSubmit}
        >
          {/* <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div> */}

          <div className="form-group">
            <div
              className={classnames(
                styles.control,
                styles.blockCube,
                styles.blockInput
              )}
            >
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
              <div className={styles.bgTop}>
                <div className={styles.bgInner}></div>
              </div>
              <div className={styles.bgRight}>
                <div className={styles.bgInner}></div>
              </div>
              <div className={styles.bg}>
                <div className={styles.bgInner}></div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div
              className={classnames(
                styles.control,
                styles.blockCube,
                styles.blockInput
              )}
            >
              <input
                type="number"
                placeholder="Discount %"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
              <div className={styles.bgTop}>
                <div className={styles.bgInner}></div>
              </div>
              <div className={styles.bgRight}>
                <div className={styles.bgInner}></div>
              </div>
              <div className={styles.bg}>
                <div className={styles.bgInner}></div>
              </div>
            </div>
          </div>

          {/* <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div> */}

          <div className="form-group">
            <label className="text-muted">Expiry</label>
            <br />
            <DatePicker
              className="form-control"
              // Default date (today)
              selected={new Date()}
              value={expiry}
              // onChange here works differenlty
              // date is set directly using setEpiry
              onChange={(date) => setExpiry(date)}
              required
            />
          </div>

          <button className="btn btn-primary border border-info mt-2 text-info">Save</button>
        </form>

        </div>

      </div>
    </div>
  );
};

export default CreateCouponPage;
