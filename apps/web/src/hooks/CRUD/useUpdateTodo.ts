import { updateTodo } from "@/api/fetch";
import { getUpdateQueryClientCallback } from "@/utils/clientData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodo = () => {
  //TODO: Cancel l'update si y'a une erreur
  const queryClient = useQueryClient();
  const update = getUpdateQueryClientCallback(queryClient);
  const updateTodoMutation = useMutation(updateTodo);
  return (updatedTodo: Todos) => {
    update({}, updatedTodo);
    updateTodoMutation.mutate(updatedTodo);
  };
};
