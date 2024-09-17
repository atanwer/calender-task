import React from 'react';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';

const TablePage: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-2">Users</h1>
                <Table />
            </div>
        </div>
    );
};

export default TablePage;