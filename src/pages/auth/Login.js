import React, {useState, useEffect} from "react";
import {auth} from '../../firebase';
import {toast} from "react-toastify";
import { MailOutlined} from '@ant-design/icons';
import styles from "./Register.module.scss"
import classnames from 'classnames';

const Login = (e) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password)

  }

  const loginForm = () => {
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

    <div className={classnames(styles.control, styles.blockCube, styles.blockInput)}>
      <input name='password' placeholder= 'Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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

    <button className={classnames(styles.btn, styles.blockCube, styles.blockChubeHover)} type='submit' disabled = {!email||password.length<6}>
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
    {<MailOutlined/>} {""}Login

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

          {loginForm()}
        {/* </div> */}
      {/* </div> */}
    </div>
  )


};

export default Login;
