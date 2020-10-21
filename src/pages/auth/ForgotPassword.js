import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
// import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import classnames from "classnames";
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
// Used for accessing the logged in state
// If users are already logged in
// theu should not see the forgot password or logged in page
import { useSelector } from "react-redux";
// import styles from "./ForgotPassword.scss";


const ForgotPassword = ({ history }) => {


  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => ({...state}))

  let dispatch = useDispatch();


  useEffect(() => {

    if(user && user.token) {
      history.push("/");
    }

  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    // Send email to user
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        // Our error message to user -
        // since there is no useful message
        // returned form Firebase
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("Forgot password error:", error);
      });
  };

  return (
    // Center the form in the middle of the page
    <div className="container col-md-6 offset-md-3 p-5">
    {loading ? (
      <h4 className="text-danger">Loading</h4>
    ) : (
      <h4>Enter the email address associated with your account</h4>
    )}
      {/* <div className="row"> */}
      {/* <div className="col-md-6 offset-md-3"> */}

      {loading ? <h4 className>Loading...</h4> : <h4></h4>}


      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit} >

      <div
            className={classnames(
              styles.control,
              styles.blockCube,
              styles.blockInput
            )}
          >
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
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

         <button className="btn btn-raised" disabled={!email}>           Submit
      </button>


      </form>

      {/* </div> */}
      {/* </div> */}
    </div>
  );




};

export default ForgotPassword;
