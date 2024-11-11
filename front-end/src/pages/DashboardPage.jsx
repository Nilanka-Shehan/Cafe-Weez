import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect } from "react"; // Import useEffect


const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const navigate=useNavigate();

	// Check user role and navigate accordingly
	useEffect(() => {
		if (user) {
			// Role-based navigation
			if (user.role === "admin") {
				navigate("/dashboard");
			} else if (user.role === "kitchenStaff") {
				navigate("/kitchenstaff");
			} else if (user.role === "waiter") {
				navigate("/waiter");
			} else {
				navigate("/home");
			}
		}
	}, [user, navigate]); // This effect runs whenever the user or navigate changes



	const handleLogout = () => {
		logout();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700'
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text'>
				Dashboard
			</h2>

			<div className='space-y-6'>
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-70 rounded-lg border border-gray-600'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-red-500 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</motion.div>
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-70 rounded-lg border border-gray-600'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-red-500 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
						{formatDate(user.lastLogin)}
					</p>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-700 text-white 
					font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-800
					focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default DashboardPage;
