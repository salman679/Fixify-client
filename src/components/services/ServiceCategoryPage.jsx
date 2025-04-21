"use client";

import { useState, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Filter,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ServiceListItem } from "./ServiceListItem";
import { ServiceCard } from "./ServiceCard";
import { useLocation } from "react-router-dom";

// Category display names mapping
const categoryDisplayNames = {
  "home-repair": "Home Repair",
  plumbing: "Plumbing",
  painting: "Painting",
  "auto-repair": "Auto Repair",
  "tech-support": "Tech Support",
  beauty: "Beauty",
  catering: "Catering",
  consulting: "Consulting",
};

// Locations
const locations = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
];

export default function ServiceCategoryPage() {
  const location = useLocation();
  const category = location.pathname.split("/").pop();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  // Format category for display
  const categoryName = categoryDisplayNames[category] || category;

  // Fetch services from API
  useEffect(() => {
    setLoading(true);

    // Fetch from the API
    fetch(`${import.meta.env.VITE_MAIN_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError(true);
        setLoading(false);
      });
  }, [category]);

  // Filter services based on all criteria
  const filteredServices = services.filter((service) => {
    // Filter by category (if we had category in the API data)
    // This assumes your API returns a 'category' field that matches the category ID
    // If your API doesn't have this, you'll need to adjust this logic
    if (category && service.category !== category) return false;

    // Filter by search query
    if (
      searchQuery &&
      !service.serviceName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) &&
      !service.serviceDescription
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase())
    )
      return false;

    // Filter by locations
    if (
      selectedLocations.length > 0 &&
      !selectedLocations.includes(service.location)
    )
      return false;

    // Filter by price range
    if (
      service.servicePrice < priceRange[0] ||
      service.servicePrice > priceRange[1]
    )
      return false;

    // Filter by verified providers (if we had this data)
    // This assumes your API returns a 'verified' field for providers
    // If your API doesn't have this, you'll need to adjust this logic
    // if (showVerifiedOnly && !service.provider.verified) return false

    return true;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        // If you have a 'featured' field in your API data
        // return a.featured === b.featured ? 0 : a.featured ? -1 : 1
        return 0;
      case "price-low":
        return a.servicePrice - b.servicePrice;
      case "price-high":
        return b.servicePrice - a.servicePrice;
      case "rating":
        // If you have a 'rating' field in your API data
        // return b.rating - a.rating
        return 0;
      default:
        return 0;
    }
  });

  // Toggle location selection
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 30000]);
    setSelectedLocations([]);
    setShowVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{categoryName || "Services"} - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            {categoryName || "All Services"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find the best {categoryName?.toLowerCase() || "services"} from our
            verified providers
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search ${
                  categoryName?.toLowerCase() || "services"
                }...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2 self-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Services</SheetTitle>
                    <SheetDescription>
                      Narrow down services based on your preferences
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-6 space-y-6">
                    {/* Price Range */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        <span className="text-sm text-muted-foreground">
                          ৳{priceRange[0]} - ৳{priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 30000]}
                        min={0}
                        max={30000}
                        step={500}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>

                    <Separator />

                    {/* Locations */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Locations</h3>
                      <div className="space-y-2">
                        {locations.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`location-${location}`}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={() => toggleLocation(location)}
                            />
                            <Label htmlFor={`location-${location}`}>
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Verified Providers */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified-only"
                        checked={showVerifiedOnly}
                        onCheckedChange={(checked) =>
                          setShowVerifiedOnly(checked === true)
                        }
                      />
                      <Label htmlFor="verified-only">
                        Show verified providers only
                      </Label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset All
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none rounded-l-md"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none rounded-r-md"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLocations.length > 0 ||
            showVerifiedOnly ||
            searchQuery) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              )}

              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {location}
                  <button
                    onClick={() => toggleLocation(location)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              ))}

              {showVerifiedOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Verified Only
                  <button
                    onClick={() => setShowVerifiedOnly(false)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {sortedServices.length}{" "}
            {sortedServices.length === 1 ? "result" : "results"}
          </p>
        </motion.div>

        {/* Services Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">
                Error loading services
              </h3>
              <p className="text-muted-foreground mb-6">
                There was a problem loading the services. Please try again
                later.
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : sortedServices.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedServices.map((service) => (
                  <ServiceListItem key={service._id} service={service} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query to find what
                you&apos;re looking for.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
