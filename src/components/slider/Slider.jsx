"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  const banners = [
    {
      title: "Reliable Home Repairs",
      description:
        "Expert solutions for all your home maintenance and repair needs. Fast, efficient, and affordable.",
      image: "https://i.ibb.co.com/Vj9rMJS/home-repairs-2-640w.webp",
      color: "from-blue-500/30 to-indigo-500/30",
    },
    {
      title: "Your Trusted Handyman",
      description:
        "Professional handyman services to tackle any job, big or small. Your home in safe hands.",
      image: "https://i.ibb.co.com/b2BLYSx/Handyman-Agency.jpg",
      color: "from-amber-500/30 to-orange-500/30",
    },
    {
      title: "Quality You Can Trust",
      description:
        "From plumbing to electrical work, our certified experts ensure top-notch quality and durability.",
      image: "https://i.ibb.co.com/Jj3QKZd/202104153903-Apr.jpg",
      color: "from-emerald-500/30 to-teal-500/30",
    },
  ];

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.color} mix-blend-multiply`}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 sm:px-10 md:px-16 lg:px-24">
                <div className="max-w-3xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-6 max-w-xl text-base text-white/90 sm:text-lg md:text-xl"
                  >
                    {banner.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center"
                  >
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="What service do you need?"
                        className="h-12 bg-white/90 pl-10 text-black"
                      />
                    </div>
                    <Button size="lg" className="h-12">
                      Find Services
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
