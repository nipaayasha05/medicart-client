import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utilis";

const ManageMedicineForm = ({ refetch, categories }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.image[0];
    const imageUrl = await imageUpload(image);

    const addMedicine = {
      ...data,
      price: Number(data?.price),
      discount: Number(data?.discount || 0),
      name: user.displayName,
      email: user.email,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };
    console.log(addMedicine);

    try {
      const res = await axiosSecure.post("/addMedicine", addMedicine);
      reset();
      refetch();

      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Medicine added successfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleImageUpload = async (e) => {
  //   e.preventDefault();

  //   console.log(image);

  //   console.log(imageUrl);
  //   setUploadedImage(imageUrl);
  // };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          {...register("itemName", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="genericName"
          placeholder="Generic Name"
          {...register("genericName", { required: true })}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
        />
        <input
          // onChange={handleImageUpload}
          type="file"
          name="image"
          accept="image/*"
          {...register("image", { required: true })}
          className="file-input file-input-bordered w-full"
        />
        <select
          name="category"
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option category={category} key={category._id}>
              {category.itemName}
            </option>
          ))}
        </select>
        <select
          name="company"
          {...register("company", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Company</option>
          <option value="Square">Square</option>
          <option value="ACI">ACI</option>
          <option value="Beximco">Beximco</option>
        </select>
        <select
          name="massUnit"
          {...register("massUnit", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="mg">Mg</option>
          <option value="ml">ML</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Per Unit Price"
          {...register("price", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount % (default 0)"
          {...register("discount")}
          className="input input-bordered w-full"
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

export default ManageMedicineForm;
