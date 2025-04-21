import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function ServiceListItem({ service }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-1/4 md:w-1/5">
          {/* If you have a featured flag in your API data */}
          {/* {service.featured && <Badge className="absolute top-2 left-2 z-10">Featured</Badge>} */}
          <img
            src={
              service.serviceImage || "/placeholder.svg?height=200&width=300"
            }
            alt={service.serviceName}
            className="h-48 sm:h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={
                  service.providerImage || "/placeholder.svg?height=50&width=50"
                }
                alt={service.providerName}
                className="h-8 w-8 rounded-full mr-2"
              />
              <div>
                <p className="text-sm font-medium">{service.providerName}</p>
                <div className="flex items-center">
                  {/* If you have a verified flag in your API data */}
                  {/* {service.provider.verified && (
                    <Badge variant="outline" className="text-xs px-1 py-0 mr-1 border-green-500 text-green-600">
                      Verified
                    </Badge>
                  )} */}
                  <span className="text-xs text-muted-foreground">
                    {service.location}
                  </span>
                </div>
              </div>
            </div>
            {/* If you have rating data in your API */}
            {/* <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-muted-foreground text-xs ml-1">({service.reviewCount})</span>
            </div> */}
          </div>

          <h3 className="font-semibold text-lg mb-1">{service.serviceName}</h3>
          <p className="text-muted-foreground text-sm mb-3 flex-grow">
            {service.serviceDescription}
          </p>

          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">৳{service.servicePrice}</p>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/services/${service._id}`}>Details</Link>
              </Button>
              <Button asChild>
                <Link to={`/booking/${service._id}`}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

ServiceListItem.propTypes = {
  service: PropTypes.object.isRequired,
};
