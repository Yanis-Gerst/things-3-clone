import { IJsonResponse } from "@/api/fetch";
import { UserWithTodos } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";

export const useRetrieveUser = () => {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData([
    "user",
  ]) as IJsonResponse<UserWithTodos>;
  return user;
};
