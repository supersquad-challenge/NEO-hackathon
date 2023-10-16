export function daysBetweenDates(rawDate1: string, rawDate2: string) {
  const date1 = new Date(rawDate1);
  const date2 = new Date(rawDate2);

  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const durationWeeks = Math.floor(diffDays / 7) + 1;
  let weekOrWeeks = "";
  if (durationWeeks == 1) {
    weekOrWeeks = "week";
  } else if (durationWeeks > 1) {
    weekOrWeeks = "weeks";
  }

  return `${durationWeeks} ${weekOrWeeks}`;
}
