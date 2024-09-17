import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (type: 'event' | 'reminder', content: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [type, setType] = useState<'event' | 'reminder'>('event');
    const [content, setContent] = useState('');

    const handleSave = () => {
        onSave(type, content);
        setContent('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add Event/Reminder</h2>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'event' | 'reminder')}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="event">Event</option>
                    <option value="reminder">Reminder</option>
                </select>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter details"
                    className="w-full p-2 mb-4 border rounded"
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;