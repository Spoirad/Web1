import React from 'react';
import { useFormContext } from 'react-hook-form';

const PaymentDetails = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="section">
      <h2>Datos de Pago</h2>
      
      <div>
        <input
          type="text"
          placeholder="Número de Tarjeta"
          {...register('tarjeta', { 
            required: 'Número de tarjeta es obligatorio', 
            minLength: { 
              value: 16, 
              message: 'El número de tarjeta debe tener al menos 16 dígitos' 
            },
            maxLength: { 
              value: 16, 
              message: 'El número de tarjeta no puede tener más de 16 dígitos' 
            }
          })}
        />
        {errors.tarjeta && <div className="error">{errors.tarjeta.message}</div>}
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Fecha de Expiración (MM/YY)"
          {...register('expiracion', { 
            required: 'La fecha de expiración es obligatoria',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // Regex para validar el formato MM/YY
              message: 'Formato de fecha inválido. Usa MM/YY.'
            }
          })}
        />
        {errors.expiracion && <div className="error">{errors.expiracion.message}</div>}
      </div>
      
      <div>
        <input
          type="text"
          placeholder="CVV"
          {...register('cvv', { 
            required: 'CVV es obligatorio', 
            minLength: { 
              value: 3, 
              message: 'El CVV debe tener al menos 3 dígitos' 
            },
            maxLength: { 
              value: 4, 
              message: 'El CVV no puede tener más de 4 dígitos' 
            }
          })}
        />
        {errors.cvv && <div className="error">{errors.cvv.message}</div>}
      </div>
      
    </div>
  );
};

export default PaymentDetails;