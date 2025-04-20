import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { ImagePlus, DollarSign, MapPin, FileText, PenLine } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AddService() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const newService = {
      ...data,
      providerName: user.displayName,
      providerEmail: user.email,
      providerImage: user.photoURL,
    };

    axiosInstance
      .post("/add-service", newService)
      .then(({ data }) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Service Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/services");
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Add Service - Fixify</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-0 shadow-lg dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Add New Service
            </CardTitle>
            <CardDescription className="text-center">
              Create a new service to offer to your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="serviceImage">Service Image URL</Label>
                <div className="relative">
                  <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="serviceImage"
                    placeholder="https://example.com/image.jpg"
                    className="pl-10"
                    {...register("serviceImage", { required: true })}
                  />
                </div>
                {errors.serviceImage && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription>Image URL is required</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <div className="relative">
                  <PenLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="serviceName"
                    placeholder="Enter service name"
                    className="pl-10"
                    {...register("serviceName", { required: true })}
                  />
                </div>
                {errors.serviceName && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription>
                      Service name is required
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="servicePrice"
                      type="number"
                      placeholder="Enter service price"
                      className="pl-10"
                      {...register("servicePrice", { required: true, min: 1 })}
                    />
                  </div>
                  {errors.servicePrice && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription>
                        Valid price is required
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Service Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter service area"
                      className="pl-10"
                      {...register("location", { required: true })}
                    />
                  </div>
                  {errors.location && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription>
                        Service area is required
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDescription">Description</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="serviceDescription"
                    placeholder="Describe the service"
                    className="min-h-[120px] pl-10 pt-2"
                    {...register("serviceDescription", { required: true })}
                  />
                </div>
                {errors.serviceDescription && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription>Description is required</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Service..." : "Add Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
