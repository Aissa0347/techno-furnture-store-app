import {
  Anchor,
  Button,
  Group,
  Input,
  MantineProvider,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { useState } from "react";
import { error, Facebook, Google } from "../dashboard/components/icons";
import { auth, db, storage } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { defaultUser } from "../Website-Assets";

import { useNavigate } from "react-router-dom";
//* -------------------------------------------------------------------------- */
//*                               Auth Component                               */
//* -------------------------------------------------------------------------- */

function Auth({ setUserUID }) {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isSignupError, setIsSignupError] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const authForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: (email) =>
        email.length < 6 ? "Please insert a valid email" : null,
      password: (pass) =>
        pass.length < 6 ? "Your password is too short" : null,
    },
  });

  //* -------------------- Sign In with Google and Facebook -------------------- */

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const userCred = await signInWithPopup(auth, googleProvider);
    return userCred;
  };
  const signInWithFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    const userCred = await signInWithPopup(auth, facebookProvider);
    return userCred;
  };

  const colUsers = collection(db, "Users");

  const navigate = useNavigate();

  async function createNewUser(methodName, values) {
    console.log("is it running");
    let signupMethod;
    if (methodName === "Google") {
      signupMethod = signInWithGoogle();
      console.log(signupMethod);
    } else if (methodName === "Facebook") {
      signupMethod = signInWithFacebook();
    } else {
      signupMethod = createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    }

    console.log(signupMethod);

    await signupMethod
      .then(async (userCred) => {
        if (!userCred) {
          console.log("failed bruh");
          return;
        }

        console.log("this is user Cred ", userCred);
        const userInfo = userCred.user;
        const userName = userInfo.displayName || values.name || "Customer";
        const userAvatarImg = userInfo.photoURL || defaultUser.avatarImg;
        const userUID = `${userInfo.uid}`;
        const userEmail = userInfo.email;
        setIsSignupError(false);
        console.log("mid ");
        await getDocs(query(colUsers, where("id", "==", userUID))).then(
          async (res) => {
            console.log(res);
            if (res.docs.length < 1)
              await updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: userAvatarImg,
              }).then(async (res) => {
                await addDoc(colUsers, {
                  ...defaultUser,
                  id: userUID,
                  name: userName,
                  avatarImg: userAvatarImg,
                  email: userEmail,
                  createdAt: serverTimestamp(),
                });
              });
          }
        );
        console.log("end");
        setUserUID(userUID);
        navigate("/");
        console.log("signed successfully");
        authForm.reset();
      })
      .catch((error) => setIsSignupError(true));
  }

  //prettier-ignore
  return (
    <MantineProvider>
      <section className="auth ">
        <div className="container">
          <h1 className="auth-title">Welcome to the best in the market</h1>
          <hr />
          {!resetPassword ? (
            <div className="auth-wrapper">
              {toggleLogin ?
                <div className="signIn">
                  <h2>Sign in</h2>
                  <form
                    className="info_form auth-form"
                    onSubmit={authForm.onSubmit((formValues) => {
                      console.log("clicked");
                      signInWithEmailAndPassword(
                        auth,
                        formValues.email,
                        formValues.password
                      )
                      .then((res) => {
                        setIsLoginError(false);
                        setUserUID(res.user.uid);
                        navigate("/");
                        authForm.reset()
                      })
                      .catch((error) => {
                        setIsLoginError(true)
                        console.log(error.message);
                        console.log(error.code);
                      });
                    })}
                    >
                    <div className="auth-links">
                      <Button size="md" leftIcon={Google} uppercase fullWidth className="auth-btn google-btn" onClick={() => createNewUser('Google')} >
                        Google
                      </Button>
                      <Button size="md" leftIcon={Facebook} uppercase fullWidth className="auth-btn fb-btn" onClick={() => createNewUser('Facebook')} >
                        Facebook
                      </Button>
                      <span className="hr">
                        <hr />
                        or <hr />
                      </span>
                    </div>
                    {isLoginError && (
                      <Text color={"red"} className="auth-error" title="Login">
                        <span className="auth-icon">{error}</span> Invalid login
                        or password. You may need to reset your password.
                      </Text>
                    )}
                    <TextInput
                      label="Email Address"
                      type={"email"}
                      className="full"
                      placeholder="Email Address"
                      withAsterisk
                      {...authForm.getInputProps("email")}
                      required
                    />
                    <TextInput
                      label="Password"
                      className="full"
                      type={"password"}
                      placeholder="Password"
                      withAsterisk
                      {...authForm.getInputProps("password")}
                      required
                    />
                    <Anchor
                      className="auth-anchor"
                      underline
                      size={"sm"}
                      align="right"
                      onClick={() => setResetPassword(true)}
                    >
                      Forgot Your Password
                    </Anchor>
                    <Button size="md"
                      type="submit"
                      fullWidth
                      className="auth-btn auth-CTA"
                    >
                      Login
                    </Button>
                  </form>
                </div>
              : 
                <Button size="md"
                  fullWidth
                  className="signIn  auth-toggle-btn"
                  variant="light"
                  onClick={() => setToggleLogin(true)}
                >
                  You Have An Account ?
                </Button>
              }
              {!toggleLogin ? 
                <div className="signUp">
                  <h2>Sign Up</h2>
                  <form
                    className="info_form auth-form"
                    onSubmit={
                      authForm.onSubmit((values) => {
                        createNewUser('Email',values);
                      })
                    }
                  >
                    <div className="auth-links">
                      <Button size="md" leftIcon={Google} uppercase fullWidth className="auth-btn google-btn" onClick={() => createNewUser('Google')} >
                        Google
                      </Button>
                      <Button size="md" leftIcon={Facebook} uppercase fullWidth className="auth-btn fb-btn" onClick={() => createNewUser('Facebook')} >
                        Facebook
                      </Button>
                      <span className="hr">
                        <hr />
                        or <hr />
                      </span>
                    </div>
                    {isSignupError && (
                      <Text color={"red"} className="auth-error" title="Login">
                        <span className="auth-icon">{error}</span>
                        There is already an account with this email address.
                      </Text>
                    )}
                    <TextInput
                      label="Name"
                      className="full"
                      placeholder="Name"
                      withAsterisk
                      {...authForm.getInputProps("name")}
                      required
                    />
                    <TextInput
                      label="Email Address"
                      type={"email"}
                      className="full"
                      placeholder="Email Address"
                      withAsterisk
                      {...authForm.getInputProps("email")}
                      required
                    />
                    <TextInput
                      label="Password"
                      className="full"
                      type={"password"}
                      placeholder="Password"
                      withAsterisk
                      {...authForm.getInputProps("password")}
                      required
                    />
                    <Button size="md"
                      type="submit"
                      fullWidth
                      className="auth-btn auth-CTA"
                    >
                      Register
                    </Button>
                  </form>
                </div>
               : 
                <Button size="md"
                  fullWidth
                  className="signUp  auth-toggle-btn"
                  variant="light"
                  onClick={() => setToggleLogin(false)}
                >
                  Create new Account ?
                </Button>
              }
              <Button size="md"
                fullWidth
                className="signIn  auth-toggle-btn"
                variant="light"
                onClick={() => {
                  console.log(auth.currentUser);
                  signOut(auth)
                    .then((res) => {
                      console.log("logged out", res);
                    })
                    .catch((error) => console.log(error));
                }}
              >
                Sign Out
              </Button>  
            </div>
          ) : (
            <div className="auth-wrapper">
              {!emailSended ? (
                <div className="signIn">
                  <h2>Reset Password</h2>
                  <form
                    className="info_form auth-form"
                  >
                    {isLoginError && (
                      <Text color={"red"} className="auth-error" title="Login">
                        <span className="auth-icon">{error}</span> It seams this
                        email dosen't exist in our platform, Try another email
                      </Text>
                    )}
                    <TextInput
                      label="Email Address"
                      type={"email"}
                      className="full"
                      placeholder="Email Address"
                      withAsterisk
                      {...authForm.getInputProps("email")}
                      required
                    />

                    <Button size="md"
                      type="submit"
                      fullWidth
                      className="auth-btn auth-CTA"
                      onClick={(e)=> {
                        e.preventDefault();
                        const formValues= authForm.values;
                          console.log(formValues.email);
                          sendPasswordResetEmail(auth, formValues.email)
                            .then((res) => {
                              console.log(res);
                              setEmailSended(true);
                              setIsLoginError(false);
                            })
                            .catch((error) => {
                              console.log(error.code);
                              console.log(error.message);
                              setIsLoginError(true)});
                      }}
                    >
                      Send Email
                    </Button>
                    <Anchor
                      className="auth-anchor"
                      underline
                      size={"sm"}
                      align="right"
                      onClick={() => {
                        setResetPassword(false);
                        setIsLoginError(false);
                        setEmailSended(false);
                      }}
                    >
                      Return to login
                    </Anchor>
                  </form>
                </div>
              ) : (
                <div className="signIn">
                  <h2>Email Sent Successfully</h2>
                  <form
                    className="info_form auth-form"
                  >
                    <Text size={"lg"} className="auth-error">
                      Email sent successfully, Check your inbox and reset your
                      password.
                    </Text>
                    <Button size="md"
                      type="submit"
                      fullWidth
                      className="auth-btn auth-CTA"
                      onClick={()=>{
                        setResetPassword(false);
                        setIsLoginError(false);
                        setEmailSended(false);
                      }}
                    >
                      Return To Login
                    </Button>
                    <Anchor
                      className="auth-anchor"
                      underline
                      size={"sm"}
                      align="right"
                      onClick={() => {
                        setIsLoginError(false);
                        setEmailSended(false);
                      }}
                    >
                      Reset Password
                    </Anchor>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </MantineProvider>
  );
}

export default Auth;
