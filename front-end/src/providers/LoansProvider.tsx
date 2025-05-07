"use client";

import { useTranslation } from "react-i18next";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface LoansContextType {
  aboutLoans: boolean;
  value: number;
  ir: number;
  months: number;
  remainingMonths: number;
  monthlyInstallment: number;
  handleAboutLoans: () => void;
  handleRequestLoan: (loanValue: number, loanIr: number, loanMonths: number) => Promise<void>;
};

const LoansContext = createContext<LoansContextType | undefined>(undefined);

export function LoansProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [aboutLoans, setAboutLoans] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [ir, setIr] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  const handleAboutLoans = () => {
    setAboutLoans(!aboutLoans);
  };

  const handleRequestLoan = async (loanValue: number, loanIr: number, loanMonths: number) => {
    try {
      setValue(loanValue);
      setIr(loanIr);
      setMonths(loanMonths);
      setRemainingMonths(loanMonths);

      const { data } = await axios.post("http://back-end:8080/loan/request", {
        value: loanValue,
        ir: loanIr,
        months: loanMonths,
      });

      setMonthlyInstallment(data.monthlyInstallment);

      await axios.post('http://back-end:8080/transfer/loan', {
        amount: loanValue,
        sender: "StarBank",
      });
    } catch (error) {
      alert(t("loanRequestedError"));
    };
  };

  useEffect(() => {
    if (monthlyInstallment > 0 && remainingMonths > 0) {
      const interval = setInterval(async () => {
        try {
          await axios.put("http://back-end:8080/loan/repay", null, {
            params: { installment: monthlyInstallment },
          });
          setRemainingMonths(prev => prev - 1);
        } catch (error) {
          alert(t("loanRepaymentError"));
        };
      }, 1000);

      return () => clearInterval(interval);
    };
  }, [monthlyInstallment, remainingMonths]);

  return (
    <LoansContext.Provider
      value={{
        aboutLoans,
        value,
        ir,
        months,
        remainingMonths,
        monthlyInstallment,
        handleAboutLoans,
        handleRequestLoan,
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

export function useLoans() {
  const context = useContext(LoansContext);
  if (!context) {
    throw new Error("useLoans must be used within a LoansProvider");
  };
  return context;
};
