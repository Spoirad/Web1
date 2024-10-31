import React from 'react';
import { useFormContext } from 'react-hook-form';

const PersonalInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="section">
      <h2>Datos Personales</h2>
      <input
        type="text"
        placeholder="Nombre"
        {...register('nombre', { required: 'Este campo es obligatorio' })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      
      <input
        type="email"
        placeholder="Correo Electrónico"
        {...register('email', {
          required: 'Este campo es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Correo no válido'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        type="tel"
        placeholder="Teléfono"
        {...register('telefono', { required: 'Este campo es obligatorio' })}
      />
      {errors.telefono && <span>{errors.telefono.message}</span>}
    </div>
  );
};

export default PersonalInfo;