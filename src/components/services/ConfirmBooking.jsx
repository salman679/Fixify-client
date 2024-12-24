import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function ConfirmBooking() {
  const { id } = useParams();
  const [, setService] = useState({});
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        // Prefill form with data
        setValue("serviceId", data._id);
        setValue("serviceName", data.serviceName);
        setValue("serviceImage", data.serviceImage);
        setValue("servicePrice", data.servicePrice);
        setValue("serviceStatus", "Pending");
        setValue("providerName", data.providerName);
        setValue("providerEmail", data.providerEmail);
        setValue("userName", user?.displayName);
        setValue("userEmail", user?.email);
      });
  }, [id, setValue, user]);

  const onSubmit = (data) => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/add-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Booking Confirmed",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
        }
      });
  };

  return (
    <div className="flex justify-center py-10 items-center min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-100 px-4">
      <Helmet>
        <title>Confirm Booking - Fixify</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-4xl shadow-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          Confirm Booking
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Service ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service ID
              </label>
              <input
                type="text"
                readOnly
                {...register("serviceId")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Name
              </label>
              <input
                type="text"
                readOnly
                {...register("serviceName")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Provider Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Provider Name
              </label>
              <input
                type="text"
                readOnly
                {...register("providerName")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            {/* Provider Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Provider Email
              </label>
              <input
                type="email"
                readOnly
                {...register("providerEmail")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email
              </label>
              <input
                type="text"
                readOnly
                {...register("userEmail")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                readOnly
                {...register("userName")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Service Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Date
              </label>
              <input
                type="date"
                {...register("serviceDate", {
                  required: "Service date is required",
                })}
                className="input input-bordered w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {errors.serviceDate && (
                <span className="text-red-500 text-sm">
                  {errors.serviceDate.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </label>
              <input
                type="text"
                readOnly
                {...register("servicePrice")}
                className="input input-bordered w-full mt-1 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Special Instructions */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Special Instructions
              </label>
              <textarea
                placeholder="Any specific requests or instructions"
                {...register("specialInstructions")}
                className="textarea textarea-bordered w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link
              to={`/services/${id}`}
              className="btn btn-error px-6 dark:bg-red-700 dark:text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-success px-6 dark:bg-green-700 dark:text-white"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
