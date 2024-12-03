"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a la aplicación de Digitalización de Albaranes</h2>
          <p className="text-lg">Utilice el menú para gestionar clientes, proyectos y albaranes.</p>
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Explicación del funcionamiento de la API
// La aplicación utiliza una API REST que se encuentra en https://bildy-rpmaya.koyeb.app.
// La API tiene los siguientes endpoints principales:

// 1. /api/client
//    - Método GET: Obtiene una lista de todos los clientes.
//    - Método POST: Crea un nuevo cliente. Debe enviarse un objeto JSON con los datos del cliente (por ejemplo, el nombre).

// 2. /api/client/{clientId}
//    - Método GET: Obtiene los detalles de un cliente específico, utilizando el ID del cliente como parámetro.

// 3. /api/project
//    - Método GET: Obtiene una lista de todos los proyectos.
//    - Método POST: Crea un nuevo proyecto. Debe enviarse un objeto JSON con los datos del proyecto (por ejemplo, el nombre y el ID del cliente asociado).

// 4. /api/project/{projectId}
//    - Método GET: Obtiene los detalles de un proyecto específico, utilizando el ID del proyecto como parámetro.

// 5. /api/deliverynote
//    - Método GET: Obtiene una lista de todos los albaranes.
//    - Método POST: Crea un nuevo albarán. Debe enviarse un objeto JSON con los datos del albarán.

// 6. /api/deliverynote/{noteId}
//    - Método GET: Obtiene los detalles de un albarán específico, utilizando el ID del albarán como parámetro.

// 7. /api/deliverynote/pdf/{noteId}
//    - Método GET: Descarga un albarán en formato PDF, utilizando el ID del albarán como parámetro.

// La API utiliza tokens de autenticación JWT que se obtienen durante el registro o el inicio de sesión del usuario.
// Estos tokens se deben enviar en las cabeceras de las solicitudes como 'Authorization: Bearer {token}' para acceder a los recursos protegidos.
