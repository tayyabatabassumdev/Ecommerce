// frontend/src/utils/redirectIfNotLoggedIn.ts
import toast from "react-hot-toast";

let loginToastShown = false;

export const redirectIfNotLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    if (!loginToastShown) {
      loginToastShown = true;
      toast.error("Please login to continue");

      setTimeout(() => {
        window.location.replace("/login");
        loginToastShown = false;
      }, 300);
    }
    throw new Error("User not logged in");
  }
};
