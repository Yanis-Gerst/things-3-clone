export const isSameMonth = (date1: Date | string, date2: Date | string) => {
  date1 = typeof date1 === "string" ? new Date(date1) : date1;
  date2 = typeof date2 === "string" ? new Date(date2) : date2;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const isSameWeek = (date1: Date, date2: Date) => {
  const [earliestDate, latestDate] =
    date1.getTime() < date2.getTime() ? [date1, date2] : [date2, date1];
  const dayLeftInWeek = 7 - getDayOf(earliestDate);
  const dayInMs = 86400000;

  return (
    latestDate.getTime() - earliestDate.getTime() <= dayInMs * dayLeftInWeek
  );
};

export const isSameDay = (date1: Date | string, date2: Date | string) => {
  date1 = typeof date1 === "string" ? new Date(date1) : date1;
  date2 = typeof date2 === "string" ? new Date(date2) : date2;

  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
};

export const getDaysOfMonth = (year: number, month: number) => {
  if (month <= 0 || month > 12)
    throw `Get month number: ${month}. Number must be between 1-12`;
  return new Date(year, month, 0).getDate();
};

export const getTodoOfDate = (date: Date, todos: Todos[]) => {
  return todos.filter((todo) => {
    return isSameDay(todo.toDoAt, date);
  });
};

export const getTodoOfMonth = (date: Date, todos: Todos[]) => {
  return todos.filter((todo) => isSameMonth(todo.toDoAt, date));
};

export const getTodoOfDayInterval = (
  date: Date,
  todos: Todos[],
  dayInterval: number[],
) => {
  return todos.filter((todo) => {
    const toDoAt = new Date(todo.toDoAt);
    return (
      isSameMonth(toDoAt, date) &&
      dayInterval[0] <= toDoAt.getDay() &&
      dayInterval[1] >= toDoAt.getDay()
    );
  });
};

export const numberToArray = (number: number) => [...Array(number).keys()];

export const getDayShortcut = (day: string) => `${day.substring(0, 3)}.`;

export const getMonthShortcut = (month: string) => month.substring(0, 3);

export const getNumberOfDaysBeetween = (start: Date, end: Date) => {
  let startUTC = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  let endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  let oneDay = 1000 * 60 * 60 * 24;
  return Math.floor((endUTC - startUTC) / oneDay);
};

export const addDaysToDate = (originalDate: Date, numberOfDays: number) => {
  const date = new Date(
    originalDate.getFullYear(),
    originalDate.getMonth(),
    originalDate.getDate() + numberOfDays,
  );

  return date;
};

export const addMonthToDate = (
  originalDate: Date,
  numberOfMonth: number,
  date = 0,
) => {
  if (date === 0)
    return new Date(
      originalDate.getFullYear(),
      originalDate.getMonth() + numberOfMonth + 1,
      date,
    );
  return new Date(
    originalDate.getFullYear(),
    originalDate.getMonth() + numberOfMonth,
    date,
  );
};

export const getDaysLeftOfWeek = (date: Date) => {
  if (date.getDay() === 0) return 0;
  const numberOfDayInWeek = 7;
  return numberOfDayInWeek - date.getDay();
};

export const getDayOf = (date: Date) => {
  return date.getDay() === 0 ? 7 : date.getDay();
};
