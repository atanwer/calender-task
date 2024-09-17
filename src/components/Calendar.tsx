"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '@/redux/store/slice';
import Modal from './Modal';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
    const dispatch = useDispatch();
    const events = useSelector((state: any) => state.data.events);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);  // Open modal on date click
    };

    const handleSave = (type: string, content: string) => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            dispatch(addEvent({
                date: formattedDate,
                event: { type, content }
            }));
        }
    };

    const getTileContent = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (events[formattedDate]) {
            return (
                <ul>
                    {events[formattedDate].map((event: any, idx: number) => (
                        <li
                            key={idx}
                            className={`text-${event.type === 'event' ? 'green' : 'blue'}-500`}
                        >
                            {event.content}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <Calendar
                onClickDay={handleDateClick}
                tileContent={({ date }) => getTileContent(date)}
            />

            {/* Modal for adding event or reminder */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default CustomCalendar;


// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { useDispatch, useSelector } from 'react-redux';
// import { addEvent } from '@/redux/store/slice';
// import 'react-calendar/dist/Calendar.css';

// const CustomCalendar = () => {
//     const dispatch = useDispatch();
//     const events = useSelector((state: any) => state.data.events);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     const handleDateClick = (date: Date) => {
//         setSelectedDate(date);
//         const option = window.prompt('Enter "event" for Event or "reminder" for Reminder');

//         if (option === 'event' || option === 'reminder') {
//             const content = window.prompt('Enter the content:');
//             if (content) {
//                 const formattedDate = date.toISOString().split('T')[0];
//                 dispatch(addEvent({
//                     date: formattedDate,
//                     event: { type: option, content }
//                 }));
//             }
//         }
//     };

//     const getTileContent = (date: Date) => {
//         const formattedDate = date.toISOString().split('T')[0];
//         if (events[formattedDate]) {
//             return (
//                 <ul>
//                     {events[formattedDate].map((event: any, idx: number) => (
//                         <li
//                             key={idx}
//                             className={`text-${event.type === 'event' ? 'green' : 'blue'}-500`}
//                         >
//                             {event.content}
//                         </li>
//                     ))}
//                 </ul>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Calendar</h2>
//             <Calendar
//                 onClickDay={handleDateClick}
//                 tileContent={({ date }) => getTileContent(date)}
//             />
//         </div>
//     );
// };

// export default CustomCalendar;