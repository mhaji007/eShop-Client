import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import styles from "./Register.module.scss";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

// // Function to send token to the backend api after log in
// const createOrUpdateUser = async(authToken) => {
//   // Body of the request is empty
//   // body is not used since
//   // Token will be sent in the headers
//   return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
//     headers: {
//       authToken,
//     }
//   });
// }

// User lands on this page
// after clicking on the email
// sent by Firebase through
// Register component

// history is passed via props
// we have access to history here
// because RegisterComplete is defined
// as a route and therefore history
// is passed to this component on the
// props
const RegisterComplete = ({ history }) => {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  // populate email via localstorage upon component's mounting
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [user, history]);

  // Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email and password validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    // Simple password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Passwordless authentication
    try {
      // window.location.href grabs
      // the entire url
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log(result);

      // Check whether the user
      // email is verified (i.e., user
      // has not landed on the complete
      // register page without actually
      // clicking the link first)
      if (result.user.emailVerified) {
        // Update the user with password
        // password is needed
        // since we do not want the user
        // to check their email each time
        // for signing in

        // Remove user email from local storage
        // as it was only needed to help with
        // prefilling the form in RegisterComplete component
        window.localStorage.removeItem("emailForRegistration");

        // Get user id token
        let user = auth.currentUser;

        // console.log(user)

        // Update user with password (add the password in)
        await user.updatePassword(password);

        // Retrieve token information from user
        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user, "idTokenResult", idTokenResult);

        // Populate user in Redux store
        // we need to access name, email, etc.
        // but most importantly the JSON
        // web token on many different components
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));

        // Redirect to homepage
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Form
  const registerCompleteForm = () => {
    return (
      <div>
        <form
          autoComplete="off"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.control}>
            <h1>Join</h1>
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
              dsiabled="true"
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

          <button
            className={classnames(
              styles.btn,
              styles.blockCube,
              styles.blockCubeHover
            )}
            type="submit"
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
            <div className={styles.text}>Complete Registration</div>
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="container p-5">
      {/* <div className="row"> */}
      {/* <div className="col-md-6 offset-md-3"> */}

      {registerCompleteForm()}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default RegisterComplete;
