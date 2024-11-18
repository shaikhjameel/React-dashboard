import React from 'react';
import { FiSettings } from 'react-icons/fi'; // Importing the settings icon
import ABScreenHeader from '../../component/ABScreenHeader';
import ABButton from '../../component/ABButton';
import { Input } from 'antd';

function Usersdata() {
    return (
        <>
            {/* Header with an Icon */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md">
                <ABScreenHeader
                    title="User Data Form"
                    actionButton={[
                        {
                            display: () => <ABButton label="Save" className="bg-white text-purple-700 hover:bg-purple-200" />,
                        },
                    ]}
                />
                {/* Settings Icon */}
                <FiSettings
                    className="text-white text-3xl cursor-pointer hover:text-gray-200 transition-all duration-300 ease-in-out"
                />
            </div>

            {/* Form Section */}
            <div className="max-w-lg mx-auto p-6 mt-8 bg-gradient-to-r from-yellow-200 via-green-200 to-blue-300 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    User Details
                </h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Name</label>
                    <Input
                        placeholder="Enter your name"
                        className="w-full p-2 border-2 border-purple-400 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-pink-800 font-medium mb-2">Email</label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border-2 border-pink-400 rounded focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                    <label className="block text-green-800 font-medium mb-2">Phone Number</label>
                    <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full p-2 border-2 border-green-400 rounded focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Website Field */}
                <div className="mb-6">
                    <label className="block text-blue-800 font-medium mb-2">Website</label>
                    <Input
                        type="url"
                        placeholder="Enter your website"
                        className="w-full p-2 border-2 border-blue-400 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <ABButton
                    className="w-full py-3 text-white font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 ease-in-out rounded-lg"
                    htmlType="submit"
                    label="Save"
                />
            </div>
        </>
    );
}

export default Usersdata;
