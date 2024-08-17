import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '80%',
  },
});

export default Input;