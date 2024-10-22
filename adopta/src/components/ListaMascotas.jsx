import React from 'react';

const ListaMascotas = ({ pets, selectPet }) => {
    return (
        <div>
            <h3>Lista de Mascotas Disponibles</h3>
            <ul className='pets-grid'>
                {pets.map(pet => (
                    <li key={pet.id} className='petCard'>
                        <img src={pet.imagen} alt={pet.nombre} className='petImage' />
                        <h4>{pet.nombre}</h4>
                        <p>Sexo: {pet.genero}</p>
                        <button onClick={() => selectPet(pet)}>Seleccionar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaMascotas;