import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container, InputText, Error } from "./styles";

interface InputProps extends TextInputProps {
  value?: string;
}

export const InputForm: React.FC<InputProps> = ({ value, ...rest }) => {
  //const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    return setIsFocused(true);
  }

  function handleInputBlur() {
    return setIsFocused(false);
    // setIsFilled(!!value);
  }

  return (
    <Container>
      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        {...rest}
      />
    </Container>
  );
};
