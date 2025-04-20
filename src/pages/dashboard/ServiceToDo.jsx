"use client";

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, User, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ServiceToDo() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  // Fetch booked services where user is the service provider
  useEffect(() => {
    axiosInstance
      .get(`/services-to-do?email=${user.email}`)
      .then(({ data }) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [user.email, axiosInstance]);

  // Update service status
  const handleStatusChange = (id, newStatus) => {
    axiosInstance
      .put(`/services-to-do/${id}`, { serviceStatus: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
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

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Working":
        return <AlertCircle className="h-4 w-4" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Services To-Do - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Manage Client Bookings
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Track and update the status of services booked by your clients
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
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={
                        booking.serviceImage ||
                        "https://via.placeholder.com/400"
                      }
                      alt={booking.serviceName}
                      className="h-full w-full object-cover"
                    />
                    <Badge
                      variant={getStatusVariant(booking.serviceStatus)}
                      className="absolute top-3 right-3 capitalize"
                    >
                      {booking.serviceStatus}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle>{booking.serviceName}</CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        <span>Client: {booking.userName}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Date: {booking.serviceDate}</span>
                      </div>
                      {booking.specialInstruction && (
                        <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                          <p className="font-medium mb-1">
                            Special Instructions:
                          </p>
                          <p className="text-muted-foreground">
                            {booking.specialInstruction}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full">
                          {getStatusIcon(booking.serviceStatus)}
                          <span className="ml-2">Update Status</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {["Pending", "Working", "Completed"].map((status) => (
                          <DropdownMenuItem
                            key={status}
                            className={`cursor-pointer ${
                              booking.serviceStatus === status
                                ? "bg-primary/10 font-medium"
                                : ""
                            }`}
                            onClick={() =>
                              handleStatusChange(booking._id, status)
                            }
                          >
                            <span className="flex items-center">
                              {getStatusIcon(status)}
                              <span className="ml-2">{status}</span>
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
              You currently have no services booked by clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
