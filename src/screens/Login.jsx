import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import GoogleIcon from "../icons/GoogleLogin";
function Login({ setUserID }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);

  async function Signup(e) {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      setUserID(response.user);
    } catch (error) {
      alert(error.message);
    }
  }
  async function Login(e) {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth, email, password);
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      alert(error.message);
    }
  }
  async function LoginWithGoogle(e) {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setUserID(response.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div
      name="login"
      className="flex flex-col h-screen  w-screen bg-slate-600 justify-center items-center">
      <h2 className="font-bold text-5xl  text-slate-100 mb-4">
        {signUp ? "SignUp" : "LogIn"}
      </h2>

      <form className="flex flex-col items-center justify-center h-auto w-auto px-3 py-5">
        <input
          placeholder="Email"
          className="bg-slate-200 my-2 px-3 outline-none focus:outline-none h-10 w-auto py-1 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="bg-slate-200 my-2 px-3 h-10 w-auto py-1 outline-none focus:outline-none rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="bg-slate-300 text-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 hover:text-slate-600 transition-colors duration-200 px-2 py-1 my-1"
          onClick={() => setSignUp((prevSignUp) => !prevSignUp)}>
          {signUp
            ? "Already have an account? Log In"
            : "Don't have an account? Click here to Sign Up"}
        </div>
        <button
          className="bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-50 hover:text-slate-600 transition-colors duration-200 px-2 py-1 my-1"
          onClick={signUp ? Signup : Login}>
          {signUp ? "SignUp" : "LogIn"}
        </button>
        <div className="text-white">Or sign In with Google:</div>
        {!signUp ? (
          <div
            className="hover:opacity-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col opacity-30 "
            onClick={LoginWithGoogle}>
            <GoogleIcon height={50} width={50} />
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Login;
