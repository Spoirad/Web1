import React, { useState } from 'react';

const Formulario = ({ selectedPet, submitApplication }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        submitApplication({ name, address, reason, pet: selectedPet });
    };

    return (
        <div>
            <h3>Formulario de Adopción</h3>
            {selectedPet ? (
                <>
                    <p>Adoptando a: {selectedPet.nombre}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nombre Completo:
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Dirección:
                            <input value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <label>
                            ¿Por qué quieres adoptar esta mascota?
                            <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
                        </label>
                        <button type="submit">Enviar Solicitud</button>
                    </form>
                </>
            ) : (
                <p>Selecciona una mascota para continuar.</p>
            )}
        </div>
    );
};

export default Formulario;
