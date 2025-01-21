import React from 'react';

const RemoveCaracteres = ({ text }: { text: string }) => {
  const removerCaracteres = (input: string) => {
    // Remove traços, pontos, espaços em branco, parênteses, barra e caracteres especiais usando regex
    return input.replace(/[-. ()\[\]{}*&^%$#@!/]/g, '');
  }

  return removerCaracteres(text)
};

export default RemoveCaracteres;
