//components/FormProject.jsx
import { useState } from 'react';
import axios from 'axios';

const FormProject = ({ setProjects, editingProject, setEditingProject }) => {
    const [name, setName] = useState(editingProject ? editingProject.name : '');
    const [projectCode, setProjectCode] = useState(editingProject ? editingProject.projectCode : '');
    const [email, setEmail] = useState(editingProject ? editingProject.email : '');
    const [street, setStreet] = useState(editingProject ? editingProject.address?.street : '');
    const [number, setNumber] = useState(editingProject ? editingProject.address?.number : '');
    const [postal, setPostal] = useState(editingProject ? editingProject.address?.postal : '');
    const [city, setCity] = useState(editingProject ? editingProject.address?.city : '');
    const [province, setProvince] = useState(editingProject ? editingProject.address?.province : '');
    const [code, setCode] = useState(editingProject ? editingProject.code : '');
    const [clientId, setClientId] = useState(editingProject ? editingProject.clientId : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (token) {
            const requestBody = {
                name,
                projectCode,
                email,
                address: {
                    street,
                    number: parseInt(number, 10),
                    postal: parseInt(postal, 10),
                    city,
                    province
                },
                code,
                clientId
            };
            if (editingProject) {
                axios.put(`https://bildy-rpmaya.koyeb.app/api/project/${editingProject._id}`, requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        alert('Proyecto actualizado con éxito');
                        setProjects(prevProjects => prevProjects.map(project => project._id === editingProject._id ? response.data : project));
                        setEditingProject(null);
                    })
                    .catch(error => {
                        console.error('Error al actualizar proyecto:', error);
                    });
            } else {
                axios.post('https://bildy-rpmaya.koyeb.app/api/project', requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        alert('Proyecto creado con éxito');
                        setProjects(prevProjects => [...prevProjects, response.data]);
                    })
                    .catch(error => {
                        console.error('Error al crear proyecto:', error);
                    });
            }
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
                required
            />
            <label className="block mb-2 font-semibold">Código del Proyecto:</label>
            <input
                type="text"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Correo Electrónico:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Calle:</label>
            <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Número:</label>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Código Postal:</label>
            <input
                type="number"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Ciudad:</label>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Provincia:</label>
            <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">Código Interno del Proyecto:</label>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <label className="block mb-2 font-semibold">ID del Cliente:</label>
            <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-700"
                required
            />
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">{editingProject ? 'Guardar Cambios' : 'Crear Proyecto'}</button>
        </form>
    );
};

export default FormProject;
