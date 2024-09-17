"use client"

import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@/redux/store/slice';
import { FaSearch, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface User {
    id: number;
    name: string;
}

interface RootState {
    data: {
        users: User[];
    };
}

const Table: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.data.users);
    const [formData, setFormData] = useState<User>({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);
    const [editingId, setEditingId] = useState<number | null>(null);

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAdd = () => {
        if (formData.name.trim()) {
            dispatch(setData([...data, { ...formData, id: Date.now() }]));
            setFormData({ id: 0, name: '' });
        }
    };

    const handleDelete = (id: number) => {
        dispatch(setData(data.filter((item) => item.id !== id)));
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setFormData({ ...itemToEdit });
        }
    };

    const handleUpdate = () => {
        dispatch(setData(data.map((item) => item.id === editingId ? formData : item)));
        setEditingId(null);
        setFormData({ id: 0, name: '' });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-grow mr-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {editingId !== null ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        Update
                    </button>
                ) : (
                    <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Add
                    </button>
                )}
            </div>

            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(item.id)} className="mr-2 text-blue-500 hover:text-blue-700">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 px-3 py-1 border rounded disabled:opacity-50"
                    >
                        <FaChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                        className="ml-2 px-3 py-1 border rounded disabled:opacity-50"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;