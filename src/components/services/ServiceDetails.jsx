"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  MapPin,
  DollarSign,
  User,
  Calendar,
  Clock,
  ArrowLeft,
  ShoppingCart,
  Star,
} from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/services/${id}`)
      .then(({ data }) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [axiosInstance, id]);

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Mock reviews data (you can replace this with actual data)
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Excellent service! Very professional and completed the job quickly.",
    },
    {
      id: 2,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-28",
      comment: "Good work overall. Would recommend for similar projects.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>
          {loading ? "Service Details" : service?.serviceName} - Fixify
        </title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <Card className="text-center p-12">
            <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The service you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button asChild>
              <Link to="/services">Browse All Services</Link>
            </Button>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-800">
              <div className="relative">
                <img
                  src={service?.serviceImage || "/placeholder.svg"}
                  alt={service?.serviceName}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 text-lg px-4 py-2">
                    ${service?.servicePrice}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {service?.serviceName}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {service?.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Available Now
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage
                        src={service?.providerImage || "/placeholder.svg"}
                        alt={service?.providerName}
                      />
                      <AvatarFallback>
                        {getInitials(service?.providerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">
                        {service?.providerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Service Provider
                      </p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg leading-relaxed">
                        {service?.serviceDescription}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-primary" />
                          Pricing
                        </h3>
                        <p className="text-2xl font-bold">
                          ${service?.servicePrice}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Per service
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          Availability
                        </h3>
                        <p>Monday - Friday: 9AM - 5PM</p>
                        <p>Weekends: By appointment</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-primary" />
                          Service Area
                        </h3>
                        <p>{service?.location}</p>
                        <p className="text-sm text-muted-foreground">
                          And surrounding areas
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          Provider Info
                        </h3>
                        <p>{service?.providerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {service?.providerEmail}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="pt-6">
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b pb-6 last:border-0"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar>
                                <AvatarImage
                                  src={review.avatar || "/placeholder.svg"}
                                  alt={review.name}
                                />
                                <AvatarFallback>
                                  {getInitials(review.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <div className="flex items-center">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No reviews yet for this service.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="mt-8 pt-6 border-t">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link to={`/booking/${id}`}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Book This Service
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
