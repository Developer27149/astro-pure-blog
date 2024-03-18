import { format } from "date-fns";
import { format as relativeFormat } from "timeago.js";

export const formatDateWithYYYYMMdd = (date: Date) => {
  const dateObj = new Date(date);
  return format(dateObj, "yyyy/MM/dd");
};

export const generatePostDateTime = (dateString: string | Date) => {
  const date = new Date(dateString);
  return format(date, "yyyy/MM/dd HH:mm");
};

export const calcRelativeDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return relativeFormat(date, "zh_CN");
};