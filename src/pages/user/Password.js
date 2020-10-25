import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { SendOutlined } from "@ant-design/icons";
import styles from "./Password.module.scss";
import classnames from "classnames";



const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
      <div>
        <form
          autoComplete="off"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.control}>
            {/* <h1>
        Join
      </h1> */}
          </div>
          <div
            className={classnames(
              styles.control,
              styles.blockCube,
              styles.blockInput
            )}
          >
            <input
              name="password"
              placeholder="Enter new password"
              disabled={loading}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

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

          <button
            className={classnames(
              styles.btn,
              styles.blockCube,
              styles.blockCubeHover
            )}
            type="submit"
            disabled={!password || loading}
          >
            <div className={styles.bgTop}>
              <div className={styles.bgInner}></div>
            </div>
            <div className={styles.bgRight}>
              <div className={styles.bgInner}></div>
            </div>
            <div className={styles.bg}>
              <div className={styles.bgInner}></div>
            </div>
            <div className={styles.text}>
              {<SendOutlined />} {""}Submit
            </div>
          </button>
        </form>
      </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div >
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            // <h4 className={classnames(styles.control, styles.form)}>Password Update</h4>
            ""
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
