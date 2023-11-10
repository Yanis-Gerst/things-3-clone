import DayInterval from "@/components/DateComponents/DayInterval/DayInterval";
import { cleanup, queryAllByText, render } from "@testing-library/react";
import {
  mockConsoleErrorFn,
  restoreMockConsoleError,
} from "@/utils/test/mockConsoleError";
import FunctionContextProvider from "@/utils/FunctionContextProvider";

describe("Given correct date interval", () => {
  const renderDayInterval = (startDate: Date, endDate: Date) =>
    render(
      <FunctionContextProvider value={() => null}>
        <DayInterval start={startDate} end={endDate} />,
      </FunctionContextProvider>,
    );

  afterEach(() => {
    cleanup();
  });

  test("When give January 2020 interval", () => {
    const startDate = new Date("2020-01-01");
    const endDate = new Date("2020-01-31");
    const { getByText } = renderDayInterval(startDate, endDate);

    for (let i = 1; i < 32; i++) {
      const dateElement = getByText(`${i}`);
      expect(dateElement).toBeInTheDocument();
    }
  });

  test("When January to February 2020 interval", () => {
    const startDate = new Date("2020-01-01");
    const endDate = new Date("2020-02-28");
    const { queryAllByText } = renderDayInterval(startDate, endDate);

    for (let i = 1; i < 29; i++) {
      expect(queryAllByText(`${i}`)).toHaveLength(2);
    }

    for (let i = 29; i < 32; i++) {
      expect(queryAllByText(`${i}`)).toHaveLength(1);
    }
  });
});

describe("Given correct Data interval and displayStartMonth option", () => {
  afterEach(() => {
    cleanup();
  });

  test("When give December Interval", () => {
    const startDate = new Date("2020-12-01");
    const endDate = new Date("2020-12-31");

    const { getByText } = render(
      <FunctionContextProvider value={() => null}>
        {" "}
        <DayInterval
          start={startDate}
          end={endDate}
          displayStartMonth={true}
        />{" "}
      </FunctionContextProvider>,
    );

    expect(getByText("dec")).toBeInTheDocument();
  });
});

describe("Given incorrect date interval", () => {
  const errorCase = [
    [new Date("2020-01-02"), new Date("2020-01-01")],
    [new Date("2020-01-01"), new Date("2019-01-01")],
    [new Date("2020-01-01"), new Date("2019-12-30")],
    [new Date("2020-01-02"), new Date("2020-01-01")],
  ];

  beforeAll(() => {
    mockConsoleErrorFn();
  });

  afterAll(() => {
    restoreMockConsoleError();
  });

  afterEach(() => {
    cleanup();
  });

  test.each(errorCase)(
    "Start Date is %p and end Date is %p, should throw an error",
    (startDay: Date, endDay: Date) => {
      expect(() => {
        render(
          <FunctionContextProvider value={() => null}>
            <DayInterval start={startDay} end={endDay} />
          </FunctionContextProvider>,
        );
      }).toThrowError("Date Interval must be at least zero day apart");
    },
  );
});
