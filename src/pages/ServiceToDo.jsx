import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ServiceToDo() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  // Fetch booked services where user is the service provider
  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services-to-do?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user.email]);

  // Update service status
  const handleStatusChange = (id, newStatus) => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services-to-do/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceStatus: newStatus }),
    }).then((res) => {
      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? { ...booking, serviceStatus: newStatus }
              : booking
          )
        );
      }
    });
  };

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card bg-base-100 shadow-xl border border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            >
              <figure>
                <img
                  src={
                    booking.serviceImage || "https://via.placeholder.com/300"
                  }
                  alt={booking.serviceName}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.serviceName}</h2>
                <p className="text-sm text-gray-500">
                  Client: {booking.userName}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {booking.serviceDate}
                </p>
                <p className="badge badge-outline my-3">
                  Status: {booking.serviceStatus}
                </p>

                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">
                    Update Status
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out dark:bg-gray-600 dark:text-white"
                  >
                    {["Pending", "Working", "Completed"].map((status) => (
                      <li
                        key={status}
                        className="dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:active:bg-gray-800 rounded-md"
                        onClick={() => handleStatusChange(booking._id, status)}
                      >
                        <a
                          className={`capitalize ${
                            booking.serviceStatus === status
                              ? "text-green-500 font-bold"
                              : ""
                          }`}
                        >
                          {status}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Bookings Found</h2>
          <p className="text-gray-500 mt-2">
            You currently have no services booked.
          </p>
        </div>
      )}
    </div>
  );
}
