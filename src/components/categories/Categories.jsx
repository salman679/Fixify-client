"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Wrench,
  Paintbrush,
  Car,
  Laptop,
  Scissors,
  Utensils,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "home-repair",
    name: "Home Repair",
    icon: Home,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "painting",
    name: "Painting",
    icon: Paintbrush,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "auto-repair",
    name: "Auto Repair",
    icon: Car,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "tech-support",
    name: "Tech Support",
    icon: Laptop,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: Scissors,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "catering",
    name: "Catering",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "consulting",
    name: "Consulting",
    icon: Briefcase,
    color: "bg-teal-100 text-teal-600",
  },
];

export default function Categories() {
  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Browse by Category
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect service for your needs from our wide range of
          categories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link to={`/services/category/${category.id}`}>
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className={`p-3 rounded-full ${category.color} mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
