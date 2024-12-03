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
    };

    return (
        <nav className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Gestión de Albaranes</h1>
                <div className="space-x-4">
                    <Link href="/" className="hover:text-gray-300">Inicio</Link>
                    <Link href="/client" className="hover:text-gray-300">Clientes</Link>
                    <Link href="/projects" className="hover:text-gray-300">Proyectos</Link>
                    <Link href="/deliverynotes" className="hover:text-gray-300">Albaranes</Link>
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
