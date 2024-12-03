import { useState } from 'react';
import axios from 'axios';

const FormClient = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (token) {
            axios.post('https://bildy-rpmaya.koyeb.app/api/client', { name }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    alert('Cliente creado con éxito');
                    // Aquí podríamos actualizar la lista de clientes o resetear el formulario
                    setName('');
                })
                .catch(error => {
                    console.error('Error al crear cliente:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-900 rounded-lg shadow-sm">
            <label className="block mb-2 font-semibold">Nombre del Cliente:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">Crear Cliente</button>
        </form>
    );
};

export default FormClient;
