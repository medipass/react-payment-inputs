import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import Svg from "react-native-svg";
import { PaymentInputsWrapper, usePaymentInputs, images } from "./lib";
import styled, { css } from "styled-components";

const Container = styled(View)`
  width: 100%;
`;

function Component() {
  const [cardNumber, setCardNumber] = useState("4444");
  const [expiry, setExpiry] = useState();
  const [cvc, setCvc] = useState();
  const [zip, setZip] = useState();
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getZIPProps,
    getCardImageProps,
    wrapperProps,
  } = usePaymentInputs();
  return (
    <Container> 
      <PaymentInputsWrapper {...wrapperProps}>
        <Svg
          style={{
            width: 50,
            height: 35,
          }}
          viewBox="0 0 25 16"
          {...getCardImageProps({ images })}
        />
        <TextInput
          {...getCardNumberProps({
            value: cardNumber,
            onChangeText: setCardNumber,
          })}
        />
        <TextInput
          {...getExpiryDateProps({
            value: expiry,
            onChangeText: setExpiry,
          })}
        />
        <TextInput {...getCVCProps({ value: cvc, onChangeText: setCvc })} />
        <TextInput {...getZIPProps({ value: zip, onChangeText: setZip })} />
      </PaymentInputsWrapper>
    </Container>
  );
}

export default function App() {
  return (
    <SafeAreaView>
      <Component />
    </SafeAreaView>
  );
}
