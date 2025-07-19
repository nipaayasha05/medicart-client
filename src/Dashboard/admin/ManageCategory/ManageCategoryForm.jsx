import React from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../../../api/utilis";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const ManageCategoryForm = ({ refetch, setIsOpen }) => {
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

    const category = {
      ...data,

      name: user.displayName,
      email: user.email,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };
    console.log(category);

    try {
      const res = await axiosSecure.post("/manageCategory", category);
      reset();
      refetch();

      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Category added successfully",
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="text"
            name="categoryName"
            placeholder="Item Name"
            {...register("itemName", { required: true })}
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
              className="btn bg-sky-500 text-white mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById("my_modal_2").close();
              }}
              className="btn  bg-red-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCategoryForm;
