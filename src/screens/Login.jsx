import React, { useState } from "react";
import "../index.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import GoogleIcon from "../icons/GoogleLogin";
import LightThemeIcon from "../icons/LightThemeIcon";
import DarkThemeIcon from "../icons/DarkThemeIcon";
function Login({ theme, toggleTheme, setUserID }) {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(auth.currentUser || null);
  async function Signup(e) {
    e.preventDefault();

    setLoading(true);
    if (
      password.length > 0 &&
      setConfirmPassword.length > 0 &&
      setPassword === setConfirmPassword &&
      Username.length > 0 &&
      email.length > 0
    ) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, { displayName: Username });
        console.log(response);
        setUserID(response.user);
        // setUser(response.user);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all details correctly.");
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
    <div
      className={`flex flex-col specialfont h-screen w-full  justify-center items-center
     ${
       theme === "light"
         ? "text-slate-600 bg-slate-200"
         : "text-slate-200 bg-slate-600"
     }
    `}>
      <div className="w-[80%] flex flex-row top-[10%] items-center justify-center absolute">
        <div className="flex flex-row items-center">
          <img
            className=""
            src="https://img.icons8.com/?size=1x&id=nhRO70R1MM5K&format=png"
            width={70}
            alt="Logo"
            height={70}
          />
          <h1 className="text-5xl font-light text-center">RightNote</h1>
        </div>
      </div>
      <div className="sm:right-[10%] sm:top-[10%]  md:right-[10%] lg::right-[10%] right-[5%] top-[5%] absolute">
        {theme === "light" ? (
          <LightThemeIcon onClick={toggleTheme} theme={theme} />
        ) : (
          <DarkThemeIcon onClick={toggleTheme} theme={theme} />
        )}
      </div>
      <h2
        className={`font-bold text-4xl text-center mb-4
      ${
        theme === "light"
          ? "text-slate-600 bg-slate-200"
          : "text-slate-200 bg-slate-600"
      }
      `}>
        {signUp ? "Sign Up" : "Log In"}
      </h2>
      <form
        className={`flex flex-col items-center justify-center h-auto w-auto px-3 py-5
      ${
        theme === "light"
          ? "text-slate-600 bg-slate-200"
          : "text-slate-200 bg-slate-600"
      }
      `}>
        <input
          placeholder="Email"
          className={`my-2 px-3  outline-none focus:outline-none h-10 w-auto py-1 rounded-lg
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {signUp && (
          <input
            placeholder="Username"
            type="text"
            className={` my-2 px-3 h-10 w-auto py-1 outline-none focus:outline-none rounded-lg
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          placeholder="Password"
          type="password"
          className={` my-2 px-3 h-10 w-auto py-1 outline-none focus:outline-none rounded-lg
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {signUp && (
          <input
            placeholder="Confirm Password"
            type="password"
            className={` my-2 px-3 h-10 w-auto py-1 outline-none focus:outline-none rounded-lg
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <div
          className={`rounded-lg cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-2 py-1 my-1
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
          onClick={() => setSignUp((prevSignUp) => !prevSignUp)}>
          {signUp
            ? "Already have an account? Log In"
            : "Don't have an account? Click here to Sign Up"}
        </div>
        <button
          className={`rounded-lg hover:-translate-y-0.5 transition-transform duration-200 px-2 py-1 my-1
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }
          `}
          onClick={signUp ? Signup : Login}>
          {signUp ? "Sign Up" : "Log In"}
        </button>
        <div
          className={`
          px-2 py-1 rounded-lg
          ${
            theme === "light"
              ? "text-slate-700 bg-slate-300"
              : "text-slate-300 bg-slate-700"
          }`}>
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
    <div className="h-screen  w-screen flex flex-col justify-center items-center ">
      <div className="flex flex-col hover:animate-bounce items-center animate-pulse">
        <img
          src="https://img.icons8.com/?size=1x&id=nhRO70R1MM5K&format=png"
          width={100}
          alt="Logo"
          height={100}
        />
        <p className="">Logging in to RightNote...</p>
      </div>
    </div>
  );
}

export default Login;
