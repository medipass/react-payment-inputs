import React from 'react';
import styled, { css } from 'styled-components';

const FieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  & {
    ${props => (props.hasErrored && props.styles.fieldWrapper ? props.styles.fieldWrapper.errored : undefined)};
  }

  ${props => (props.styles.fieldWrapper ? props.styles.fieldWrapper.base : undefined)};
`;
const InputWrapper = styled.div`
  align-items: center;
  border: 1px solid #bdbdbd;
  box-shadow: inset 0px 1px 2px #e5e5e5;
  border-radius: 0.2em;
  display: flex;
  padding: 0.4em 0.6em;

  & {
    ${props =>
      props.hasErrored &&
      css`
        border-color: red;
        ${props => props.styles.inputWrapper && props.styles.inputWrapper.errored};
      `};
  }

  & input {
    border: unset;
    margin: unset;
    padding: unset;
    outline: unset;

    & {
      ${props => (props.hasErrored && props.styles.input ? props.styles.input.errored : undefined)};
    }

    ${props => props.styles.input && props.styles.input.base};
  }

  & svg {
    margin-right: 0.6em;
    & {
      ${props => props.styles.cardImage};
    }
  }

  & input#cardnumber {
    width: 11rem;
    & {
      ${props => props.styles.input && props.styles.input.cardNumber};
    }
  }

  & input#expirydate {
    width: 4rem;
    & {
      ${props => props.styles.input && props.styles.input.expiryDate};
    }
  }

  & input#cvc {
    width: 2.5rem;
    & {
      ${props => props.styles.input && props.styles.input.cvc};
    }
  }

  & input#zip {
    width: 4rem;
    & {
      ${props => props.styles.input && props.styles.input.zip};
    }
  }

  ${props => (props.styles.inputWrapper ? props.styles.inputWrapper.base : undefined)};
`;
const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;

  & {
    ${props => (props.styles.errorText ? props.styles.errorText.base : undefined)};
  }
`;

function PaymentInputsWrapper(props) {
  const { children, error, errorTextProps, inputWrapperProps, isTouched, styles, ...restProps } = props;
  const hasErrored = error && isTouched;
  return (
    <FieldWrapper hasErrored={hasErrored} styles={styles} {...restProps}>
      <InputWrapper hasErrored={hasErrored} styles={styles} {...inputWrapperProps}>
        {children}
      </InputWrapper>
      {hasErrored && (
        <ErrorText styles={styles} {...errorTextProps}>
          {error}
        </ErrorText>
      )}
    </FieldWrapper>
  );
}

PaymentInputsWrapper.defaultProps = {
  styles: {}
};

export default PaymentInputsWrapper;
