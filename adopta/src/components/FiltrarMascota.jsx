import React, { useState } from 'react';


const FiltrarMascota = ({ updateFilters }) => {
    const [tipo, setType] = useState('');
    const [edad, setAge] = useState('');
    const [genero, setGender] = useState('');

    const handleFilterChange = () => {
        updateFilters({ tipo, edad, genero });
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
                </select>
            </label>
            <label>
                Edad:
                <select value={edad} onChange={e => setAge(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="joven">Joven</option>
                    <option value="adulto">Adulto</option>
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