import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaymentInputsWrapper, usePaymentInputs } from '../src';
import images from '../src/images';

storiesOf('usePaymentInputs', module)
  .add('basic (no styles)', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cvcProps } = usePaymentInputs();
      return (
        <div>
          <div>
            <input {...cardNumberProps()} />
          </div>
          <div>
            <input {...expiryDateProps()} />
          </div>
          <div>
            <input {...cvcProps()} />
          </div>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cvcProps, cardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...cardImageProps({ images })} />
            <input {...cardNumberProps()} />
            <input {...expiryDateProps()} />
            <input {...cvcProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (with ZIP)', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cvcProps, zipProps, cardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...cardImageProps({ images })} />
            <input {...cardNumberProps()} />
            <input {...expiryDateProps()} />
            <input {...cvcProps()} />
            <input {...zipProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (no CVC)', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...cardImageProps({ images })} />
            <input {...cardNumberProps()} />
            <input {...expiryDateProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  });
