import React, {useState, useEffect} from "react";
import {auth} from '../../firebase';
import {toast} from "react-toastify";
import styles from "./Register.module.scss"
import classnames from 'classnames';

const RegisterComplete = ({history}) => {

  const [password, setPassword] = useState("")

  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [])

  const handleSubmit = async(e) => {


  }

  const registerCompleteForm = () => {
    return (
      <div>
      <form autoComplete='off' className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.control}>
      {/* <h1>
        Join
      </h1> */}
    </div>
    <div className={classnames(styles.control, styles.blockCube, styles.blockInput)}>
      <input name='email' placeholder='Email' type='email'  value={email} dsiabled/>
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
    <div className={classnames(styles.control, styles.blockCube, styles.blockInput)}>
      <input name='password' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} autoFocus/>
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

    <button className={classnames(styles.btn, styles.blockCube, styles.blockChubeHover)} type='submit'>
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
        Complete Registration
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

          {registerCompleteForm()}
        {/* </div> */}
      {/* </div> */}
    </div>
  )


};

export default RegisterComplete;
