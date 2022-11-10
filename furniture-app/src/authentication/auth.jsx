import {
  Anchor,
  Button,
  Group,
  Input,
  MantineProvider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Divider, Stack } from "@mantine/core";

import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { useState } from "react";
import { error, Facebook, Google } from "../dashboard/components/icons";
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { defaultUser } from "../Website-Assets";

import { useLocation, useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
//* -------------------------------------------------------------------------- */
//*                               Auth Component                               */
//* -------------------------------------------------------------------------- */

function Auth(props) {
  const { setUserUID, setOpenAuthDrawer } = props;
  console.log("here is props ", props);
  const [type, toggle] = useToggle(["login", "register"]);
  const [isReset, toggleReset] = useToggle(["login", "reset"]);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isError, setIsError] = useState(false);

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

  const resetForm = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (email) =>
        email.length < 6 ? "Please insert a valid email" : null,
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

  const location = useLocation();
  const navigate = useNavigate();

  console.log("we are here ", location);
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
    signupMethod
      .then(async (userCred) => {
        if (!userCred) {
          setIsError("Invalid email or password, Please try again");
          console.log("failed bruh");
          return;
        }

        console.log("this is user Cred ", userCred);
        const userInfo = userCred.user;
        const userName = userInfo.displayName || values.name || "Customer";
        const userAvatarImg = userInfo.photoURL || defaultUser.avatarImg;
        const userUID = `${userInfo.uid}`;
        const userEmail = userInfo.email;
        console.log("mid ");
        await getDocs(query(colUsers, where("id", "==", userUID)))
          .then(async (res) => {
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
          })

          .catch((error) =>
            setIsError("Invalid email or password, Please try again")
          );
        console.log("end");
        setUserUID(userCred.user.uid);
        setIsError(false);
        setOpenAuthDrawer(false);
        if (location.pathname === "/auth") navigate(-1);
        console.log("signed successfully");
        authForm.reset();
      })
      .catch((error) =>
        setIsError("Invalid email or password, Please try again")
      );
  }

  //* ------------------------------ Handle Submit ----------------------------- */

  const handleSubmit = (values) => {
    if (type === "login") {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          setUserUID(res.user.uid);
          if (location.pathname === "/auth") navigate(-1);
          authForm.reset();
        })
        .catch((error) => {
          setIsError("Invalid email or password, Please try again");
          console.log(error.message);
          console.log(error.code);
        });
    } else {
      console.log("here is user data :", values);
      createNewUser("Email", values);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [isReset, type, isEmailSended, authForm.values]);

  //* ------------------------------ Handle Reset ------------------------------ */

  const handleReset = (values) => {
    if (!isEmailSended) {
      console.log("inside submit values ");

      sendPasswordResetEmail(auth, values.email)
        .then((res) => {
          console.log(res);
          setIsEmailSended(true);
        })
        .catch((error) => {
          resetForm.setFieldError("email", "Please enter a valid email");
        });
    } else {
      toggleReset();
      console.log("toggle reset");
    }
  };

  return (
    <MantineProvider>
      <div className="auth">
        <div className="container">
          <Paper radius="none" p="xl" className="auth-form" withBorder>
            {isReset === "login" ? (
              <form
                onSubmit={authForm.onSubmit((values) => {
                  handleSubmit(values);
                })}
              >
                <Text size="lg" weight={500}>
                  Welcome to Mantine, {type} with
                </Text>
                <Stack grow mb="md" mt="md">
                  <Button
                    size="md"
                    leftIcon={Facebook}
                    uppercase
                    fullWidth
                    className="auth-btn fb-btn"
                    onClick={() => createNewUser("Facebook")}
                  >
                    Facebook
                  </Button>
                  <Button
                    size="md"
                    leftIcon={Google}
                    uppercase
                    fullWidth
                    className="auth-btn google-btn"
                    onClick={() => createNewUser("Google")}
                  >
                    Google
                  </Button>
                </Stack>
                <Divider
                  label="Or continue with email"
                  labelPosition="center"
                  my="lg"
                />
                <Stack>
                  {type === "register" && (
                    <TextInput
                      label="Name"
                      placeholder="Your name"
                      // value={authForm.values.name}
                      {...authForm.getInputProps("name")}
                      error={
                        authForm.errors.name && "Please enter a valid name"
                      }
                    />
                  )}

                  <TextInput
                    label="Email"
                    placeholder="hello@mantine.dev"
                    // value={authForm.values.email}
                    {...authForm.getInputProps("email")}
                    error={authForm.errors.email && "Invalid email"}
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    // value={authForm.values.password}
                    {...authForm.getInputProps("password")}
                    error={
                      authForm.errors.password &&
                      "Password should include at least 6 characters"
                    }
                  />
                </Stack>
                <Stack position="apart" mt="sm" spacing="xs">
                  {isError && (
                    <Text size="sm" mt={5} color="red">
                      {isError}
                    </Text>
                  )}
                  <Anchor
                    component="button"
                    align="left"
                    type="button"
                    color="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                  >
                    {type === "register"
                      ? "Already have an account? Login"
                      : "Don't have an account? Register"}
                  </Anchor>
                  <Button type="submit" fullWidth>
                    {type}
                  </Button>
                </Stack>
                <Anchor
                  component="button"
                  align="center"
                  type="button"
                  color="dimmed"
                  onClick={() => toggleReset()}
                  size="xs"
                  mt="md"
                >
                  {isReset === "login"
                    ? "Forgot your password? Reset"
                    : "Already have an account? Login"}
                </Anchor>
              </form>
            ) : (
              <form
                onSubmit={resetForm.onSubmit((values) => {
                  handleReset(values);
                })}
              >
                <Stack>
                  {!isEmailSended ? (
                    <>
                      <Text size="lg" weight={500}>
                        Reset you password
                      </Text>
                      <TextInput
                        label="Email"
                        placeholder="hello@mantine.dev"
                        // value={authForm.values.email}
                        {...resetForm.getInputProps("email")}
                        error={resetForm.errors.email && "Invalid email"}
                      />
                    </>
                  ) : (
                    <>
                      <Text size="lg" weight={500}>
                        Email sent successfully
                      </Text>
                      <div className="">
                        <BiCheckCircle />
                      </div>
                    </>
                  )}
                </Stack>
                <Stack position="apart" mt="sm">
                  <Button type="submit" fullWidth>
                    {isEmailSended ? "Return to login" : "Send email message"}
                  </Button>
                </Stack>
                <Anchor
                  component="button"
                  align="center"
                  type="button"
                  color="dimmed"
                  onClick={() => toggleReset()}
                  size="xs"
                  mt="md"
                >
                  {isReset === "login"
                    ? "Forgot your password ? Reset"
                    : "Already have an account ? Login"}
                </Anchor>
              </form>
            )}
          </Paper>
        </div>
      </div>
    </MantineProvider>
  );
}

export default Auth;
