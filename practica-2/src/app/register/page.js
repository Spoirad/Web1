"use client";
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationStage, setIsVerificationStage] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://bildy-rpmaya.koyeb.app/api/user/register', { email, password })
            .then(response => {
                const token = response.data.token;
                // Guardar el token en localStorage
                localStorage.setItem('jwt', token);
                alert('Registro exitoso. Revisa tu correo para el código de verificación.');
                setIsVerificationStage(true);
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
            });
    };

    const handleVerification = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (token) {
            axios.put('https://bildy-rpmaya.koyeb.app/api/user/validation', { code: verificationCode }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    alert('Correo verificado exitosamente. Ahora puedes iniciar sesión.');
                    router.push('/login');
                })
                .catch(error => {
                    console.error('Error al verificar el correo:', error);
                    alert('Error al verificar el correo. Verifica el código e inténtalo nuevamente.');
                });
        } else {
            alert('No se encontró el token de sesión. Por favor, regístrate de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Registrar</h2>
                {!isVerificationStage ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Correo Electrónico:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Contraseña:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700"
                        >
                            Registrar
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerification} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Código de Verificación:</label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700"
                        >
                            Verificar Correo
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}