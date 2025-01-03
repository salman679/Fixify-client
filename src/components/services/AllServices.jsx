import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services?searchTerm=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [searchTerm]);

  if (services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Helmet>
          <title>All Services - Fixify</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-center mb-8">
          No Services Found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>All Services - Fixify</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">All Services</h1>

      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 dark:bg-gray-900 dark:text-white shadow-xl"
          >
            <figure>
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.serviceName}</h2>
              <p className="text-gray-500 text-sm">
                {service.serviceDescription.length > 100
                  ? service.serviceDescription.substring(0, 100) + "..."
                  : service.serviceDescription}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={service.providerImage}
                      alt={service.providerName}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{service.providerName}</p>
                  <p className="text-sm text-gray-400">
                    Location: {service.location}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold">
                  ${service.servicePrice}
                </span>
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
    </div>
  );
}
