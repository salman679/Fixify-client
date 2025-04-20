"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  ImagePlus,
  DollarSign,
  MapPin,
  FileText,
  PenLine,
  Save,
  ArrowLeft,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxios();

  // Fetch existing service data
  useEffect(() => {
    axiosInstance
      .get(`/services/${id}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to load service details.", "error");
        setLoading(false);
      });
  }, [id, axiosInstance]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { ...updatedService } = service;

    axiosInstance
      .patch(`/manage-services/${id}`, updatedService)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Service updated successfully.", "success");
          navigate("/dashboard/manage-service");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update service.", "error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Update Service - Fixify</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard/manage-service")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Manage Services
        </Button>

        <Card className="border-0 shadow-lg dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Update Service
            </CardTitle>
            <CardDescription className="text-center">
              Edit your service details to keep information up to date
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <div className="relative">
                    <PenLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="serviceName"
                      name="serviceName"
                      value={service.serviceName || ""}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceImage">Service Image URL</Label>
                  <div className="relative">
                    <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="serviceImage"
                      name="serviceImage"
                      value={service.serviceImage || ""}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="servicePrice">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="servicePrice"
                        name="servicePrice"
                        type="number"
                        value={service.servicePrice || ""}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Service Area</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        value={service.location || ""}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Description</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="serviceDescription"
                      name="serviceDescription"
                      value={service.serviceDescription || ""}
                      onChange={handleChange}
                      className="min-h-[120px] pl-10 pt-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard/manage-service")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Updating..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Update Service
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
