import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

export default function BookedServices() {
  const { user } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch booked services
  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [user?.email]);

  // Handle cancel booking
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be canceled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_MAIN_URL}/api/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              setBookedServices((prev) =>
                prev.filter((service) => service._id !== id)
              );
              Swal.fire(
                "Canceled!",
                "Your booking has been canceled.",
                "success"
              );
            } else {
              Swal.fire("Failed!", "Could not cancel booking.", "error");
            }
          })
          .catch(() => Swal.fire("Oops!", "Something went wrong.", "error"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <Helmet>
        <title>My Booked Services - Fixify</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          My Booked Services
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center mt-12">
            <p className="text-xl text-red-500">Failed to load bookings.</p>
          </div>
        ) : bookedServices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedServices.map((service) => (
              <div
                key={service._id}
                className="card w-full bg-base-100 shadow-xl dark:bg-gray-900"
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
                  <h2 className="card-title text-lg font-bold">
                    {service.serviceName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Provider: {service.providerName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Date: {service.serviceDate}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    ${service.servicePrice}
                  </p>
                  <p
                    className={`badge ${
                      service.serviceStatus === "Pending"
                        ? "badge-warning"
                        : service.serviceStatus === "Working"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {service.serviceStatus}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleCancelBooking(service._id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You haven&apos;t booked any services yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
