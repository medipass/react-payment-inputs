import usePaymentInputs from './use-payment-inputs';

export default function PaymentInputsContainer(props) {
  const paymentInputs = usePaymentInputs(props);
  return props.children(paymentInputs);
}
