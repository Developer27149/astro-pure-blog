import { format } from "date-fns";

export const formatDateWithYYYYMM = (date: Date) => {
  const dateObj = new Date(date);
  return format(dateObj, "yyyy/MM/dd");
};
