import React from 'react';

import utils from './utils';

export default function usePaymentInputs({
  autoFocus = true,
  touchFormOnBlur = false,
  errorMessages,
  onBlur,
  onChange,
  onError,
  onTouch,
  cardNumberValidator,
  cvcValidator,
  expiryValidator
} = {}) {
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
  const [focused, setFocused] = React.useState();

  const getError = (input) => {return erroredInputs[input]}

  const isTouchedField = (input) => {
    if(touchedInputs[input]) return true;
    else return false;
  }

  const hasErrored = (input) => {
    let erroredList = Object.keys(erroredInputs).map(key => {
      if(erroredInputs[key])
        return key;
    })
    let touchedList = Object.keys(touchedInputs).map(key => {
      if(touchedInputs[key])
        return key;
    })

    if(erroredList.indexOf(input) !== -1 && touchedList.indexOf(input) !== -1)
      return true;
    else
      return false;
  }

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
    const validInputNames = ['cardNumber', 'expiryDate', 'cvc', 'zip'];

    requestAnimationFrame(() => {
      const activeEl = document.activeElement.name;
      /******* DEFAULT BEHAVIOR *******/
      //if we're navigating outside the form, set the form touched
      if(!activeEl || !validInputNames.includes(activeEl)){
        setIsTouched(true);
      }
      //if we're typing and !touchFormOnBlur, hide errors
      else if(!touchFormOnBlur && value === false){
        setIsTouched(false);
      }

      /******* ADDITIONAL BEHAVIOR *******/
      else if(touchFormOnBlur){
        let showFormError = false;

        //if the user is typing in a field
        if(input === activeEl){
          //if that field is already touched, show the field's error
          if(isTouchedField(input || activeEl)){
            showFormError = true;
          }
          else{
            showFormError = false;
          }
        }
        //on blur/change of field
        else{
          //if the field we are leaving, or the one we're entering
          //has been touched and has an error, show the error
          if(hasErrored(input) || hasErrored(activeEl)){
            showFormError = true;
          }
          else{
            //if the field has an error when leaving, show it
            if(getError(input) && value === true){
              showFormError = true;
            }
          }
        }
        setIsTouched(showFormError);
      }
    },[]);

    setTouchedInputs(touchedInputs => {
      if (touchedInputs[input] === value) return touchedInputs;

      const newTouchedInputs = { ...touchedInputs, [input]: value };
      onTouch && onTouch({ [input]: value }, newTouchedInputs);
      return newTouchedInputs;
    });

  }, [touchedInputs, erroredInputs]); // eslint-disable-line
  /** ====== END: META STUFF ====== */
  
  /** ====== START: HELPER STUFF ====== */
  const resetForm = React.useCallback((initialValues = {
    cardNumber: '',
    expiryDate:'',
    cvc:'',
    zip:''
  }) => {
    setFocused(undefined);
    setIsTouched(false);
    setTouchedInputs({
      cardNumber: false,
      expiryDate: false,
      cvc: false,
      zip: false
    });
    //set default vals and errors
    if(zipField.current){
      if(initialValues.zip){
        zipField.current.value = initialValues.zip;
        setInputError('zip',
          utils.validator.getZIPError(zipField.current.value, {errorMessages})
        );
      }
      else{
        setInputError('zip',
          utils.validator.getZIPError(null, {errorMessages})
        );
      }
    }
    if(cvcField.current){
      if(initialValues.cvc){
        cvcField.current.value = initialValues.cvc;
        setInputError('cvc', 
          utils.validator.getCVCError(cvcField.current.value, cvcValidator, {errorMessages})
        );
      }
      else{
        setInputError('cvc', 
          utils.validator.getCVCError(null, cvcValidator, {errorMessages})
        );
      }
    }
    if(expiryDateField.current){
      if(initialValues.expiryDate){
        expiryDateField.current.value = initialValues.expiryDate;
        expiryDateField.current.value = utils.formatter.formatExpiry({target: expiryDateField.current});
        setInputError('expiryDate', 
          utils.validator.getCardNumberError(expiryDateField.current.value, expiryValidator, {errorMessages})
        );
      }
      else{
        setInputError('expiryDate', 
          utils.validator.getExpiryDateError(null, expiryValidator, {errorMessages})
        );
      }
    }
    if(cardNumberField.current){
      if(initialValues.cardNumber){
        cardNumberField.current.value = utils.formatter.formatCardNumber(initialValues.cardNumber);
        setCardType(utils.cardTypes.getCardTypeByValue(initialValues.cardNumber));
        setInputError('cardNumber', 
          utils.validator.getCardNumberError(cardNumberField.current.value, cardNumberValidator, {errorMessages})
        );
      }
      else{
        setInputError('cardNumber', 
          utils.validator.getCardNumberError(null, cardNumberValidator, {errorMessages})
        );
        setCardType(undefined);
      }
    }
  },[])
  /** ====== END: HELPER STUFF ======== */

  /** ====== START: CARD NUMBER STUFF ====== */
  const handleBlurCardNumber = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setFocused(undefined);
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

        // @ts-ignore
        cardNumberField.current.value = utils.formatter.formatCardNumber(cardNumber);

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        // Due to the card number formatting, the selection cursor will fall to the end of
        // the input field. Here, we want to reposition the cursor to the correct place.
        requestAnimationFrame(() => {
          if (document.activeElement !== cardNumberField.current) return;
          if (cardNumberField.current.value[cursorPosition - 1] === ' ') {
            cursorPosition = cursorPosition + 1;
          }
          cardNumberField.current.setSelectionRange(cursorPosition, cursorPosition);
        });

        const cardNumberError = utils.validator.getCardNumberError(cardNumber, cardNumberValidator, { errorMessages });
        if (!cardNumberError && autoFocus) {
          expiryDateField.current && expiryDateField.current.focus();
        }
        setInputError('cardNumber', cardNumberError);
        props.onError && props.onError(cardNumberError);

        setInputTouched('cardNumber', false);
      };
    },
    [autoFocus, cardNumberValidator, errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleFocusCardNumber = React.useCallback((props = {}) => {
    return e => {
      props.onFocus && props.onFocus(e);
      setFocused('cardNumber');
    };
  }, []);

  const handleKeyPressCardNumber = React.useCallback((props = {}) => {
    return e => {
      const formattedCardNumber = e.target.value || '';
      const cardNumber = formattedCardNumber.replace(/\s/g, '');

      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== utils.ENTER_KEY_CODE) {
        if (!utils.validator.isNumeric(e)) {
          e.preventDefault();
        }
        if (utils.validator.hasCardNumberReachedMaxLength(cardNumber)) {
          e.preventDefault();
        }
      }
    };
  }, []);

  const getCardNumberProps = React.useCallback(
    ({ refKey, ...props } = {}) => ({
      'aria-label': 'Card number',
      autoComplete: 'cc-number',
      id: 'cardNumber',
      name: 'cardNumber',
      placeholder: 'Card number',
      type: 'tel',
      [refKey || 'ref']: cardNumberField,
      ...props,
      onBlur: handleBlurCardNumber(props),
      onChange: handleChangeCardNumber(props),
      onFocus: handleFocusCardNumber(props),
      onKeyPress: handleKeyPressCardNumber(props)
    }),
    [handleBlurCardNumber, handleChangeCardNumber, handleFocusCardNumber, handleKeyPressCardNumber]
  );
  /** ====== END: CARD NUMBER STUFF ====== */

  /** ====== START: EXPIRY DATE STUFF ====== */
  const handleBlurExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setFocused(undefined);
        setInputTouched('expiryDate', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        expiryDateField.current.value = utils.formatter.formatExpiry(e);

        props.onChange && props.onChange(e);
        onChange && onChange(e);
        const expiryDateError = utils.validator.getExpiryDateError(expiryDateField.current.value, expiryValidator, {
          errorMessages
        });
        if (!expiryDateError && autoFocus) {
          cvcField.current && cvcField.current.focus();
        }
        setInputError('expiryDate', expiryDateError);
        props.onError && props.onError(expiryDateError);

        setInputTouched('expiryDate', false);
      };
    },
    [autoFocus, errorMessages, expiryValidator, onChange, setInputError, setInputTouched]
  );

  const handleFocusExpiryDate = React.useCallback((props = {}) => {
    return e => {
      props.onFocus && props.onFocus(e);
      setFocused('expiryDate');
    };
  }, []);

  const handleKeyDownExpiryDate = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.key === utils.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
          cardNumberField.current && cardNumberField.current.focus();
        }
      };
    },
    [autoFocus]
  );

  const handleKeyPressExpiryDate = React.useCallback((props = {}) => {
    return e => {
      const formattedExpiryDate = e.target.value || '';
      const expiryDate = formattedExpiryDate.replace(' / ', '');

      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== utils.ENTER_KEY_CODE) {
        if (!utils.validator.isNumeric(e)) {
          e.preventDefault();
        }
        if (expiryDate.length >= 4) {
          e.preventDefault();
        }
      }
    };
  }, []);

  const getExpiryDateProps = React.useCallback(
    ({ refKey, ...props } = {}) => ({
      'aria-label': 'Expiry date in format MM YY',
      autoComplete: 'cc-exp',
      id: 'expiryDate',
      name: 'expiryDate',
      placeholder: 'MM/YY',
      type: 'tel',
      [refKey || 'ref']: expiryDateField,
      ...props,
      onBlur: handleBlurExpiryDate(props),
      onChange: handleChangeExpiryDate(props),
      onFocus: handleFocusExpiryDate(props),
      onKeyDown: handleKeyDownExpiryDate(props),
      onKeyPress: handleKeyPressExpiryDate(props)
    }),
    [
      handleBlurExpiryDate,
      handleChangeExpiryDate,
      handleFocusExpiryDate,
      handleKeyDownExpiryDate,
      handleKeyPressExpiryDate
    ]
  );
  /** ====== END: EXPIRY DATE STUFF ====== */

  /** ====== START: CVC STUFF ====== */
  const handleBlurCVC = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setFocused(undefined);
        setInputTouched('cvc', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeCVC = React.useCallback(
    (props = {}, { cardType } = {}) => {
      return e => {
        const cvc = e.target.value;

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        const cvcError = utils.validator.getCVCError(cvc, cvcValidator, { cardType, errorMessages });
        if (!cvcError && autoFocus) {
          zipField.current && zipField.current.focus();
        }
        setInputError('cvc', cvcError);
        props.onError && props.onError(cvcError);

        setInputTouched('cvc', false);
      };
    },
    [autoFocus, cvcValidator, errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleFocusCVC = React.useCallback((props = {}) => {
    return e => {
      props.onFocus && props.onFocus(e);
      setFocused('cvc');
    };
  }, []);

  const handleKeyDownCVC = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.key === utils.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
          expiryDateField.current && expiryDateField.current.focus();
        }
      };
    },
    [autoFocus]
  );

  const handleKeyPressCVC = React.useCallback((props = {}, { cardType }) => {
    return e => {
      const formattedCVC = e.target.value || '';
      const cvc = formattedCVC.replace(' / ', '');

      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== utils.ENTER_KEY_CODE) {
        if (!utils.validator.isNumeric(e)) {
          e.preventDefault();
        }
        if (cardType && cvc.length >= cardType.code.length) {
          e.preventDefault();
        }
        if (cvc.length >= 4) {
          e.preventDefault();
        }
      }
    };
  }, []);

  const getCVCProps = React.useCallback(
    ({ refKey, ...props } = {}) => ({
      'aria-label': 'CVC',
      autoComplete: 'cc-csc',
      id: 'cvc',
      name: 'cvc',
      placeholder: cardType ? cardType.code.name : 'CVC',
      type: 'tel',
      [refKey || 'ref']: cvcField,
      ...props,
      onBlur: handleBlurCVC(props),
      onChange: handleChangeCVC(props, { cardType }),
      onFocus: handleFocusCVC(props),
      onKeyDown: handleKeyDownCVC(props),
      onKeyPress: handleKeyPressCVC(props, { cardType })
    }),
    [cardType, handleBlurCVC, handleChangeCVC, handleFocusCVC, handleKeyDownCVC, handleKeyPressCVC]
  );
  /** ====== END: CVC STUFF ====== */

  /** ====== START: ZIP STUFF ====== */
  const handleBlurZIP = React.useCallback(
    (props = {}) => {
      return e => {
        props.onBlur && props.onBlur(e);
        onBlur && onBlur(e);
        setFocused(undefined);
        setInputTouched('zip', true);
      };
    },
    [onBlur, setInputTouched]
  );

  const handleChangeZIP = React.useCallback(
    (props = {}) => {
      return e => {
        const zip = e.target.value;

        props.onChange && props.onChange(e);
        onChange && onChange(e);

        const zipError = utils.validator.getZIPError(zip, { errorMessages });
        setInputError('zip', zipError);
        props.onError && props.onError(zipError);

        setInputTouched('zip', false);
      };
    },
    [errorMessages, onChange, setInputError, setInputTouched]
  );

  const handleFocusZIP = React.useCallback((props = {}) => {
    return e => {
      props.onFocus && props.onFocus(e);
      setFocused('zip');
    };
  }, []);

  const handleKeyDownZIP = React.useCallback(
    (props = {}) => {
      return e => {
        props.onKeyDown && props.onKeyDown(e);

        if (e.key === utils.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
          cvcField.current && cvcField.current.focus();
        }
      };
    },
    [autoFocus]
  );

  const handleKeyPressZIP = React.useCallback((props = {}) => {
    return e => {
      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== utils.ENTER_KEY_CODE) {
        if (!utils.validator.isNumeric(e)) {
          e.preventDefault();
        }
      }
    };
  }, []);

  const getZIPProps = React.useCallback(
    ({ refKey, ...props } = {}) => ({
      autoComplete: 'off',
      id: 'zip',
      maxLength: '6',
      name: 'zip',
      placeholder: 'ZIP',
      type: 'tel',
      [refKey || 'ref']: zipField,
      ...props,
      onBlur: handleBlurZIP(props),
      onChange: handleChangeZIP(props),
      onFocus: handleFocusZIP(props),
      onKeyDown: handleKeyDownZIP(props),
      onKeyPress: handleKeyPressZIP(props)
    }),
    [handleBlurZIP, handleChangeZIP, handleFocusZIP, handleKeyDownZIP, handleKeyPressZIP]
  );
  /** ====== END: ZIP STUFF ====== */

  /** ====== START: CARD IMAGE STUFF ====== */
  const getCardImageProps = React.useCallback(
    (props = {}) => {
      const images = props.images || {};
      return {
        'aria-label': cardType ? cardType.displayName : 'Placeholder card',
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

  // Set default field errors
  React.useLayoutEffect(
    () => {
      if (zipField.current) {
        const zipError = utils.validator.getZIPError(zipField.current.value, { errorMessages });
        setInputError('zip', zipError);
      }
      if (cvcField.current) {
        const cvcError = utils.validator.getCVCError(cvcField.current.value, cvcValidator, { errorMessages });
        setInputError('cvc', cvcError);
      }
      if (expiryDateField.current) {
        const expiryDateError = utils.validator.getExpiryDateError(expiryDateField.current.value, expiryValidator, {
          errorMessages
        });
        setInputError('expiryDate', expiryDateError);
      }
      if (cardNumberField.current) {
        const cardNumberError = utils.validator.getCardNumberError(cardNumberField.current.value, cardNumberValidator, {
          errorMessages 
        });
        setInputError('cardNumber', cardNumberError);
      }
    },
    [cardNumberValidator, cvcValidator, errorMessages, expiryValidator, setInputError]
  );

  // Format default values
  React.useLayoutEffect(() => {
    if (cardNumberField.current) {
      cardNumberField.current.value = utils.formatter.formatCardNumber(cardNumberField.current.value);
    }
    if (expiryDateField.current) {
      expiryDateField.current.value = utils.formatter.formatExpiry({ target: expiryDateField.current });
    }
  }, []);

  // Set default card type
  React.useLayoutEffect(() => {
    if (cardNumberField.current) {
      const cardType = utils.cardTypes.getCardTypeByValue(cardNumberField.current.value);
      setCardType(cardType);
    }
  }, []);

  return {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getZIPProps,
    wrapperProps: {
      error,
      focused,
      isTouched
    },
    meta: {
      cardType,
      erroredInputs,
      error,
      focused,
      isTouched,
      touchedInputs
    },
    helpers: {
      setInputTouched,
      resetForm
    }
  };
}
