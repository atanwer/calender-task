import React from 'react';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>Select a section from the sidebar to get started.</p>
      </div>
    </div>
  );
}
