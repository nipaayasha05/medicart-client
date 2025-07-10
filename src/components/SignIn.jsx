import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.init";
import toast from "react-hot-toast";

const SignIn = () => {
  const { signInUser, googleSignIn, provider } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setSuccess(false);
    setErrorMessage("");
    // signInUser
    signInUser(email, password)
      .then((res) => {
        // console.log(res.user);
        setSuccess(true);

        toast.success("User LogIn Successfully");
        navigate(from ? from : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn(auth, provider)
      .then((result) => {
        const currentUser = result.user;
        toast.success("User LogIn Successfully");
        setSuccess(true);
        setErrorMessage("");
        navigate(from ? from : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccess("");
      });
  };

  return (
    <div className="card bg-base-100 m-5  border  mx-auto mt-10 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>
        <form onSubmit={handleSignIn} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn mt-2 w-[320px] mr-5  mx-auto
             "
          >
            <FcGoogle size={24} /> Login with Google
          </button>
          <button className="btn btn-neutral mt-4">Sign Up</button>
          <p className="font-semibold text-center pt-5">
            Don’t Have An Account ?
            <NavLink className="text-secondary" to="/signup">
              Sign UP
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
