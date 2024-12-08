import Link from "next/link"
export default function NotFound() {
    return (
        <section>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <p className="text-xl mb-6">Lo sentimos, la página que buscas no existe.</p>
                <Link
                    href='/'
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    Volver al inicio
                </Link>
            </div>
        </section>
    )
}