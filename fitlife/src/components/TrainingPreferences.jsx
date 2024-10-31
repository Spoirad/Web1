import React from 'react';
import { useFormContext } from 'react-hook-form';

const TrainingPreferences = () => {
  const { register } = useFormContext();

  return (
    <div className="section">
      <h2>Preferencias de Entrenamiento</h2>
      <select {...register('entrenamiento', { required: true })}>
        <option value="">Selecciona un tipo de entrenamiento</option>
        <option value="cardio">Cardio</option>
        <option value="musculacion">Musculación</option>
        <option value="yoga">Yoga</option>
      </select>
      <input
        type="text"
        placeholder="Objetivos"
        {...register('objetivos', { required: true })}
      />
    </div>
  );
};

export default TrainingPreferences;