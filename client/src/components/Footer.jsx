import React from "react";
import { assets } from "../assets/assets";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-gray-100 via-white to-gray-100 px-6 pt-16 md:px-16 lg:px-24 xl:px-32 mt-40 text-sm text-gray-600 rounded-t-3xl shadow-2xl overflow-hidden"
    >
      {/* Animated gradient orbs (like newsletter style) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-wrap justify-between items-start gap-10 pb-10 border-borderColor border-b"
      >
        {/* Logo & About */}
        <div>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-9"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-4 text-gray-600 leading-relaxed"
          >
            Premium car rental service offering a wide selection of luxury and
            everyday vehicles to suit all your driving needs.
          </motion.p>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-5 mt-6 text-gray-600"
          >
            <a
              href="https://www.linkedin.com/in/hariswaran-venkatesh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition-all duration-300 text-2xl hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/hariswaran-v"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-900 transition-all duration-300 text-2xl hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/hariswaran.venkatesh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-600 transition-all duration-300 text-2xl hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:hariswaranvenkatesh@gmail.com"
              aria-label="Email"
              className="hover:text-red-600 transition-all duration-300 text-2xl hover:scale-110"
            >
              <HiOutlineMail />
            </a>
          </motion.div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-between w-full md:w-1/2 gap-8">
          {[
            {
              title: "Quick Links",
              links: ["Home", "Browse Cars", "List Your Car", "About Us"],
            },
            {
              title: "Resources",
              links: [
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "Insurance",
              ],
            },
            {
              title: "Contact",
              links: [
                "1233 Luxury Drive",
                "San Francisco, CA 94107",
                "+1 234567890",
                "info@example.com",
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
            >
              <h2 className="text-base font-semibold text-gray-800 uppercase">
                {section.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-gray-600">
                {section.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-300 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-gray-500"
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li className="hover:text-indigo-600 transition-colors">Privacy</li>
          <li>|</li>
          <li className="hover:text-indigo-600 transition-colors">Terms</li>
          <li>|</li>
          <li className="hover:text-indigo-600 transition-colors">Cookies</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
