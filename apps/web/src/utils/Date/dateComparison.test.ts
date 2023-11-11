import * as utilsDate from "./date";

type ICases = [
  Date,
  Date,
  { sameMonth: boolean; sameWeek: boolean; sameDay: boolean }
];

const cases: ICases[] = [
  [
    new Date("2020-01-01"),
    new Date("2020-01-01"),
    { sameDay: true, sameMonth: true, sameWeek: true },
  ],
  [
    new Date("2020-01-01"),
    new Date("2020-01-02"),
    { sameDay: false, sameMonth: true, sameWeek: true },
  ],
  [
    new Date("2020-01-01"),
    new Date("2020-02-02"),
    { sameDay: false, sameMonth: false, sameWeek: false },
  ],
  [
    new Date("2020-01-01"),
    new Date("2021-01-01"),
    { sameDay: false, sameMonth: false, sameWeek: false },
  ],
  [
    new Date("2020-01-01"),
    new Date("2019-12-31"),
    { sameDay: false, sameMonth: false, sameWeek: true },
  ],
  [
    new Date("2020-01-01"),
    new Date("2020-01-05"),
    { sameDay: false, sameMonth: true, sameWeek: true },
  ],
  [
    new Date("2020-01-01"),
    new Date("2020-01-06"),
    { sameDay: false, sameMonth: true, sameWeek: false },
  ],
  [
    new Date("2023-06-25"),
    new Date("2023-07-05"),
    { sameDay: false, sameMonth: false, sameWeek: false },
  ],
  [
    new Date("2023-06-25"),
    new Date("2023-06-26"),
    { sameDay: false, sameMonth: true, sameWeek: false },
  ],
];

describe("Comparaison function", () => {
  test.each(cases)(
    "MONTH COMPARAISON: given %p and %p as argurments, return %p",
    (firstDate, secondDate, expectedResult) => {
      const result = utilsDate.isSameMonth(firstDate, secondDate);
      expect(result).toEqual(expectedResult.sameMonth);
    }
  );

  test.each(cases)(
    "DAY COMPARAISON: given %p and %p as argurments, return %p",
    (firstDate, secondDate, expectedResult) => {
      const result = utilsDate.isSameDay(firstDate, secondDate);
      expect(result).toEqual(expectedResult.sameDay);
    }
  );

  test.each(cases)(
    "WEEK COMPARAISON: given %p and %p as argurments, return %p",
    (firstDate, secondDate, expectedResult) => {
      const result = utilsDate.isSameWeek(firstDate, secondDate);
      expect(result).toEqual(expectedResult.sameWeek);
    }
  );
});
