import PropTypes from "prop-types";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
export function ServiceCard({ service }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={service.serviceImage || "/placeholder.svg?height=200&width=300"}
          alt={service.serviceName}
          className="h-48 w-full object-cover"
        />
        {service.featured && (
          <Badge className="absolute top-2 left-2 z-10">Featured</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={
                service.providerImage || "/placeholder.svg?height=50&width=50"
              }
              alt={service.providerName}
              className="h-8 w-8 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="text-sm font-medium line-clamp-1">
                {service.providerName}
              </p>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">
                  {service.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {service.serviceName}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {service.serviceDescription}
        </p>

        <div className="flex items-center justify-between">
          {/* Display average rating */}
          <div className="flex items-center">
            <Star
              className={`h-4 w-4 ${
                service.averageRating > 0
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              } mr-1`}
            />
            <span className="font-medium">
              {service.averageRating?.toFixed(1) || "New"}
            </span>
            <span className="text-muted-foreground text-xs ml-1">
              ({service.reviews?.length || 0}{" "}
              {service.reviews?.length === 1 ? "review" : "reviews"})
            </span>
          </div>
          <p className="font-bold">৳{service.servicePrice}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" asChild className="w-[48%]">
          <Link to={`/services/${service._id}`}>Details</Link>
        </Button>
        <Button className="w-[48%]" asChild>
          <Link to={`/booking/${service._id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
