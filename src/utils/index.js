import * as cardTypes from './cardTypes';
import * as formatter from './formatter';
import * as validator from './validator';

export const BACKSPACE_KEY_CODE = 'Backspace';
export const ENTER_KEY_CODE = 'Enter';

export const isHighlighted = () => (window.getSelection() || { type: undefined }).type === 'Range';

export default {
  cardTypes,
  formatter,
  validator,
  BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE,
  isHighlighted
};
