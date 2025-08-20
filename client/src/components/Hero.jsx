import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate" +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <div className="min-h-screen pb-32 pt-40 flex flex-col items-center justify-center gap-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
          Luxury Cars on Rent
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl"
        >
          Experience premium comfort with our exclusive collection of luxury
          vehicles
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-between p-8 md:px-12 gap-8 rounded-3xl md:rounded-full w-full max-w-80 md:max-w-200 bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 border border-white/50 hover:shadow-3xl hover:shadow-indigo-500/15 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row items-end gap-8 w-full">
          {/* Pickup Location */}
          <motion.div
            whileHover={{ y: -2 }}
            // className="flex flex-col gap-3 w-full md:w-48"
            className="flex flex-col gap-3 w-full md:w-64"
          >
            <label className="text-sm font-bold text-slate-700 tracking-wide">
              Pickup Location
            </label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full border-2 border-slate-200/80 rounded-2xl px-4 py-3 h-[52px] focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm font-semibold text-slate-700 shadow-inner"
            >
              <option value="">Select Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Pick-up Date */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex flex-col gap-3 w-full md:w-40"
          >
            <label
              htmlFor="pickup-date"
              className="text-sm font-bold text-slate-700 tracking-wide"
            >
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full border-2 border-slate-200/80 rounded-2xl px-4 py-3 h-[52px] text-sm text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm font-semibold shadow-inner"
              required
            />
          </motion.div>

          {/* Return Date */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex flex-col gap-3 w-full md:w-40"
          >
            <label
              htmlFor="return-date"
              className="text-sm font-bold text-slate-700 tracking-wide"
            >
              Return Date
            </label>
            <input
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
              type="date"
              id="return-date"
              className="w-full border-2 border-slate-200/80 rounded-2xl px-4 py-3 h-[52px] text-sm text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm font-semibold shadow-inner"
              required
            />
          </motion.div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 px-12 py-3 h-[52px] bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:via-indigo-800 hover:to-purple-700 text-white font-bold rounded-2xl md:rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 whitespace-nowrap relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-pulse"></div>
            <motion.img
              whileHover={{ rotate: 15 }}
              src={assets.search_icon}
              alt="search"
              className="brightness-300 w-5 h-5"
            />
            Search Cars
          </motion.button>
        </div>
      </motion.form>

      {/* Car Image */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.img
          src={assets.main_car}
          alt="car"
          className="max-h-74 drop-shadow-2xl filter brightness-105 contrast-110"
          whileHover={{
            scale: 1.05,
            y: -10,
            transition: { type: "spring", stiffness: 300 },
          }}
        />
        {/* Floating elements around car */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 -right-5 w-20 h-20 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [5, -5, 5],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-5 -left-10 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
