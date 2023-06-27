import jalali from "jalaali-js";

export default function getGregorianDate(iranianDateStr: string) {
  const [year, month, day, hour, minute, second] = iranianDateStr
    .split(/[^\d]/)
    .map(Number);

  const { gy, gm, gd } = jalali.toGregorian(year, month, day);

  const gregorianDate = new Date(gy, gm - 1, gd, hour, minute, second);

  const formattedDate = gregorianDate.toISOString();

  return formattedDate;
}
