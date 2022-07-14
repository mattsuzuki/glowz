import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="landing">
      <h1>GLOWZ</h1>
      <img className="logo" src="/assets/images/glowz.svg" />
      <h4>
        A platform to privately share your daily achievements, struggles, or any
        things you want to keep private
      </h4>
      <Link to="/notes">
        <div className="landbutton">
          <Button text="Enter GLOWZ" />
        </div>
      </Link>
    </div>
  );
}
