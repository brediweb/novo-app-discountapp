import React from 'react';

const ValidarCNPJ = ({ cnpj }: any) => {
  const validarCNPJ = (cnpj: any) => {
    // Remover caracteres não numéricos do CNPJ
    const cnpjNumerico = cnpj.replace(/[^\d]+/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpjNumerico.length !== 14) {
      return false;
    }

    // Validar o formato do CNPJ usando a expressão regular
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj);
  };

  return validarCNPJ(cnpj);
};

export default ValidarCNPJ;
