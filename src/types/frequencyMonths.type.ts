import {
  FREQUENCY_MONTHS,
  FREQUENCY_MONTHS_NUMBERS,
} from "../constants/frecuencyServices.js";

type FrequencyMonths = (typeof FREQUENCY_MONTHS)[keyof typeof FREQUENCY_MONTHS];
type FrequencyMonthsNumbers =
  (typeof FREQUENCY_MONTHS_NUMBERS)[keyof typeof FREQUENCY_MONTHS_NUMBERS];
export type { FrequencyMonths, FrequencyMonthsNumbers };
