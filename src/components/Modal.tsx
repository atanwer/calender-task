import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (type: string, content: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [selectedType, setSelectedType] = useState<'event' | 'reminder'>('event');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (content.trim()) {
            onSave(selectedType, content);
            setContent('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Event or Reminder</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Select Type</label>
                    <select
                        className="block w-full border border-gray-300 rounded-md p-2"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as 'event' | 'reminder')}
                    >
                        <option value="event">Event</option>
                        <option value="reminder">Reminder</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Content</label>
                    <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter event or reminder details"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
