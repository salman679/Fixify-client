import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
    },
    {
      title: "Your Trusted Handyman",
      description:
        "Professional handyman services to tackle any job, big or small. Your home in safe hands.",
      image: "https://i.ibb.co.com/b2BLYSx/Handyman-Agency.jpg",
    },
    {
      title: "Quality You Can Trust",
      description:
        "From plumbing to electrical work, our certified experts ensure top-notch quality and durability.",
      image: "https://i.ibb.co.com/Jj3QKZd/202104153903-Apr.jpg",
    },
  ];

  return (
    <div className="">
      <div className="container mx-auto px-4 md:px-6 ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="rounded-lg overflow-hidden"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-black text-left bg-opacity-50 flex items-center justify-center ">
                  <div className="text-left w-full px-14 md:px-24">
                    <h2 className="text-3xl  sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold max-w-xs md:max-w-lg">
                      {banner.title}
                    </h2>
                    <p className="text-white  text-lg sm:text-xl md:text-2xl mt-2 max-w-xs  md:max-w-xl">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
