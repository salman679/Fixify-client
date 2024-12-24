import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ConfirmBooking() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const { user } = useAuth();

  function handlePurchase() {}

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  return (
    <div className="flex justify-center py-10 items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl shadow-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Confirm Booking
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service ID
            </label>
            <input
              type="text"
              value={service?._id}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              value={service?.serviceName}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Provider Name
            </label>
            <input
              type="text"
              value={service?.providerName}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Date
            </label>
            <input type="date" className="input input-bordered w-full mt-1" />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Special Instructions
            </label>
            <textarea
              placeholder="Any specific requests or instructions"
              className="textarea textarea-bordered w-full mt-1"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              value={`$${service?.servicePrice}`}
              readOnly
              className="input input-bordered w-full mt-1 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Link to={`/services/${id}`} className="btn btn-error px-6">
            Cancel
          </Link>
          <button
            className="btn btn-success px-6"
            onClick={() => handlePurchase(service._id)}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
