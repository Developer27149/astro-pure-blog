export const formatDateWithYYYYMM = (date: Date) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()} · ${dateObj.getMonth() + 1}`;
};
