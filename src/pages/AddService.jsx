import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

export default function AddService() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    const newService = {
      ...data,
      providerName: user.displayName,
      providerEmail: user.email,
      providerImage: user.photoURL,
    };

    axiosInstance.post("/add-service", newService).then(({ data }) => {
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Service Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/services");
        reset();
      }
    });
  };

  return (
    <div className="flex justify-center py-10 items-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4">
      <Helmet>
        <title>Add Service - Fixify</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-3xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
            Add New Service
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              {...register("serviceImage", { required: true })}
              type="text"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            {errors.serviceImage && (
              <p className="text-red-500 text-sm">Image URL is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Name
            </label>
            <input
              {...register("serviceName", { required: true })}
              type="text"
              placeholder="Enter service name"
              className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            {errors.serviceName && (
              <p className="text-red-500 text-sm">Service name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              {...register("servicePrice", { required: true, min: 1 })}
              type="number"
              placeholder="Enter service price"
              className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            {errors.servicePrice && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Area
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Enter service area"
              className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            {errors.serviceArea && (
              <p className="text-red-500 text-sm">Service area is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("serviceDescription", { required: true })}
              placeholder="Describe the service"
              className="textarea textarea-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            ></textarea>
            {errors.serviceDescription && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
}
