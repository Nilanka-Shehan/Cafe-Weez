import { useState, useEffect, useCallback } from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserreviewsDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // New states for approval modal
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [reviewToApprove, setReviewToApprove] = useState(null);

  const axiosSecure = useAxiosSecure();

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axiosSecure.get("http://localhost:3001/api/reviews");
      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else {
        setError("Failed to load reviews.");
      }
    } catch {
      setError("There was an error fetching reviews.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Handle delete review
  const deleteReview = async (id) => {
    try {
      await axiosSecure.delete(`http://localhost:3001/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
      setIsDeleteModalOpen(false);
    } catch {
      alert("Error deleting review.");
    }
  };

  // Approval/rejection logic
  const handleApproveClick = (review) => {
    setReviewToApprove(review);
    setIsApproveModalOpen(true);
  };

  const handleApprove = async () => {
    try {
      console.log(reviewToApprove._id);
      // Update status to "approved"
      await axiosSecure.put(
        `http://localhost:3001/reviews/${reviewToApprove._id}`,
        { status: "accept" }
      );
      setReviews(
        reviews.map((r) =>
          r._id === reviewToApprove._id ? { ...r, status: "accept" } : r
        )
      );
      setIsApproveModalOpen(false);
      setReviewToApprove(null);
      fetchReviews(); // Refresh reviews after approval
    } catch {
      alert("Error approving review.");
    }
  };

  const handleReject = async () => {
    try {
      // Update status to "rejected"
      await axiosSecure.put(
        `http://localhost:3001/reviews/${reviewToApprove._id}`,
        { status: "reject" }
      );
      setReviews(
        reviews.map((r) =>
          r._id === reviewToApprove._id ? { ...r, status: "reject" } : r
        )
      );
      setIsApproveModalOpen(false);
      setReviewToApprove(null);
      fetchReviews(); // Refresh reviews after rejection
    } catch {
      alert("Error rejecting review.");
    }
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setReviewToApprove(null);
  };

  const openDeleteModal = (id) => {
    setReviewToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        <p className="text-gray-600 mt-2">View and manage customer reviews.</p>
      </header>

      {/* Reviews List */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
        {reviews.length === 0 ? (
          <div className="flex justify-center items-center text-center text-gray-500 py-10">
            <FaExclamationCircle className="text-4xl mr-3" />
            <p>No reviews available.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review.title}
                    </h3>
                    <p className="text-gray-600">By: {review.name}</p>
                    <p className="mt-2 text-sm text-gray-700">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Approval status icon */}
                    <button
                      onClick={() => handleApproveClick(review)}
                      className="focus:outline-none"
                      title={
                        review.states === "accept"
                          ? "Accept"
                          : review.states === "reject"
                          ? "Reject"
                          : "Pending - Click to approve/reject"
                      }
                    >
                      {review.states === "accept" ? (
                        <FaCheckCircle className="text-green-500 text-2xl" />
                      ) : review.states === "reject" ? (
                        <FaTimesCircle className="text-red-500 text-2xl" />
                      ) : (
                        <FaQuestionCircle className="text-yellow-500 text-2xl" />
                      )}
                    </button>
                    <button
                      onClick={() => openDeleteModal(review._id)}
                      className="bg-red text-white px-2 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this review?
            </h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteReview(reviewToDelete)}
                className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve/Reject Confirmation Modal */}
      {isApproveModalOpen && reviewToApprove && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Do you want to add this review to the Review Bar?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleApprove}
                className="bg-green-500 text-green px-4 py-2 rounded-md hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-red px-4 py-2 rounded-md hover:bg-red-600"
              >
                No
              </button>
              <button
                onClick={closeApproveModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserreviewsDashboard;
