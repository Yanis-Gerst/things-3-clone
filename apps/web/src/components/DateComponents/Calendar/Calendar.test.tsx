import Calendar from "@/components/DateComponents/Calendar/Calendar";
import {
  cleanup,
  getAllByRole,
  getByAltText,
  getByText,
  queryAllByText,
  render,
} from "@testing-library/react";
import FunctionContextProvider from "@/utils/FunctionContextProvider";
import {
  mockIntersectionObserver,
  restoreMockIntersectionObserver,
} from "@/utils/test/mockIntersectionObserver";
import userEvent from "@testing-library/user-event";
import { getDayOf, numberToArray } from "@/utils/Date/date";

//TODO: Display Day Test

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2020-01-01"));
  mockIntersectionObserver();
});
afterEach(() => {
  cleanup();
});

afterAll(() => {
  restoreMockIntersectionObserver();
  jest.useRealTimers();
});

describe("Given a number of days", () => {
  const updateTestCase: [number, Date][] = numberToArray(31).map((number) => [
    number + 1,
    new Date(`2020-01-${number + 1}`),
  ]);

  test.each(updateTestCase)(
    "%p Day of January, expected date %p",
    async (dayNumber, expectedDate) => {
      const user = userEvent.setup({ delay: null });
      let data = null;
      const { getAllByRole } = render(
        <FunctionContextProvider
          value={(updateDate: Date) => {
            data = updateDate;
          }}
        >
          {" "}
          <Calendar nextDayToDisplay={31} displayStartMonth todayIcon={false} />
        </FunctionContextProvider>,
      );
      const januaryDay = getAllByRole("button")[dayNumber - 1];

      await user.click(januaryDay);

      expect(data).toEqual(expectedDate);
    },
  );

  test("When give 2 Month to display", () => {
    const expectedNumberOfDays = 31 + 29;
    const { getAllByRole, getByText } = render(
      <FunctionContextProvider value={() => {}}>
        {" "}
        <Calendar
          nextDayToDisplay={expectedNumberOfDays}
          displayStartMonth
          todayIcon={false}
        />
      </FunctionContextProvider>,
    );

    const januaryElement = getByText("jan");

    const dateButtons = getAllByRole("button");

    expect(januaryElement).toBeInTheDocument();
    expect(dateButtons).toHaveLength(expectedNumberOfDays);
  });
});

describe("Given boolean Props like todayIcon and Display Day", () => {
  const allDaysText = ["mon.", "tue.", "sun."];

  test("When displayDay set to true", async () => {
    const { getByText } = render(
      <FunctionContextProvider value={() => {}}>
        {" "}
        <Calendar nextDayToDisplay={31} displayStartMonth displayDay={true} />
      </FunctionContextProvider>,
    );

    allDaysText.forEach((dayText) => {
      const dayElement = getByText(dayText);
      expect(dayElement).toBeInTheDocument();
    });
  });

  test("When displayDay set to false", () => {
    const { queryByText } = render(
      <FunctionContextProvider value={() => {}}>
        {" "}
        <Calendar nextDayToDisplay={31} displayStartMonth displayDay={false} />
      </FunctionContextProvider>,
    );

    allDaysText.forEach((dayText) => {
      const dayElement = queryByText(dayText);
      expect(dayElement).not.toBeInTheDocument();
    });
  });

  test("When todayIcon set to true", async () => {
    const { getByAltText } = render(
      <FunctionContextProvider value={() => {}}>
        {" "}
        <Calendar nextDayToDisplay={31} displayStartMonth todayIcon={true} />
      </FunctionContextProvider>,
    );
    const todayElement = getByAltText("Today");

    expect(todayElement).toBeInTheDocument();
  });

  test("When todayIcon set to false", async () => {
    const { queryByAltText, getByText } = render(
      <FunctionContextProvider value={() => {}}>
        {" "}
        <Calendar nextDayToDisplay={31} displayStartMonth todayIcon={false} />
      </FunctionContextProvider>,
    );
    const todayElement = queryByAltText("Today");
    const firstDay = getByText("jan");

    expect(todayElement).not.toBeInTheDocument();
    expect(firstDay).toBeInTheDocument();
  });
});
