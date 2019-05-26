import React from 'react';
import { storiesOf } from '@storybook/react';
import { Formik, Field as FormikField } from 'formik';
import { Form, Field as FinalFormField } from 'react-final-form';
import { css, Button, FieldSet, InputField } from 'fannypack';
import { Col, Form as BSForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { PaymentInputsContainer, PaymentInputsWrapper, usePaymentInputs } from '../src';
import images from '../src/images';

storiesOf('usePaymentInputs', module)
  .add('basic (no styles)', () => {
    function Component() {
      const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
      return (
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
          {meta.error && meta.isTouched && <div>{meta.error}</div>}
        </div>
      );
    }

    return <Component />;
  })
  .add('styled wrapper', () => {
    function Component() {
      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getCardImageProps,
        wrapperProps
      } = usePaymentInputs();
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
      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getZIPProps,
        getCardImageProps,
        wrapperProps
      } = usePaymentInputs();
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
      const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        getCardImageProps,
        wrapperProps
      } = usePaymentInputs();
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
      const { getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, wrapperProps } = usePaymentInputs(
        {
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
        }
      );
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
            {...getCardNumberProps({ refKey: 'inputRef' })}
            placeholder="0000 0000 0000 0000"
            label="Card number"
            state={meta.erroredInputs.cardNumber && meta.touchedInputs.cardNumber ? 'danger' : undefined}
            validationText={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber}
            maxWidth="15rem"
          />
          <InputField
            {...getExpiryDateProps({ refKey: 'inputRef' })}
            label="Expiry date"
            state={meta.erroredInputs.expiryDate && meta.touchedInputs.expiryDate ? 'danger' : undefined}
            validationText={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate}
            maxWidth="8rem"
          />
          <InputField
            {...getCVCProps({ refKey: 'inputRef' })}
            placeholder="123"
            label="CVC"
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
        <BSForm>
          <BSForm.Row>
            <BSForm.Group as={Col} style={{ maxWidth: '15rem' }}>
              <BSForm.Label>Card number</BSForm.Label>
              <BSForm.Control
                {...getCardNumberProps()}
                isInvalid={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber}
                placeholder="0000 0000 0000 0000"
              />
              <BSForm.Control.Feedback type="invalid">{meta.erroredInputs.cardNumber}</BSForm.Control.Feedback>
            </BSForm.Group>
            <BSForm.Group as={Col} style={{ maxWidth: '10rem' }}>
              <BSForm.Label>Expiry date</BSForm.Label>
              <BSForm.Control
                {...getExpiryDateProps()}
                isInvalid={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate}
              />
              <BSForm.Control.Feedback type="invalid">{meta.erroredInputs.expiryDate}</BSForm.Control.Feedback>
            </BSForm.Group>
            <BSForm.Group as={Col} style={{ maxWidth: '7rem' }}>
              <BSForm.Label>CVC</BSForm.Label>
              <BSForm.Control
                {...getCVCProps()}
                isInvalid={meta.touchedInputs.cvc && meta.erroredInputs.cvc}
                placeholder="123"
              />
              <BSForm.Control.Feedback type="invalid">{meta.erroredInputs.cvc}</BSForm.Control.Feedback>
            </BSForm.Group>
          </BSForm.Row>
        </BSForm>
      );
    }

    return <Component />;
  })
  .add('using a form library (Formik)', () => {
    function Component() {
      const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps
      } = usePaymentInputs();

      return (
        <Formik
          initialValues={{
            cardNumber: '',
            expiryDate: '',
            cvc: ''
          }}
          onSubmit={data => console.log(data)}
          validate={() => {
            let errors = {};
            if (meta.erroredInputs.cardNumber) {
              errors.cardNumber = meta.erroredInputs.cardNumber;
            }
            if (meta.erroredInputs.expiryDate) {
              errors.expiryDate = meta.erroredInputs.expiryDate;
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc;
            }
            return errors;
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <PaymentInputsWrapper {...wrapperProps}>
                  <svg {...getCardImageProps({ images })} />
                  <FormikField name="cardNumber">
                    {({ field }) => (
                      <input {...getCardNumberProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                    )}
                  </FormikField>
                  <FormikField name="expiryDate">
                    {({ field }) => (
                      <input {...getExpiryDateProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                    )}
                  </FormikField>
                  <FormikField name="cvc">
                    {({ field }) => <input {...getCVCProps({ onBlur: field.onBlur, onChange: field.onChange })} />}
                  </FormikField>
                </PaymentInputsWrapper>
              </div>
              <Button marginTop="major-2" type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      );
    }

    return <Component />;
  })
  .add('using a form library (React Final Form)', () => {
    function Component() {
      const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps
      } = usePaymentInputs();

      return (
        <Form
          onSubmit={data => console.log(data)}
          validate={() => {
            let errors = {};
            if (meta.erroredInputs.cardNumber) {
              errors.cardNumber = meta.erroredInputs.cardNumber;
            }
            if (meta.erroredInputs.expiryDate) {
              errors.expiryDate = meta.erroredInputs.expiryDate;
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc;
            }
            return errors;
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <PaymentInputsWrapper {...wrapperProps}>
                  <svg {...getCardImageProps({ images })} />
                  <FinalFormField name="cardNumber">
                    {({ input }) => (
                      <input {...getCardNumberProps({ onBlur: input.onBlur, onChange: input.onChange })} />
                    )}
                  </FinalFormField>
                  <FinalFormField name="expiryDate">
                    {({ input }) => (
                      <input {...getExpiryDateProps({ onBlur: input.onBlur, onChange: input.onChange })} />
                    )}
                  </FinalFormField>
                  <FinalFormField name="cvc">
                    {({ input }) => <input {...getCVCProps({ onBlur: input.onBlur, onChange: input.onChange })} />}
                  </FinalFormField>
                </PaymentInputsWrapper>
              </div>
              <Button marginTop="major-2" type="submit">
                Submit
              </Button>
            </form>
          )}
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
        <PaymentInputsContainer>
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
