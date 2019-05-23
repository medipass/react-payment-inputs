# React Payment Inputs

> A zero-dependency React Hook & Container to help with payment card input fields.

<p align="center"><img src="./react-payment-inputs.png" width="500px" style="margin-bottom: 1rem; margin-top: 1rem;"></img></p>

<p align="center"><img src="./wrapper.gif" width="500px"></img></p>

- [React Payment Inputs](#react-payment-inputs)
  - [Demos](#demos)
  - [Installation](#installation)
  - [Usage](#usage)
    - [With hooks](#with-hooks)
    - [With render props](#with-render-props)
    - [Using the built-in styled wrapper](#using-the-built-in-styled-wrapper)
    - [Using a third-party UI library](#using-a-third-party-ui-library)
      - [Fannypack](#fannypack)
      - [Bootstrap](#bootstrap)
    - [More examples](#more-examples)
  - [`usePaymentInputs(options)`](#usepaymentinputsoptions)
    - [options](#options)
      - [options.errorMessages](#optionserrormessages)
        - [Example](#example)
      - [options.onBlur](#optionsonblur)
      - [options.onChange](#optionsonchange)
      - [options.onError](#optionsonerror)
      - [options.onTouch](#optionsontouch)
    - [`data`](#data)
      - [cardNumberProps](#cardnumberprops)
      - [expiryDateProps](#expirydateprops)
      - [cvcProps](#cvcprops)
  - [Usage with a form library](#usage-with-a-form-library)
    - [Formik](#formik)
    - [React Final Form](#react-final-form)
    - [Redux Form](#redux-form)
  - [Custom error messages](#custom-error-messages)
  - [Global event handlers](#global-event-handlers)
  - [Metadata](#metadata)
  - [Customising the in-built style wrapper](#customising-the-in-built-style-wrapper)
  - [License](#license)

## [Demos](#TODO)

## Installation

```
npm install react-payment-inputs --save
```

or install with [Yarn](https://yarnpkg.com) if you prefer:

```
yarn add react-payment-inputs
```

## Usage

<p align="center"><img src="./basic.gif" width="300px"></img></p>

By default (as seen above), React Payment Inputs does not come with built-in styling. If you would like to use the built-in styles as seen in the animation above, [read "Using the built-in styled wrapper"](#using-the-built-in-styled-wrapper).

### With hooks

If you'd like to use the hooks version of React Payment Inputs, you can import `usePaymentInputs` into your component.

```jsx
import React from 'react';
import { usePaymentInputs } from 'react-payment-inputs';

export default function PaymentInputs() {
  const { meta, cardNumberProps, expiryDateProps, cvcProps } = usePaymentInputs();
  return (
    <div>
      <input {...cardNumberProps()} />
      <input {...expiryDateProps()} />
      <input {...cvcProps()} />
      {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
    </div>
  );
}
```

> By spreading props (e.g. `{...cardNumberProps()}`) on the inputs as shown above, React Payment Inputs will automatically handle the formatting, focus & validation logic for you.

### With render props

If you'd like to use the render props version of React Payment Inputs, you can import `PaymentInputsContainer` into your component.

```jsx
import React from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';

export default function PaymentInputs() {
  return (
    <PaymentInputsContainer>
      {({ meta, cardNumberProps, expiryDateProps, cvcProps }) => (
        <div>
          <input {...cardNumberProps()} />
          <input {...expiryDateProps()} />
          <input {...cvcProps()} />
          {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
        </div>
      )}
    </PaymentInputsContainer>
  );
}
```

### Using the built-in styled wrapper

By default, React Payment Inputs does not have built-in styling for it's inputs. However, React Payment Inputs comes with a styled wrapper which combines the card number, expiry & CVC fields seen below:

<p align="center"><img src="./wrapper.gif" width="500px"></img></p>

```jsx
import React from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function PaymentInputs() {
  const {
    wrapperProps,
    cardImageProps,
    cardNumberProps,
    expiryDateProps,
    cvcProps
  } = usePaymentInputs();
  return (
    <PaymentInputsWrapper {...wrapperProps}>
      <svg {...cardImageProps({ images })} />
      <input {...cardNumberProps()} />
      <input {...expiryDateProps()} />
      <input {...cvcProps()} />
    </PaymentInputsWrapper>
  );
}
```

### Using a third-party UI library

React Payment Inputs allows you to integrate into pretty much any React UI library. Below are a couple of examples of how you can fit React Payment Inputs into a UI library using `usePaymentInputs`. You can also do the same with `<PaymentInputsContainer>`.

#### Fannypack

<p align="center"><img src="./fannypack.gif" width="500px"></img></p>

```jsx
import React from 'react';
import { FieldSet, InputField } from 'fannypack';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function PaymentInputs() {
  const {
    meta,
    cardNumberProps,
    expiryDateProps,
    cvcProps
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  return (
    <FieldSet isHorizontal>
      <InputField
        // Here is where React Payment Inputs injects itself into the input element.
        {...cardNumberProps()}
        placeholder="0000 0000 0000 0000"
        label="Card number"
        inputRef={cardNumberProps().ref}
        // You can retrieve error state by making use of the error & touched attributes in `meta`.
        state={erroredInputs.cardNumber && touchedInputs.cardNumber ? 'danger' : undefined}
        validationText={touchedInputs.cardNumber && erroredInputs.cardNumber}
        maxWidth="15rem"
      />
      <InputField
        {...expiryDateProps()}
        label="Expiry date"
        inputRef={expiryDateProps().ref}
        state={erroredInputs.expiryDate && touchedInputs.expiryDate ? 'danger' : undefined}
        validationText={touchedInputs.expiryDate && erroredInputs.expiryDate}
        maxWidth="8rem"
      />
      <InputField
        {...cvcProps()}
        placeholder="123"
        label="CVC"
        inputRef={cvcProps().ref}
        state={erroredInputs.cvc && touchedInputs.cvc ? 'danger' : undefined}
        validationText={touchedInputs.cvc && erroredInputs.cvc}
        maxWidth="5rem"
      />
    </FieldSet>
  );
}
```

#### Bootstrap

<p align="center"><img src="./bootstrap.gif" width="500px"></img></p>

```jsx
import React from 'react';
import { FieldSet, InputField } from 'fannypack';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function PaymentInputs() {
  const {
    meta,
    cardNumberProps,
    expiryDateProps,
    cvcProps
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} style={{ maxWidth: '15rem' }}>
          <Form.Label>Card number</Form.Label>
          <Form.Control
            // Here is where React Payment Inputs injects itself into the input element.
            {...cardNumberProps()}
            // You can retrieve error state by making use of the error & touched attributes in `meta`.
            isInvalid={touchedInputs.cardNumber && erroredInputs.cardNumber}
            placeholder="0000 0000 0000 0000"
          />
          You can retrieve error state by making use of the error & touched attributes in `meta`.
          <Form.Control.Feedback type="invalid">{erroredInputs.cardNumber}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} style={{ maxWidth: '10rem' }}>
          <Form.Label>Expiry date</Form.Label>
          <Form.Control
            {...expiryDateProps()}
            isInvalid={touchedInputs.expiryDate && erroredInputs.expiryDate}
          />
          <Form.Control.Feedback type="invalid">{erroredInputs.expiryDate}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} style={{ maxWidth: '7rem' }}>
          <Form.Label>CVC</Form.Label>
          <Form.Control
            {...cvcProps()}
            isInvalid={touchedInputs.cvc && erroredInputs.cvc}
            placeholder="123"
          />
          <Form.Control.Feedback type="invalid">{erroredInputs.cvc}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
```

### More examples

- [Storybook](TODO)
  - [Source](./stories/index.stories.js)

## `usePaymentInputs(options)`

> returns [an object (`data`)](#data)

### options

> `Object({ errorMessages, onBlur, onChange, onError, onTouch })`

#### options.errorMessages

> `Object`

Set custom error messages for the inputs.

##### Example

```js
const { ... } = usePaymentInputs({
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
})
```

#### options.onBlur

> `function(event)`

Function to handle the blur event on the inputs. It is invoked when any of the inputs blur.

#### options.onChange

> `function(event)`

Function to handle the change event on the inputs. It is invoked when any of the inputs change.

#### options.onError

> `function(error, erroredInputs)`

Function to invoke when any of the inputs error.

#### options.onTouch

> `function(touchedInput, touchedInputs)`

Function to invoke when any of the inputs are touched.

### `data`

#### cardNumberProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **card number** input.

#### expiryDateProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **expiry date** input.

#### cvcProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **CVC** input.

## Usage with a form library

### Formik

### React Final Form

### Redux Form

## Custom error messages

## Global event handlers

## Metadata

## Customising the in-built style wrapper

## License

MIT © [Medipass Solutions Pty. Ltd.](https://github.com/medipass)
