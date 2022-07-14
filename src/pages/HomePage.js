import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="landing">
      <h1>Welcome to GLOWZ</h1>
      <h4>
        A platform to privately share your daily achievements, struggles, or any
        things you want to keep private
      </h4>
      <Link to="/notes">
        <Button text="Enter GLOWZ" />
      </Link>
    </div>
  );
}
