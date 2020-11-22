// Page for creating and displaying coupons
// to admin users
// Admins land on this page by clicking on
// coupons link on the side nav of admin dashboard

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
  // State for storing coupon name
  const [name, setName] = useState("");
  // State for storing expiration date of a coupons
  const [expiry, setExpiry] = useState("");
  // State for storing discount percentage of a coupon
  const [discount, setDiscount] = useState("");
  // State for storing loading status
  const [loading, setLoading] = useState("");
  // State for storing all the coupons retrieved from the backend
  const [coupons, setCoupons] = useState([]);

  // Destructure user from redux to retrieve the token
  const { user } = useSelector((state) => ({ ...state }));

  // On component mounting, load all coupons
  // to be displayed in a table
  useEffect(() => {
    loadAllCoupons();
  }, []);

  // Function to make request to backend for retrieveing all existing coupons
  // and storing them in the state
  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  console.log(coupons);

// Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Function for making request to backend to create
    // a coupon and storing it in state
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        // Clear fields after sending request
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
        loadAllCoupons();

      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    // Confirm deletion with user
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
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
                  type="text"
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

            <button className="btn btn-primary border border-info mt-2 text-info">
              Save
            </button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
