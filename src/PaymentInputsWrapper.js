import React from 'react';

import './PaymentInputsWrapper.css';

export default function PaymentInputsWrapper(props) {
  const { children, className, ...restProps } = props;
  return (
    <div className={`payment-inputs-wrapper${className ? ` ${className}` : ''}`} {...restProps}>
      {children}
    </div>
  );
}
