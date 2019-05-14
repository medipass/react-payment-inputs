import * as utils from './index';

const MONTH_REGEX = /(0[1-9]|1[0-2])/;

export const EMPTY_CARD_NUMBER = 'Enter a card number';
export const EMPTY_EXPIRY_DATE = 'Enter an expiry date';
export const EMPTY_CVC = 'Enter a CVC';
export const EMPTY_ZIP = 'Enter a ZIP code';

export const INVALID_CARD_NUMBER = 'Card number is invalid';
export const INVALID_EXPIRY_DATE = 'Expiry date is invalid';
export const INVALID_CVC = 'CVC is invalid';

export const MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
export const YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
export const DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';

export const hasCardNumberReachedMaxLength = currentValue => {
  const cardType = utils.cardTypes.getCardTypeByValue(currentValue);
  return cardType && currentValue.length >= cardType.lengths[cardType.lengths.length - 1];
};

export const isNumeric = e => {
  return /^\d*$/.test(e.key);
};

export const validateLuhn = cardNumber => {
  return (
    cardNumber
      .split('')
      .reverse()
      .map(digit => parseInt(digit, 10))
      .map((digit, idx) => (idx % 2 ? digit * 2 : digit))
      .map(digit => (digit > 9 ? (digit % 10) + 1 : digit))
      .reduce((accum, digit) => (accum += digit)) %
    10 ===
    0
  );
};
export const getCardNumberError = cardNumber => {
  if (!cardNumber) {
    return EMPTY_CARD_NUMBER;
  }

  const cardType = utils.cardTypes.getCardTypeByValue(cardNumber);

  if (cardType && cardType.lengths) {
    const doesCardNumberMatchLength = cardType.lengths.includes(cardNumber.length);
    if (doesCardNumberMatchLength) {
      const isLuhnValid = validateLuhn(cardNumber);
      if (isLuhnValid) {
        return;
      }
    }
  }

  return INVALID_CARD_NUMBER;
};
export const getExpiryDateError = expiryDate => {
  if (!expiryDate) {
    return EMPTY_EXPIRY_DATE;
  }
  const rawExpiryDate = expiryDate.replace(' / ', '');
  if (rawExpiryDate.length === 4) {
    const month = rawExpiryDate.slice(0, 2);
    const year = `20${rawExpiryDate.slice(2, 4)}`;
    if (!MONTH_REGEX.test(month)) {
      return MONTH_OUT_OF_RANGE;
    }
    if (parseInt(year) < new Date().getFullYear()) {
      return YEAR_OUT_OF_RANGE;
    }
    if (parseInt(year) === new Date().getFullYear() && parseInt(month) < new Date().getMonth() + 1) {
      return DATE_OUT_OF_RANGE;
    }
    return;
  }
  return INVALID_EXPIRY_DATE;
};
export const getCVCError = (expiryDate, { cardType }) => {
  if (!expiryDate) {
    return EMPTY_EXPIRY_DATE;
  }
  if (cardType && expiryDate.length !== cardType.code.length) {
    return INVALID_CVC;
  }
  return;
};
export const getZIPError = zip => {
  if (!zip) {
    return EMPTY_ZIP;
  }
  return;
};
