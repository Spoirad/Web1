import React, { useState, useEffect } from 'react';
import FiltrarMascota from './FiltrarMascota';
import ListaMascotas from './ListaMascotas';
import Formulario from './Formulario';

const PaginaAdopcion = () => {
    const [filters, setFilters] = useState({});
    const [pets, setPets] = useState([]); // Inicializa pets como un array vacío
    const [selectedPet, setSelectedPet] = useState(null);
    const [loading, setLoading] = useState(true);

      // useEffect para hacer la solicitud a la API al cargar el componente
      useEffect(() => {
        fetchPets();
      }, []);
    // Función para obtener los datos de la API
    const fetchPets = async () => {
      try {
        const response = await fetch('https://huachitos.cl/api/animales'); // Realiza la solicitud a la API
        const data = await response.json(); // Convierte la respuesta en JSON
        console.log('Datos de la API:', data); 
        setPets(data.data || []); // Asegúrate de que siempre sea un array
        setLoading(false); // Dejamos de cargar cuando recibimos la respuesta
      } catch (error) {
        console.error('Error al cargar las mascotas:', error);
        setLoading(false); // En caso de error también detenemos la carga
      }
    };
  
    const updateFilters = (newFilters) => {
      setFilters(newFilters);
      console.log(newFilters);
    };
  
    // Función para filtrar las mascotas según los filtros seleccionados
    const filterPets = () => {
      if (!pets || pets.length === 0) return []; // Verifica si pets no está vacío antes de filtrar
      return pets.filter(pet => {
        return (
          (filters.tipo ? pet.tipo === filters.tipo : true) &&
          (filters.genero ? pet.genero === filters.genero : true)
        );
      });
    };
  
    const submitApplication = (formData) => {
      console.log('Solicitud enviada:', formData);
    };

  if (loading) {
      return <div>Cargando mascotas...</div>; // Mostrar un mensaje de carga mientras esperamos la respuesta de la API
    }

    return (
      <div>
        <h2>Adopta una Mascota</h2>
        <FiltrarMascota updateFilters={updateFilters} />
        <ListaMascotas pets={filterPets()} selectPet={setSelectedPet} />
        <Formulario selectedPet={selectedPet} submitApplication={submitApplication} />
      </div>
    );
  };
  
  export default PaginaAdopcion;