import React from 'react';

import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/lib/images';

function App() {
  const { touchedInputs, cardImageProps, cardNumberProps, expiryDateProps, cvcProps, wrapperProps } = usePaymentInputs({ onError: (...args) => console.log('error', args), onTouch: (...args) => console.log('touch', args) });
  console.log(touchedInputs);
  return (
    <div className="App">
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...cardImageProps({ images })} />
        <input {...cardNumberProps()} />
        <input {...expiryDateProps()} />
        <input {...cvcProps()} />
      </PaymentInputsWrapper>
    </div>
  );
}

export default App;
