import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-black p-6 shadow-md h-screen sticky top-0">
            <nav>
                <ul className="space-y-4">
                    <li><Link href="/" className="text-primary hover:underline">Inicio</Link></li>
                    <li><Link href="/client" className="text-primary hover:underline">Clientes</Link></li>
                    <li><Link href="/projects" className="text-primary hover:underline">Proyectos</Link></li>
                    <li><Link href="/deliverynotes" className="text-primary hover:underline">Albaranes</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;