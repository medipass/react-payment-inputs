import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  align-items: center;
  border: 1px solid #bdbdbd;
  box-shadow: inset 0px 1px 2px #e5e5e5;
  border-radius: 0.2em;
  display: flex;
  padding: 0.4em 0.6em;

  ${props =>
    props.hasErrored &&
    css`
      border-color: red;
    `};

  & input {
    border: unset;
    margin: unset;
    padding: unset;
    outline: unset;
    font-size: 16px;
  }

  & svg {
    margin-right: 0.6em;
  }

  & input#cardnumber {
    width: 11rem;
  }

  & input#expirydate {
    width: 4rem;
  }

  & input#cvc {
    width: 2.5rem;
  }
`;
const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export default function PaymentInputsWrapper(props) {
  const { children, error, isTouched, ...restProps } = props;
  const hasErrored = error && isTouched;
  return (
    <Wrapper>
      <InputWrapper hasErrored={hasErrored} {...restProps}>
        {children}
      </InputWrapper>
      {hasErrored && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
