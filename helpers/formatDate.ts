function getMonthOnly(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long" });
}
export function formateDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  } else if (date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return getMonthOnly(date);
  }
}

export function getDayMonthYear(date: string) {
  const dateObj = new Date(date); // Create a Date object

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are 0-indexed
  const year = dateObj.getFullYear();

  return day + month + year;
}
