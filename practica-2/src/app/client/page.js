"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import FormClient from '../../components/FormClient';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // Obtener lista de clientes desde el backend
            axios.get('https://bildy-rpmaya.koyeb.app/api/client', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setClients(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener clientes:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    }, []);

    const handleClientClick = (clientId) => {
        router.push(`/client/${clientId}`);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-8">
                    <h2 className="text-3xl font-bold mb-4">Clientes</h2>
                    <FormClient />
                    <ul className="mt-8 space-y-4">
                        {clients.map((client, index) => (
                            <li key={client.id || index} className="text-lg text-primary hover:underline cursor-pointer" onClick={() => handleClientClick(client.id)}>
                                {client.name}
                            </li>
                        ))}
                    </ul>
                </main>
                <Footer />
            </div>
        </div>
    );
}