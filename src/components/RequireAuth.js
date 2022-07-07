import authStore from "../stores/authStore.js";

export default function RequireAuth(props) {
  const store = authStore();

  if (!store.loggedIn) {
    return <div> Please Login</div>;
  }

  return <div>{props.children}</div>;
}
