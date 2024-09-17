import React from 'react';
import Sidebar from '../../components/Sidebar';
import CustomCalendar from '../../components/Calendar';

const CalendarPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Calendar</h1>
                <CustomCalendar />
            </div>
        </div>
    );
};

export default CalendarPage;