import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface TransferContextType {
  amount: number;
  recipient: string;
  password: string;
  message: string;
  setAmount: (value: number) => void;
  setRecipient: (value: string) => void;
  setPassword: (value: string) => void;
  setMessage: (value: string) => void;
  handleTransfer: (e: React.FormEvent) => Promise<void>;
};

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export const TransferProvider = ({ children }: { children: React.ReactNode }) => {
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const { t } = useTranslation();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!amount || !recipient || !password || !message) {
        alert(t('allFieldsRequired'));
        return;
      };

      const response = await axios.put("http://back-end:8080/transfer", {
        amount,
        recipient,
        password,
        message,
      });

      if (response.status === 200) {
        alert(t('transferSuccess'));
      };

    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(t('transferToSelforInsufficientBalance'));
      } else if (error.response?.status === 409) {
        alert(t('transferConflict'));
      } else {
        alert(t('transferInfoError'));
      };
    };
  };

  return (
    <TransferContext.Provider
      value={{ amount, recipient, password, message, setAmount, setRecipient, setPassword, setMessage, handleTransfer }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error("useTransfer must be used within a TransferProvider");
  };
  return context;
};
