import React from "react";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utilis";

const AskForAdvertisementForm = ({ refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.image[0];
    const imageUrl = await imageUpload(image);

    const addAdvertisement = {
      ...data,

      name: user.displayName,
      status: data?.status || "Not In Slider ",
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };
    console.log(addAdvertisement);

    try {
      const res = await axiosSecure.post("/addAdvertisement", addAdvertisement);
      reset();
      refetch();

      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Advertisement added successfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="text"
          name="email"
          readOnly
          value={user?.email || ""}
          {...register("email", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          {...register("medicineName", { required: true })}
          className="input input-bordered w-full"
        />

        <textarea
          name="description"
          placeholder="Short Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          {...register("image", { required: true })}
          className="file-input file-input-bordered w-full"
        />

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
            className="btn btn-primary mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskForAdvertisementForm;
