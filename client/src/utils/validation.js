import Validator from "validatorjs";

const loginRule = {
  identifier: "required|string",
  password: "required|string",
};

const signUpRule = {
  email: "required|email",
  password: "required|string",
  name: "required|string",
  username: "required|string",
};

const noteRule = {
  title: "required|string",
  text: "required|string",
};

export const loginSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (loginRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: loginRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const loginAllValidation = (data) => {
  const validation = new Validator(data, loginRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

export const signUpSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (signUpRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: signUpRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const signUpAllValidation = (data) => {
  const validation = new Validator(data, signUpRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

export const noteSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (noteRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: noteRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const noteAllValidation = (data) => {
  const validation = new Validator(data, noteRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
