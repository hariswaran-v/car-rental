import React from "react";
import Title from "./Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100/40 [mask-image:linear-gradient(0deg,transparent,white,transparent)] -z-10"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="flex flex-col items-center"
      >
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Title
              title="Featured Vehicles"
              subTitle="Discover our handpicked collection of premium vehicles, each offering unparalleled luxury and performance for your extraordinary journey."
            />
          </motion.div>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-7xl"
        >
          {cars.slice(0, 6).map((car, index) => (
            <motion.div
              key={car._id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group"
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <CarCard car={car} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="mt-16"
        >
          <motion.button
            onClick={() => {
              navigate("/cars");
              scrollTo(0, 0);
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <div className="relative flex items-center justify-center gap-3">
              <span className="text-lg">Explore All Cars</span>
              <motion.img
                src={assets.arrow_icon}
                alt="arrow"
                className="w-5 h-5 brightness-200"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Floating particles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2 w-3 h-3 bg-white/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/20 rounded-full"
            ></motion.div>
          </motion.button>
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 left-10 w-12 h-12 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-2xl blur-sm"
        ></motion.div>

        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -3, 0, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 right-16 w-8 h-8 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-sm"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturedSection;
