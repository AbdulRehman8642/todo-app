import { React, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider,
  doc,
  setDoc,
  db,
  auth,
} from "../firebase.js";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../fontawesome.jsx";
import Swal from "sweetalert2";

export default function Signup({ triggerSignupFun }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const sendUserData = async (user) => {
    const docRef = doc(db, "user", user.uid);
    await setDoc(docRef, {
      name: username,
      userEmail: email,
    });
  };
  const sendUserDatawithGoogle = async (user) => {
    const docRef = doc(db, "user", user.uid);
    await setDoc(docRef, {
      name: undefined,
      userEmail: user.email,
    });
  };

  const newUserCreation = async () => {
    if (email && password) {
      triggerSignupFun();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          console.log("new user created");
          console.log("user ==>", user.uid);
          Swal.fire({
            position: "center",
            // icon: "success",
            title: "Account has Created",
            showConfirmButton: false,
            timer: 1200,
          });
          sendUserData(user);
        })
        .catch((error) => {
          console.log("error ==>", error);
        });
    }
  };

  const googleLogin = () => {
    triggerSignupFun();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        Swal.fire({
          position: "center",
          // icon: "success",
          title: "Account has Created",
          showConfirmButton: false,
          timer: 1200,
        });
        sendUserDatawithGoogle(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signInWithEnP = () => {
    triggerSignupFun();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("user is logged in");
        console.log("user ==>", user.uid);
        Swal.fire({
          position: "center",
          // icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
        sendUserData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <div className="signupFormParent handleParent">
        <div className="e-p-signup taskFormParent">
          <div className="crossIconParent">
            <FontAwesomeIcon
              onClick={triggerSignupFun}
              icon={icons.cross}
              className="crossIcon"
            />
          </div>
          <div className="formHeading signupHeading">
            {isLogin && (
              <h3>
                Create your <b>Donezo</b> account
              </h3>
            )}
            {!isLogin && (
              <h3>
                Sign In your <b>Donezo</b> account
              </h3>
            )}
          </div>
          <div className="SignupInputArea">
            <div className="signupFieldParent username">
              <input
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="username"
                className="signupFields usernameField inputFields"
              />
            </div>
            <div className="signupFieldParent emailInpDiv">
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                className="signupFields emailField inputFields"
              />
            </div>
            <div className="signupFieldParent passInpDiv">
              <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                className="signupFields passwordField inputFields"
              />
            </div>
            <div className="signupPageSignupBtnParent">
              {isLogin && (
                <button
                  className="signupPageSignupBtn"
                  id="test1"
                  onClick={() => newUserCreation()}
                >
                  Sign Up
                </button>
              )}

              {!isLogin && (
                <button
                  className="signupPageSignupBtn"
                  id="test1"
                  onClick={() => signInWithEnP()}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
          <div className="or">
            <h4>OR</h4>
          </div>
          <div className="googleSignInParent">
            <button className="googleSigninBtn" onClick={googleLogin}>
              Continue with Google <FontAwesomeIcon icon={icons.google} />
            </button>
          </div>

          {isLogin && (
            <div className="alreadyHaveAC">
              Already have an account?{" "}
              <p onClick={() => setIsLogin(!isLogin)} className="signUp_in">
                Login
              </p>
            </div>
          )}

          {!isLogin && (
            <div className="alreadyHaveAC donHaveAC">
              Don't have an account?{" "}
              <p onClick={() => setIsLogin(!isLogin)} className="signUp_in">
                Sign up
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
