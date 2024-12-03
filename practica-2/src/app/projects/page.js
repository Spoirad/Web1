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

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // Obtener lista de proyectos desde el backend
            axios.get('https://bildy-rpmaya.koyeb.app/api/project', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setProjects(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener proyectos:', error);
                });
        } else {
            console.error('No se encontró el token de sesión. Inicie sesión para continuar.');
        }
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-8">
                    <h2 className="text-3xl font-bold mb-4">Proyectos</h2>
                    <FormProject />
                    <ul className="mt-8 space-y-4">
                        {projects.map(project => (
                            <li key={project.id} className="text-lg text-primary hover:underline">
                                <a href={`/projects/${project.id}`}>{project.name}</a>
                            </li>
                        ))}
                    </ul>
                </main>
                <Footer />
            </div>
        </div>
    );
}
