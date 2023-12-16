import { useState } from "react";

import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, user.email, user.password);
    console.log("user is created");
  };

  const handleSignOut = () => {
    signOut(auth);
    console.log("user is sign out");
  };

  const handleSignWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
    console.log("user is sign in with google");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userEmail">Email: </label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          value={user.email}
          placeholder="Email...."
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          onChange={handleChange}
          value={user.password}
          type="password"
          name="password"
          id="password"
          placeholder="Password...."
        />
      </div>
      <div>
        <button type="submit">Sign-In</button>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign-Out</button>
      </div>
      <div>
        <button onClick={handleSignWithGoogle}>Sign-In with google</button>
      </div>
    </form>
  );
};

export default Auth;
