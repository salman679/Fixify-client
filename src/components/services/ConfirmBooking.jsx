"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Mail,
  DollarSign,
  FileText,
  ArrowLeft,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConfirmBooking() {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/services/${id}`)
      .then(({ data }) => {
        setService(data);
        setValue("serviceId", data._id);
        setValue("serviceName", data.serviceName);
        setValue("serviceImage", data.serviceImage);
        setValue("servicePrice", data.servicePrice);
        setValue("serviceStatus", "Pending");
        setValue("providerName", data.providerName);
        setValue("providerEmail", data.providerEmail);
        setValue("userName", user?.displayName);
        setValue("userEmail", user?.email);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load service details",
        });
      });
  }, [id, setValue, user, axiosInstance]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    axiosInstance
      .post("/add-booking", data)
      .then(({ data }) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Booking Confirmed",
            text: "Your service has been booked successfully!",
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/dashboard/booked-services");
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Confirm Booking - Fixify</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to={`/services/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Service Details
          </Link>
        </Button>

        {loading ? (
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-32 w-full" />
              <div className="flex justify-end gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Confirm Your Booking
                </CardTitle>
                <CardDescription className="text-center">
                  Please review your booking details and confirm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={service?.serviceImage || "/placeholder.svg"}
                          alt={service?.serviceName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {service?.serviceName}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Provider: {service?.providerName}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-xl font-bold">
                          ${service?.servicePrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hidden Fields */}
                    <input type="hidden" {...register("serviceId")} />
                    <input type="hidden" {...register("serviceName")} />
                    <input type="hidden" {...register("serviceImage")} />
                    <input type="hidden" {...register("servicePrice")} />
                    <input type="hidden" {...register("serviceStatus")} />

                    {/* Provider Information */}
                    <div className="space-y-2">
                      <Label htmlFor="providerName">Provider Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="providerName"
                          readOnly
                          {...register("providerName")}
                          className="pl-10 bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="providerEmail">Provider Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="providerEmail"
                          readOnly
                          {...register("providerEmail")}
                          className="pl-10 bg-muted/50"
                        />
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="space-y-2">
                      <Label htmlFor="userName">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="userName"
                          readOnly
                          {...register("userName")}
                          className="pl-10 bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Your Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="userEmail"
                          readOnly
                          {...register("userEmail")}
                          className="pl-10 bg-muted/50"
                        />
                      </div>
                    </div>

                    {/* Service Date */}
                    <div className="space-y-2">
                      <Label htmlFor="serviceDate">Service Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="serviceDate"
                          type="date"
                          {...register("serviceDate", {
                            required: "Service date is required",
                          })}
                          className="pl-10"
                        />
                      </div>
                      {errors.serviceDate && (
                        <Alert variant="destructive" className="py-2">
                          <AlertDescription>
                            {errors.serviceDate.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="servicePrice">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="servicePrice"
                          readOnly
                          value={`$${service?.servicePrice}`}
                          className="pl-10 bg-muted/50 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">
                      Special Instructions (Optional)
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="specialInstructions"
                        placeholder="Any specific requests or instructions for the service provider"
                        {...register("specialInstructions")}
                        className="min-h-[120px] pl-10 pt-2"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      Booking Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span>{service?.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">
                          ${service?.servicePrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to={`/services/${id}`}>Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
