import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await store.signup();
    navigate("/login");
  };

  return (
    <form onSubmit={handleSignup}>
      <p>Please Enter Your Email</p>
      <input
        onChange={store.updateSignupForm}
        value={store.signupForm.email}
        type="email"
        name="email"
      />
      <p>Please Enter a Password</p>
      <input
        onChange={store.updateSignupForm}
        value={store.signupForm.password}
        type="password"
        name="password"
      />
      <button type="submit">Signup</button>
    </form>
  );
}
