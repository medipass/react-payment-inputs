import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { View, Text, TextInput } from "react-native";
import Svg from "react-native-svg";
import { css } from "styled-components";

import {
  PaymentInputsContainer,
  PaymentInputsWrapper,
  usePaymentInputs,
} from "../src";
import images from "../src/images";

storiesOf("usePaymentInputs", module)
  .add("basic (no styles)", () => {
    function Component() {
      const [cardNumber, setCardNumber] = useState();
      const [expiry, setExpiry] = useState();
      const [cvc, setCvc] = useState();
      const [zip, setZip] = useState();
      const {
        meta,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getZIPProps,
        getCardImageProps,
      } = usePaymentInputs();
      return (
        <View>
          <Svg {...getCardImageProps({ images })} />
          <TextInput
            {...getCardNumberProps({
              value: cardNumber,
              onChangeText: setCardNumber,
            })}
          />
          <TextInput
            {...getExpiryDateProps({ value: expiry, onChangeText: setExpiry })}
          />
          <TextInput {...getCVCProps({ value: cvc, onChangeText: setCvc })} />
          <TextInput {...getZIPProps({ value: zip, onChangeText: setZip })} />
          {meta.error && meta.isTouched && <Text>{meta.error}</Text>}
        </View>
      );
    }
    return <Component />;
  })
  .add("styled wrapper", () => {
    function Component() {
      const [cardNumber, setCardNumber] = useState();
      const [expiry, setExpiry] = useState();
      const [cvc, setCvc] = useState();
      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getCardImageProps,
        wrapperProps,
      } = usePaymentInputs();
      return (
        <PaymentInputsWrapper {...wrapperProps}>
          <Svg {...getCardImageProps({ images })} />
          <TextInput
            {...getCardNumberProps({
              value: cardNumber,
              onChangeText: setCardNumber,
            })}
          />
          <TextInput
            {...getExpiryDateProps({ value: expiry, onChangeText: setExpiry })}
          />
          <TextInput {...getCVCProps({ value: cvc, onChangeText: setCvc })} />
        </PaymentInputsWrapper>
      );
    }
    return <Component />;
  })
  .add("styled wrapper (with ZIP)", () => {
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

    return <Component />;
  })
  .add("styled wrapper (no CVC)", () => {
    function Component() {
      const [cardNumber, setCardNumber] = useState();
      const [expiry, setExpiry] = useState();

      const {
        getCardNumberProps,
        getExpiryDateProps,
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
          </PaymentInputsWrapper>
        </View>
      );
    }
    return <Component />;
  })
  .add("styled wrapper (with custom styling)", () => {
    function Component() {
      const [cardNumber, setCardNumber] = useState();
      const [expiry, setExpiry] = useState();
      const [cvc, setCvc] = useState();

      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getCardImageProps,
        wrapperProps,
      } = usePaymentInputs();
      return (
        <View>
          <PaymentInputsWrapper
            {...wrapperProps}
            styles={{
              fieldWrapper: {
                base: css`
                  margin-bottom: 1rem;
                `,
              },
              inputWrapper: {
                base: css`
                  border-color: green;
                `,
                errored: css`
                  border-color: maroon;
                `,
                focused: css`
                  border-color: unset;
                  box-shadow: unset;
                  outline: 2px solid blue;
                  outline-offset: 2px;
                `,
              },
              input: {
                base: css`
                  color: green;
                `,
                errored: css`
                  color: maroon;
                `,
                cardNumber: css`
                  flex: 1;
                `,
                expiryDate: css`
                  flex: 1;
                `,
                cvc: css`
                  flex: 1;
                `,
              },
              errorText: {
                base: css`
                  color: maroon;
                `,
              },
            }}
          >
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
          </PaymentInputsWrapper>
        </View>
      );
    }

    return <Component />;
  })
  .add("custom error messages", () => {
    function Component() {
      const [cardNumber, setCardNumber] = useState();
      const [expiry, setExpiry] = useState();
      const [cvc, setCvc] = useState();

      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getCardImageProps,
        wrapperProps,
      } = usePaymentInputs({
        errorMessages: {
          emptyCardNumber: "El número de la tarjeta es inválido",
          invalidCardNumber: "El número de la tarjeta es inválido",
          emptyExpiryDate: "La fecha de expiración es inválida",
          monthOutOfRange: "El mes de expiración debe estar entre 01 y 12",
          yearOutOfRange: "El año de expiración no puede estar en el pasado",
          dateOutOfRange: "La fecha de expiración no puede estar en el pasado",
          invalidExpiryDate: "La fecha de expiración es inválida",
          emptyCVC: "El código de seguridad es inválido",
          invalidCVC: "El código de seguridad es inválido",
        },
      });
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
          </PaymentInputsWrapper>
        </View>
      );
    }

    return <Component />;
  });
