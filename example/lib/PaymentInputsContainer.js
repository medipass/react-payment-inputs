import usePaymentInputs from "./usePaymentInputs";

export default function PaymentInputsContainer(props) {
  const { children, ...extras } = props;
  const paymentInputs = usePaymentInputs(extras);
  return children(paymentInputs);
}
