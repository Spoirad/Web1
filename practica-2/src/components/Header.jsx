import Link from 'next/link';
// Uso esta librería pues es mas eficiente que <a> para añadir enlaces , el mode de uso es igual.

const Header = () => {
    return (
      <header className="bg-primary text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Albaranes</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-gray-300">Inicio</Link>
            <Link href="/client" className="hover:text-gray-300">Clientes</Link>
            <Link href="/projects" className="hover:text-gray-300">Proyectos</Link>
            <Link href="/deliverynotes" className="hover:text-gray-300">Albaranes</Link>
          </nav>
        </div>
      </header>
    );
  };

  export default Header;