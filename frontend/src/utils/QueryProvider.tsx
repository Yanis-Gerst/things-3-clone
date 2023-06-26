"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

function QueryProvider({ children }: React.PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
