import { cleanup, fireEvent, render } from "@testing-library/react";
import ContentEditableInput, { IToUpdate } from "./ContentEditableInput";
import userEvent from "@testing-library/user-event";

describe("Given data have content Hello Work", () => {
  let data = {
    content: "Hello World",
  };
  const toUpdate: IToUpdate = (updatedData) => {
    data = { ...data, ...updatedData };
  };
  let user = userEvent.setup();
  let contentEditableElement: HTMLElement;

  const assertData = (expectedContent: string) => {
    expect(contentEditableElement.textContent).toBe(expectedContent);
    expect(data.content).toBe(expectedContent);
  };

  beforeEach(() => {
    data = { content: "Hello World" };
    user = userEvent.setup();
    const { getByText } = render(
      <ContentEditableInput field="content" toUpdate={toUpdate}>
        {data.content}
      </ContentEditableInput>,
    );
    contentEditableElement = getByText(data.content);
  });

  afterEach(() => {
    cleanup();
  });

  test("When write ' Goodbye' on input", async () => {
    const expectedContent = "Hello World Goodbye";

    await user.type(contentEditableElement, " Goodbye");
    fireEvent.blur(contentEditableElement);

    assertData(expectedContent);
  });

  test("When clear the input", async () => {
    const expectedContent = "";

    await user.click(contentEditableElement);
    await user.clear(contentEditableElement);
    fireEvent.blur(contentEditableElement);

    assertData(expectedContent);
  });

  test("When remove one character on input", async () => {
    const expectedContent = "Hello Worl";

    await user.type(contentEditableElement, "a{backspace}{backspace}");
    fireEvent.blur(contentEditableElement);

    assertData(expectedContent);
  });

  test("When don't change data", async () => {
    const expectedContent = "Hello World";

    await user.click(contentEditableElement);
    fireEvent.blur(contentEditableElement);

    assertData(expectedContent);
  });
});
