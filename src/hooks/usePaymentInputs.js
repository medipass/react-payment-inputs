import {useRef, useCallback, useState} from "react";
import {typeCheck} from "type-check";

import utils from "../utils";
import defaultImages from "../images";
import {useOnce} from ".";

const {formatter: {
  formatCardNumber,
  formatExpiry,
}} = utils;
const {validator: {
  hasCardNumberReachedMaxLength,
  getCardNumberError,
  getExpiryDateError,
  getCVCError,
}} = utils;
const {cardTypes: {
  getCardTypeByValue,
}} = utils;

const throwOnBadProps = ({onChangeText, value}) => {
  if (!typeCheck("Function", onChangeText)) {
    throw new Error(`Expected Function onChangeText, encountered ${onChangeText}.`);
  } else if (!typeCheck("String", value)) {
    throw new Error(`Expected String value, encountered ${value}.`);
  }
};

export default function usePaymentInputs({images} = {images: defaultImages}) {

  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvcRef = useRef();

  const cardNumberOnce = useOnce();
  const expiryOnce = useOnce();
  const cvcOnce = useOnce();

  const [cardNumberError, setCardNumberError] = useState();
  const [expiryError, setExpiryError] = useState();
  const [cvcError, setCvcError] = useState();

  const [touchedInputs, setTouchedInputs] = useState({
    cardNumber: false,
    expiry: false,
    cvc: false,
  });

  const touch = useCallback(fieldName => setTouchedInputs(e => ({...e, [fieldName]: true})), [setTouchedInputs]);
  const touchCardNumber = useCallback(() => touch("cardNumber"), [touch]);
  const touchExpiry = useCallback(() => touch("expiry"), [touch]);
  const touchCvc = useCallback(() => touch("cvc"), [touch]);

  const [cardType, setCardType] = useState();

  const getCardNumberProps = useCallback(
    ({onChangeText, value, ...extras}) => {
      throwOnBadProps({onChangeText, value});
      const shouldSideEffect = (str) => {
        const value = formatCardNumber(str);
        const cardNumberError = getCardNumberError(value);
        const cardType = getCardTypeByValue(value);
        onChangeText(value);
        setCardNumberError(cardNumberError);
        setCardType(cardType);
        return {value, cardNumberError, cardType};
      };
      cardNumberOnce(() => shouldSideEffect(value));
      return {
        placeholder: "Card Number",
        textContentType: "creditCardNumber",
        ...extras,
        ref: cardNumberRef,
        onChangeText: (str) => {
          const {value, cardNumberError} = shouldSideEffect(str);
          if (hasCardNumberReachedMaxLength(value) && !cardNumberError) {
            expiryRef.current && expiryRef.current.focus();
          }
        },
        onBlur: touchCardNumber,
        value,
      };
    },
    [cardNumberRef, cardNumberOnce, setCardNumberError, expiryRef, touchCardNumber],
  );
  const getExpiryProps = useCallback(
    ({onChangeText, value, ...extras}) => {
      throwOnBadProps({onChangeText, value});
      const shouldSideEffect = (str) => {
        const value = formatExpiry(str) || "";
        const expiryError = getExpiryDateError(value);
        onChangeText(value);
        setExpiryError(expiryError);
        return {value, expiryError};
      };
      expiryOnce(() => shouldSideEffect(value));
      return {
        placeholder: "Expiry MM/DD",
        ...extras,
        ref: expiryRef,
        onBlur: touchExpiry,
        onChangeText: (str) => {
          const {value, expiryError} = shouldSideEffect(str);
          if (!expiryError) {
            cvcRef.current && cvcRef.current.focus();
          }
        },
        value,
      };
    },
    [expiryRef, expiryOnce, cvcRef, setExpiryError, touchExpiry],
  );
  const getCvcProps = useCallback(
    ({onChangeText, value, ...extras}) => {
      throwOnBadProps({onChangeText, value});
      const shouldSideEffect = (str) => {
        // TODO: Implement formatting.
        const value = str;
        const cvcError = getCVCError(value, undefined, {cardType});
        onChangeText(value);
        setCvcError(cvcError);
        return {value, cvcError};
      };
      cvcOnce(() => shouldSideEffect(value));
      return {
        placeholder: "CVC",
        secureTextEntry: true,
        ...extras,
        ref: cvcRef,
        onBlur: touchCvc,
        onChangeText: (str) => {
          const {} = shouldSideEffect(str);
        },
        value,
      };
    },
    [cvcRef, cvcOnce, setCvcError, cardType, touchCvc],
  );
  const getCardImageProps = useCallback(
    ({...extras}) => {
      const imgs = images || {};
      const children = imgs[cardType ? cardType.type : "placeholder"];
      return {
        viewBox: "0 0 24 16",
        ...extras,
        children,
      };
    },
    [images, cardType],
  );
  return {
    getCardNumberProps,
    getExpiryProps,
    getCvcProps,
    getCardImageProps,
    meta: {
      cardType,
      erroredInputs: Object.fromEntries(
        Object.entries({cardNumberError, expiryError, cvcError})
          .filter(([k, v]) => !!v),
      ),
      touchedInputs,
    },
  };
}
