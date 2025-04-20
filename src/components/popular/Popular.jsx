"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PopularServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MAIN_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Services
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our most requested services with proven satisfaction.
              Quality work by verified professionals.
            </p>
          </div>
          <Link to="/services" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              Show All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg dark:bg-gray-900">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.serviceImage || "/placeholder.svg"}
                      alt={service.serviceName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 hover:bg-primary">
                        ${service.servicePrice}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex-grow pt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.serviceName}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {service.serviceDescription.length > 100
                        ? `${service.serviceDescription.slice(0, 100)}...`
                        : service.serviceDescription}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={service.providerImage || "/placeholder.svg"}
                        alt={service.providerName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <span className="text-sm font-medium">
                          {service.providerName}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {service.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Link to={`/services/${service._id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
