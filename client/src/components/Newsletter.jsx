import { useState } from "react";
import { Mail, Send, Check, Bell, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative py-20 px-4 bg-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-300 rounded-full blur-3xl"
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-20"
        >
          <Mail className="w-6 h-6 text-indigo-300" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 right-32"
        >
          <Bell className="w-5 h-5 text-purple-300" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-32"
        >
          <Gift className="w-7 h-7 text-pink-300" />
        </motion.div>
      </div>

      {/* Content with animation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 w-full"
            >
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 text-indigo-700 text-sm font-medium"
                >
                  <Bell className="w-4 h-4" />
                  Special Offers Alert
                </motion.div>

                <h1 className="md:text-5xl text-3xl font-bold text-gray-900 leading-tight">
                  Never Miss a Deal!
                  <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-lg md:text-xl font-normal mt-2">
                    Join 50K+ happy subscribers
                  </span>
                </h1>

                <p className="md:text-xl text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Subscribe to get the latest offers, new arrivals, and
                  exclusive discounts delivered straight to your inbox
                </p>
              </div>

              {/* Input + Button */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl w-full"
              >
                <div className="relative flex-1 w-full sm:w-auto">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-gray-700 placeholder-gray-500 shadow-lg focus:bg-white focus:border-indigo-300 focus:shadow-xl focus:scale-105 transition-all duration-300"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative h-14 px-8 sm:px-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 min-w-fit"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-green-400 rounded-full w-20 h-20 mx-auto opacity-20"
                />
              </motion.div>

              <h2 className="text-4xl font-bold text-gray-900">
                Welcome Aboard! 🎉
              </h2>

              <p className="text-xl text-gray-600 max-w-xl mx-auto">
                Thank you for subscribing! Check your inbox for a special
                welcome offer.
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What's Next?
                </h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>✨ Confirm your email (check your inbox)</li>
                  <li>🎁 Claim your 20% welcome discount</li>
                  <li>📧 Get weekly deals every Tuesday</li>
                </ul>
              </motion.div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="text-indigo-600 hover:text-indigo-800 underline transition-colors duration-300"
              >
                Subscribe another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Newsletter;
