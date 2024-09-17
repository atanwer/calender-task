import React from 'react';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';

const TablePage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <h1 className="text-xl font-bold">Table with CRUD</h1>
                <Table />
            </div>
        </div>
    );
};

export default TablePage;
