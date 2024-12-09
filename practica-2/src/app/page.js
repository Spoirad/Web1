'use client'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function Home() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    totalDeliveryNotes: 0,
    recentUpdates: []
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No se encontró el token. Por favor, inicie sesión.');
      return;
    }

    const fetchStats = async () => {
      try {
        const [clientsResponse, projectsResponse, deliveryNotesResponse] = await Promise.all([
          axios.get('https://bildy-rpmaya.koyeb.app/api/client', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://bildy-rpmaya.koyeb.app/api/project', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setStats({
          totalClients: clientsResponse.data.length,
          totalProjects: projectsResponse.data.length,
          totalDeliveryNotes: deliveryNotesResponse.data.length,
          recentUpdates: [
            { message: `Último cliente agregado: ${clientsResponse.data[0]?.name || 'N/A'}`, date: clientsResponse.data[0]?.createdAt || 'N/A' },
            { message: `Último proyecto agregado: ${projectsResponse.data[0]?.name || 'N/A'}`, date: projectsResponse.data[0]?.createdAt || 'N/A' },
            { message: `Último albarán registrado: ${deliveryNotesResponse.data[0]?._id || 'N/A'}`, date: deliveryNotesResponse.data[0]?.createdAt || 'N/A' }
          ]
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar className="bg-gray-800 text-white w-64 hidden md:block" />
      <div className="flex-1 flex flex-col">
        <Navbar className="bg-blue-600 text-white p-4 shadow-md" />
        <main className="p-8 flex-grow bg-gray-50">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">Bienvenido a la aplicación de Digitalización de Albaranes</h2>
          <p className="text-lg text-gray-700">Utilice el menú lateral para gestionar clientes, proyectos y albaranes de manera eficiente.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gestión de Clientes</h3>
              <p className="text-gray-600">Cree, edite y administre su cartera de clientes.</p>
              <p className="text-sm text-gray-500 mt-2">Total clientes registrados: <span className="font-bold">{stats.totalClients}</span></p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gestión de Proyectos</h3>
              <p className="text-gray-600">Administre proyectos relacionados con sus clientes.</p>
              <p className="text-sm text-gray-500 mt-2">Proyectos activos: <span className="font-bold">{stats.totalProjects}</span></p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Digitalización de Albaranes</h3>
              <p className="text-gray-600">Digitalice y controle los albaranes de forma eficiente.</p>
              <p className="text-sm text-gray-500 mt-2">Albaranes procesados: <span className="font-bold">{stats.totalDeliveryNotes}</span></p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Estadísticas Generales</h3>
              <ul className="text-gray-600 list-disc list-inside">
                <li>Total clientes: <span className="font-bold">{stats.totalClients}</span></li>
                <li>Total proyectos: <span className="font-bold">{stats.totalProjects}</span></li>
                <li>Albaranes registrados: <span className="font-bold">{stats.totalDeliveryNotes}</span></li>
              </ul>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Últimas Actualizaciones</h3>
              <ul className="text-gray-600 list-disc list-inside">
                {stats.recentUpdates.map((update, index) => (
                  <li key={index}>{update.message} - <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <Footer className="bg-gray-800 text-white p-4 text-center" />
      </div>
    </div>
  );
}
