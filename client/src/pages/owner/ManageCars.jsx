import React, { useEffect, useState } from "react";
import { Car, Eye, EyeOff, Trash2, Edit, Settings, Filter } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data matching your structure

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      console.log("API response ===>", data);
      if (data.success) {
        setCars(Array.isArray(data.message) ? data.message : []); // ✅ fix
      } else {
        toast.error(data.message || "Failed to fetch cars");
        setCars([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Something went wrong");
      setCars([]);
    }
  };

  // toggle
  const handleToggleCar = async (carId) => {
    // Optimistic UI
    setCars((prev) =>
      prev.map((car) =>
        car._id === carId ? { ...car, isAvailable: !car.isAvailable } : car
      )
    );

    try {
      await axios.put(`/api/owner/toggle-car/${carId}`);
      toast.success("Car availability updated");
    } catch (error) {
      // rollback if error
      setCars((prev) =>
        prev.map((car) =>
          car._id === carId ? { ...car, isAvailable: !car.isAvailable } : car
        )
      );
      toast.error(error.response?.data?.message || "Error updating car");
    }
  };

  // delete
  const handleDeleteCar = async (carId) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/owner/delete-car/${carId}`); // ✅ id in URL
      toast.success("Car deleted successfully");
      fetchOwnerCars(); // refresh
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting car");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-10 md:px-10 w-full">
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Manage Cars
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Cars</p>
              <p className="text-xl font-bold text-gray-900">
                {cars.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-gray-900">
                {cars?.filter((car) => car.isAvailable)?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <EyeOff className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unavailable</p>
              <p className="text-xl font-bold text-gray-900">
                {cars?.filter((car) => !car.isAvailable)?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 ">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Cars List</th>
                <th className="p-4 font-semibold text-gray-700 max-md:hidden">
                  Category
                </th>
                <th className="p-4 font-semibold text-gray-700">Price</th>
                <th className="p-4 font-semibold text-gray-700 max-md:hidden">
                  Status
                </th>
                <th className="p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars?.map((car, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200 group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={car.image}
                          alt=""
                          className="w-16 h-12 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {car.seating_capacity} • {car.transmission}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 max-md:hidden">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {car.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">
                      {currency}
                      {car.pricePerDay}
                      <span className="text-xs text-gray-500 font-normal">
                        /day
                      </span>
                    </div>
                  </td>
                  <td className="p-4 max-md:hidden">
                    <span
                      className={`inline-block w-28 text-center px-3 py-1 rounded-full text-xs font-medium ${
                        car.isAvailable
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleCar(car._id)}
                        disabled={isLoading}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group/btn cursor-pointer"
                      >
                        {car.isAvailable ? (
                          <EyeOff className="w-4 h-4 text-gray-600 group-hover/btn:text-orange-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-green-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group/btn cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 group-hover/btn:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {cars.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No cars found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first car to the platform.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
            Add Your First Car
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
