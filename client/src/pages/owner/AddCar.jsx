import React, { useState } from "react";
import {
  Upload,
  Car,
  MapPin,
  Calendar,
  DollarSign,
  Settings,
  Fuel,
  Users,
  FileText,
  Check,
  AlertCircle,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setImagePreview(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (fieldName) =>
    `px-3 py-2.5 mt-2 border-2 rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
      errors[fieldName]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const selectClasses = (fieldName) =>
    `px-3 py-2.5 mt-2 border-2 rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer ${
      errors[fieldName]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 px-4 py-6">
      <div className="w-full max-w-none mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Car</h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to list your car for rental
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">
              Car successfully added to your listings!
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-medium">
              Something went wrong. Please try again.
            </span>
          </div>
        )}

        {/* Main Form Container - Full Width Horizontal Layout */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
          <div className="flex flex-col xl:flex-row min-h-[600px]">
            {/* Left Panel - Image Upload */}
            <div className="xl:w-1/4 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col justify-center items-center">
              <div className="text-center mb-6">
                <Upload className="w-10 h-10 text-white mb-3 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Upload Car Image
                </h3>
                <p className="text-blue-100 text-sm">Show off your car</p>
              </div>

              <label htmlFor="car-image" className="cursor-pointer group">
                <div
                  className={`w-48 h-32 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/10 ${
                    errors.image ? "border-red-300 bg-red-500/20" : ""
                  }`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white/70 mb-2 group-hover:text-white transition-colors" />
                      <span className="text-white/80 group-hover:text-white transition-colors font-medium text-sm">
                        Click to upload
                      </span>
                      <span className="text-white/60 text-xs mt-1">
                        Max 5MB
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              {errors.image && (
                <p className="text-red-200 text-sm mt-2">{errors.image}</p>
              )}
            </div>

            {/* Right Panel - Form Fields in Grid Layout */}
            <div className="xl:w-3/4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Car className="w-4 h-4 inline mr-1" />
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BMW, Mercedes"
                    className={inputClasses("brand")}
                    value={car.brand}
                    onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  />
                  {errors.brand && (
                    <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                  )}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. X5, E-Class"
                    className={inputClasses("model")}
                    value={car.model}
                    onChange={(e) => setCar({ ...car, model: e.target.value })}
                  />
                  {errors.model && (
                    <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Year
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    className={inputClasses("year")}
                    value={car.year}
                    onChange={(e) => setCar({ ...car, year: e.target.value })}
                  />
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price/Day ({currency})
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    min="1200"
                    className={inputClasses("pricePerDay")}
                    value={car.pricePerDay}
                    onChange={(e) =>
                      setCar({ ...car, pricePerDay: e.target.value })
                    }
                  />
                  {errors.pricePerDay && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pricePerDay}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className={selectClasses("category")}
                    value={car.category}
                    onChange={(e) =>
                      setCar({ ...car, category: e.target.value })
                    }
                  >
                    <option value="">Select category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="SUV">XUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Settings className="w-4 h-4 inline mr-1" />
                    Transmission
                  </label>
                  <select
                    className={selectClasses("transmission")}
                    value={car.transmission}
                    onChange={(e) =>
                      setCar({ ...car, transmission: e.target.value })
                    }
                  >
                    <option value="">Select transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                    <option value="CVT">CVT</option>
                  </select>
                  {errors.transmission && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.transmission}
                    </p>
                  )}
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Fuel className="w-4 h-4 inline mr-1" />
                    Fuel Type
                  </label>
                  <select
                    className={selectClasses("fuel_type")}
                    value={car.fuel_type}
                    onChange={(e) =>
                      setCar({ ...car, fuel_type: e.target.value })
                    }
                  >
                    <option value="">Select fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                    <option value="LPG">LPG</option>
                  </select>
                  {errors.fuel_type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fuel_type}
                    </p>
                  )}
                </div>

                {/* Seating Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    Seats
                  </label>
                  <select
                    className={selectClasses("seating_capacity")}
                    value={car.seating_capacity}
                    onChange={(e) =>
                      setCar({ ...car, seating_capacity: e.target.value })
                    }
                  >
                    <option value="">Select capacity</option>
                    {[2, 4, 5, 6, 7, 8, 9, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} seats
                      </option>
                    ))}
                  </select>
                  {errors.seating_capacity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.seating_capacity}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <select
                    className={selectClasses("location")}
                    value={car.location}
                    onChange={(e) =>
                      setCar({ ...car, location: e.target.value })
                    }
                  >
                    <option value="">Select location</option>
                    <option value="New York">New York, NY</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Chicago">Chicago, IL</option>
                    <option value="Houston">Houston, TX</option>
                    <option value="Phoenix">Phoenix, AZ</option>
                    <option value="Philadelphia">Philadelphia, PA</option>
                    <option value="San Antonio">San Antonio, TX</option>
                    <option value="San Diego">San Diego, CA</option>
                  </select>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Description - Spans multiple columns */}
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your car's features and condition..."
                    className={`w-full ${inputClasses(
                      "description"
                    )} resize-none`}
                    value={car.description}
                    onChange={(e) =>
                      setCar({ ...car, description: e.target.value })
                    }
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description}
                      </p>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {car.description.length} characters
                    </span>
                  </div>
                </div>

                {/* Submit Button - Spans remaining columns */}
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex items-end">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={onSubmitHandler}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        {isLoading ? "Listing" : "List Your Car"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
