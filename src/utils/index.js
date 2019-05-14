export * as cardTypes from './card-types';
export * as formatter from './formatter';
export * as validator from './validator';

export const BACKSPACE_KEY_CODE = 8;

export const isHighlighted = () => (window.getSelection() || { type: undefined }).type === 'Range';
