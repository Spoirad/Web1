"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import FormProject from '../../components/FormProject';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [tokenAvailable, setTokenAvailable] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setTokenAvailable(true);
            // Obtener lista de proyectos desde el backend
            axios.get('https://bildy-rpmaya.koyeb.app/api/project', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Proyectos obtenidos:', response.data);
                    setProjects(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener proyectos:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    }, []);

    const handleProjectClick = (clientId, projectId) => {
        if (selectedProject && selectedProject._id === projectId) {
            setSelectedProject(null);
            return;
        }
        const token = localStorage.getItem('jwt');
        if (token) {
            // Obtener detalles del proyecto seleccionado
            axios.get(`https://bildy-rpmaya.koyeb.app/api/project/${clientId}/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Detalles del proyecto recibido:', response.data);
                    setSelectedProject(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener detalles del proyecto:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    const handleDeleteProject = (projectId) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // Eliminar el proyecto
            axios.delete(`https://bildy-rpmaya.koyeb.app/api/project/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    alert('Proyecto eliminado con éxito');
                    // Actualizar la lista de proyectos
                    setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
                    // Limpiar proyecto seleccionado si es el que se eliminó
                    if (selectedProject && selectedProject._id === projectId) {
                        setSelectedProject(null);
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar proyecto:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    if (!tokenAvailable) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="p-8 flex-1">
                        <h2 className="text-3xl font-bold mb-4">Proyectos</h2>
                        <p>No se encontró el token de sesión. Por favor, inicie sesión para continuar.</p>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar className="hidden lg:block" />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 flex-grow">
                    <h2 className="text-3xl font-bold mb-4">Proyectos</h2>
                    <button onClick={toggleForm} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4">{showForm ? 'Ocultar Formulario' : 'Crear Proyecto'}</button>
                    {showForm && <FormProject setProjects={setProjects} editingProject={editingProject} setEditingProject={setEditingProject} />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {projects.map((project, index) => (
                            <div key={project._id || index} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-2">{project.name || 'Sin nombre'}</h3>
                                <p className="text-sm text-gray-600">ID proyecto: {project._id || 'N/A'}</p>
                                <div className="mt-4">
                                    <button className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-700 mr-2" onClick={() => handleEditProject(project)}>Editar</button>
                                    <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700" onClick={() => handleDeleteProject(project._id)}>Eliminar</button>
                                    <button className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-700 ml-2" onClick={() => handleProjectClick(project.clientId, project._id)}>{selectedProject && selectedProject._id === project._id ? 'Ocultar' : 'Mostrar'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedProject && (
                        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-2xl font-bold mb-4">Detalles del Proyecto</h3>
                            {Object.keys(selectedProject).length > 0 ? (
                                <>
                                    <p className="text-lg"><strong>ID:</strong> {selectedProject._id}</p>
                                    <p className="text-lg"><strong>Nombre:</strong> {selectedProject.name || 'Sin nombre'}</p>
                                    <p className="text-lg"><strong>Código del Proyecto:</strong> {selectedProject.projectCode || 'Sin código'}</p>
                                    <p className="text-lg"><strong>Correo Electrónico:</strong> {selectedProject.email || 'No disponible'}</p>
                                    <p className="text-lg"><strong>Domicilio:</strong> {selectedProject.address ? `${selectedProject.address.street || ''}, ${selectedProject.address.number || ''}, ${selectedProject.address.postal || ''}, ${selectedProject.address.city || ''}, ${selectedProject.address.province || ''}` : 'No disponible'}</p>
                                    <p className="text-lg"><strong>Código Interno:</strong> {selectedProject.code || 'No disponible'}</p>
                                    <p className="text-lg"><strong>Notas:</strong> {selectedProject.notes || 'Sin notas'}</p>
                                    <p className="text-lg"><strong>Inicio:</strong> {selectedProject.begin || 'No definido'}</p>
                                    <p className="text-lg"><strong>Fin:</strong> {selectedProject.end || 'No definido'}</p>
                                </>
                            ) : (
                                <p className="text-lg">Cargando detalles...</p>
                            )}
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 mt-4" onClick={() => setSelectedProject(null)}>Ocultar Detalles</button>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}
