import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Budget Tracker</h1>
      <p className="text-lg mb-6 text-gray-600 max-w-xl">
        Track your income and expenses easily. Stay on top of your financial goals with our simple and secure budget tracker app.
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
