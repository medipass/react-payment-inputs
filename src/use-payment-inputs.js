import React from 'react';

import * as utils from './utils';

/**
 * TODO:
 *  - test default value errors
 *  - unified error message
 *  - unified touch state
 *  - handle images
 *  - wrapper with default styling
 */

export default function usePaymentCard({ onError } = {}) {
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
  const [errors, setErrors] = React.useState({
    cardNumber: utils.validator.EMPTY_CARD_NUMBER,
    expiryDate: utils.validator.EMPTY_EXPIRY_DATE,
    cvc: utils.validator.EMPTY_CVC,
    zip: utils.validator.EMPTY_ZIP
  });
  const [error, setError] = React.useState();
  const [cardType, setCardType] = React.useState();
  /** ====== END: META STUFF ====== */

  /** ====== START: CARD NUMBER STUFF ====== */
  const handleBlurCardNumber = React.useCallback((props = {}) => {
    return e => {
      props.onBlur && props.onBlur(e);

      setTouchedInputs(touchedInputs => ({ ...touchedInputs, cardNumber: true }));
    };
  }, []);

  const handleChangeCardNumber = React.useCallback(
    (props = {}) => {
      return e => {
        const formattedCardNumber = e.target.value || '';
        const cardNumber = formattedCardNumber.replace(/\s/g, '');

        const cardType = utils.cardTypes.getCardTypeByValue(cardNumber);
        setCardType(cardType);

        props.onChange && props.onChange(e);

        // @ts-ignore
        cardNumberField.current.value = utils.formatter.formatCardNumber(cardNumber);

        const cardNumberError = utils.validator.getCardNumberError(cardNumber);

        if (!cardNumberError) {
          expiryDateField.current && expiryDateField.current.focus();
        }

        setErrors(errors => {
          const newErrors = { ...errors, cardNumber: cardNumberError };
          onError && onError({ cardNumber: cardNumberError }, newErrors);
          return newErrors;
        });
      };
    },
    [cardNumberField]
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
      name: 'cardnumber',
      placeholder: 'Card number',
      type: 'tel',
      ref: cardNumberField,
      onBlur: handleBlurCardNumber(props),
      onChange: handleChangeCardNumber(props),
      onKeyPress: handleKeyPressCardNumber(props)
    }),
    [cardNumberField]
  );
  /** ====== END: CARD NUMBER STUFF ====== */

  /** ====== START: EXPIRY DATE STUFF ====== */
  const handleBlurExpiryDate = React.useCallback((props = {}) => {
    return e => {
      props.onBlur && props.onBlur(e);

      setTouchedInputs(touchedInputs => ({ ...touchedInputs, expiryDate: true }));
    };
  }, []);

  const handleChangeExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        const expiryDate = e.target.value;

        props.onChange && props.onChange(e);

        expiryDateField.current.value = utils.formatter.formatExpiry(e);

        const expiryDateError = utils.validator.getExpiryDateError(expiryDate);

        if (!expiryDateError) {
          cvcField.current && cvcField.current.focus();
        }

        setErrors(errors => {
          const newErrors = { ...errors, expiryDate: expiryDateError };
          onError && onError({ expiryDate: expiryDateError }, newErrors);
          return newErrors;
        });
      };
    },
    [expiryDateField]
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
      name: 'cc-exp',
      placeholder: 'MM/YY',
      type: 'tel',
      ref: expiryDateField,
      onBlur: handleBlurExpiryDate(props),
      onChange: handleChangeExpiryDate(props),
      onKeyDown: handleKeyDownExpiryDate(props),
      onKeyPress: handleKeyPressExpiryDate(props)
    }),
    [expiryDateField]
  );
  /** ====== END: EXPIRY DATE STUFF ====== */

  /** ====== START: CVC STUFF ====== */
  const handleBlurCVC = React.useCallback((props = {}) => {
    return e => {
      props.onBlur && props.onBlur(e);

      setTouchedInputs(touchedInputs => ({ ...touchedInputs, cvc: true }));
    };
  }, []);

  const handleChangeCVC = React.useCallback(
    (props = {}, { cardType }) => {
      return e => {
        const cvc = e.target.value;

        props.onChange && props.onChange(e);

        const cvcError = utils.validator.getCVCError(cvc, { cardType });

        if (!cvcError) {
          zipField.current && zipField.current.focus();
        }

        setErrors(errors => {
          const newErrors = { ...errors, cvc: cvcError };
          onError && onError({ cvc: cvcError }, newErrors);
          return newErrors;
        });
      };
    },
    [cvcField]
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
      name: 'cvc',
      placeholder: cardType ? cardType.code.name : 'CVC',
      type: 'tel',
      ref: cvcField,
      onBlur: handleBlurCVC(props),
      onChange: handleChangeCVC(props, { cardType }),
      onKeyDown: handleKeyDownCVC(props),
      onKeyPress: handleKeyPressCVC(props, { cardType })
    }),
    [cvcField, cardType]
  );
  /** ====== END: CVC STUFF ====== */

  /** ====== START: ZIP STUFF ====== */
  const handleBlurZIP = React.useCallback((props = {}) => {
    return e => {
      props.onBlur && props.onBlur(e);

      setTouchedInputs(touchedInputs => ({ ...touchedInputs, zip: true }));
    };
  }, []);

  const handleChangeZIP = React.useCallback(
    (props = {}) => {
      return e => {
        const zip = e.target.value;

        props.onChange && props.onChange(e);

        const zipError = utils.validator.getZIPError(zip);
        setErrors(errors => {
          const newErrors = { ...errors, zip: zipError };
          onError && onError({ zip: zipError }, newErrors);
          return newErrors;
        });
      };
    },
    [zipField]
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
      onBlur: handleBlurZIP(props),
      onChange: handleChangeZIP(props),
      onKeyDown: handleKeyDownZIP(props),
      onKeyPress: handleKeyPressZIP(props)
    }),
    [zipField]
  );
  /** ====== END: ZIP STUFF ====== */

  return {
    cardType,
    errors,
    error,
    isTouched,
    touchedInputs,

    cardNumberProps,
    expiryDateProps,
    cvcProps,
    zipProps
  };
}
