import React from 'react';
import Sidebar from '../../components/Sidebar';
import CustomCalendar from '../../components/Calendar';

const CalendarPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <h1 className="text-xl font-bold">Event Calendar</h1>
                <CustomCalendar />
            </div>
        </div>
    );
};

export default CalendarPage;
