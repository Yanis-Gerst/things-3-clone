import React, { createContext } from "react";

export const UserIdContext = createContext<string>("");

interface Props {
  value: string;
  children: React.ReactNode;
}

const UserIdProvider = ({ value, children }: Props) => {
  return (
    <UserIdContext.Provider value={value}>{children}</UserIdContext.Provider>
  );
};

export default UserIdProvider;
