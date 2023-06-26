import { updateTodo } from "@/api/fetch";
import { useTodoContext } from "@/hooks/useTodoContext";
import { TodoFieldContext } from "@/utils/TodoFieldProvider";
import { getUpdateQueryClientCallback } from "@/utils/clientData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";

interface Props {
  date: Date;
  children: React.ReactNode;
}
const DateInput: React.FC<Props> = ({ date, children }) => {
  const todoField = useContext(TodoFieldContext);
  if (!todoField) throw Error("Provide TodoFiel context for DateInput");
  const todo = useTodoContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateTodo, {
    onSuccess: getUpdateQueryClientCallback(queryClient),
  });

  const submit = () => {
    if (!todo) return;
    mutation.mutate({
      ...todo,
      [todoField]: date,
    });
  };
  return (
    <div onClick={submit} className="w-full">
      {children}
    </div>
  );
};

export default DateInput;
