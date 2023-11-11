import DatePicker, {
  IDatePickerConfig,
} from "@/components/DateComponents/DatePicker/DatePicker";
import { cleanup, getByText, render } from "@testing-library/react";
import {
  mockIntersectionObserver,
  restoreMockIntersectionObserver,
} from "@/utils/test/mockIntersectionObserver";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/setup/setup";



describe("Given showHeader or/and showFooter", () => {
  let data: Date | null = null;
  const toUpdateSpy = jest.fn((updatedData) => {
    data = updatedData;
  });

  const baseDatePickerConfig: IDatePickerConfig = {
    displayDay: true,
    todayIcon: false,
    nextDaysToDisplay: 31,
    showHeader: true,
    showFooter: true,
    toUpdate: toUpdateSpy,
  };

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-01-01"));
    mockIntersectionObserver();
  });

  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });
  afterEach(() => {
    cleanup();
    toUpdateSpy.mockClear();
    data = null;
  });

  afterAll(() => {
    restoreMockIntersectionObserver();
    jest.useRealTimers();
  });

  test("When click on somedayButton", async () => {
    const { getByAltText } = render(
      <DatePicker config={baseDatePickerConfig} />,
    );

    const somedayButton = getByAltText("some day setter");
    await user.click(somedayButton);

    expect(somedayButton).toBeInTheDocument();
    expect(toUpdateSpy).toHaveBeenCalled();
  });

  test("When click on todayButton", async () => {
    const expectedDataToday = new Date();

    const { getByText } = render(<DatePicker config={baseDatePickerConfig} />);

    const todayButton = getByText("Aujourd'hui");
    await user.click(todayButton);

    expect(todayButton).toBeInTheDocument();
    expect(data).toEqual(expectedDataToday);
  });

  test("When click on tonight Button", async () => {
    const expectedDataTonight = new Date();
    expectedDataTonight.setHours(18);

    const { getByText } = render(<DatePicker config={baseDatePickerConfig} />);

    const tonightButton = getByText("Ce soir");
    await user.click(tonightButton);

    expect(tonightButton).toBeInTheDocument();
    expect(data).toEqual(expectedDataTonight);
  });

  test("When showHeader and showFooter don't get set", () => {
    const config = {
      ...baseDatePickerConfig,
      showHeader: undefined,
      showFooter: undefined,
    };
    const { queryByText } = render(<DatePicker config={config} />);

    const todayButton = queryByText("Aujourd'hui");
    const tonightButton = queryByText("Ce soir");
    const someDayButton = queryByText("Some Day");

    expect(todayButton).not.toBeInTheDocument();
    expect(tonightButton).not.toBeInTheDocument();
    expect(someDayButton).not.toBeInTheDocument();
  });
});
