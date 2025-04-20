"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      quote: "Excellent service! The team was very professional and efficient.",
      image: "/placeholder.svg?height=100&width=100",
      role: "Homeowner",
    },
    {
      id: 2,
      name: "Michael Smith",
      quote: "Highly recommended. Amazing attention to detail!",
      image: "/placeholder.svg?height=100&width=100",
      role: "Business Owner",
    },
    {
      id: 3,
      name: "Emma Wilson",
      quote: "Great experience. Will definitely use their services again.",
      image: "/placeholder.svg?height=100&width=100",
      role: "Property Manager",
    },
    {
      id: 4,
      name: "David Thompson",
      quote:
        "The service was prompt and the quality of work exceeded my expectations.",
      image: "/placeholder.svg?height=100&width=100",
      role: "Apartment Resident",
    },
    {
      id: 5,
      name: "Jennifer Lee",
      quote:
        "I've tried many service providers, but Fixify is by far the most reliable.",
      image: "/placeholder.svg?height=100&width=100",
      role: "Office Manager",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  return (
    <section className="w-full py-20 bg-muted/50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of happy clients. Here&apos;s what people are
            saying about their experience with our services.
          </p>
        </div>

        {/* Desktop Testimonials */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full dark:bg-gray-900">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-lg mb-6">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden relative max-w-md mx-auto">
          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 text-center">
              <Quote className="h-8 w-8 text-primary/20 mx-auto mb-4" />
              <p className="text-lg mb-6">
                &quot;{testimonials[current].quote}&quot;
              </p>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                  />
                  <AvatarFallback>
                    {testimonials[current].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {testimonials[current].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background dark:bg-gray-800 shadow-md p-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background dark:bg-gray-800 shadow-md p-2 rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  current === index
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
