const generatePaymentDates = (date: Date) => {
  const dates: Date[] = [];
};

const isValidDate = (dateService: string) => {
  const [year, month] = dateService.split("-").map(Number);
  const today = new Date();
  let band = false;
  if (year && month)
    band = year === today.getFullYear() && month === today.getMonth() + 1;
  return band;
};

export { generatePaymentDates, isValidDate };
