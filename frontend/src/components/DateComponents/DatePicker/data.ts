export const daysName = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const emptyTodo = (userId: string): Todos => ({
  _id: "",
  title: "",
  createdAt: new Date(),
  toDoAt: new Date(),
  deadlineAt: new Date(),
  userId,
  descriptions: "",
});
