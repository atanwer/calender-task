"use client"

import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, deleteUser } from '@/redux/store/slice';
import { FaSearch, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useDebounce from '@/hooks/useDebounce';
import { RootState } from '@/redux/store';
import { User } from '@/app/types';


const Table: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.data.users);
    const [userData, setUserData] = useState<User>({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(5);
    const [userId, setUserId] = useState<number | null>(null);
    const debounceSearch = useDebounce(searchTerm);

    const filteredUsers = useMemo(() => {
        return users.filter((user: User) =>
            user.name.toLowerCase().includes(debounceSearch.toLowerCase())
        );
    }, [users, debounceSearch]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAdd = () => {
        if (userData.name.trim()) {
            dispatch(addUser({ ...userData, id: Date.now() }));
            setUserData({ id: 0, name: '' });
        }
    };

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (id: number) => {
        setUserId(id);
        const itemToEdit = users.find((user: User) => user.id === id);
        if (itemToEdit) {
            setUserData({ ...itemToEdit });
        }
    };

    const handleUpdate = () => {
        dispatch(editUser({ userId, userData }));
        setUserId(null);
        setUserData({ id: 0, name: '' });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={userData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, name: e.target.value })}
                    className="flex-grow mr-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {userId !== null ? (
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
                    {currentUsers.map((user: User) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(user.id)} className="mr-2 text-blue-500 hover:text-blue-700">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
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
                        disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
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