"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search, Filter, Loader2 } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const { searchTerm, setSearchTerm } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_MAIN_URL}/services?searchTerm=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  // Sort services based on selected option
  const sortedServices = [...services].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.servicePrice - b.servicePrice;
    } else if (sortBy === "price-high") {
      return b.servicePrice - a.servicePrice;
    } else if (sortBy === "name-asc") {
      return a.serviceName.localeCompare(b.serviceName);
    } else if (sortBy === "name-desc") {
      return b.serviceName.localeCompare(a.serviceName);
    }
    return 0;
  });

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>All Services - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold sm:text-4xl mb-4">
            Browse All Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect service for your needs from our wide range of
            professional offerings
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Services Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn&apos;t find any services matching your search criteria.
              Try adjusting your search terms.
            </p>
            <Button onClick={() => setSearchTerm("")}>View All Services</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <img
                      src={service.serviceImage || "/placeholder.svg"}
                      alt={service.serviceName}
                      className="h-full w-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
                      ${service.servicePrice}
                    </Badge>
                  </div>

                  <CardContent className="pt-6 flex-grow">
                    <h2 className="text-xl font-semibold mb-3">
                      {service.serviceName}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {service.serviceDescription}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <Avatar>
                        <AvatarImage
                          src={service.providerImage || "/placeholder.svg"}
                          alt={service.providerName}
                          className="h-full w-full object-cover"
                        />
                        <AvatarFallback>
                          {getInitials(service.providerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {service.providerName}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {service.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link to={`/services/${service._id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
