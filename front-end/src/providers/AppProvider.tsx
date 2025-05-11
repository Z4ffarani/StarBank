"use client";

import React from "react";

import { UserProvider } from "../context/UserContext"; 
import { TransferProvider } from "./TransferProvider";
import { LoansProvider }  from "./LoansProvider";
import { StocksProvider } from "./StocksProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <TransferProvider>
        <LoansProvider>
          <StocksProvider>
            {children}
          </StocksProvider>
        </LoansProvider>
      </TransferProvider>
    </UserProvider>
  );
};
