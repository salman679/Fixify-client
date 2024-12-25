import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ManageServices() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services added by the logged-in user
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_MAIN_URL}/manage-services?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire("Oops!", "Failed to load services.", "error");
      });
  }, [user?.email]);

  // Handle delete action with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_MAIN_URL}/manage-services/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              setServices((prev) => prev.filter((s) => s._id !== id));
              Swal.fire(
                "Deleted!",
                "Your service has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Failed!", "Could not delete service.", "error");
            }
          })
          .catch(() =>
            Swal.fire("Error!", "Something went wrong. Try again.", "error")
          );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <Helmet>
        <title>Manage Services - Fixify</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Manage Your Services
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="card bg-base-100 shadow-xl dark:bg-gray-900"
              >
                <figure>
                  <img
                    src={
                      service.serviceImage || "https://via.placeholder.com/400"
                    }
                    alt={service.serviceName}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.serviceName}</h2>
                  <p className="text-gray-500 dark:text-gray-300">
                    {service.serviceDescription}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    ${service.servicePrice}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/dashboard/edit-service/${service._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              No services found. Add your first service!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
