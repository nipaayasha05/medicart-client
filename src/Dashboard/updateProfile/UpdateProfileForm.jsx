import React from "react";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utilis";

const UpdateProfileForm = ({ isOpen, setUser, updateUser }) => {
  const { user } = useAuth();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = e.target.fullname.value;

    const image = form?.image?.files[0];
    let imageUrl = user?.photoURL;

    if (image) {
      imageUrl = await imageUpload(image);
    }
    updateUser({
      displayName: fullname,
      photoURL: imageUrl,
    })
      .then(() => {
        setUser({
          ...user,
          displayName: fullname,
          photoURL: imageUrl,
        });
      })
      .catch((error) => {
        setUser(error);
      });
    document.getElementById("my_modal_2").close();
  };
  return (
    <div>
      <form className="text-center space-y-1" onSubmit={handleUpdate}>
        {/* {user.photoURL} */}
        <label className="label">Name</label>
        <br />
        <input
          type="text"
          name="fullname"
          className="text-gray-400 input cursor-pointer"
          placeholder="Name"
        />
        <br />
        <label className="label">Photo URL</label>
        <br />
        <input
          className="text-gray-400 input cursor-pointer"
          type="file"
          name="image"
          accept="image/*"
        />
        <br />
        <div className=" ">
          <button
            type="submit"
            className="btn mt-2 text-xl bg-sky-500 text-white "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
