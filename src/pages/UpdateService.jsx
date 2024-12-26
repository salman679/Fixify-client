import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

export default function UpdateService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Fetch existing service data
  useEffect(() => {
    axiosInstance
      .get(`/services/${id}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to load service details.", "error");
        setLoading(false);
      });
  }, [id, axiosInstance]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { _id, ...updatedService } = service;

    axiosInstance
      .patch(`/manage-services/${id}`, updatedService)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Service updated successfully.", "success");
          navigate("/dashboard/manage-service");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update service.", "error");
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-800 flex items-center justify-center transition-all">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-10 max-w-3xl w-full border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">
          Update Service
        </h1>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:label-text-alt text-gray-700 dark:text-gray-300">
                  Service Name
                </span>
              </label>
              <input
                type="text"
                name="serviceName"
                value={service.serviceName || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:label-text-alt text-gray-700 dark:text-gray-300">
                  Service Image URL
                </span>
              </label>
              <input
                type="text"
                name="serviceImage"
                value={service.serviceImage || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:label-text-alt text-gray-700 dark:text-gray-300">
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={service.location || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:label-text-alt text-gray-700 dark:text-gray-300">
                  Description
                </span>
              </label>
              <textarea
                name="serviceDescription"
                value={service.serviceDescription || ""}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:label-text-alt text-gray-700 dark:text-gray-300">
                  Price
                </span>
              </label>
              <input
                type="number"
                name="servicePrice"
                value={service.servicePrice || ""}
                onChange={handleChange}
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/manage-service")}
                className="btn btn-outline dark:btn-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary dark:btn-success"
              >
                Update Service
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
