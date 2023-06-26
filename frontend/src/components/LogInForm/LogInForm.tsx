import { ILogUserData, getUserWithTodos } from "@/api/fetch";
import { useLogin } from "@/hooks/useLogin";
import React from "react";
import Form, { FormFields } from "../Form/Form";
import Button from "../Button/Button";

const LogInForm = () => {
  const logger = useLogin(getUserWithTodos, "/app");
  const onSubmit = (data: ILogUserData) => {
    logger({
      ...data,
    });
  };
  const fieldsConfig: FormFields[] = [
    {
      label: "E-mail",
      name: "mail",
      required: true,
    },
    {
      label: "Password",
      required: true,
      type: "password",
    },
  ];
  return (
    <Form onSubmit={onSubmit} fieldsConfig={fieldsConfig} className="mb-3">
      <Button>Log in</Button>
    </Form>
  );
};

export default LogInForm;
