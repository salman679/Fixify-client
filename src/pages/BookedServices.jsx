import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import useAxios from "../hooks/useAxios";

export default function BookedServices() {
  const { user } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const axiosInstance = useAxios();

  // Fetch booked services
  useEffect(() => {
    axiosInstance
      .get(`/bookings?email=${user?.email}`)
      .then(({ data }) => {
        setBookedServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [axiosInstance, user?.email]);

  // Handle cancel booking

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
