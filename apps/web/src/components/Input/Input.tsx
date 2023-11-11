"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

import closeEyeIcon from "../../../public/assets/crosseEye.svg?url";
import eyeIcon from "../../../public/assets/eyeIcon.svg?url";
import InputIcon from "./InputIcon/InputIcon";
import errorIcon from "../../../public/assets/errorIcon.svg?url";

interface Props {
  label: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  required?: boolean | string;
}

const Input = ({ register, errors, label, type, name, required }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...inputProps } = register(name, {
    onBlur: () => {
      setIsFocus(inputRef.current?.value != "");
    },
    required: required,
  });
  return (
    <div>
      <div
        className={`relative bg-sidebar border rounded flex pr-3 ${
          errors ? "border-error" : "border-stroke"
        }`}
      >
        <label
          className={`absolute text-secondaryContent pointer-events-none top-1/2 -translate-y-1/2 left-3 bg-sidebar p-1 rounded transition-transform origin-top-left ${
            isFocus ? "-translate-y-[112.5%] scale-75 " : ""
          }`}
        >
          {label}
        </label>
        <input
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onFocus={() => setIsFocus(true)}
          {...inputProps}
          type={type == "password" ? (show ? "text" : type) : type}
          className="w-full outline-none bg-sidebar p-3 rounded"
        />
        {type == "password" && (
          <InputIcon
            src={closeEyeIcon}
            activeSrc={eyeIcon}
            stateConfig={{ state: show, setter: setShow }}
            alt="eye Icon"
          />
        )}
      </div>

      <div className="text-error text-sm mt-1">
        {errors && (
          <p className="flex items-center gap-1">
            <Image src={errorIcon} alt="error icon" width={20} height={20} />{" "}
            {errors.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
