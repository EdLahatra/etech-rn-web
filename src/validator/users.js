const validatorEntinty = require('./common');

const Validators = {
  checkErrors: (errors) => errors.filter((curr) => (curr.check)),
  checkNumberChars: (value, nb) => ({
    msg: `Must be at least ${nb} chars long`,
    check: value.length < nb,
  }),
  isEmailAddress: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return {
      msg: 'Email is invalid',
      check: !pattern.test(str),
    };
  },
  isNotEmpty: (str) => {
    const pattern = /\S+/;
    return {
      msg: ' is empty',
      check: pattern.test(str),
    };
  },
  isMin: (value, nb) => !(value.length >= nb),
  isEnum: (value, enumData) => !(enumData && enumData.includes(value)),
  isRequired: (str) => !(/\S+/.test(str)),
  isArrayData: (data) => !(data && Array.isArray(data)),
  isArrayValidator: (data) => !(data && Array.isArray(data)),
  checkIsObjectNotEmpty: (obj) => (obj && Object.keys(obj).length > 0 && obj.constructor === Object),
  isArrayRibs: (data) => {
    const testData = Array.isArray(data) && data.some(i => i.length > 20);
    return {
      msg: 'Rib is not valid, ribs is array of rib must 20 chars long',
      check: !testData,
    };
  },
  isArray: (data) => ({
      msg: `${data} is not Array`,
      check: !Array.isArray(data),
    }),
  isNumeric: (str) => {
    const pattern = /^\d+$/;
    return {
      msg: `${str} is not Number`,
      check: !pattern.test(str),
    };
  },
  isSame: (str1, str2) => ({
    msg: `${str1 + str2} is not same`,
    check: str1 !== str2,
  }),
  checkErrorsBtn: (errors, fields) => fields.reduce((acc, curr) => (errors[curr] ? errors[curr].length > 0 || acc : acc), false),
};

const { checkNumberChars, checkErrors, checkErrorsBtn, isNotEmpty } = Validators;

const model = [
  {
    type: 'string',
    name: 'email',
    validators: {
      required: true,
      min: 5,
    },
    message: 'Indentifians est min 5 lettres',
  },
  {
    name: 'password',
    type: 'string',
    validators: {
      min: 8,
      required: true,
    },
    message: 'Password est min 8 lettres',
  },
  {
    name: 'role',
    type: 'number',
    validators: {
      enumData: [1, 2],
      required: true,
    },
    message: 'Role est numbre 1 ou 2',
  },
];

module.exports = {
  usernameValidator: (value, min = 3) => checkErrors([checkNumberChars(value, min)]),
  passwordValidator: (value, min = 8) => checkErrors([checkNumberChars(value, min)]),
  emailValidator: (value, min = 5) => checkErrors([checkNumberChars(value, min)]),
  signinValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  signupValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  isNotEmpty: (str) => isNotEmpty(str),
  validatorUsers: (intputs) => validatorEntinty(intputs, model),
};
