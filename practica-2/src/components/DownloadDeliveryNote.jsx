import axios from 'axios';
import { useState } from 'react';

const DownloadDeliveryNote = ({ deliveryNoteId }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            alert('No se encontró el token de sesión. Por favor, inicie sesión para continuar.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${deliveryNoteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'blob', // Importante para manejar archivos
            });

            // Crear una URL para el archivo descargado
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Crear un enlace para descargar
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `DeliveryNote-${deliveryNoteId}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Limpiar el DOM
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el albarán:', error);
            alert('Hubo un error al intentar descargar el albarán. Por favor, inténtelo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={handleDownload}
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Descargando...
                    </div>
                ) : (
                    'Descargar Albarán'
                )}
            </button>
        </div>
    );
};

export default DownloadDeliveryNote;