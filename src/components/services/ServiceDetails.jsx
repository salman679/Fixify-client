import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ServiceDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [service, setService] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleBookNow = () => {
    setShowModal(true);
  };

  const handlePurchase = () => {
    alert("Service booked successfully!");
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={service?.serviceImage}
          alt={service?.serviceName}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{service?.serviceName}</h1>
          <p className="text-lg text-gray-600 mb-6">
            {service?.serviceDescription}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={service?.providerImage} alt={service?.providerName} />
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold">{service?.providerName}</p>
              <p className="text-sm text-gray-500">
                Location: {service?.location}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">${service?.servicePrice}</span>
            <button className="btn btn-primary" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Confirm Booking
            </h2>
            <div className="grid gap-4">
              <input
                type="text"
                value={service?._id}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={service?.serviceName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={service?.providerName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={user.name}
                readOnly
                className="input input-bordered w-full"
              />
              <input type="date" className="input input-bordered w-full" />
              <textarea
                placeholder="Special Instructions"
                className="textarea textarea-bordered w-full"
              ></textarea>
              <input
                type="text"
                value={`$${service?.servicePrice}`}
                readOnly
                className="input input-bordered w-full"
              />
              <button
                className="btn btn-success w-full mt-4"
                onClick={handlePurchase}
              >
                Purchase
              </button>
              <button
                className="btn btn-error w-full mt-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
