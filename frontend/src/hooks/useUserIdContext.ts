import { UserIdContext } from "@/context/UserIdProvider";
import { useContext } from "react";

export const useUserIdContext = () => {
  return useContext(UserIdContext);
};
