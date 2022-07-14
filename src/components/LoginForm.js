import React from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await store.login();

    // Navigate
    navigate("/notes");
  };

  return (
    <form onSubmit={handleLogin}>
      <p>Please enter your email</p>
      <input
        onChange={store.updateLoginForm}
        value={store.loginForm.email}
        type="email"
        name="email"
      />
      <p>Please enter your password</p>
      <input
        onChange={store.updateLoginForm}
        value={store.loginForm.password}
        type="password"
        name="password"
      />
      <Button text="Login" />
    </form>
  );
}
