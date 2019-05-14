import React from 'react';
import { render } from 'react-dom';

import { usePaymentInputs, PaymentInputsContainer } from '../../src';

function Demo() {
  const { cardNumberProps, expiryDateProps, cvcProps } = usePaymentInputs();
  return (
    <React.Fragment>
      {/* Using the hook */}
      <div>
        <input {...cardNumberProps()} />
        <input {...expiryDateProps()} />
        <input {...cvcProps()} />
      </div>

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
