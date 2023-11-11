import { IJsonResponse } from "@/api/fetch";
import { UserWithTodos } from "@/types/user";
import { QueryClient } from "@tanstack/react-query";

export const getUpdateQueryClientCallback = (queryClient: QueryClient) => {
  return (data: any, updatedTodo: Todos) => {
    queryClient.setQueryData<IJsonResponse<UserWithTodos>>(
      ["user"],
      (response) => {
        if (response === undefined) return response;

        return {
          ...response,
          data: {
            ...response.data,
            todos: response.data.todos.map((todo) => {
              if (todo._id === updatedTodo._id) {
                return updatedTodo;
              }
              return todo;
            }),
          },
        };
      }
    );
  };
};

export const getDeleteQueryClientCallback = (queryClient: QueryClient) => {
  return (data: any, todoId: string) => {
    queryClient.setQueryData<IJsonResponse<UserWithTodos>>(
      ["user"],
      (response) => {
        if (response === undefined) return response;

        return {
          ...response,
          data: {
            ...response.data,
            todos: response.data.todos.filter((todo) => todo._id !== todoId),
          },
        };
      }
    );
  };
};
