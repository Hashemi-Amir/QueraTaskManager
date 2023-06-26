export default function getPersianDate(passedDate: string) {
  const date = new Date(passedDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", options);
  return formatter.format(date);
}

export function getPersianDateWithOutTime(passedDate: string) {
  const date = new Date(passedDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", options);
  return formatter.format(date);
}
