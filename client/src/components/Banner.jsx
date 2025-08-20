import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="px-8 py-16 relative">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-200/15 rounded-full blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="relative flex flex-col md:flex-row md:items-center items-center justify-between px-10 md:px-14 py-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse"></div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl"
        ></motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white z-10 relative"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent leading-tight"
          >
            Do You Own a Luxury Car?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 text-lg font-medium text-indigo-100"
          >
            Monetize your vehicle effortlessly by listing it on CarRental.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-130 mt-2 text-indigo-200/90 leading-relaxed"
          >
            We take care of insurance, driver verification and secure payments -
            so you can earn passive income, stress-free.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white hover:bg-indigo-50 transition-all text-indigo-700 rounded-2xl font-bold shadow-xl mt-8 cursor-pointer overflow-hidden"
          >
            {/* Button shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <motion.span
              whileHover={{ x: 2 }}
              className="relative z-10 text-lg"
            >
              List Your Car
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Car Image */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="relative z-10"
        >
          <motion.img
            src={assets.banner_car_image}
            alt="car"
            className="max-h-45 md:max-h-52 drop-shadow-2xl filter brightness-110 contrast-105"
            whileHover={{
              scale: 1.08,
              y: -8,
              rotate: 1,
              transition: { type: "spring", stiffness: 200 },
            }}
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating elements around car */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-6 -right-4 w-16 h-16 bg-white/20 rounded-full blur-md"
          ></motion.div>

          <motion.div
            animate={{
              y: [8, -8, 8],
              rotate: [0, -8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -left-6 w-12 h-12 bg-white/15 rounded-full blur-md"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-10 left-8 w-6 h-6 bg-white/25 rounded-full blur-sm"
          ></motion.div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-white/5 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Banner;
