import {
  getDaysOfMonth,
  getDaysLeftOfWeek,
  getNumberOfDaysBeetween,
} from "./date";

type ICase = [Date, { monthDay: number; weekDay: number }];
const cases: ICase[] = [
  [new Date("2019-12-30"), { monthDay: 31, weekDay: 6 }],
  [new Date("2020-01-05"), { monthDay: 31, weekDay: 0 }],
  [new Date("2020-02-05"), { monthDay: 29, weekDay: 4 }],
  [new Date("2019-02-05"), { monthDay: 28, weekDay: 5 }],
  [new Date("2020-04-04"), { monthDay: 30, weekDay: 1 }],
];

describe("Get Number of Days in Month or Week", () => {
  test.each(cases)(
    "MONTH: given %p as argurments, return %p",
    (date, expectedResult) => {
      const result = getDaysOfMonth(date.getFullYear(), date.getMonth() + 1);
      expect(result).toEqual(expectedResult.monthDay);
    }
  );

  test.each(cases)(
    "WEEK: given %p as argurments, return %p",
    (date, expectedResult) => {
      const result = getDaysLeftOfWeek(date);
      expect(result).toEqual(expectedResult.weekDay);
    }
  );
});

const dayBetweenCase: [Date, Date, number][] = [
  [new Date("2020-01-01"), new Date("2020-01-31"), 30],
  [new Date("2020-01-05"), new Date("2020-01-12"), 7],
  [new Date("2020-01-01"), new Date("2020-01-01"), 0],
  [new Date("2020-01-01"), new Date("2020-01-02"), 1],
  [new Date("2020-01-02"), new Date("2020-01-01"), -1],
  [new Date("2020-01-31"), new Date("2020-01-1"), -30],
  [new Date("2020-01-01"), new Date("2020-01-31"), 30],
];

test.each(dayBetweenCase)(
  "GetNumberOfDaysBeetween given %p and %p as agurments return %p",
  (startDate, endDate, expectedResult) => {
    const result = getNumberOfDaysBeetween(startDate, endDate);
    expect(result).toEqual(expectedResult);
  }
);
