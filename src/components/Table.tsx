"use client"

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@/redux/store/slice';

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.data.data);
    const [formData, setFormData] = useState({ id: '', name: '' });

    const handleAdd = () => {
        dispatch(setData([...data, { ...formData, id: data.length + 1 }]));
        setFormData({ id: '', name: '' });
    };

    const handleDelete = (id: number) => {
        dispatch(setData(data.filter((item: any) => item.id !== id)));
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border"
            />
            <button onClick={handleAdd} className="ml-2 bg-blue-500 text-white px-4">
                Add
            </button>

            <table className="min-w-full mt-4 border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
