import React from 'react';
import { useFormContext } from 'react-hook-form';

const ContactInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-section">
      <h3>Información de Contacto</h3>
      <div>
        <label>Dirección</label>
        <input
          type="text"
          {...register('address', { required: 'La dirección es obligatoria' })}
        />
        {errors.address && <div className="error">{errors.address.message}</div>}
      </div>
      <div>
        <label>Ciudad</label>
        <input
          type="text"
          {...register('city', { required: 'La ciudad es obligatoria' })}
        />
        {errors.city && <div className="error">{errors.city.message}</div>}
      </div>
      <div>
        <label>Código Postal</label>
        <input
          type="text"
          {...register('postalCode', { required: 'El código postal es obligatorio' })}
        />
        {errors.postalCode && <div className="error">{errors.postalCode.message}</div>}
      </div>
    </div>
  );
};

export default ContactInfo;