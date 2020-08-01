import * as cardTypes from './cardTypes';

export const formatCardNumber = cardNumber => {
  const cardType = cardTypes.getCardTypeByValue(cardNumber);

  if (!cardType) return (cardNumber.match(/\d+/g) || []).join('');

  const format = cardType.format;
  if (format && format.global) {
    return (cardNumber.match(format) || []).join(' ');
  }

  if (format) {
    const execResult = format.exec(cardNumber.split(' ').join(''));
    if (execResult) {
      return execResult
        .splice(1, 3)
        .filter(x => x)
        .join(' ');
    }
  }

  return cardNumber;
};

export const formatExpiry = event => {
  const eventData = event.nativeEvent && event.nativeEvent.data;
  const prevExpiry = event.target.value.split(' / ').join('/');

  if (!prevExpiry) return null;
  let expiry = prevExpiry;
  if (/^[2-9]$/.test(expiry)) {
    expiry = `0${expiry}`;
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    const [head, ...tail] = prevExpiry.split('');
    expiry = `0${head}/${tail.join('')}`;
  }

  if (/^1[/-]$/.test(expiry)) {
    return `01 / `;
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];
  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
      return expiry[0];
    }
    if (/\d{2}/.test(expiry)) {
      return `${expiry[0]} / `;
    }
  }
  if (expiry.length > 2) {
    const [, month = null, year = null] = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [];
    return [month, year].join(' / ');
  }
  return expiry.join(' / ');
};
