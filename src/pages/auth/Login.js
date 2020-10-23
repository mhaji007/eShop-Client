import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';

// Function to send token to the backend api after log in
const createOrUpdateUser = async(authToken) => {
  // Body of the request is empty
  // body is not used since
  // Token will be sent in the headers
  return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
    headers: {
      authToken,
    }
  });
}
// Login user
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));


  let dispatch = useDispatch();

  // Upon compounent mounting
  // Check for user and token
  // to see whether user is already
  // logged in. If logged in,
  // redirect user to homepage
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  // Handle login with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Display loader
      setLoading(true);
      // Log user in via Firebase
      const result = await auth.signInWithEmailAndPassword(email, password);
      // Destructure user
      const { user } = result;
      // Retrieve token for the logged in user from Firebase
      const idTokenResult = await user.getIdTokenResult();
      // Send token in the headers as authToken
      createOrUpdateUser(idTokenResult.token).then(
        res => console.log("CREATE OR UPDATE RES", res)
      ).catch();

      // Update state via dispatching action
      // dispatch({
      //   type: "LOGGED_IN_USER",
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult.token,
      //   },
      // });
      // history.push("/");
    } catch (error) {
      // Display error in console
      console.log(error);
      // Display error detail to user
      toast.error(error.message);
      // Remove loader
      setLoading(false);
    }
  };

  // Handle login with Gmail
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => {
    return (
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

          <div
            className={classnames(
              styles.control,
              styles.blockCube,
              styles.blockInput
            )}
          >
            <input
              name="password"
              placeholder="Password"
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
            disabled={!email || password.length < 6}
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
              {<MailOutlined />} {""}Login with Email
            </div>
          </button>
        </form>
      </div>
    );
  };

  const handleGoogleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      {/* <div className="row"> */}
      {/* <div className="col-md-6 offset-md-3"> */}

      {loading ? <h4 className>Loading...</h4> : <h4></h4>}
      {loginForm()}
      <form
        autoComplete="off"
        className={styles.form}
        onSubmit={handleGoogleSubmit}
      >
        <button
          className={classnames(
            styles.btn,
            styles.blockCube,
            styles.blockCubeHover,
            styles.googleButton,
            "mb-3"
          )}
          type="submit"
          onClick={googleLogin}
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
            {<GoogleOutlined />} {""} Login with Google
          </div>
        </button>
        <Link to="/forgot/password" className="float-right text-danger">
          {" "}
          Forgot Password?
        </Link>
      </form>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Login;
