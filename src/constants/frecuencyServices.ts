const FREQUENCY_MONTHS = {
  monthly: "monthly",
  quarterly: "quarterly",
  semiannually: "semiannually",
  yearly: "yearly",
} as const;
const FREQUENCY_MONTHS_NUMBERS = {
  monthly: 3,
  quarterly: 4,
  semiannually: 6,
  yearly: 6,
} as const;

export { FREQUENCY_MONTHS, FREQUENCY_MONTHS_NUMBERS };
