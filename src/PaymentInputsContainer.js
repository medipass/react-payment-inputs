import React from 'react';
import usePaymentInputs from './use-payment-inputs';

export default function PaymentInputs(props) {
  const paymentInputs = usePaymentInputs(props);
  return props.children(paymentInputs);
}
