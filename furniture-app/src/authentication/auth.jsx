import { MantineProvider } from "@mantine/core";
import React from "react";

function Auth() {
  return (
    <MantineProvider>
      <section className="auth container">
        <h1 className="auth-title">Welcome to the best in the market</h1>
        <hr />
        <div className="auth-wrapper">
          <div className="signIn">Sign In</div>
          <div className="signUp">Sign Up</div>
        </div>
      </section>
    </MantineProvider>
  );
}

export default Auth;
