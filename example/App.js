import React, {useState} from "react";
import {Text, TextInput} from "react-native";
import Svg from "react-native-svg";

import {usePaymentInputs, images} from "./lib";

export default function App() {
  const [cardNumber, setCardNumber] = useState("4444");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryProps,
    getCvcProps,
    meta,
  } = usePaymentInputs({images});
  return (
    <>
      <Svg
        style={{width: 50, height: 30}}
        {...getCardImageProps()}
      />
      <TextInput
        {...getCardNumberProps({
          onChangeText: setCardNumber,
          value: cardNumber,
        })}
      />
      <TextInput
        {...getExpiryProps({
          onChangeText: setExpiry,
          value: expiry,
        })}
      />
      <TextInput
        {...getCvcProps({
          onChangeText: setCvc,
          value: cvc,
        })}
      />
      <Text children={JSON.stringify(meta)} />
    </>
  );
}
