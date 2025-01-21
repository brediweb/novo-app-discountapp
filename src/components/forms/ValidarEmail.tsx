import React from 'react';

const ValidarEmail = ({ email }: any) => {
  const validarEmail = (email: any) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return validarEmail(email);
};

export default ValidarEmail;
