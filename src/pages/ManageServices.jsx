import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../contexts/AuthContext";
import { useManageServices } from "../hooks/useManageServices";

export default function ManageServices() {
  const { user } = useAuth();
  const { services, deleteService } = useManageServices();
  const [selectedService, setSelectedService] = useState(null);

  const handleDelete = (serviceId) => {
    deleteService(serviceId);
    setSelectedService(null);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Manage Services - Fixify</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Manage Your Services
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 shadow-xl dark:bg-gray-800 dark:text-white"
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
              <p>{service.serviceDescription}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => window.edit_modal.showModal()}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => setSelectedService(service)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedService && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box dark:bg-gray-900 dark:text-white">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this service?
            </h3>
            <p className="py-4">{selectedService.serviceName}</p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(selectedService._id)}
                >
                  Confirm
                </button>
                <button
                  className="btn"
                  onClick={() => setSelectedService(null)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Modal (Placeholder) */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box dark:bg-gray-900 dark:text-white">
          <h3 className="font-bold text-lg">Edit Service</h3>
          <p className="py-4">Form to edit service goes here...</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">Save</button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
