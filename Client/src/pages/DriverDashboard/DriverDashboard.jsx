import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import io from "socket.io-client";
import "maplibre-gl/dist/maplibre-gl.css";
import OrderTable from "../../components/driver/OrderTable";
import DeliverySummary from "../../components/driver/DeliverySummary";
import useAxiosSecure from "../../hooks/useAxiosSecure";
//import useAuth from "../../hooks/useAth";
//import PropTypes from "prop-types";

const baseURL = import.meta.env.VITE_SOCKET_URL;
const socket = io(baseURL, {
  transports: ["websocket"],
  withCredentials: true,
});

const assignedOrders = [
  { orderId: "order123", destination: [80.5976, 7.2651] }, // [lng, lat]
  { orderId: "order456", destination: [80.6122, 7.29] },
];

const DriverDashboard = () => {
  const [isActive, setIsActive] = useState(() => {
    const stored = localStorage.getItem("driverMode");
    return stored === "true"; // Convert string to boolean
  });

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  //const { user } = useAuth();

  const [driverCoords, setDriverCoords] = useState(null);

  //Delivery summary state
  const tasks = [
    {
      id: 1,
      address: "123 Main St, Kandy",
      status: "Completed",
      eta: "4 mins",
    },
    {
      id: 2,
      address: "456 Side Rd, Peradeniya",
      status: "In Progress",
      eta: "—",
    },
    // more tasks...
  ];

  const completedTasks = tasks.filter((task) => task.status === "Completed");

  // Save mode to localStorage
  const toggleMode = () => {
    const newMode = !isActive;
    setIsActive(newMode);
    localStorage.setItem("driverMode", newMode.toString());
  };

  //updare driver status
  useEffect(() => {
    try {
      const status = localStorage.getItem("driverMode") === "true"
              ? "active"
              : "deactive" ;
      axiosSecure.put(
        "/user/driver-status",
        { status }
      );
    } catch (error) {
      console.error("Failed to update driver status:", error);
    }
  }, [isActive, axiosSecure]);

  const drawRoute = useCallback(async (map, from, to, layerId) => {
    try {
      const res = await fetch("http://localhost:3001/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [from, to] }),
      });

      const data = await res.json();
      const coords = data.features?.[0]?.geometry?.coordinates;
      if (!coords) return;

      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(layerId)) map.removeSource(layerId);

      map.addSource(layerId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
        },
      });

      map.addLayer({
        id: layerId,
        type: "line",
        source: layerId,
        paint: {
          "line-color": "#f59e0b", // amber
          "line-width": 4,
        },
      });
    } catch (err) {
      console.error("Route drawing failed:", err);
    }
  }, []);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=gidDoej445NADu7FNDsC",
      center: [80.6, 7.27],
      zoom: 13,
    });

    map.on("load", () => {
      mapInstanceRef.current = map;

      // Add static customer markers
      assignedOrders.forEach(({ destination }) => {
        new maplibregl.Marker({ color: "blue" })
          .setLngLat(destination)
          .addTo(map);
      });

      // Init driver marker
      driverMarkerRef.current = new maplibregl.Marker({ color: "red" })
        .setLngLat([80.6, 7.27])
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.warn("Socket disconnected"));
    socket.on("connect_error", (err) => console.error("Socket error:", err));

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const current = [pos.coords.longitude, pos.coords.latitude];
        setDriverCoords(current);

        assignedOrders.forEach(({ orderId }) => {
          socket.emit("locationUpdate", {
            orderId,
            lat: current[1],
            lng: current[0],
          });
        });

        if (driverMarkerRef.current) {
          driverMarkerRef.current.setLngLat(current);
        }

        // Draw route to each customer
        const map = mapInstanceRef.current;
        assignedOrders.forEach(({ destination, orderId }) => {
          drawRoute(map, current, destination, `route-${orderId}`);
        });
      },
      (err) => console.error("Geolocation error", err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [drawRoute]);
  return (
    <div>
      <div className="flex items-center gap-4 p-4">
        <span className="text-gray-700 font-medium">Change Mode</span>

        {/* Custom Toggle */}
        <button
          onClick={toggleMode}
          className="relative w-16 h-8 flex items-center rounded-full transition-colors duration-300 border border-gray-800"
        >
          {/* Slider Dot */}
          <div
            className={`absolute left-1 top-1 w-6 h-6 bg-gray-400 rounded-full shadow-md transition-transform duration-300 ${
              isActive ? "translate-x-8" : ""
            }`}
          ></div>
        </button>

        {/* Status Dot + Label */}
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-activeGreen" : "bg-activeRed"
            }`}
          ></div>
          <span
            className={`text-sm font-semibold ${
              isActive ? "text-activeGreen" : "text-activeRed"
            }`}
          >
            {isActive ? "Active" : "DeActive"}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {/* <h2 className="text-xl font-bold">Driver Dashboard</h2>
        <div className="text-sm text-gray-600">
          Orders being tracked:{" "}
          <strong>{assignedOrders.map((o) => o.orderId).join(", ")}</strong>
        </div> */}
        <div
          ref={mapRef}
          className="h-[300px] md:h-[500px] w-full rounded border-2 border-gray-500 shadow"
        />
        <div className="text-sm text-gray-500">
          🔴 Driver | 🔵 Customer(s) | 📍 Route shown in amber
        </div>
      </div>
      {isActive && (
        <div className="p-6 w-full">
          <OrderTable />
          <DeliverySummary completedTasks={completedTasks} />
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
