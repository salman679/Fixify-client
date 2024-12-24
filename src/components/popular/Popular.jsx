import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PopularServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  //   {
  //     "_id": "67698726c3d8cd2a0629b447",
  //     "providerName": "Fixify Handyman",
  //     "providerImage": "https://i.ibb.co.com/QQqf3R7/Sig-File-Picture.jpg",
  //     "location": "DHAKA",
  //     "serviceImage": "https://i.ibb.co.com/qCmcLNV/Credible-home-repairs-i-Stock-1267057581.webp",
  //     "serviceName": "Home Repair",
  //     "serviceDescription": "Quick and reliable home repair services for all kinds of maintenance tasks.",
  //     "servicePrice": 500
  // }

  return (
    <section className="container mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-8">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.slice(0, 6).map((service) => (
          <div
            key={service.id}
            className="card bg-base-100 dark:bg-gray-900 dark:text-white shadow-xl"
          >
            <figure>
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-60 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{service.serviceName}</h3>
              <p className="text-gray-500">
                {service.serviceDescription.length > 100
                  ? `${service.serviceDescription.slice(0, 100)}...`
                  : service.serviceDescription}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-10 h-10">
                  <img
                    src={service.providerImage}
                    alt={service.providerName}
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                </div>
                <div>
                  <p className="font-semibold">{service.providerName}</p>
                  <p className="text-gray-400">{service.location}</p>
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <p className="text-2xl font-semibold">
                  ${service.servicePrice}
                </p>
                <Link
                  to={`/services/${service._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/services" className="btn btn-outline btn-primary">
          Show All
        </Link>
      </div>
    </section>
  );
}
