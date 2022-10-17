import React from "react";
import logo from "./assets/patbev.png";
import LoginButton from "./LoginButton";
const LoginPage = () => {
  return (
    <div className="bg-black m-0 p-0 h-screen w-screen">
        <img className="h-[400px] w-[400px]" src={logo} />
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
