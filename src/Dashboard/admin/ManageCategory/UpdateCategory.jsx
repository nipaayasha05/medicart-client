import React, { useEffect } from "react";
import { imageUpload } from "../../../api/utilis";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateCategory = ({ refetch, selectedCategory, setSelectedCategory }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedCategory) {
      reset({
        itemName: selectedCategory.itemName,
        description: selectedCategory.description,
      });
    }
  }, [selectedCategory, reset]);

  const onSubmit = async (data) => {
    let imageUrl = selectedCategory.image;
    if (data.image && data.image.length > 0) {
      imageUrl = await imageUpload(data.image[0]);
    }

    const category = {
      ...data,

      name: user.displayName,
      email: user.email,
      image: imageUrl,
    };
    // console.log(category);

    try {
      const res = await axiosSecure.put(
        `/updateCategory/${selectedCategory._id}`,
        category
      );
      reset();
      refetch();
      setSelectedCategory(null);

      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Application Updated!",
          text: "Category update successfully",
        });
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
            {...register("itemName")}
            className="input input-bordered w-full"
          />

          <textarea
            name="description"
            placeholder="Short Description"
            {...register("description")}
            className="textarea textarea-bordered w-full"
          />
          {selectedCategory && (
            <input
              type="file"
              name="image"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
          )}

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              onClick={() => {
                document.getElementById("my_modal_1").close();
              }}
              className="btn bg-sky-500 text-white mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById("my_modal_1").close();
              }}
              className="btn bg-red-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
