"use client";

import React from "react";

import { TransferProvider } from "./TransferProvider";
import { LoansProvider }  from "./LoansProvider";
import { StocksProvider } from "./StocksProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TransferProvider>
      <LoansProvider>
        <StocksProvider>
          {children}
        </StocksProvider>
      </LoansProvider>
    </TransferProvider>
  );
};
