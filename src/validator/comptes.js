import validator from './common';

const { checkNumberChars, checkErrors, isEmailAddress, checkErrorsBtn, isNotEmpty } = validator;

module.exports = {
  usernameValidator: (value, min = 3) => checkErrors([checkNumberChars(value, min)]),
  passwordValidator: (value, min = 8) => checkErrors([checkNumberChars(value, min)]),
  emailValidator: (value) => checkErrors([isEmailAddress(value)]),
  signinValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  signupValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  isNotEmpty: (str) => isNotEmpty(str),
};
