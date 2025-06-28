import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [userData, setUserData] = useState(null); // store user data

  // fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const meResponse = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
        setUserData(meResponse.data.user); // save user { _id, username, role } or any fields returned
      } catch (err) {
        console.error('Failed to fetch user', err);
        // If not authenticated, redirect to login
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleImageError = (e) => {
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-2 items-center py-10">
      {/* Profile Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png" // fallback avatar
        onError={handleImageError}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />

      {/* Name & Email */}
      <h2 className="text-xl font-semibold">
        {userData ? userData.username : 'Loading...'}
      </h2>
      <p className="text-gray-500 mb-4">
      {userData ? userData.email : 'Loading...'}
      </p>

      {/* Edit Profile Button */}
      <button className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 mb-10">
        Edit Profile
      </button>

      {/* Account Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Account</h3>
        <div className="space-y-4">
          {/* Order History */}
          <Link
            className="flex justify-between items-center cursor-pointer hover:text-blue-600"
            to="/Orders"
          >
            <span>Order History</span>
            <span>&gt;</span>
          </Link>

          {/* Payment Methods */}
          <div className="flex justify-between items-center cursor-pointer hover:text-blue-600">
            <span>Payment Methods</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div
        className="bg-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 mb-10 cursor-pointer text-white"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Profile;
