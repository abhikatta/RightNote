import React, { useState } from "react";
import "../index.css";
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
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(auth.currentUser || null);
  async function Signup(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      setUserID(response.user);
      // setUser(response.user);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function Login(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      setUserID(response.user);
      // setUser(response.user);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function LoginWithGoogle(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      setUserID(response.user);
      // setUser(response.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return !loading ? (
    <div className="flex flex-col specialfont h-screen w-full bg-slate-600 justify-center items-center">
      {/* TODO:
      - Themes 
      - Login as local 
       */}
      <h1 className="text-5xl font-light absolute text-slate-100 top-[10%]">
        RightNote
      </h1>
      <h2 className="font-bold text-4xl text-center  text-slate-100 mb-4">
        {signUp ? "Sign Up" : "Log In"}
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
          {signUp ? "Sign Up" : "Log In"}
        </button>
        <div className="text-white">
          Or {signUp ? "Sign Up" : "Log In"} with Google:
        </div>

        <div
          className="hover:opacity-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col opacity-30 "
          onClick={LoginWithGoogle}>
          <GoogleIcon height={50} width={50} />
        </div>
      </form>
    </div>
  ) : (
    <div className="h-screen bg-slate-600 w-screen flex flex-col justify-center items-center ">
      <div className="flex flex-col hover:animate-bounce items-center animate-pulse">
        <img
          src="https://img.icons8.com/?size=1x&id=nhRO70R1MM5K&format=png"
          width={100}
          alt="Logo"
          height={100}
        />
        <p className="text-slate-50">Logging in to RightNote...</p>
      </div>
    </div>
  );
}

export default Login;
