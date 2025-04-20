"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform scale-150 animate-pulse" />
            <div className="relative bg-primary/10 p-6 rounded-full">
              <AlertTriangle className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-8xl font-extrabold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
