import axios from "axios";
import { useState } from "react";

const AddReviewForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state before submitting
    console.log(name);
    console.log(title);
    console.log(content);

    try {
      // Sending POST request to the API
      const response = await axios.post("http://localhost:3001/reviews", {
        name,
        title,
        content,
      });

      // Handle success response
      if (response.status === 201) {
        // You can update the UI or call another function to reflect the new review
        alert("Review submitted successfully!");
        setName("");
        setTitle("");
        setContent("");
      }
    } catch (err) {
      // Handle error response
      console.error(err);
      setError("There was an error submitting your review.");
    } finally {
      setLoading(false); // Stop loading state after request completes
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
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
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="content">
          Review
        </label>
        <textarea
          id="content"
          className="w-full p-2 border rounded-md bg-gray-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        className="bg-[#ed1b24] text-white p-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReviewForm;
