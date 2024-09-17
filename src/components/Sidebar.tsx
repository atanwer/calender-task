"use client"

import React, { useState } from 'react';
import { FaTable, FaCalendarAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();
    return (
        <div className={`bg-gray-800 h-screen p-4 ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
            <button
                className="text-green-400 mb-6 focus:outline-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? (
                    <FaArrowLeft className="text-2xl" />
                ) : (
                    <FaArrowRight className="text-2xl" />
                )}
            </button>

            <ul className="mt-4 space-y-4">
                <li className={`flex items-center space-x-2`}>
                    <Link href="/table">
                        <FaTable className={`text-xl ${pathname === '/table' ? 'text-green-600' : 'text-gray-400'}`} />
                    </Link>
                    {isExpanded && (
                        <Link href="/table" className={`text-base ${pathname === '/table' ? 'text-green-600 font-semibold' : 'text-gray-300'}`}>
                            Table
                        </Link>
                    )}
                </li>
                <li className={`flex items-center space-x-2`}>
                    <Link href="/calendar">
                        <FaCalendarAlt className={`text-xl ${pathname === '/calendar' ? 'text-green-600' : 'text-gray-400'}`} />
                    </Link>
                    {isExpanded && (
                        <Link href="/calendar" className={`text-base ${pathname === '/calendar' ? 'text-green-600 font-semibold' : 'text-gray-300'}`}>
                            Calendar
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
