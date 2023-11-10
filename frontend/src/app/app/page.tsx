"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IJsonResponse, getSessionUser } from "@/api/fetch";
import { UserWithTodos } from "@/types/user";
import MainSection from "@/layout/MainSection/MainSection";
import ToolbarProvider from "@/utils/ToolbarProvider";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import UserIdProvider from "@/context/UserIdProvider";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const App = () => {
  const queryClient = useQueryClient();
  const { data: response } = useQuery<IJsonResponse<UserWithTodos>>({
    queryKey: ["user"],
    queryFn: async () => {
      const sessionUser = await getSessionUser();
      console.log(sessionUser);
      if (sessionUser.status === "sucess") {
        queryClient.setQueryData(["user"], sessionUser);
      }
      return sessionUser;
    },
  });

  const user = response?.data;
  const [activeTabs, setActiveTab] = useState(0);
  const router = useRouter();
  console.log(user);
  if (!user) {
    return;
  }

  return (
    <div className="flex w-full">
      <UserIdProvider value={user._id}>
        <Sidebar activeTabs={activeTabs} setActiveTab={setActiveTab} />

        <ToolbarProvider>
          <MainSection index={activeTabs} todos={user.todos} />
        </ToolbarProvider>
      </UserIdProvider>
    </div>
  );
};

const naviguateToLogInPage = (router: AppRouterInstance) => {
  router.push("/");
};

export default App;
