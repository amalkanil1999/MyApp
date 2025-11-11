// Validators.js

export const nameValidator = txt => /^[A-Za-z]*$/.test(txt);

export const emailValidator = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const passwordValidator = pass =>
  pass.length >= 8;
