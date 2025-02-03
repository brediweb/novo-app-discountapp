import React, { useState, useCallback } from 'react';
import { TextInput } from 'react-native-paper';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// Definição das propriedades esperadas no componente
interface PropsInput {
  label: string;
  onChange?: (text: string) => void;
  mt?: number;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType: any;
  value?: string;
  maxLength?: number;
  refInput?: any;
  onSubmitEditing?: () => void;
  returnKeyType?: string;
  error?: boolean;
  uppercase?: 'none' | 'sentences' | 'words' | 'characters';
  onBlur?: () => void;
  onFocus?: () => void;
  edicao?: boolean;
  required?: boolean;
}

const InputOutlined: React.FC<PropsInput> = ({
  required,
  uppercase = 'none',
  label,
  onChange,
  mt,
  secureTextEntry,
  placeholder,
  keyboardType,
  value,
  maxLength,
  refInput,
  onSubmitEditing,
  returnKeyType = 'default',
  error,
  onBlur,
  onFocus,
  edicao = true,
}) => {
  const [visible, setVisible] = useState(false);

  // Função para alternar a visibilidade do texto no campo de senha
  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <View style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={`${label}${required ? '*' : ''}`}
        error={error}
        onBlur={onBlur}
        onFocus={onFocus}
        editable={edicao}
        mode="outlined"
        autoCapitalize={uppercase}
        ref={refInput}
        onChangeText={onChange} // Apenas use onChangeText
        maxLength={maxLength ?? 9999}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={secureTextEntry && !visible}
        onSubmitEditing={onSubmitEditing}
        style={{ color: '#49454F' }}
      />
      {/* Botão para alternar visibilidade de senha */}
      {secureTextEntry && (
        <TouchableOpacity
          onPress={toggleVisibility}
          style={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <Image
            source={
              visible
                ? require('../../../assets/img/icons/eye-not.png')
                : require('../../../assets/img/icons/eye.png')
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputOutlined;
