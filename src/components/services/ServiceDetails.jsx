import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>
          {`${service?.serviceName ? service?.serviceName : "Service Details"}`}{" "}
          - Fixify
        </title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg overflow-hidden">
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
            <Link to={`/booking/${id}`} className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
