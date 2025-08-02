import axios from "axios";
import React, { useState } from "react";

const Booktable = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [numTables, setNumTables] = useState("");
  const [eventType, setEventType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state before submitting

    try {
      // Sending POST request to the API
      const response = await axios.post("http://localhost:3001/api/booktable", {
        name,
        date,
        numTables,
        eventType,
        phoneNumber,
      });

      // Handle success response
      if (response.status === 201) {
        alert("Table booking successful!");
        setName("");
        setDate("");
        setNumTables("");
        setEventType("");
        setPhoneNumber("");
      }
    } catch (err) {
      // Handle error response
      setError("There was an error booking the table. Please try again.");
    } finally {
      setLoading(false); // Stop loading state after request completes
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="numTables">
          Number of Tables
        </label>
        <input
          id="numTables"
          type="number"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={numTables}
          onChange={(e) => setNumTables(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="eventType">
          Event Type
        </label>
        <input
          id="eventType"
          type="text"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        className="bg-[#ed1b24] text-white p-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Table"}
      </button>
    </form>
  );
};

export default Booktable;
