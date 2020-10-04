import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Svg from "react-native-svg";
import { css } from "styled-components";
import { PaymentInputsWrapper, usePaymentInputs, images } from "./lib";

function Component() {
  const [cardNumber, setCardNumber] = useState();
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
    <View>
      <PaymentInputsWrapper {...wrapperProps}>
        <Svg {...getCardImageProps({ images })} />
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
    </View>
  );
}

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Component />
    </View>
  );
}
