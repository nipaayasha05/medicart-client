import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageMedicineForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const addMedicine = {
      ...data,
      price: Number(data?.price),
      discount: Number(data?.discount),
      name: user.displayName,
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    console.log(addMedicine);

    try {
      const res = await axiosSecure.post("/addMedicine", addMedicine);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <option value="Tablet">Tablet</option>
          <option value="Syrup">Syrup</option>
          <option value="Injection">Injection</option>
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
          defaultValue={0}
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
