import { useState } from "react";
import SignInSignUp from "./page/SignInSignUp/SignInSignUp";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [user, setuser] = useState({ name: "chris" });

  return (
    <div>
      {user ? (
        <div>
          <SignInSignUp />
        </div>
      ) : (
        <h1>no estas logueado</h1>
      )}
      <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}
