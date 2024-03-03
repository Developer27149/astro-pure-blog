import { format } from "date-fns";

export const formatDateWithYYYYMMdd = (date: Date) => {
  const dateObj = new Date(date);
  return format(dateObj, "yyyy/MM/dd");
};

export const generatePostDateTime = (dateString: string | Date) => {
  const date = new Date(dateString);
  return format(date, "yyyy/MM/dd HH:mm");
};