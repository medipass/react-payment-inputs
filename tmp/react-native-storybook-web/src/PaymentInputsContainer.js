import usePaymentInputs from './usePaymentInputs';

export default function PaymentInputsContainer(props) {
  const paymentInputs = usePaymentInputs(props);
  return props.children(paymentInputs);
}
