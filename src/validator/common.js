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

const validatorList = {
  required: {
    key: 'required',
    message: 'is required',
  },
  min: {
    key: 'min',
    message: 'Must be at least 3 chars long',
  },
  enumData: {
    key: 'enumData',
    message: 'is invalid',
  },
  isArrayValid: {
    key: 'isArrayValid',
    message: 'Array is invalid',
  },
};

const validatorType = ({ type, validator = {}, value }) => {
  const { isMin, isArrayValidator, isRequired, isEnum, isArrayData } = Validators;
  const { min, required, enumData, isArrayValid } = validatorList;
  const keys = Object.keys(validator)[0];
  const values = Object.values(validator)[0];
  switch (keys) {
    case isArrayValid.key:
      return isArrayData(value) ? isArrayValid : false;
    case min.key:
      if (type === 'array') {
        const isTabs = isArrayValidator(value);
        if (!isTabs) {
          const tab = value.some(elem => elem.length < 20);
          return tab ? isArrayValid : false;
        }
        return isArrayValid;
      }
      return isMin(value, values) ? min : false;
    case required.key:
      return isRequired(value) ? required : false;
    case enumData.key:
      return isEnum(value, values) ? enumData : false;
    default:
      return true;
  }
};

const validatorEntinty = (data, model) => {
  const { checkIsObjectNotEmpty, isArrayData } = Validators;
  if (checkIsObjectNotEmpty(data) && !isArrayData(model)) {
    const vald = model.reduce((acc, { name, type, validators, message }) => {
      const value = data[name];
      if (validators) {
        if (!value) {
          return [...acc, { message, messages: { name, message }, name }];
        }
        const dataValidator = Object.keys(validators);
        const messages = dataValidator.reduce((ac, key) => {
          const validator = { [key]: validators[key] };
          const isvalid = validatorType({ type, validator, value });
          if (isvalid) {
            return [...ac, { name, message }];
          }
          return ac;
        }, []);
        if (messages && messages.length > 0) {
          return [...acc, { message, name, messages }];
        }
      }
      return acc;
    }, []);
    return vald;
  }
  return false;
};

module.exports = validatorEntinty;
