const NAME_REGEX = /^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$/;
const NOT_SPACES = /^\S(?:.*\S)?$/;
const PASSWORD_REGEX =
  /^(?=.{6,}$)(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@!#~%&^$<>?¿])\S*$/;
export { NAME_REGEX, NOT_SPACES, PASSWORD_REGEX };
