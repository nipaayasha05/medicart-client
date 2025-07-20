import React, { use, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.init";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

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
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Join Us</title>
      </Helmet>
      <div className="card bg-gray-100 m-5    mx-auto my-30 max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-sky-600">Log In now!</h1>
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
            <button className="btn     my-2  bg-sky-500 text-white rounded-2xl   mt-4 mr-4">
              Join Us
            </button>
            <p className="font-semibold text-center pt-5">
              Don’t Have An Account ?
              <NavLink className="text-sky-600 " to="/signup">
                Registration
              </NavLink>
            </p>
          </form>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && (
            <p className="text-green-500">User Log In Successfully</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
