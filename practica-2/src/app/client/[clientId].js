//client/[clientId].js
// [clientId].js se utiliza en Next.js para definir rutas dinámicas.
// Los corchetes indican que esta página puede recibir un valor dinámico en la URL
// cuando el usuario navega a /client/123, Next.js renderizará la página [clientId].js y podrá acceder al valor 123

"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function ClientDetails() {
    const { clientId } = useParams();
    const router = useRouter();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            // Si no hay token, redirigir al usuario a la página de inicio
            router.push('/');
            return;
        }
        if (clientId) {
            // Obtener detalles del cliente desde el backend
            axios.get(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setClient(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener detalles del cliente:', error);
                });
        }
    }, [clientId, router]);

    if (!client) {
        return <p className="p-8">Cargando...</p>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-8">
                    <h2 className="text-3xl font-bold mb-4">Detalles del Cliente</h2>
                    <p className="text-lg"><strong>Nombre:</strong> {client.name}</p>
                    {/* Aquí puedes agregar más detalles del cliente si están disponibles */}
                </main>
                <Footer />
            </div>
        </div>
    );
}