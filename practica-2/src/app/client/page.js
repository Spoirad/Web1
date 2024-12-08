"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import FormClient from '../../components/FormClient';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editingClient, setEditingClient] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
        const token = localStorage.getItem('jwt');
        if (token) {
            // Obtener detalles del cliente seleccionado
            axios.get(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setSelectedClient(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener detalles del cliente:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    const handleDeleteClient = (clientId) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // Eliminar el cliente
            axios.delete(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    alert('Cliente eliminado con éxito');
                    // Actualizar la lista de clientes
                    setClients(prevClients => prevClients.filter(client => client._id !== clientId));
                    // Limpiar cliente seleccionado si es el que se eliminó
                    if (selectedClient && selectedClient._id === clientId) {
                        setSelectedClient(null);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        switch (error.response.status) {
                            case 403:
                                alert('No se puede eliminar el cliente porque tiene albaranes firmados.');
                                break;
                            case 422:
                                alert('Error de validación. Por favor, verifique los datos y vuelva a intentarlo.');
                                break;
                            case 401:
                                alert('No autorizado. El token de autenticación es inválido o falta.');
                                break;
                            default:
                                alert('Error al eliminar cliente. Inténtelo de nuevo más tarde.');
                                break;
                        }
                    } else {
                        console.error('Error al eliminar cliente:', error);
                    }
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
    };

    const handleUpdateClient = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (token && editingClient) {
            axios.put(`https://bildy-rpmaya.koyeb.app/api/client/${editingClient._id}`, editingClient, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    alert('Cliente actualizado con éxito');
                    setClients(prevClients => prevClients.map(client => client._id === editingClient._id ? editingClient : client));
                    setEditingClient(null);
                })
                .catch(error => {
                    console.error('Error al actualizar cliente:', error);
                });
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-8">
                    <h2 className="text-3xl font-bold mb-4">Clientes</h2>
                    {clients.length === 0 ? (
                        <div>
                            <p className="text-lg">No hay clientes disponibles. Crea tu primer cliente a continuación:</p>
                            <button onClick={toggleForm} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4">Crear Cliente</button>
                            {showForm && <FormClient setClients={setClients} />}
                        </div>
                    ) : (
                        <>
                            <button onClick={toggleForm} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4">{showForm ? 'Ocultar Formulario' : 'Crear Cliente'}</button>
                            {showForm && <FormClient setClients={setClients} />}
                            <ul className="mt-8 space-y-4">
                                {clients.map((client, index) => (
                                    <li key={client._id || index} className="text-lg text-primary hover:underline cursor-pointer flex justify-between bg-white p-4 rounded-lg shadow-md">
                                        <span onClick={() => handleClientClick(client._id)}>{client.name}</span>
                                        <div>
                                            <button className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-700 mr-2" onClick={() => handleEditClient(client)}>Editar</button>
                                            <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700" onClick={() => handleDeleteClient(client._id)}>Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedClient && (
                        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-2xl font-bold mb-4">Detalles del Cliente</h3>
                            <p className="text-lg"><strong>ID:</strong> {selectedClient._id}</p>
                            <p className="text-lg"><strong>Nombre:</strong> {selectedClient.name}</p>
                            <p className="text-lg"><strong>Domicilio:</strong> {selectedClient.address ? `${selectedClient.address.street}, ${selectedClient.address.number}, ${selectedClient.address.postal}, ${selectedClient.address.city}, ${selectedClient.address.province}` : 'No disponible'}</p>
                            <p className="text-lg"><strong>CIF:</strong> {selectedClient.cif || 'No proporcionado'}</p>
                            {selectedClient.logo && <img src={selectedClient.logo} alt="Logo del Cliente" className="mt-4 w-32 h-32 object-cover" />}
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 mt-4" onClick={() => setSelectedClient(null)}>Ocultar Detalles</button>
                        </div>
                    )}
                    {editingClient && (
                        <form onSubmit={handleUpdateClient} className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-2xl font-bold mb-4">Editar Cliente</h3>
                            <label className="block mb-2 font-semibold">Nombre del Cliente:</label>
                            <input
                                type="text"
                                value={editingClient.name}
                                onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                                className="w-full p-2 border rounded-md mb-4"
                                required
                            />
                            <label className="block mb-2 font-semibold">CIF:</label>
                            <input
                                type="text"
                                value={editingClient.cif}
                                onChange={(e) => setEditingClient({ ...editingClient, cif: e.target.value })}
                                className="w-full p-2 border rounded-md mb-4"
                            />
                             <label className="block mb-2 font-semibold">Direccion:</label>
                            <input
                                type="text"
                                value={editingClient.address?.street || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, address: { ...editingClient.address, street: e.target.value } })}
                                placeholder="Calle"
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />
                            <input
                                type="number"
                                value={editingClient.address?.number || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, address: { ...editingClient.address, number: e.target.value } })}
                                placeholder="Número"
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />
                            <input
                                type="number"
                                value={editingClient.address?.postal || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, address: { ...editingClient.address, postal: e.target.value} })}
                                placeholder="Codigo Postal"
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />
                            <input
                                type="text"
                                value={editingClient.address?.city || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, address: { ...editingClient.address, city: e.target.value} })}
                                placeholder="Cuidad"
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />
                            <input
                                type="text"
                                value={editingClient.address?.province || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, address: { ...editingClient.province, province: e.target.value} })}
                                placeholder="Provincia"
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Guardar Cambios</button>
                        </form>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}
