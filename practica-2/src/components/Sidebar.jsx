import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <div
                onClick={toggleSidebar}
                className={`fixed top-4 ${isSidebarOpen ? 'left-64' : 'left-4'} z-50 text-white cursor-pointer text-xl p-2 rounded-full shadow-md ${isSidebarOpen ? 'hover:bg-red-600' : 'hover:bg-blue-600'} bg-gray-800 border border-white transition-all duration-300 flex items-center justify-center`}
            >
                <span>{isSidebarOpen ? '✖' : '☰'}</span>
            </div>
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white min-h-screen ${isSidebarOpen ? 'p-4' : 'p-0'} overflow-hidden`}>
                {isSidebarOpen && (
                    <div className="relative">
                        <Link href="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Inicio</Link>
                        <Link href="/client" className="block py-2 px-4 hover:bg-gray-700 rounded">Clientes</Link>
                        <Link href="/projects" className="block py-2 px-4 hover:bg-gray-700 rounded">Proyectos</Link>
                        <Link href="/deliverynotes" className="block py-2 px-4 hover:bg-gray-700 rounded">Albaranes</Link>
                    </div>
                )}
            </div>
            <div className="flex-1 p-8">
            </div>
        </div>
    );
};

export default Sidebar;