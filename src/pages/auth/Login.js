import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";





// Login user
// Login is a route component
// ( <Route path="/login" exact component ={Login}/>)
// as such has access to history on the props
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));


  let dispatch = useDispatch();

  // Take user obtained from making request
  // to create-or-update endpoint and
  // redirect based on role (e.g., admin vs subscriber)
  const roleBasedRedirect = (res) => {
    if(res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {

      history.push("/user/history");
    }
  }
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
      // The server upon receiving the request at /create-or-update
      // endpoint passes it to the  authCheck middleware
      // for token authentication and only then the
      // request is sent to the createOrUpdateUser controller
      createOrUpdateUser(idTokenResult.token).then((res) =>{
        // res => console.log("CREATE OR UPDATE RES", res)
        dispatch({
          type:"LOGGED_IN_USER",
          // payload values here,
          // aside from email and
          // token directly obtained
          // via firebase,
          // will not persist on
          // refresh. Therefore there
          // is a need for another endpoint
          // to retrieve current user info
          payload:{
            name: res.data.name,
            email:user.email,
            token: idTokenResult.token,
            role: res.data.role,
            id:res.data._id

          }
        })
        // Role based redirect
        roleBasedRedirect(res);
      }).catch(err => console.log(err));

      // Update state via dispatching action
      // Below action comes from firebase
      // i.e., we get user email and token
      // from firebase
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

        createOrUpdateUser(idTokenResult.token).then((res) =>{
          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              name: res.data.name,
              email:user.email,
              token: idTokenResult.token,
              role: res.data.role,
              id:res.data._id

            }
          })
          // Role based redirect
          roleBasedRedirect(res);
        }).catch(err => console.log(err));

        // dispatch({
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   },
        // });


        // history.push("/");



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

      {loading ? <h4>Loading...</h4> : <h4></h4>}
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
