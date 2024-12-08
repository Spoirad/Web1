import { useState, useEffect } from 'react';
import axios from 'axios';

const FormDeliveryNote = ({ setDeliveryNotes, setFormVisible, editingNote, setEditingNote, clients = [], projects = [] }) => {
    console.log("Clients passed to FormDeliveryNote:", clients);
    const [deliveryNote, setDeliveryNote] = useState({
        clientId: '',
        projectId: '',
        format: 'material',
        material: '',
        hours: 0,
        description: '',
        workdate: '',
    });

    useEffect(() => {
        if (editingNote) {
            setDeliveryNote(editingNote);
        }
    }, [editingNote]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setDeliveryNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');

        if (token) {
            const apiUrl = editingNote
                ? `https://bildy-rpmaya.koyeb.app/api/deliverynote/${editingNote._id}`
                : 'https://bildy-rpmaya.koyeb.app/api/deliverynote';
            const method = editingNote ? 'put' : 'post';

            axios[method](apiUrl, deliveryNote, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (editingNote) {
                        setDeliveryNotes((prev) =>
                            prev.map((note) => (note._id === editingNote._id ? response.data : note))
                        );
                    } else {
                        setDeliveryNotes((prev) => [...prev, response.data]);
                    }
                    setFormVisible(false);
                    setEditingNote(null);
                    setDeliveryNote({
                        clientId: '',
                        projectId: '',
                        format: 'material',
                        material: '',
                        hours: 0,
                        description: '',
                        workdate: '',
                        
                    });
                })
                .catch((error) => {
                    console.error('Error submitting delivery note:', error);
                });
        } else {
            console.error('Token not found. Please log in.');
        }
    };
    return (
        <form onSubmit={handleFormSubmit} className="p-4 border border-gray-900 rounded-lg shadow-sm">
            <label className="block mb-2 font-semibold">Cliente:</label>
            <select
                name="clientId"
                value={deliveryNote.clientId}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            >
                <option value="">Seleccione un cliente</option>
                {Array.isArray(clients) && clients.map((client) => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                ))}
            </select>

            <label className="block mb-2 font-semibold">Proyecto:</label>
            <select
                name="projectId"
                value={deliveryNote.projectId}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            >
                <option value="">Seleccione un proyecto</option>
                {Array.isArray(projects) && projects.map((project) => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                ))}
            </select>

            <label className="block mb-2 font-semibold">Formato:</label>
            <select
                name="format"
                value={deliveryNote.format}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            >
                <option value="material">Material</option>
                <option value="hours">Horas</option>
            </select>

            <label className="block mb-2 font-semibold">Material:</label>
            <input
                type="text"
                name="material"
                value={deliveryNote.material}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />

            <label className="block mb-2 font-semibold">Horas:</label>
            <input
                type="number"
                name="hours"
                value={deliveryNote.hours}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />

            <label className="block mb-2 font-semibold">Descripción:</label>
            <textarea
                name="description"
                value={deliveryNote.description}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            ></textarea>

            <label className="block mb-2 font-semibold">Fecha de trabajo:</label>
            <input
                type="date"
                name="workdate"
                value={deliveryNote.workdate}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
            />

            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">
                {editingNote ? 'Actualizar Albarán' : 'Crear Albarán'}
            </button>
        </form>
    );
};

export default FormDeliveryNote;
