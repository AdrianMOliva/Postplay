import { useState } from "react";

import ".././App.css";

import NavbarWelcome from "../components/NavbarWelcome";

function WelcomePage() {
  return (
    <>
      <NavbarWelcome />
      <div>
        <h1>Welcome to PostPlay</h1>
        <h3></h3>
      </div>
    </>
  );
}

export default WelcomePage;
