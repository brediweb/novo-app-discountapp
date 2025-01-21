import React from 'react';

const ValidarCPF = ({ cpf }: any) => {
  const validarCPF = (cpf: any) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais (caso contrário, é inválido)
    const todosDigitosIguais = /^(\d)\1+$/;
    if (todosDigitosIguais.test(cpf)) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let primeiroDigito = resto === 10 || resto === 11 ? 0 : resto;

    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let segundoDigito = resto === 10 || resto === 11 ? 0 : resto;

    return segundoDigito === parseInt(cpf.charAt(10));
  };

  return validarCPF(cpf);
};

export default ValidarCPF;
