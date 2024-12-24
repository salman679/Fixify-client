import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function BookedServices() {
  const { user } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          My Booked Services
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : bookedServices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedServices.map((service) => (
              <div
                key={service._id}
                className="card w-full bg-base-100 shadow-xl dark:bg-gray-900"
              >
                <div className="card-body">
                  <h2 className="card-title text-lg font-bold">
                    {service.serviceName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Provider: {service.providerName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Service Date: {service.serviceDate}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {service.price}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-error">Cancel Booking</button>
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
