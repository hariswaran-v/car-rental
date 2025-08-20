import React, { useEffect, useState } from "react";
import { Car, Calendar, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  // Sample data - replace with your actual dummyDashboardData in your project
  const dummyDashboardData = {
    totalCars: 45,
    totalBookings: 128,
    pendingBookings: 12,
    completedBookings: 116,
    recentBookings: [
      {
        car: { brand: "Toyota", model: "Camry" },
        createdAt: "2024-08-15T10:30:00",
        price: 89,
        status: "Completed",
      },
      {
        car: { brand: "Honda", model: "Civic" },
        createdAt: "2024-08-15T09:15:00",
        price: 65,
        status: "Pending",
      },
      {
        car: { brand: "BMW", model: "X5" },
        createdAt: "2024-08-14T16:45:00",
        price: 155,
        status: "Completed",
      },
    ],
    monthlyRevenue: 45750,
  };

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: Car,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: Calendar,
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: Clock,
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: CheckCircle,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-10 md:px-10 flex-1">
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Monitor overall platform performance including total cars, bookings,
          revenue, and recent activities
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-5xl">
        {dashboardCards.map((card, i) => {
          const IconComponent = card.icon;
          return (
            <div
              key={i}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-sm font-medium text-gray-600 mb-2 whitespace-nowrap">
                    {card.title}
                  </h1>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.gradient} rounded-b-xl`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 max-w-2xl w-full">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Recent Bookings
            </h1>
            <p className="text-gray-500">Latest customer bookings</p>
          </div>

          {data.recentBookings.length > 0 ? (
            <div className="space-y-4">
              {data.recentBookings.map((booking, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 hover:bg-blue-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-medium">
                    <p className="text-sm text-gray-900 font-bold">
                      {currency}
                      {booking.price}
                    </p>
                    <p
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent bookings available</p>
            </div>
          )}
        </div>

        {/* Monthly revenue */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 md:p-6 mb-6 w-full md:max-w-xs text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <h1 className="text-lg font-medium text-green-100 mb-2">
              Monthly Revenue
            </h1>
            <p className="text-green-100 text-sm mb-6">
              Revenue for current month
            </p>
            <p className="text-3xl font-bold">
              {currency} {data.monthlyRevenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
