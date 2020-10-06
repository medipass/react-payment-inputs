# react-native-payment-inputs

[**React Native**](https://reactnative.dev)'s spiritual successor to [`react-payment-inputs`](https://github.com/medipass/react-payment-inputs). But **only in spirit**; the invocation signatures are fairly different.

[`react-native-payment-inputs`](https://github.com/cawfree/react-native-payment-inputs) are a set of UI agnostic hooks to easily implement the functionality of formatting and validating debit and credit card input fields.

## 🚀 Installing

Using [**Yarn**](https://yarnpkg.com):

```bash
yarn add react-native-svg react-native-payment-inputs
```

## ✍️ Usage
The [`usePaymentInputs`](./src/hooks/usePaymentInputs.js) [**hook**](https://reactjs.org/docs/hooks-intro.html) is likely all you'll need to enable your app to start accepting card payments:

```javascript
import React, {useState} from "react";
import {TextInput} from "react-native";
import Svg from "react-native-svg";

import {usePaymentInputs} from "react-native-payment-inputs";

export default function App() {
  const [cardNumber, setCardNumber] = useState("4444");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryProps,
    getCvcProps,
    meta: {
      cardType,
      erroredInputs,
      touchedInputs,
    },
  } = usePaymentInputs();
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
          /* ...extras go here */
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
    </>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
