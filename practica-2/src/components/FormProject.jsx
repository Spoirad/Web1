
import { useState } from 'react';
import axios from 'axios';

const FormProject = () => {
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (token) {
            axios.post('https://bildy-rpmaya.koyeb.app/api/project', { name, clientId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    alert('Proyecto creado con éxito');
                })
                .catch(error => {
                    console.error('Error al crear proyecto:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <label className="block mb-2 font-semibold">Nombre del Proyecto:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />
            <label className="block mb-2 font-semibold">ID del Cliente:</label>
            <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">Crear Proyecto</button>
        </form>
    );
};

export default FormProject;
