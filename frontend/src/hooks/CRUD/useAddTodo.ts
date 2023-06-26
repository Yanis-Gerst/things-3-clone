import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserWithTodos } from "../../types/user";
import { IJsonResponse, postTodo } from "../../api/fetch";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(postTodo, {
    onSuccess: ({ data: todoId }, variables) => {
      queryClient.setQueryData<IJsonResponse<UserWithTodos>>(
        ["user"],
        (response) => {
          if (response === undefined) return response;
          const { data } = response;
          return {
            ...response,
            data: {
              ...data,
              todos: [...data.todos, { ...variables, _id: todoId }],
            },
          };
        }
      );
    },
  });

  return mutation.mutate;
};
