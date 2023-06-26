import { deleteTodo } from "@/api/fetch";
import { getDeleteQueryClientCallback } from "@/utils/clientData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: getDeleteQueryClientCallback(queryClient),
  });

  return deleteTodoMutation.mutate;
};
