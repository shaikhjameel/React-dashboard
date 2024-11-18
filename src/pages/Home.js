import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import Users from '../config/dashboard/users';
import usersdata from '../config/dashboard/usersdata';
import Photos from '../config/dashboard/photos';
import Comments from '../config/dashboard/comments';
import Albums from '../config/dashboard/Albums';
import Todos from '../config/dashboard/todos';

function Home() {
    const [theme, setTheme] = useState("red"); // Set the initial theme to "red"

    // Theme-specific styles
    const themes = {
        light: {
            background: "bg-gradient-to-br from-gray-50 to-gray-200",
            button: "bg-blue-500 hover:bg-blue-600 text-white",
            sidebar: "bg-gradient-to-b from-purple-800 to-indigo-600 text-white",
            mainBorder: "border-indigo-500",
        },
        dark: {
            background: "bg-gradient-to-br from-gray-800 to-gray-900",
            button: "bg-gray-700 hover:bg-gray-800 text-white",
            sidebar: "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300",
            mainBorder: "border-gray-700",
        },
        red: {
            background: "bg-gradient-to-br from-red-200 to-red-400",
            button: "bg-red-600 hover:bg-red-700 text-white",
            sidebar: "bg-gradient-to-b from-red-700 to-red-500 text-black",
            mainBorder: "border-red-500",
        },
        green: {
            background: "bg-gradient-to-br from-green-200 to-green-400",
            button: "bg-green-600 hover:bg-green-700 text-white",
            sidebar: "bg-gradient-to-b from-green-700 to-green-500 text-black",
            mainBorder: "border-green-500",
        },
        darkGreen: {
            background: "bg-gradient-to-br from-green-900 to-green-700",
            button: "bg-green-800 hover:bg-green-900 text-white",
            sidebar: "bg-gradient-to-b from-green-800 to-green-700 text-white",
            mainBorder: "border-green-700",
        },
    };

    const currentTheme = themes[theme];

    return (
        <div className={`flex h-screen ${currentTheme.background}`}>
            {/* Sidebar */}
            <aside
                className={`w-1/4 ${currentTheme.sidebar} p-6 shadow-xl`}
                style={{
                    height: "90vh",
                    margin: "auto",
                    borderRadius: "0.5rem", // Square shape with slight rounding
                }}>
                <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-center tracking-wide pb-4 w-full text-yellow-300">
        FIREBASE
    </h2>
    <button
        className="text-sm px-3 py-1 rounded-full bg-white text-black shadow-lg"
        onClick={() => {
            const themeOrder = ["light", "dark", "red", "green", "darkGreen"];
            const nextTheme =
                themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
            setTheme(nextTheme);
        }}>
        Change Theme
    </button>
</div>

<nav className="flex flex-col space-y-10">
  <Link
    to="/users"
    className={`flex items-center p-4 ${currentTheme.button} rounded-lg shadow-md text-center font-medium tracking-wide transition-transform transform hover:scale-105 text-xl`}>
    🧑‍💻 Users
  </Link>
  <Link
    to="/photos"
    className={`flex items-center p-4 ${currentTheme.button} rounded-lg shadow-md text-center font-medium tracking-wide transition-transform transform hover:scale-105 text-xl`}>
    📸 Photos
  </Link>
  <Link
    to="/comments"
    className={`flex items-center p-4 ${currentTheme.button} rounded-lg shadow-md text-center font-medium tracking-wide transition-transform transform hover:scale-105 text-xl`}>
    💬 Comments
  </Link>
  <Link
    to="/albums"
    className={`flex items-center p-4 ${currentTheme.button} rounded-lg shadow-md text-center font-medium tracking-wide transition-transform transform hover:scale-105 text-xl`}>
    📀 Albums
  </Link>
  <Link
    to="/todos"
    className={`flex items-center p-4 ${currentTheme.button} rounded-lg shadow-md text-center font-medium tracking-wide transition-transform transform hover:scale-105 text-xl`}>
    ✅ Todos
  </Link>
</nav>

            </aside>

            {/* Main Content */}
            <main className="w-3/4 p-10 overflow-y-auto">
                <div className={`bg-white p-10 rounded-3xl shadow-lg border-t-8 ${currentTheme.mainBorder}`}>
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/photos" element={<Photos />} />
                        <Route path="/comments" element={<Comments />} />
                        <Route path="/albums" element={<Albums />} />
                        <Route path="/todos" element={<Todos />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default Home;
