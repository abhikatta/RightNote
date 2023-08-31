import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function Signup(e) {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
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
    } catch (error) {
      alert(error.message);
    }
  }
  async function LoginWithGoogle(e) {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col h-screen  w-screen bg-slate-600 justify-center items-center">
      <h2 className="font-bold text-5xl  text-slate-100 mb-4">Login</h2>

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
        <button
          className="bg-slate-300 text-slate-800 rounded-lg border-green-600 border-2 px-2 py-1 my-1"
          onClick={Signup}>
          Sign Up
        </button>
        <button
          className="bg-slate-300 text-slate-800 rounded-lg border-green-600 border-2 px-2 py-1 my-1"
          onClick={Login}>
          Log In
        </button>
        <button
          className="bg-slate-300 text-slate-800 rounded-lg border-green-600 border-2 px-2 py-1 my-1"
          onClick={LoginWithGoogle}>
          Sign In with Google
        </button>
      </form>
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <h1>Not Loadinsadnjsad bshabhk fbAGDBBSJ...</h1>
        </div>
      )}
    </div>
  );
}

export default Login;
