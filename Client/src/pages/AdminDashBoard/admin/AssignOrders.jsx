import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import { RiArrowDownWideFill, RiArrowUpWideFill } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const assignedOrders = [
  { orderId: "order123", destination: [80.5976, 7.2651] }, // [lng, lat]
  { orderId: "order456", destination: [80.6122, 7.29] },
];

const assignments = [
  {
    driverName: "Kasun Fernando",
    driverActive: true,
    orderId: "order123",
    address: "123 Main St, Kandy",
  },
  {
    driverName: "Nuwan Perera",
    driverActive: false,
    orderId: "order456",
    address: "456 Side Rd, Peradeniya",
  },
];

const AssignOrders = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  const toggleOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  //fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get("/orders");
        const fetchedOrders = Array.isArray(response.data) ? response.data : [];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  //map
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

      // Only add static customer markers (blue)
      assignedOrders.forEach(({ destination }) => {
        new maplibregl.Marker({ color: "blue" })
          .setLngLat(destination)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800">Assign Online Orders</h1>
      <div className="p-6 space-y-2 w-full">
        <h2 className="text-xl font-bold">Customer Locations</h2>
        <div
          ref={mapRef}
          className="h-[300px] md:h-[500px] w-full rounded border border-gray-400 shadow pt-5"
        />
        <p className="text-sm text-gray-500">🔵 = Customer</p>
      </div>
      <div className="overflow-x-auto m-3">
        <h2 className="text-xl font-bold">Driver Assignments</h2>
        <table className="w-full border border-gray-300 text-sm my-5 ">
          <thead className="bg-gray-100 text-secondary text-lg">
            <tr>
              <th className="px-4 py-2 border-r">Driver Name</th>
              <th className="px-4 py-2 border-r">Status</th>
              <th className="px-4 py-2 border-r">Order ID</th>
              <th className="px-4 py-2 border-r">Address</th>
              <th className="px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {assignments.map((assignment) => (
              <tr key={assignment.orderId} className="border-t">
                <td className="px-4 py-2 border-r">{assignment.driverName}</td>
                <td className="px-4 py-2 border-r">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      assignment.driverActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {assignment.driverActive ? "Active" : "DeActive"}
                </td>
                {/* <td className="px-4 py-2 border-r">{assignment.orderId}</td> */}
                <td>
                  <div className="bg-slate-100 mx-1 border-2 border-gray-400 rounded px-2 py-1 text-sm relative">
                    {selectedOrders.length
                      ? selectedOrders.join(", ")
                      : "Select Orders"}
                    <button className="flex items-center absolute right-2 top-1/2 -translate-y-1/2">
                      {showOptions ? (
                        <RiArrowUpWideFill
                          // className="w-full border px-4 py-2 rounded bg-white text-left shadow"
                          onClick={() => setShowOptions(false)}
                        />
                      ) : (
                        <RiArrowDownWideFill
                          // className="w-full border px-4 py-2 rounded bg-white text-left shadow"
                          onClick={() => setShowOptions(true)}
                        />
                      )}
                    </button>
                  </div>
                  {showOptions && (
                    <div className="absolute w-full bg-white border rounded shadow mt-1 z-10">
                      {
                        <label className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(
                              assignment.orderId
                            )}
                            onChange={() => toggleOrder(assignment.orderId)}
                            className="mr-2"
                          />
                          {assignment.orderId}
                        </label>
                      }
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border-r">{assignment.address}</td>
                <td className="px-4 py-2 text-center">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    Assign
                  </button>
                  {/* {assignment.driverActive === "Active" ? 
                  (<button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    Assign
                  </button>) : (
                    <span>🔴</span>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignOrders;
