"use client";

import { useTranslation } from "react-i18next";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Stock {
  name: string;
  value: number;
  DY: number;
  image: string;
};

interface StocksContextType {
  aboutStocks: boolean;
  stockList: Stock[];
  quantities: Record<string, number>;
  inputQuantities: Record<string, number>;
  handleAboutStocks: () => void;
  setInputQuantities: (q: Record<string, number>) => void;
  handleBuyStock: (stock: Stock) => Promise<void>;
  handleSellStock: (stock: Stock) => Promise<void>;
};

const StocksContext = createContext<StocksContextType | undefined>(undefined);

export function StocksProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [aboutStocks, setAboutStocks] = useState<boolean>(false);

  const stockList: Stock[] = [
    { name: 'NFLX', value: 1096.46, DY: 0.12, image: 'https://images.squarespace-cdn.com/content/v1/520b6dcee4b0734e32e29746/1553092004466-AP3WPCPOMHBJ87PJ67LG/Netflix_anim.gif' },
    { name: 'META', value: 544.33, DY: 0.18, image: 'https://cdn.dribbble.com/userupload/6171212/file/original-4591cc3d8ca4a9f6cbe8081f7c6d16e0.gif' },
    { name: 'MSFT', value: 387.48, DY: 0.25, image: 'https://cdn.dribbble.com/userupload/8472166/file/original-65fb3730cfeab1ad524d18422822b19d.gif' },
    { name: 'TSLA', value: 276.06, DY: 0.10, image: 'https://cdn.dribbble.com/userupload/41955440/file/original-937ac7f0d1ebb4bb13fdeb708572f370.gif' },
    { name: 'IBM',  value: 233.28, DY: 0.17, image: 'https://cdn.dribbble.com/userupload/21277586/file/original-858569c9cf6f8916271ce4fd8b395f4f.gif' },
    { name: 'AAPL', value: 208.39, DY: 0.20, image: 'https://i.pinimg.com/originals/be/cb/ca/becbca09cc81c9ecd1ce133c836b3f25.gif' },
    { name: 'AMZN', value: 185.32, DY: 0.15, image: 'https://cdn.dribbble.com/userupload/33976764/file/original-b0b9939526b22e903102754acf37c0dc.gif' },
    { name: 'GOOGL', value: 163.85, DY: 0.30, image: 'https://compote.slate.com/images/2f2fc6b0-96b7-4bf7-812a-dcaa8c6ce3d6.gif' },
    { name: 'ORCL', value: 138.49, DY: 0.19, image: 'https://media.licdn.com/dms/image/v2/D5622AQEoaHFKaOQRPg/feedshare-shrink_800/B56ZTdWju7GsAg-/0/1738880467294?e=2147483647&v=beta&t=keATgpHKMLupYGVzcOBPs9fAoRsHwh6-Nn0cOkAryOw' },
    { name: 'NVDA', value: 106.84, DY: 0.28, image: 'https://cdn.dribbble.com/userupload/4297888/file/original-e73618428a72133a58c0dbec1c913e5f.gif' },
    { name: 'AMD',  value: 94.86, DY: 0.14, image: 'https://media.licdn.com/dms/image/v2/D4D22AQFDYJjF6wNWfg/feedshare-shrink_800/feedshare-shrink_800/0/1732302376814?e=2147483647&v=beta&t=TY5gJPBxNE0Li30kUCPnG7YJ2zoKs17ZTgsluggU4Vk' },
    { name: 'DIS',  value: 90.05, DY: 0.22, image: 'https://cdn.dribbble.com/userupload/35046911/file/original-f9d61c61af64c245505602bf22ff4221.gif' },
    { name: 'CSCO', value: 56.68, DY: 0.20, image: 'https://i.pinimg.com/originals/54/68/bf/5468bf0cb6dcdeab64c17731dac360ae.gif' },
    { name: 'INTC', value: 20.23, DY: 0.16, image: 'https://cdn.dribbble.com/userupload/37149117/file/original-cd71a75571c26ab61d28598dbe4ea4fe.gif' },
  ];

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [inputQuantities, setInputQuantities] = useState<Record<string, number>>({});

  const handleAboutStocks = () => setAboutStocks(prev => !prev);

  const handleBuyStock = async (stock: Stock) => {
    const qty = inputQuantities[stock.name];
    if (!qty || qty <= 0) {
      alert(t("stockQuantity"));
      return;
    };

    try {
      await axios.post('http://back-end:8080/stock/buy', {
        value: stock.value,
        quantity: qty,
      });
      setQuantities(prev => ({ ...prev, [stock.name]: (prev[stock.name] || 0) + qty }));
      setInputQuantities(prev => ({ ...prev, [stock.name]: 0 }));
      alert(t("stockBought"));
    } catch {
      alert(t("stockBoughtError"));
    };

    await axios.post('http://back-end:8080/transfer/stock', {
      amount: stock.value * qty,
      recipient: stock.name,
    });
  };

  const handleSellStock = async (stock: Stock) => {
    const qty = inputQuantities[stock.name];

    if (!qty || qty <= 0 || (quantities[stock.name] || 0) < qty) {
      alert(t("stockQuantity"));
      return;
    };

    try {
      await axios.post('http://back-end:8080/stock/sell', {
        value: stock.value,
        quantity: qty,
      });

      setQuantities(prev => ({ ...prev, [stock.name]: prev[stock.name] - qty }));
      setInputQuantities(prev => ({ ...prev, [stock.name]: 0 }));
      alert(t("stockSold"));
    } catch {
      alert(t("stockSoldError"));
    };
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const stock of stockList) {
        const qty = quantities[stock.name];
        if (qty > 0) {
          await axios.put('http://back-end:8080/stock/DY', {
            value: stock.value,
            quantity: qty,
            DY: stock.DY,
          });
        };
      };
    }, 5000);
    return () => clearInterval(interval);
  }, [quantities]);

  return (
    <StocksContext.Provider
      value={{
        aboutStocks,
        stockList,
        quantities,
        inputQuantities,
        handleAboutStocks,
        setInputQuantities,
        handleBuyStock,
        handleSellStock,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

export function useStocks() {
  const context = useContext(StocksContext);
  if (!context) {
    throw new Error("useStocks must be used within a StocksProvider");
  };
  return context;
};
