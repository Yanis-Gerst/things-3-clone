import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../Input/Input";

export type FormFields = {
  label: string;
  required?: boolean;
  name?: string;
  type?: string;
};
interface Props<T> {
  onSubmit: (data: T) => void;
  className?: string;
  fieldsConfig: FormFields[];
  children?: React.ReactNode;
}

const Form = <T extends FieldValues>({
  onSubmit,
  className = "",
  fieldsConfig,
  children,
}: Props<T>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<T>();

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 mb-4">
        {fieldsConfig.map((fieldConfig) => {
          return (
            <Input
              key={fieldConfig.label}
              register={register}
              label={fieldConfig.label}
              name={
                fieldConfig.name
                  ? fieldConfig.name
                  : fieldConfig.label.toLowerCase()
              }
              type={fieldConfig.type ? fieldConfig.type : "text"}
              required={fieldConfig.required}
            />
          );
        })}
      </div>
      {children}
    </form>
  );
};

export default Form;
