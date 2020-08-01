# React Native Payment Inputs

> A React Native (Android/iOS/Web) Hook & Container to help with payment card input fields.


<p align="center"><img src="./assets/react-payment-inputs.png" width="500px" style="margin-bottom: 1rem; margin-top: 1rem;"></img></p>

<p align="center"><img src="./assets/wrapper.gif" width="500px"></img></p>

- [React Payment Inputs](#react-payment-inputs)
  - [Demos](#demos)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [With hooks](#with-hooks)
  - [`data = usePaymentInputs(options)`](#data--usepaymentinputsoptions)
    - [options](#options)
      - [options.cardNumberValidator](#optionscardnumbervalidator)
        - [Example](#example)
      - [options.cvcValidator](#optionscvcvalidator)
      - [options.errorMessages](#optionserrormessages)
        - [Example](#example-1)
      - [options.expiryDateValidator](#optionsexpirydatevalidator)
      - [options.onBlur](#optionsonblur)
      - [options.onChange](#optionsonchange)
      - [options.onError](#optionsonerror)
      - [options.onTouch](#optionsontouch)
    - [`data`](#data)
      - [getCardNumberProps](#getcardnumberprops)
        - [Example snippet](#example-snippet)
      - [getExpiryDateProps](#getexpirydateprops)
        - [Example snippet](#example-snippet-1)
      - [getCVCProps](#getcvcprops)
        - [Example snippet](#example-snippet-2)
      - [getZIPProps](#getzipprops)
        - [Example snippet](#example-snippet-3)
      - [getCardImageProps](#getcardimageprops)
        - [Example snippet](#example-snippet-4)
      - [meta.cardType](#metacardtype)
        - [Example snippet](#example-snippet-5)
      - [meta.error](#metaerror)
        - [Example snippet](#example-snippet-6)
      - [meta.isTouched](#metaistouched)
      - [meta.erroredInputs](#metaerroredinputs)
        - [Example snippet](#example-snippet-7)
      - [meta.touchedInputs](#metatouchedinputs)
        - [Example snippet](#example-snippet-8)
      - [meta.focused](#metafocused)
      - [wrapperProps](#wrapperprops)
  - [License](#license)

## [Demos](https://medipass.github.io/react-payment-inputs)

## Requirements

Ensure you are running on a hooks-compatible version of React (v16.8 & above).

## Installation

```
npm install react-native-payment-inputs --save
```

or install with [Yarn](https://yarnpkg.com) if you prefer:

```
yarn add react-native-payment-inputs
```

## Usage

<p align="center"><img src="./assets/basic.gif" width="300px"></img></p>

By default (as seen above), React Native Payment Inputs does not come with built-in styling meaning that you can easily adapt React Native Payment Inputs to your own design system.

However, if you would like to use the built-in styles as seen in the animation above, [read "Using the built-in styled wrapper"](#using-the-built-in-styled-wrapper).

### With hooks

If you'd like to use the hooks version of React Payment Inputs, you can import `usePaymentInputs` into your component.

```jsx
import React, { useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { usePaymentInputs } from 'react-native-payment-inputs';

export default function PaymentInputs() {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [cvc, setCvc] = useState();
  return (
    <View>
      <TextInput {...getCardNumberProps({ onChangeText: setCardNumber, value: cardNumber })} />
      <TextInput {...getExpiryDateProps({ onChangeText: setExpiry, value: expiry })} value={expiryDate} />
      <TextInput {...getCVCProps({ onChangeText: setCvc, value: cvc })} value={cvc} />
      {meta.isTouched && meta.error && <Text>Error: {meta.error}</Text>}
    </View>
  );
}
```

> By spreading the prop getter functions (e.g. `{...getCardNumberProps()}`) on the inputs as shown above, React Native Payment Inputs will automatically handle the formatting, focus & validation logic for you.

> **IMPORTANT:** You must place your event handlers (e.g. `onChange`, `onBlur`, etc) inside the prop getter function (e.g. `getCardNumberProps()`) so the default event handlers in React Payment Inputs don't get overridden.

### More examples

- [Storybook](https://medipass.github.io/react-payment-inputs)
  - [Source](./stories/index.stories.js)

## `data = usePaymentInputs(options)`

> returns [an object (`data`)](#data)

### options

> `Object({ cardNumberValidator, cvcValidator, errorMessages, expiryValidator, onBlur, onChange, onError, onTouch  })`

#### options.cardNumberValidator
> `function({cardNumber, cardType, errorMessages})`

Set custom card number validator function

##### Example

```js
const cardNumberValidator = ({ cardNumber, cardType, errorMessages }) => {
  if (cardType.displayName === 'Visa' || cardType.displayName === 'Mastercard') {
    return;
  }
  return 'Card must be Visa or Mastercard';
}

export default function MyComponent() {
  const { ... } = usePaymentInputs({
    cardNumberValidator
  });
}
```

#### options.cvcValidator
> `function({cvc, cardType, errorMessages})`

Set custom cvc validator function


#### options.errorMessages

> `Object`

Set custom error messages for the inputs.

##### Example

```js
const ERROR_MESSAGES = {
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

export default function MyComponent() {
  const { ... } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES
  });
}
```

#### options.expiryDateValidator
> `function({expiryDate, errorMessages})`

Set custom expiry date validator function


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

#### getCardNumberProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **card number** input.

**IMPORTANT:** You must place your event handlers (e.g. `onChange`, `onBlur`, etc) inside the `getCardNumberProps()` so the default event handlers in React Payment Inputs don't get overridden.

##### Example snippet

```jsx
<input {...getCardNumberProps({ onBlur: handleBlur, onChange: handleChange })} />
```

#### getExpiryDateProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **expiry date** input.

**IMPORTANT:** You must place your event handlers (e.g. `onChange`, `onBlur`, etc) inside the `getExpiryDateProps()` so the default event handlers in React Payment Inputs don't get overridden.

##### Example snippet

```jsx
<input {...getExpiryDateProps({ onBlur: handleBlur, onChange: handleChange })} />
```

#### getCVCProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **CVC** input.

**IMPORTANT:** You must place your event handlers (e.g. `onChange`, `onBlur`, etc) inside the `getCVCProps()` so the default event handlers in React Payment Inputs don't get overridden.

##### Example snippet

```jsx
<input {...getCVCProps({ onBlur: handleBlur, onChange: handleChange })} />
```

#### getZIPProps

> `function(overrideProps)` | returns `Object<props>`

Returns the props to apply to the **ZIP** input.

**IMPORTANT:** You must place your event handlers (e.g. `onChange`, `onBlur`, etc) inside the `getZIPProps()` so the default event handlers in React Payment Inputs don't get overridden.

##### Example snippet

```jsx
<input {...getZIPProps({ onBlur: handleBlur, onChange: handleChange })} />
```

#### getCardImageProps

> `function({ images })` | returns `Object<props>`

Returns the props to apply to the **card image** SVG.

This function only supports SVG elements currently. If you have a need for another format, please raise an issue.

You can also supply [custom card images](#custom-card-images) using the `images` attribute. The example below uses the default card images from React Payment Inputs.

##### Example snippet

```jsx
import images from 'react-payment-inputs/images';

<svg {...getCardImageProps({ images })} />
```

#### meta.cardType

> Object

Returns information about the current card type, including: name, lengths and formats.

##### Example snippet

```jsx
const { meta } = usePaymentInputs();

<span>Current card: {meta.cardType.displayName}</span>
```

#### meta.error

> string

Returns the current global error between all rendered inputs.

##### Example snippet

```jsx
const { meta } = usePaymentInputs();

console.log(meta.error); // "Card number is invalid"
```

#### meta.isTouched

> boolean

Returns the current global touched state between all rendered inputs.

#### meta.erroredInputs

> Object

Returns the error message of each rendered input.

##### Example snippet

```jsx
const { meta } = usePaymentInputs();

console.log(meta.erroredInputs);
/*
{
  cardNumber: undefined,
  expiryDate: 'Enter an expiry date',
  cvc: 'Enter a CVC'
}
*/
```

#### meta.touchedInputs

> Object

Returns the touch state of each rendered input.

##### Example snippet

```jsx
const { meta } = usePaymentInputs();

console.log(meta.touchedInputs);
/*
{
  cardNumber: true,
  expiryDate: true,
  cvc: false
}
*/
```

#### meta.focused

> string

Returns the current focused input.

```jsx
const { meta } = usePaymentInputs();

console.log(meta.focused); // "cardNumber"
```

#### wrapperProps

> Object

Returns the props to apply to `<PaymentInputsWrapper>`.

## `<PaymentInputsWrapper>` props

### styles

> Object

Custom styling to pass through to the wrapper. Either a styled-component's `css` or an Object can be passed.

#### Schema

```
{
  fieldWrapper: {
    base: css | Object,
    errored: css | Object
  },
  inputWrapper: {
    base: css | Object,
    errored: css | Object,
    focused: css | Object
  },
  input: {
    base: css | Object,
    errored: css | Object,
    cardNumber: css | Object,
    expiryDate: css | Object,
    cvc: css | Object
  },
  errorText: {
    base: css | Object
  }
}
```

### errorTextProps

> Object

Custom props to pass to the error text component.

### inputWrapperProps

> Object

Custom props to pass to the input wrapper component.

## License

MIT © [Medipass Solutions Pty. Ltd.](https://github.com/medipass)
