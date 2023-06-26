import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTodoContext } from "../useTodoContext";
import { deleteTodo } from "@/api/fetch";
import { getDeleteQueryClientCallback } from "@/utils/clientData";
import { useEffect } from "react";

export const useCompleteTodo = (completeState: boolean) => {
  const todo = useTodoContext() as Todos;
  const queryClient = useQueryClient();
  const completeMutation = useMutation(deleteTodo, {
    onSuccess: getDeleteQueryClientCallback(queryClient),
  });

  useEffect(() => {
    if (!completeState) return;
    const timeoutId = setTimeout(() => {
      completeMutation.mutate(todo?._id);
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [completeState, todo._id, completeMutation]);
};
