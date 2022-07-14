import React, { useEffect } from "react";
import authStore from "../stores/authStore";

export default function LogoutPage() {
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);

  return (
    <div className="logout-page">
      <h1>Logged Out</h1>
      <img></img>
      <h3>
        Thank you for visiting GLOWZ, we hope you will come visit soon and
        create new personal achievements for yourself. You have came so far!
      </h3>
    </div>
  );
}
