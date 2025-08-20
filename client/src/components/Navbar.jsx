import { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { NavLink,  useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-800 backdrop-blur-xl bg-gray-50 border-b border-white/20 shadow-lg shadow-black/5"
    >
      <NavLink
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          src={assets.logo}
          alt="logo"
          className="h-8 drop-shadow-sm"
        />
      </NavLink>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-white/20 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-sm:p-6 transition-all duration-500 ease-out z-50 backdrop-blur-xl bg-white/90 ${
          open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
        }`}
      >
        {menuLinks.map((link, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `relative pb-1 font-semibold tracking-wide transition-all duration-300 group ${
                  isActive
                    ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:rounded-full"
                    : "text-slate-700 hover:text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                }`
              }
            >
              {link.name}
            </NavLink>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="hidden lg:flex items-center text-sm gap-3 border border-slate-200/50 px-4 py-2 rounded-2xl max-w-64 bg-white/60 backdrop-blur-sm shadow-inner"
        >
          <input
            type="text"
            className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 font-medium"
            placeholder="Search anything..."
          />
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            src={assets.search_icon}
            alt="search"
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </motion.div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="font-semibold text-slate-700 hover:text-indigo-600 transition-all duration-300 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer"
          >
            {user ? "Logout" : "Login"}
          </motion.button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="sm:hidden cursor-pointer p-2 rounded-xl hover:bg-slate-100 transition-colors"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6"
        />
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
