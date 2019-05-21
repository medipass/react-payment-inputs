import React from 'react';
import { render } from 'react-dom';

import { usePaymentInputs, PaymentInputsContainer, PaymentInputsWrapper } from '../../src';
import images from '../../src/images';

function Demo() {
  const { cardImageProps, cardNumberProps, expiryDateProps, cvcProps } = usePaymentInputs();
  return (
    <React.Fragment>
      {/* Using the hook */}
      <PaymentInputsWrapper>
        <svg {...cardImageProps({ images })} />
        <input {...cardNumberProps()} />
        <input {...expiryDateProps()} />
        <input {...cvcProps()} />
      </PaymentInputsWrapper>

      {/* Using render props */}
      <PaymentInputsContainer>
        {({ cardNumberProps, expiryDateProps, cvcProps }) => (
          <div>
            <input {...cardNumberProps()} />
            <input {...expiryDateProps()} />
            <input {...cvcProps()} />
          </div>
        )}
      </PaymentInputsContainer>
    </React.Fragment>
  );
}

render(<Demo />, document.querySelector('#demo'));
