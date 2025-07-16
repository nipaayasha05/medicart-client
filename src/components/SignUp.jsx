import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.init";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { imageUpload } from "../api/utilis";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SignUp = () => {
  const { createUser, googleSignIn, provider, updateUser, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const from = location.state || "/";
  // const navigate = useNavigate();
  //   console.log(createUser);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form?.image?.files[0];
    const role = form.role.value;

    const imageUrl = await imageUpload(image);
    console.log(imageUrl);

    const userData = { name, email, password, image: imageUrl, role };
    console.log(userData);
    setSuccess(false);
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("password must be grater than 6");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("password must contain at least one lower case letter");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("password must contain at least one upper case letter");
      return;
    }

    if (!/\d/.test(password)) {
      setErrorMessage("password must contain at least one number");
      return;
    }

    if (!/[@#$]/.test(password)) {
      setErrorMessage("password must contain at least one special character");
      return;
    }

    // create user in firebase
    createUser(email, password)
      .then((res) => {
        const user = res.user;

        updateUser({ displayName: name, photoURL: imageUrl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: imageUrl });
          })
          .catch((error) => {
            setUser(user);
          });

        // console.log(res.user);
        toast.success("User LogIn Successfully");
        setSuccess(true);
        navigate(from ? from : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    axiosSecure.post("/user", userData).then((res) => {
      res.data;
      console.log("user data", res.data);
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn(auth, provider)
      .then((result) => {
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
    <div className="card bg-gray-100 m-5    mx-auto my-30    max-w-sm shrink-0 shadow-2xl  ">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-gray-700">Sign Up now!</h1>
        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />
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
          <label className="label">Select Image</label>
          <input
            className="text-gray-400 input cursor-pointer"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
          <label className="label">Select Role</label>
          <select
            name="role"
            className="mr-5 bg-white py-2 rounded-sm border border-gray-300 text-gray-400 pl-2"
          >
            <option value="User">User</option>
            <option value="Seller">Seller</option>
          </select>
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
          <button className="btn     my-2 border-3 rounded-2xl border-gray-200 mt-4 mr-4">
            Registration
          </button>
          <p className="font-semibold text-center pt-5">
            Already Have An Account ?
            <NavLink className=" text-amber-700" to="/signin">
              Log In
            </NavLink>
          </p>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && <p className="text-green-500">User Log In Successfully</p>}
      </div>
    </div>
  );
};

export default SignUp;
