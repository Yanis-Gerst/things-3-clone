import React, { forwardRef } from "react";

export type IToUpdate = (updatedData: object) => void;
interface Props {
  field: string;
  children: string;
  className?: string;
  toUpdate: IToUpdate;
}

const ContentEditableInput = forwardRef<HTMLSpanElement, Props>(
  ({ field, children, className, toUpdate }, ref) => {
    const handleUpdate = (e: React.FocusEvent<HTMLSpanElement>) => {
      toUpdate({ [field]: e.target.textContent });
    };

    const handleFocus = (e: React.FocusEvent<HTMLSpanElement>) => {
      let range, selection;
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(e.target); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection?.removeAllRanges(); //remove any selections already made
      selection?.addRange(range); //make the range you have just created the visible selection
    };

    return (
      <span
        className={`bg-transparent outline-none w-full pr-2 empty:before:text-secondaryContent cursor-text ${className}`}
        contentEditable
        onBlur={handleUpdate}
        data-field={field}
        suppressContentEditableWarning={true}
        ref={ref}
        onFocus={handleFocus}
      >
        {children}
      </span>
    );
  }
);

ContentEditableInput.displayName = "ContentEditableInput";

export default ContentEditableInput;
