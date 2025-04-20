"use client";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, User, DollarSign, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import useAxios from "@/hooks/useAxios";

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

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Working":
        return "secondary";
      case "Completed":
        return "success";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Booked Services - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold sm:text-4xl">My Booked Services</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Track the status of services you&apos;ve booked and manage your
            appointments
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-1/3 mb-3" />
                  <Skeleton className="h-6 w-1/4 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load bookings. Please try again later.
            </AlertDescription>
          </Alert>
        ) : bookedServices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedServices.map((service, index) => (
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
                    <Badge
                      variant={getStatusVariant(service.serviceStatus)}
                      className="absolute top-3 right-3 capitalize"
                    >
                      {service.serviceStatus}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle>{service.serviceName}</CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        <span>Provider: {service.providerName}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Date: {service.serviceDate}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <DollarSign className="mr-2 h-4 w-4 text-primary" />
                        <span>${service.servicePrice}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-1 border-t flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        Booked on:{" "}
                        {new Date(
                          service.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven&apos;t booked any services yet. Browse our services and
              book your first appointment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
