import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <nav className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Gestión de Albaranes</h1>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="hover:text-gray-300">Cerrar Sesión</button>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-gray-300">Iniciar Sesión</Link>
                            <Link href="/register" className="hover:text-gray-300">Registrar</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
