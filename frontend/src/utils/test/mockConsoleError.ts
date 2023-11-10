let mockConsoleError: any;
export const mockConsoleErrorFn = () => {
  mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => jest.fn());
};

export const restoreMockConsoleError = () => {
  mockConsoleError.mockRestore();
};
