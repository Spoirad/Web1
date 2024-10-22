import React, { useState } from 'react';


const FiltrarMascota = ({ updateFilters }) => {
    const [tipo, setType] = useState('');
    const [genero, setGender] = useState('');

    const handleFilterChange = () => {
        updateFilters({ tipo, genero });
    };

    return (
        <div>
            <h3>Filtrar Mascotas</h3>
            <label>
                Tipo:
                <select value={tipo} onChange={e => setType(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Conejo">Conejo</option>
                </select>
            </label>
            <label>
                Sexo:
                <select value={genero} onChange={e => setGender(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
            </label>
            <button onClick={handleFilterChange}>Aplicar Filtros</button>
        </div>
    );



}


export default FiltrarMascota;