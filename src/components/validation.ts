const isEmail = input =>
  /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-.]+\.[a-z]{2,}$/.test(input);
const isPassword = input => /^[a-z0-9!@#$%^&*()_-]{6,}/i.test(input);
const isName = input => /^[a-zA-Z]{1,30}$/.test(input);

const setClassName = (validateBy, valid = '', invalid = 'invalid') => {
  return validateBy ? valid : invalid;
};

export const isFormValid = (formId): boolean => {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('.invalid');

  return inputs.length === 0;
};

export const validate = {
  isEmail,
  isPassword,
  isName,
  setClassName,
  isFormValid,
};
