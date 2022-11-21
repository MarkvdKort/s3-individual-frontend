import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import React from "react";
import LoginButton from "./LoginButton";
const LoginPage = () => {

  return (
    <div className="bg-black m-0 p-0 h-screen w-screen">
      <br />
      <div className="text-white">
        You aren't logged in yet

        <br />
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
