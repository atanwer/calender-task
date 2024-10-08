"use client"

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '@/redux/store/eventSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from './Modal';
import { CalendarEvent, EventType } from '@/app/types';
import { RootState } from '@/redux/store';

const CustomCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const events: CalendarEvent = useSelector((state: RootState) => state.events);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleSave = (type: EventType, content: string) => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            dispatch(addEvent({
                date: formattedDate,
                event: { type, content }
            }));
        }
        setIsModalOpen(false);
    };

    const renderCalendarDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = date.toISOString().split('T')[0];

            const dayEvents = events[formattedDate] || [];

            const isToday = date.toDateString() === today.toDateString();

            days.push(
                <div
                    key={day}
                    className={`h-24 border border-gray-200 p-1 overflow-y-auto cursor-pointer hover:bg-gray-100 ${isToday ? 'bg-purple-200' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <div className="font-bold text-sm mb-1 text-center">{day}</div>
                    {dayEvents.map((event, idx) => (
                        <div
                            key={idx}
                            className={`text-xs p-1 mb-1 rounded ${event.type === 'event' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}
                        >
                            {event.content}
                        </div>
                    ))}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
                    <FaChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-0">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-bold py-2 border-b border-gray-200">
                        {day}
                    </div>
                ))}
                {renderCalendarDays()}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default CustomCalendar;