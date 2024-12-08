import { useState } from 'react';
import axios from 'axios';

const FormClient = ({ setClients }) => {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [postal, setPostal] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [cif, setCif] = useState('');
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos obligatorios estén completos
        if (!name.trim() || !street.trim() || !number || !postal || !city.trim() || !province.trim()) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const token = localStorage.getItem('jwt');
        if (token) {
            setLoading(true); // Activar estado de carga
            const address = {
                street: street.trim(),
                number: parseInt(number, 10),
                postal: parseInt(postal, 10),
                city: city.trim(),
                province: province.trim(),
            };

            const requestBody = {
                name: name.trim(),
                cif: cif.trim() || undefined, // Eliminar campo si está vacío
                address,
            };

            axios.post('https://bildy-rpmaya.koyeb.app/api/client', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    alert('Cliente creado con éxito');
                    setClients((prevClients) => [...prevClients, response.data]); // Actualizar lista de clientes
                    // Resetear el formulario
                    setName('');
                    setStreet('');
                    setNumber('');
                    setPostal('');
                    setCity('');
                    setProvince('');
                    setCif('');
                })
                .catch((error) => {
                    console.error('Error al crear cliente:', error);
                    if (error.response) {
                        switch (error.response.status) {
                            case 422:
                                alert('Error de validación. Verifique los datos enviados.');
                                break;
                            case 401:
                                alert('No autorizado. Por favor, inicie sesión de nuevo.');
                                break;
                            default:
                                alert('Error al crear cliente. Inténtelo más tarde.');
                                break;
                        }
                    } else {
                        alert('Error de red. Verifique su conexión.');
                    }
                })
                .finally(() => {
                    setLoading(false); // Desactivar estado de carga
                });
        } else {
            alert('No se encontró el token de sesión. Inicie sesión para continuar.');
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
                placeholder="Ingrese el nombre del cliente"
                required
            />
            <label className="block mb-2 font-semibold">Calle:</label>
            <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese la calle"
                required
            />
            <label className="block mb-2 font-semibold">Número:</label>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese el número"
                required
            />
            <label className="block mb-2 font-semibold">Código Postal:</label>
            <input
                type="number"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese el código postal"
                required
            />
            <label className="block mb-2 font-semibold">Ciudad:</label>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese la ciudad"
                required
            />
            <label className="block mb-2 font-semibold">Provincia:</label>
            <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese la provincia"
                required
            />
            <label className="block mb-2 font-semibold">CIF (opcional):</label>
            <input
                type="text"
                value={cif}
                onChange={(e) => setCif(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                placeholder="Ingrese el CIF"
            />
            <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Creando...' : 'Crear Cliente'}
            </button>
        </form>
    );
};

export default FormClient;
