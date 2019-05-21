import React from 'react';

import utils from './utils';

/**
 * TODO:
 *  - styling for ZIP
 *  - add ability to modify styling (class & style props)
 *  - doco
 */

export default function usePaymentCard({ errorMessages, onBlur, onChange, onError, onTouch } = {}) {
  const cardNumberField = React.useRef();
  const expiryDateField = React.useRef();
  const cvcField = React.useRef();
  const zipField = React.useRef();

  /** ====== START: META STUFF ====== */
  const [touchedInputs, setTouchedInputs] = React.useState({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
    zip: false
  });
  const [isTouched, setIsTouched] = React.useState(false);
  const [erroredInputs, setErroredInputs] = React.useState({
    cardNumber: undefined,
    expiryDate: undefined,
    cvc: undefined,
    zip: undefined
  });
  const [error, setError] = React.useState();
  const [cardType, setCardType] = React.useState();

  const setInputError = React.useCallback((input, error) => {
    setErroredInputs(erroredInputs => {
      if (erroredInputs[input] === error) return erroredInputs;
      let newError = error;
      const newErroredInputs = { ...erroredInputs, [input]: error };
      if (error) {
        setError(error);
      } else {
        newError = Object.values(newErroredInputs).find(Boolean);
        setError(newError);
      }
      onError && onError(newError, newErroredInputs);
      return newErroredInputs;
    });
  }, []); // eslint-disable-line

  const setInputTouched = React.useCallback((input, value) => {
    requestAnimationFrame(() => {
      if (document.activeElement.tagName !== 'INPUT') {
        setIsTouched(true);
      } else if (value === false) {
        setIsTouched(false);
      }
    });
    setTouchedInputs(touchedInputs => {
      if (touchedInputs[input] === value) return touchedInputs;
      const newTouchedInputs = { ...touchedInputs, [input]: value };
      onTouch && onTouch({ [input]: value }, newTouchedInputs);
      return newTouchedInputs;
    });
  }, []); // eslint-disable-line
  /** ====== END: META STUFF ====== */

  /** ====== START: CARD NUMBER STUFF ====== */
  const handleBlurCardNumber = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setInputTouched('cardNumber', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeCardNumber = React.useCallback(
    (props = {}) => {
      return e => {
        const formattedCardNumber = e.target.value || '';
        const cardNumber = formattedCardNumber.replace(/\s/g, '');
        let cursorPosition = cardNumberField.current.selectionStart;

        const cardType = utils.cardTypes.getCardTypeByValue(cardNumber);
        setCardType(cardType);

        setInputTouched('cardNumber', false);

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        // @ts-ignore
        cardNumberField.current.value = utils.formatter.formatCardNumber(cardNumber);

        // Due to the card number formatting, the selection cursor will fall to the end of
        // the input field. Here, we want to reposition the cursor to the correct place.
        requestAnimationFrame(() => {
          if (cardNumberField.current.value[cursorPosition - 1] === ' ') {
            cursorPosition = cursorPosition + 1;
          }
          cardNumberField.current.setSelectionRange(cursorPosition, cursorPosition);
        });

        const cardNumberError = utils.validator.getCardNumberError(cardNumber, { errorMessages });
        if (!cardNumberError) {
          expiryDateField.current && expiryDateField.current.focus();
        }
        setInputError('cardNumber', cardNumberError);
      };
    },
    [errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleKeyPressCardNumber = React.useCallback((props = {}) => {
    return e => {
      const formattedCardNumber = e.target.value || '';
      const cardNumber = formattedCardNumber.replace(/\s/g, '');

      props.onKeyPress && props.onKeyPress(e);

      if (!utils.validator.isNumeric(e)) {
        e.preventDefault();
      }
      if (utils.validator.hasCardNumberReachedMaxLength(cardNumber)) {
        e.preventDefault();
      }
    };
  }, []);

  const cardNumberProps = React.useCallback(
    (props = {}) => ({
      autoComplete: 'cc-number',
      id: 'cardnumber',
      name: 'cardnumber',
      placeholder: 'Card number',
      type: 'tel',
      ref: cardNumberField,
      ...props,
      onBlur: handleBlurCardNumber(props),
      onChange: handleChangeCardNumber(props),
      onKeyPress: handleKeyPressCardNumber(props)
    }),
    [handleBlurCardNumber, handleChangeCardNumber, handleKeyPressCardNumber]
  );
  /** ====== END: CARD NUMBER STUFF ====== */

  /** ====== START: EXPIRY DATE STUFF ====== */
  const handleBlurExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setInputTouched('expiryDate', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        const expiryDate = e.target.value;

        setInputTouched('expiryDate', false);

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        expiryDateField.current.value = utils.formatter.formatExpiry(e);

        const expiryDateError = utils.validator.getExpiryDateError(expiryDate, { errorMessages });
        if (!expiryDateError) {
          cvcField.current && cvcField.current.focus();
        }
        setInputError('expiryDate', expiryDateError);
      };
    },
    [errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleKeyDownExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.keyCode === utils.BACKSPACE_KEY_CODE && !e.target.value) {
          cardNumberField.current && cardNumberField.current.focus();
        }
      };
    },
    [cardNumberField]
  );

  const handleKeyPressExpiryDate = React.useCallback((props = {}) => {
    return e => {
      const formattedExpiryDate = e.target.value || '';
      const expiryDate = formattedExpiryDate.replace(' / ', '');

      props.onKeyPress && props.onKeyPress(e);

      if (!utils.validator.isNumeric(e)) {
        e.preventDefault();
      }
      if (expiryDate.length >= 4) {
        e.preventDefault();
      }
    };
  }, []);

  const expiryDateProps = React.useCallback(
    (props = {}) => ({
      autoComplete: 'cc-exp',
      id: 'expirydate',
      name: 'cc-exp',
      placeholder: 'MM/YY',
      type: 'tel',
      ref: expiryDateField,
      ...props,
      onBlur: handleBlurExpiryDate(props),
      onChange: handleChangeExpiryDate(props),
      onKeyDown: handleKeyDownExpiryDate(props),
      onKeyPress: handleKeyPressExpiryDate(props)
    }),
    [handleBlurExpiryDate, handleChangeExpiryDate, handleKeyDownExpiryDate, handleKeyPressExpiryDate]
  );
  /** ====== END: EXPIRY DATE STUFF ====== */

  /** ====== START: CVC STUFF ====== */
  const handleBlurCVC = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setInputTouched('cvc', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeCVC = React.useCallback(
    (props = {}, { cardType } = {}) => {
      return e => {
        const cvc = e.target.value;

        setInputTouched('cvc', false);

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        const cvcError = utils.validator.getCVCError(cvc, { cardType, errorMessages });
        if (!cvcError) {
          zipField.current && zipField.current.focus();
        }
        setInputError('cvc', cvcError);
      };
    },
    [errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleKeyDownCVC = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.keyCode === utils.BACKSPACE_KEY_CODE && !e.target.value) {
          expiryDateField.current && expiryDateField.current.focus();
        }
      };
    },
    [expiryDateField]
  );

  const handleKeyPressCVC = React.useCallback((props = {}, { cardType }) => {
    return e => {
      const formattedCVC = e.target.value || '';
      const cvc = formattedCVC.replace(' / ', '');

      props.onKeyPress && props.onKeyPress(e);

      if (!utils.validator.isNumeric(e)) {
        e.preventDefault();
      }
      if (cardType && cvc.length >= cardType.code.length) {
        e.preventDefault();
      }
      if (cvc.length >= 4) {
        e.preventDefault();
      }
    };
  }, []);

  const cvcProps = React.useCallback(
    (props = {}) => ({
      autoComplete: 'cc-csc',
      id: 'cvc',
      name: 'cvc',
      placeholder: cardType ? cardType.code.name : 'CVC',
      type: 'tel',
      ref: cvcField,
      ...props,
      onBlur: handleBlurCVC(props),
      onChange: handleChangeCVC(props, { cardType }),
      onKeyDown: handleKeyDownCVC(props),
      onKeyPress: handleKeyPressCVC(props, { cardType })
    }),
    [cardType, handleBlurCVC, handleChangeCVC, handleKeyDownCVC, handleKeyPressCVC]
  );
  /** ====== END: CVC STUFF ====== */

  /** ====== START: ZIP STUFF ====== */
  const handleBlurZIP = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setInputTouched('zip', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeZIP = React.useCallback(
    (props = {}) => {
      return e => {
        const zip = e.target.value;

        setInputTouched('zip', false);

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        const zipError = utils.validator.getZIPError(zip, { errorMessages });
        setInputError('zip', zipError);
      };
    },
    [errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleKeyDownZIP = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.keyCode === utils.BACKSPACE_KEY_CODE && !e.target.value) {
          cvcField.current && cvcField.current.focus();
        }
      };
    },
    [cvcField]
  );

  const handleKeyPressZIP = React.useCallback((props = {}) => {
    return e => {
      props.onKeyPress && props.onKeyPress(e);

      if (!utils.validator.isNumeric(e)) {
        e.preventDefault();
      }
    };
  }, []);

  const zipProps = React.useCallback(
    (props = {}) => ({
      autoComplete: 'off',
      maxLength: '6',
      name: 'zip',
      placeholder: 'ZIP',
      type: 'tel',
      ref: zipField,
      ...props,
      onBlur: handleBlurZIP(props),
      onChange: handleChangeZIP(props),
      onKeyDown: handleKeyDownZIP(props),
      onKeyPress: handleKeyPressZIP(props)
    }),
    [handleBlurZIP, handleChangeZIP, handleKeyDownZIP, handleKeyPressZIP]
  );
  /** ====== END: ZIP STUFF ====== */

  /** ====== START: CARD IMAGE STUFF ====== */
  const cardImageProps = React.useCallback(
    (props = {}) => {
      const images = props.images || {};
      return {
        children: images[cardType ? cardType.type : 'placeholder'] || images.placeholder,
        width: '1.5em',
        height: '1em',
        viewBox: '0 0 24 16',
        ...props
      };
    },
    [cardType]
  );
  /** ====== END: CARD IMAGE STUFF ====== */

  React.useEffect(
    () => {
      if (zipField.current) {
        const zipError = utils.validator.getZIPError(zipField.current.value, { errorMessages });
        setInputError('zip', zipError);
      }
      if (cvcField.current) {
        const cvcError = utils.validator.getCVCError(cvcField.current.value, { errorMessages });
        setInputError('cvc', cvcError);
      }
      if (expiryDateField.current) {
        const expiryDateError = utils.validator.getExpiryDateError(expiryDateField.current.value, { errorMessages });
        setInputError('expiryDate', expiryDateError);
      }
      if (cardNumberField.current) {
        const cardNumberError = utils.validator.getCardNumberError(cardNumberField.current.value, { errorMessages });
        setInputError('cardNumber', cardNumberError);
      }
    },
    [errorMessages, setInputError]
  );

  React.useEffect(() => {
    if (cardNumberField.current) {
      cardNumberField.current.value = utils.formatter.formatCardNumber(cardNumberField.current.value);
    }
    if (expiryDateField.current) {
      expiryDateField.current.value = utils.formatter.formatExpiry({ target: expiryDateField.current });
    }
  }, []);

  return {
    cardType,
    erroredInputs,
    error,
    isTouched,
    touchedInputs,

    cardImageProps,
    cardNumberProps,
    expiryDateProps,
    cvcProps,
    zipProps,
    wrapperProps: {
      error,
      isTouched
    }
  };
}
