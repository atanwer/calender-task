"use client"

import React, { useState, useEffect } from 'react';
import { FaTable, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/app/types';

const navItems: NavItem[] = [
    { name: 'Table', path: '/table', icon: FaTable },
    { name: 'Calendar', path: '/calendar', icon: FaCalendarAlt },
];

const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`bg-gray-800 min-h-screen p-4 transition-all duration-300 ${isMobile ? (isExpanded ? 'w-64' : 'w-16') : (isExpanded ? 'w-64' : 'w-20')
                }`}
        >
            <div className="flex justify-between items-center mb-8">
                {isExpanded && <h1 className="text-white text-xl font-bold">Dashboard</h1>}
                <button
                    className="text-white focus:outline-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isMobile ? (
                        <FaBars className="text-2xl" />
                    ) : isExpanded ? (
                        <FaChevronLeft className="text-2xl" />
                    ) : (
                        <FaChevronRight className="text-2xl" />
                    )}
                </button>
            </div>

            <nav>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.path}>
                                <div
                                    className={`flex items-center space-x-4 p-2 rounded-lg transition-colors duration-200 ${pathname === item.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                        } ${isExpanded ? "" : "justify-center"}`}
                                >
                                    <item.icon className="text-xl" />
                                    {isExpanded && <span>{item.name}</span>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;