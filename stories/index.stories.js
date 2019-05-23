import React from 'react';

import { storiesOf } from '@storybook/react';
import { css } from 'fannypack';

import { PaymentInputsContainer, PaymentInputsWrapper, usePaymentInputs } from '../src';
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
  })
  .add('custom error messages', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cvcProps, cardImageProps, wrapperProps } = usePaymentInputs({
        errorMessages: {
          emptyCardNumber: 'El número de la tarjeta es inválido',
          invalidCardNumber: 'El número de la tarjeta es inválido',
          emptyExpiryDate: 'La fecha de expiración es inválida',
          monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
          yearOutOfRange: 'El año de expiración no puede estar en el pasado',
          dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
          invalidExpiryDate: 'La fecha de expiración es inválida',
          emptyCVC: 'El código de seguridad es inválido',
          invalidCVC: 'El código de seguridad es inválido'
        }
      });
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
  .add('styled wrapper (with custom styling)', () => {
    function Component() {
      const { cardNumberProps, expiryDateProps, cvcProps, cardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper
            {...wrapperProps}
            styles={{
              fieldWrapper: {
                base: css`
                  margin-bottom: 1rem;
                `
              },
              inputWrapper: {
                base: css`
                  border-color: green;
                `,
                errored: css`
                  border-color: maroon;
                `
              },
              input: {
                base: css`
                  color: green;
                `,
                errored: css`
                  color: maroon;
                `,
                cardNumber: css`
                  width: 15rem;
                `,
                expiryDate: css`
                  width: 10rem;
                `,
                cvc: css`
                  width: 5rem;
                `
              },
              errorText: {
                base: css`
                  color: maroon;
                `
              }
            }}
          >
            <svg {...cardImageProps({ images })} />
            <input {...cardNumberProps()} />
            <input {...expiryDateProps()} />
            <input {...cvcProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  });

storiesOf('PaymentInputsContainer', module)
  .add('basic (no styles)', () => {
    function Component() {
      return (
        <PaymentInputsContainer>
          {({ cardNumberProps, expiryDateProps, cvcProps }) => (
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
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  })
  .add('styled wrapper', () => {
    function Component() {
      return (
        <PaymentInputsContainer>
          {({ cardNumberProps, expiryDateProps, cvcProps, cardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...cardImageProps({ images })} />
              <input {...cardNumberProps()} />
              <input {...expiryDateProps()} />
              <input {...cvcProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (with ZIP)', () => {
    function Component() {
      return (
        <PaymentInputsContainer>
          {({ cardNumberProps, expiryDateProps, cvcProps, zipProps, cardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...cardImageProps({ images })} />
              <input {...cardNumberProps()} />
              <input {...expiryDateProps()} />
              <input {...cvcProps()} />
              <input {...zipProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (no CVC)', () => {
    function Component() {
      return (
        <PaymentInputsContainer>
          {({ cardNumberProps, expiryDateProps, cardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...cardImageProps({ images })} />
              <input {...cardNumberProps()} />
              <input {...expiryDateProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  })
  .add('custom error messages', () => {
    function Component() {
      return (
        <PaymentInputsContainer
          errorMessages={{
            emptyCardNumber: 'El número de la tarjeta es inválido',
            invalidCardNumber: 'El número de la tarjeta es inválido',
            emptyExpiryDate: 'La fecha de expiración es inválida',
            monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
            yearOutOfRange: 'El año de expiración no puede estar en el pasado',
            dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
            invalidExpiryDate: 'La fecha de expiración es inválida',
            emptyCVC: 'El código de seguridad es inválido',
            invalidCVC: 'El código de seguridad es inválido'
          }}
        >
          {({ cardNumberProps, expiryDateProps, cardImageProps, cvcProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...cardImageProps({ images })} />
              <input {...cardNumberProps()} />
              <input {...expiryDateProps()} />
              <input {...cvcProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (with custom styling)', () => {
    function Component() {
      return (
        <PaymentInputsContainer
          errorMessages={{
            emptyCardNumber: 'El número de la tarjeta es inválido',
            invalidCardNumber: 'El número de la tarjeta es inválido',
            emptyExpiryDate: 'La fecha de expiración es inválida',
            monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
            yearOutOfRange: 'El año de expiración no puede estar en el pasado',
            dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
            invalidExpiryDate: 'La fecha de expiración es inválida',
            emptyCVC: 'El código de seguridad es inválido',
            invalidCVC: 'El código de seguridad es inválido'
          }}
        >
          {({ cardNumberProps, expiryDateProps, cvcProps, cardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper
              {...wrapperProps}
              styles={{
                fieldWrapper: {
                  base: css`
                    margin-bottom: 1rem;
                  `
                },
                inputWrapper: {
                  base: css`
                    border-color: green;
                  `,
                  errored: css`
                    border-color: maroon;
                  `
                },
                input: {
                  base: css`
                    color: green;
                  `,
                  errored: css`
                    color: maroon;
                  `,
                  cardNumber: css`
                    width: 15rem;
                  `,
                  expiryDate: css`
                    width: 10rem;
                  `,
                  cvc: css`
                    width: 5rem;
                  `
                },
                errorText: {
                  base: css`
                    color: maroon;
                  `
                }
              }}
            >
              <svg {...cardImageProps({ images })} />
              <input {...cardNumberProps()} />
              <input {...expiryDateProps()} />
              <input {...cvcProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  });
