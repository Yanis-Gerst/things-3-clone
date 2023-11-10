import DateButton from "./DateButton";
import { cleanup, render } from "@testing-library/react";
import FunctionContextProvider from "@/utils/FunctionContextProvider";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/setup/setup";
import {
  mockConsoleErrorFn,
  restoreMockConsoleError,
} from "@/utils/test/mockConsoleError";

describe("Given submitDateValue as 2020-01-01", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  test("When click on DateButton date get update", async () => {
    let data = new Date("2022-02-02");
    const expectedData = new Date("2020-01-01");
    const toUpdate = (updatedData: Date) => {
      data = updatedData;
    };

    const { getByText } = render(
      <FunctionContextProvider value={toUpdate}>
        <DateButton submitDateValue={new Date(expectedData.getTime())}>
          Set your Data
        </DateButton>{" "}
      </FunctionContextProvider>,
    );

    const dateButtonElement = getByText("Set your Data");
    await user.click(dateButtonElement);

    expect(data).toEqual(expectedData);
  });
});

describe("Given no Function Context Provider", () => {
  beforeAll(() => {
    mockConsoleErrorFn();
  });

  afterAll(() => {
    restoreMockConsoleError();
  });

  it("Should throw Error", () => {
    expect(() =>
      render(
        <DateButton submitDateValue={new Date("2020-01-01")}>
          Set your Date
        </DateButton>,
      ),
    ).toThrow(
      `Provide a functionContext toUpdate data with the component DateButton`,
    );
  });
});
