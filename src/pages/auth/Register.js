import React, {useState} from "react";
import {auth} from '../../firebase';
import {toast} from "react-toastify";
import styles from "./Register.module.scss"
import classnames from 'classnames';

const Register = (e) => {

  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {

    e.preventDefault();
    const config = {
      // URL to redirect user after submitting email
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      // So that user cannot start registration on one
      // device and finish it on another
      handleCodeInApp: true
    }

    // Send sign in link to user's email
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    )
    // save user email in local storage
    // so that when redirected to sign in page
    // email can be retrieved from local storage and displayed
    window.localStorage.setItem('emailForRegistration', email);

    // clear state
    // clears email field after
    // user has entered their email
    setEmail("");
  }

  const registerForm = () => {
    return (
      <div>
      <form autoComplete='off' className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.control}>
      {/* <h1>
        Join
      </h1> */}
    </div>
    <div className={classnames(styles.control, styles.blockCube, styles.blockInput)}>
      <input name='email' placeholder='Email' type='email'  value={email} onChange={(e) => setEmail(e.target.value)} autoFocus/>
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

    <button className={classnames(styles.btn, styles.blockCube, styles.blockCubeHover)} type='submit'>
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
        Register

      </div>
    </button>
  </form>
  </div>
    );
  }

  return (
    <div className="container p-5">
      {/* <div className="row"> */}
        {/* <div className="col-md-6 offset-md-3"> */}

          {registerForm()}
        {/* </div> */}
      {/* </div> */}
    </div>
  )


};

export default Register;
