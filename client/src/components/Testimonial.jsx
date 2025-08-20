import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Title component
const Title = ({ title, subTitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
      {title}
    </h2>
    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
      {subTitle}
    </p>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
  </div>
);

const assets = {
  testimonial_image_1:
    "https://images.unsplash.com/photo-1494790108755-2616b612b3b2?w=150&h=150&fit=crop&crop=face",
  testimonial_image_2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
};

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
    },
    {
      name: "Liam Johnson",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "Car Rental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      name: "Sophia Lee",
      location: "Seoul, South Korea",
      image: assets.testimonial_image_2,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  return (
    <div className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-44 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-200 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Title
          title="What Our Customers Say"
          subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
        />

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              }}
              className="relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Quote className="w-10 h-10 text-purple-500 mb-6 opacity-60" />

              <div className="flex items-center gap-4 mb-6">
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="text-xl font-bold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: starIndex * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 leading-relaxed font-medium"
              >
                "{testimonial.testimonial}"
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className="lg:hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="w-full p-6"
              >
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/30">
                  <Quote className="w-8 h-8 text-purple-500 mb-6 opacity-60" />

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                    />
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-6">
                    {Array(5)
                      .fill(0)
                      .map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed font-medium">
                    "{testimonials[currentIndex].testimonial}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-3 bg-white/80 rounded-full shadow-lg hover:bg-purple-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-purple-500 w-8"
                      : "bg-gray-300 w-3 hover:bg-purple-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
              }
              className="p-3 bg-white/80 rounded-full shadow-lg hover:bg-purple-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
