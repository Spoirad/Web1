import React from 'react';

const ListaMascotas = ({ pets, selectPet }) => {
    return (
        <div>
            <h3>Lista de Mascotas Disponibles</h3>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id} className='petCard'>
                        <img src={pet.photo} alt={pet.name} className='petImage' />
                        <h4>{pet.name}</h4>
                        <p>Edad: {pet.age}</p>
                        <p>Sexo: {pet.gender}</p>
                        <button onClick={() => selectPet(pet)}>Seleccionar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaMascotas;