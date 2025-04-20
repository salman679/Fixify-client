"use client";

import { motion } from "framer-motion";
import { Search, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Find a Service",
    description:
      "Browse through our wide range of professional services and find exactly what you need.",
    icon: Search,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Book an Appointment",
    description:
      "Select your preferred date and time, and book your service with just a few clicks.",
    icon: Calendar,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Get it Done",
    description:
      "Our verified professionals will arrive on time and complete the service to your satisfaction.",
    icon: CheckCircle,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Getting the help you need has never been easier. Follow these simple
          steps to book your service.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-8">
              <div className={`${step.color} p-6 rounded-full mb-4`}>
                <step.icon className="h-8 w-8" />
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2">
                  <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
                  <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-primary rounded-full -translate-y-1/2" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold mb-3">
              <span className="inline-block bg-primary text-white rounded-full w-6 h-6 text-sm mr-2">
                {step.id}
              </span>
              {step.title}
            </h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
