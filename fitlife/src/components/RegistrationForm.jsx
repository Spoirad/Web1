import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import TrainingPreferences from './TrainingPreferences';
import PaymentDetails from './PaymentDetails';

const RegistrationForm = () => {
  const methods = useForm();
  const [step, setStep] = useState(0);

  const nextStep = async () => {
    const result = await methods.trigger(); // Valida el formulario actual
    if (result) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes enviar la información al servidor
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <PersonalInfo />}
        {step === 1 && <ContactInfo />}
        {step === 2 && <TrainingPreferences />}
        {step === 3 && <PaymentDetails />}

        <div className="buttons">
          {step > 0 && (
            <button type="button" onClick={prevStep}>
              Anterior
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep}>
              Siguiente
            </button>
          ) : (
            <button type="submit">Enviar</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;