// Checkbox.js
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const CheckBox = ({ onCheckboxPress }: any) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckboxPress(newChecked);
  };

  return (
    <TouchableOpacity onPress={handleCheckboxPress}>
      <View
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: '#000',
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: checked ? '#000' : 'transparent',
        }}
      >
        {checked && (
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
