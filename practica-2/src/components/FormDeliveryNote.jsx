import { useState, useEffect } from 'react';
import axios from 'axios';

const FormDeliveryNote = ({ setDeliveryNotes, setFormVisible, editingNote, setEditingNote, clients = [], projects = [] }) => {
    const [clientId, setClientId] = useState(editingNote ? editingNote.clientId : '');
    const [projectId, setProjectId] = useState(editingNote ? editingNote.projectId : '');
    const [format, setFormat] = useState(editingNote ? editingNote.format : 'material');
    const [material, setMaterial] = useState(editingNote ? editingNote.material : '');
    const [hours, setHours] = useState(editingNote ? editingNote.hours : 0);
    const [description, setDescription] = useState(editingNote ? editingNote.description : '');
    const [workdate, setWorkdate] = useState(editingNote ? editingNote.workdate : '');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');

        if (token) {
            const apiUrl = editingNote
                ? `https://bildy-rpmaya.koyeb.app/api/deliverynote/${editingNote._id}`
                : 'https://bildy-rpmaya.koyeb.app/api/deliverynote';
            const method = editingNote ? 'put' : 'post';

            const deliveryNoteData = {
                clientId,
                projectId,
                format,
                material,
                hours,
                description,
                workdate,
            };

            axios[method](apiUrl, deliveryNoteData, {
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
                    resetForm();
                })
                .catch((error) => {
                    console.error('Error submitting delivery note:', error);
                });
        } else {
            console.error('Token not found. Please log in.');
        }
    };

    const resetForm = () => {
        setClientId('');
        setProjectId('');
        setFormat('material');
        setMaterial('');
        setHours(0);
        setDescription('');
        setWorkdate('');
    };

    return (
        <form onSubmit={handleFormSubmit} className="p-4 border border-gray-900 rounded-lg shadow-sm bg-white">
            <label className="block mb-2 font-semibold">Cliente:</label>
            <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            >
                <option value="">Seleccione un cliente</option>
                {Array.isArray(clients) && clients.map((client) => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                ))}
            </select>

            <label className="block mb-2 font-semibold">Proyecto:</label>
            <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            >
                <option value="">Seleccione un proyecto</option>
                {Array.isArray(projects) && projects.map((project) => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                ))}
            </select>

            <label className="block mb-2 font-semibold">Formato:</label>
            <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            >
                <option value="material">Material</option>
                <option value="hours">Horas</option>
            </select>

            <label className="block mb-2 font-semibold">Material:</label>
            <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            />

            <label className="block mb-2 font-semibold">Horas:</label>
            <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            />

            <label className="block mb-2 font-semibold">Descripción:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            ></textarea>

            <label className="block mb-2 font-semibold">Fecha de trabajo:</label>
            <input
                type="date"
                value={workdate}
                onChange={(e) => setWorkdate(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-200"
            />

            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">
                {editingNote ? 'Actualizar Albarán' : 'Crear Albarán'}
            </button>
        </form>
    );
};

export default FormDeliveryNote;
