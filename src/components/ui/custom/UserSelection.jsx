import React from 'react';
import { Link } from "react-router-dom";

const UserSelection = () => {
  return (
    <div className="bg-[#F0F8FF] min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Select Your User Type
        </h1>
        
        <div className="flex justify-center space-x-8">
          {/* Student Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg w-64 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="w-32 h-32 mx-auto mb-6">
              <circle cx="150" cy="150" r="140" fill="#2563EB" />
              <path d="M150 90 L100 130 L150 170 L200 130 Z" fill="white" stroke="white" strokeWidth="3"/>
              <circle cx="150" cy="200" r="40" fill="white"/>
              <path d="M120 220 Q150 250, 180 220" fill="none" stroke="blue" strokeWidth="3"/>
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student</h2>
            <p className="text-gray-600 mb-6">Access courses, track progress, and learn new skills</p>
            <Link to={'/UserInput'}>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                  Login as Student
                </button>
            </Link>
            
          </div>
          
          {/* Tutor Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg w-64 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="w-32 h-32 mx-auto mb-6">
              <circle cx="150" cy="150" r="140" fill="#16A34A"/>
              <rect x="100" y="100" width="100" height="120" fill="white" rx="10"/>
              <line x1="120" y1="130" x2="180" y2="130" stroke="green" strokeWidth="4"/>
              <line x1="120" y1="160" x2="180" y2="160" stroke="green" strokeWidth="4"/>
              <path d="M130 190 Q150 220, 170 190" fill="none" stroke="green" strokeWidth="3"/>
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tutor</h2>
            <p className="text-gray-600 mb-6">Manage courses, create content, and track student progress</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300">
              Login as Tutor
            </button>
          </div>
          
          {/* Admin Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg w-64 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="w-32 h-32 mx-auto mb-6">
              <circle cx="150" cy="150" r="140" fill="#9333EA"/>
              <path d="M90 120 L210 120 L210 220 L90 220 Z" fill="white" stroke="purple" strokeWidth="3"/>
              <circle cx="150" cy="170" r="30" fill="purple"/>
              <path d="M135 150 L165 150" stroke="white" strokeWidth="3"/>
              <path d="M150 135 L150 165" stroke="white" strokeWidth="3"/>
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin</h2>
            <p className="text-gray-600 mb-6">Manage platform, users, and system configurations</p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300">
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;