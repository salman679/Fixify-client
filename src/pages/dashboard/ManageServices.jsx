"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, DollarSign, MapPin } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ManageServices() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Fetch services added by the logged-in user
  useEffect(() => {
    axiosInstance
      .get(`/manage-services?email=${user?.email}`)
      .then(({ data }) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire("Oops!", "Failed to load services.", "error");
      });
  }, [axiosInstance, user?.email]);

  // Handle delete action with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/manage-services/${id}`)
          .then(() => {
            setServices((prev) => prev.filter((s) => s._id !== id));
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
          })
          .catch(() =>
            Swal.fire("Error!", "Something went wrong. Try again.", "error")
          );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Manage Services - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Manage Your Services
            </h1>
            <p className="mt-2 text-muted-foreground">
              Edit, update or remove services you&apos;ve created
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/dashboard/add-service">
              <Plus className="mr-2 h-4 w-4" /> Add New Service
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-6 w-1/4 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={
                        service.serviceImage ||
                        "https://via.placeholder.com/400"
                      }
                      alt={service.serviceName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle>{service.serviceName}</CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4 flex-grow">
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {service.serviceDescription}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <DollarSign className="mr-2 h-4 w-4 text-primary" />
                        <span>${service.servicePrice}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/edit-service/${service._id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Alert className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <AlertTitle className="text-xl font-semibold">
              No services found
            </AlertTitle>
            <AlertDescription>
              You haven&#39;t added any services yet. Click the &quot;Add New
              Service&quot; button to create your first service.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
