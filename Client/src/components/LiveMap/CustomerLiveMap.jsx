import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import io from "socket.io-client";
import "maplibre-gl/dist/maplibre-gl.css";
import PropTypes from "prop-types";

const baseURL = import.meta.env.VITE_SOCKET_URL; // Replace with your backend URL

const socket = io(baseURL);// Replace with your backend URL

// Fixed customer location (Peradeniya)
const FAKE_CUSTOMER_COORDS = [80.5976, 7.2651]; // [lng, lat]

export default function CustomerLiveMap({ orderId = "order123" }) {
  const mapRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=gidDoej445NADu7FNDsC",
      center: FAKE_CUSTOMER_COORDS,
      zoom: 14,
    });

    map.on("load", () => {
      setMapInstance(map);

      // 🟦 Customer marker (static)
      customerMarkerRef.current = new maplibregl.Marker({ color: "blue" })
        .setLngLat(FAKE_CUSTOMER_COORDS)
        .addTo(map);

      // 🔴 Driver marker (init at customer point to avoid undefined)
      driverMarkerRef.current = new maplibregl.Marker({ color: "red" })
        .setLngLat(FAKE_CUSTOMER_COORDS)
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  const drawRoute = useCallback(async (map, from, to) => {
    if (
      !from ||
      !to ||
      from.length !== 2 ||
      to.length !== 2 ||
      typeof from[0] !== "number" ||
      typeof from[1] !== "number" ||
      typeof to[0] !== "number" ||
      typeof to[1] !== "number"
    ) {
      console.warn("🚫 Invalid route coordinates", { from, to });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [from, to] }),
      });

      const data = await res.json();
      const coords = data.features?.[0]?.geometry?.coordinates;

      if (!coords || coords.length === 0) {
        console.error("⚠️ No route geometry returned");
        return;
      }

      if (map.getLayer("route")) map.removeLayer("route");
      if (map.getSource("route")) map.removeSource("route");

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coords,
          },
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#3b82f6",
          "line-width": 4,
        },
      });
    } catch (error) {
      console.error("❌ Failed to draw route:", error);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance) return;

    socket.emit("joinOrderRoom", orderId);

    const handleDriverLocation = async (data) => {
      const isValid =
        data &&
        typeof data.lng === "number" &&
        typeof data.lat === "number" &&
        Array.isArray(FAKE_CUSTOMER_COORDS);

      if (data.orderId === orderId && isValid && driverMarkerRef.current) {
        const driverCoords = [data.lng, data.lat];
        console.log("📍 New driver location:", driverCoords);

        driverMarkerRef.current.setLngLat(driverCoords);

        // Optional: center map on driver
        // mapInstance.flyTo({ center: driverCoords, zoom: 14 });

        await drawRoute(mapInstance, driverCoords, FAKE_CUSTOMER_COORDS);
      } else {
        console.warn("⚠️ Skipped invalid location payload:", data);
      }
    };

    socket.on("driverLocation", handleDriverLocation);

    return () => {
      socket.off("driverLocation", handleDriverLocation);
    };
  }, [mapInstance, orderId, drawRoute]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Track Your Delivery</h2>
      <div ref={mapRef} className="h-[500px] w-full rounded border shadow" />
      <div className="mt-2 text-sm text-gray-500">
        🔴 = Driver | 🔵 = You (Customer)
      </div>
    </div>
  );
}

CustomerLiveMap.propTypes = {
  orderId: PropTypes.string,
};
