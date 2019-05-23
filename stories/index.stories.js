import React from 'react';

import { storiesOf } from '@storybook/react';
import { LayoutSet, css, FieldSet, InputField } from 'fannypack';
import { Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { PaymentInputsContainer, PaymentInputsWrapper, usePaymentInputs } from '../src';
import images from '../src/images';

storiesOf('usePaymentInputs', module)
  .add('basic (no styles)', () => {
    function Component() {
      const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
      console.log(meta);
      return (
        <LayoutSet spacing="major-1">
          <div>
            <input {...getCardNumberProps()} />
          </div>
          <div>
            <input {...getExpiryDateProps()} />
          </div>
          <div>
            <input {...getCVCProps()} />
          </div>
          {meta.error && meta.isTouched && <div>{meta.error}</div>}
        </LayoutSet>
      );
    }

    return <Component />;
  })
  .add('styled wrapper', () => {
    function Component() {
      const { getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (with ZIP)', () => {
    function Component() {
      const { getCardNumberProps, getExpiryDateProps, getCVCProps, getZIPProps, getCardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
            <input {...getZIPProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (no CVC)', () => {
    function Component() {
      const { getCardNumberProps, getExpiryDateProps, getCardImageProps, wrapperProps } = usePaymentInputs();
      return (
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper (with custom styling)', () => {
    function Component() {
      const { getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps } = usePaymentInputs();
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
                `,
                focused: css`
                  border-color: unset;
                  box-shadow: unset;
                  outline: 2px solid blue;
                  outline-offset: 2px;
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
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('custom error messages', () => {
    function Component() {
      const { getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps } = usePaymentInputs({
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
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
          </PaymentInputsWrapper>
        </div>
      );
    }

    return <Component />;
  })
  .add('using a UI library (Fannypack)', () => {
    function Component() {
      const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
      return (
        <FieldSet isHorizontal>
          <InputField
            {...getCardNumberProps()}
            placeholder="0000 0000 0000 0000"
            label="Card number"
            inputRef={getCardNumberProps().ref}
            state={meta.erroredInputs.cardNumber && meta.touchedInputs.cardNumber ? 'danger' : undefined}
            validationText={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber}
            maxWidth="15rem"
          />
          <InputField
            {...getExpiryDateProps()}
            label="Expiry date"
            inputRef={getExpiryDateProps().ref}
            state={meta.erroredInputs.expiryDate && meta.touchedInputs.expiryDate ? 'danger' : undefined}
            validationText={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate}
            maxWidth="8rem"
          />
          <InputField
            {...getCVCProps()}
            placeholder="123"
            label="CVC"
            inputRef={getCVCProps().ref}
            state={meta.erroredInputs.cvc && meta.touchedInputs.cvc ? 'danger' : undefined}
            validationText={meta.touchedInputs.cvc && meta.erroredInputs.cvc}
            maxWidth="5rem"
          />
        </FieldSet>
      );
    }

    return <Component />;
  })
  .add('using a UI library (Bootstrap)', () => {
    function Component() {
      const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
      return (
        <Form>
          <Form.Row>
            <Form.Group as={Col} style={{ maxWidth: '15rem' }}>
              <Form.Label>Card number</Form.Label>
              <Form.Control
                {...getCardNumberProps()}
                isInvalid={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber}
                placeholder="0000 0000 0000 0000"
              />
              <Form.Control.Feedback type="invalid">{meta.erroredInputs.cardNumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} style={{ maxWidth: '10rem' }}>
              <Form.Label>Expiry date</Form.Label>
              <Form.Control
                {...getExpiryDateProps()}
                isInvalid={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate}
              />
              <Form.Control.Feedback type="invalid">{meta.erroredInputs.expiryDate}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} style={{ maxWidth: '7rem' }}>
              <Form.Label>CVC</Form.Label>
              <Form.Control
                {...getCVCProps()}
                isInvalid={meta.touchedInputs.cvc && meta.erroredInputs.cvc}
                placeholder="123"
              />
              <Form.Control.Feedback type="invalid">{meta.erroredInputs.cvc}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Form>
      );
    }

    return <Component />;
  });

storiesOf('PaymentInputsContainer', module)
  .add('basic (no styles)', () => {
    function Component() {
      return (
        <PaymentInputsContainer>
          {({ getCardNumberProps, getExpiryDateProps, getCVCProps }) => (
            <div>
              <div>
                <input {...getCardNumberProps()} />
              </div>
              <div>
                <input {...getExpiryDateProps()} />
              </div>
              <div>
                <input {...getCVCProps()} />
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
          {({ getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} />
              <input {...getExpiryDateProps()} />
              <input {...getCVCProps()} />
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
          {({ getCardNumberProps, getExpiryDateProps, getCVCProps, getZIPProps, getCardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} />
              <input {...getExpiryDateProps()} />
              <input {...getCVCProps()} />
              <input {...getZIPProps()} />
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
          {({ getCardNumberProps, getExpiryDateProps, getCardImageProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} />
              <input {...getExpiryDateProps()} />
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
          {({ getCardNumberProps, getExpiryDateProps, getCardImageProps, getCVCProps, wrapperProps }) => (
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} />
              <input {...getExpiryDateProps()} />
              <input {...getCVCProps()} />
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
          {({ getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps }) => (
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
              <svg {...getCardImageProps({ images })} />
              <input {...getCardNumberProps()} />
              <input {...getExpiryDateProps()} />
              <input {...getCVCProps()} />
            </PaymentInputsWrapper>
          )}
        </PaymentInputsContainer>
      );
    }

    return <Component />;
  });
