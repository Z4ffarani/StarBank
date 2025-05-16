"use client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import i18nLocales from "../../i18nLocales";
import { useTranslation } from "next-i18next";

import { motion } from "framer-motion";
import axios from 'axios';

import { FaArrowLeft } from "react-icons/fa";

import Logo from "../../../public/logos/logo.png";
import UsaFlag from "../../../public/images/usa-flag.png";
import ChinaFlag from "../../../public/images/china-flag.png";
import IndiaFlag from "../../../public/images/india-flag.png";
import SpainFlag from "../../../public/images/spain-flag.png";
import BrazilFlag from "../../../public/images/brazil-flag.png";
import RussiaFlag from "../../../public/images/russia-flag.png";
import FranceFlag from "../../../public/images/france-flag.png";
import GermanyFlag from "../../../public/images/germany-flag.png";
import JapanFlag from "../../../public/images/japan-flag.png";
import ItalyFlag from "../../../public/images/italy-flag.png";

import SbStock from "../../../public/images/sb-stock.png";
import SbBuilding from "../../../public/images/sb-building.png";

import TransferPage from "./transfer";
import LoansPage from "./loans";
import StocksPage from "./stocks";
import HistoricPage from "./historic";
import SettingsPage from "./settings";

import HomeIcon from "../../../public/icons/home.png";
import TransferIcon from "../../../public/icons/transfer.png";
import LoansIcon from "../../../public/icons/loans.png";
import StocksIcon from "../../../public/icons/stocks.png";
import HistoricIcon from "../../../public/icons/historic.png";

import SettingsIcon from "../../../public/icons/settings.png";
import LogoutIcon from "../../../public/icons/logout.png";

import EyeOpen from "../../../public/icons/eye-open.png";
import EyeClosed from "../../../public/icons/eye-closed.png";

import { useUserContext } from "../../context/UserContext";

export default function Home() {
  const router = useRouter();

  const { t, i18n } = useTranslation();
  const lng = i18n.language || "en";

  const flag = lng === "en" ? UsaFlag
    : lng === "zh" ? ChinaFlag
    : lng === "hi" ? IndiaFlag
    : lng === "es" ? SpainFlag
    : lng === "pt-BR" ? BrazilFlag
    : lng === "ru" ? RussiaFlag
    : lng === "fr" ? FranceFlag
    : lng === "de" ? GermanyFlag
    : lng === "ja" ? JapanFlag
    : lng === "it" ? ItalyFlag
    : UsaFlag;

  const languages = ['en', 'zh', 'hi', 'es', 'pt-BR', 'ru', 'fr', 'de', 'ja', 'it'];

  const changeLanguage = () => {
    const current = i18n.language;
    const nextIndex = (languages.indexOf(current) + 1) % languages.length;
    i18nLocales.changeLanguage(languages[nextIndex]);
  };
  
  const [activePage, setActivePage] = useState<string | null>(null);
  
  const [time, setTime] = useState(new Date());
  const [balance, setBalance] = useState<number>(0);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [aboutStocks, setAboutStocks] = useState<boolean>(false);
  const stockList = [
    { name: 'SB', value: 5000, DY: 0.50 },
  ];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [inputQuantities, setInputQuantities] = useState<Record<string, number>>({});
  const [aboutLoans, setAboutLoans] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [ir, setIr] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);

  const { emailContext } = useUserContext();
  
  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };
  
  const fetchBalance = async () => {
    await handleBalance();
  };

  const handleBalance = async () => {
    if (!emailContext) {
      alert(t('sessionExpired'));
      router.push('/');
      return;
    };
    
    try {
      const response = await axios.get(`${backendUrl}/user`);
      const allUsers = response.data;
      const currentUser = allUsers.find((n: any) => n.email === emailContext);
      
      if (currentUser) {
        setBalance(currentUser.balance);
      } else {
        alert(t('userNotFound'));
      };

    } catch (error) {
      alert(t('errorFetchingBalance'));
    };
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      fetchBalance();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAboutStocks = () => {
    setAboutStocks(!aboutStocks);
  };

  const handleBuyStock = async (stock: { name: string; value: number }) => {
    const qty = inputQuantities[stock.name];

    if (!qty || qty <= 0) {
      alert(t('stockQuantity'));
      return;
    };

    try {
      await axios.post(`${backendUrl}/stock/buy`, {
        value: stock.value,
        quantity: qty,
      });

      setQuantities(prev => ({ ...prev, [stock.name]: (prev[stock.name] || 0) + qty }));
      setInputQuantities(prev => ({ ...prev, [stock.name]: 0 }));
      alert(t('stockBought'));
    } catch {
      alert(t('stockBoughtError'));
    };
  };

  const handleSellStock = async (stock: { name: string; value: number }) => {
    const qty = inputQuantities[stock.name];
    
    if (!qty || qty <= 0 || (quantities[stock.name] || 0) < qty) {
      alert(t('stockQuantity'));
      return;
    };

    try {
      await axios.post(`${backendUrl}/stock/sell`, {
        value: stock.value,
        quantity: qty,
      });

      setQuantities(prev => ({ ...prev, [stock.name]: prev[stock.name] - qty }));
      setInputQuantities(prev => ({ ...prev, [stock.name]: 0 }));
      alert(t('stockSold'));
    } catch {
      alert(t('stockSoldError'));
    };
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const stock of stockList) {
        const qty = quantities[stock.name];

        if (qty > 0) {
          await axios.put(`${backendUrl}/stock/DY`, {
            value: stock.value,
            quantity: qty,
            DY: stock.DY
          });
        };
      };
    }, 5000);

    return () => clearInterval(interval);
  }, [quantities]);

  const handleAboutLoans = () => {
    setAboutLoans(!aboutLoans);
  };

  const handleRequestLoan = async (loanValue: number, loanIr: number, loanMonths: number) => {
    try {
      setValue(loanValue);
      setIr(loanIr);
      setMonths(loanMonths);
      setRemainingMonths(loanMonths);
      
      const { data } = await axios.post(`${backendUrl}/loan/request`, {
        value: loanValue,
        ir: loanIr,
        months: loanMonths
      });
      
      setMonthlyInstallment(data.monthlyInstallment);
    } catch {
      alert(t("loanRequestedError"));
    };
  };
  
  useEffect(() => {
    if (monthlyInstallment > 0 && remainingMonths > 0) {
      const interval = setInterval(async () => {
        try {
          await axios.put(`${backendUrl}/loan/repay`, null, {
            params: { installment: monthlyInstallment }
          });
          setRemainingMonths(prev => prev - 1);
        } catch (error) {
          alert(t("loanRepaymentError"));
        };
      }, 1000);
      
      return () => clearInterval(interval);
    };
  }, [monthlyInstallment, remainingMonths]);

  const handleLogout = async () => {
    await axios.post(`${backendUrl}/auth/logout`, {
      email: emailContext,
    });

    router.push("/");
  };
  
  const renderPage = () => {
    switch (activePage) {
      case 'transfer':
        return (
          <motion.div key="transfer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <TransferPage />
          </motion.div>
        );
      case 'loans':
        return (
          <motion.div key="loans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <LoansPage />
          </motion.div>
        );
      case 'stocks':
        return (
          <motion.div key="stocks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <StocksPage />
          </motion.div>
        );
      case 'historic':
        return (
          <motion.div key="historic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <HistoricPage />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <SettingsPage />
          </motion.div>
        );
      default:
        return (
          <div className="lg:h-[400px] xl:h-[90%] 2xl:h-[700px] overflow-y-auto sm:pb-[140px] xl:pb-0">
            {aboutStocks ? 
              (
                <main className="select-none">
                  <motion.div
                    key="aboutStocks"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.5, ease: "easeInOut"}}
                  >
                    <header className="flex flex-row justify-between items-center mt-10 mx-7 lg:mx-1">
                      <button onClick={() => setAboutStocks(false)} className="text-sbgreen text-[35px] opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease"><FaArrowLeft /></button>
                      <h1 className="shine-text hidden md:block text-[40px]">{t('titleAboutStocks')}</h1>
                      <span></span>
                    </header>

                    <section className="flex justify-center items-center pt-[35px] px-[30px] 2xl:px-[300px]">
                      <h2 className="text-[18px] sm:text-[20px] text-justify">{t('aboutStocks')}</h2>
                    </section>
                  </motion.div>
                </main>
              ) : aboutLoans ? (
                <main className="select-none">
                  <motion.div
                    key="aboutLoans"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.6, ease: "easeInOut"}}
                  >
                    <header className="flex flex-row justify-between items-center mt-10 mx-7 lg:mx-1">
                      <button onClick={() => setAboutLoans(false)} className="text-sbgreen text-[35px] opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease"><FaArrowLeft /></button>
                      <h1 className="shine-text hidden md:block text-[40px]">{t('titleAboutLoans')}</h1>
                      <span></span>
                    </header>

                    <section className="flex justify-center items-center pt-[35px] px-[30px] 2xl:px-[300px]">
                      <h2 className="text-[18px] sm:text-[20px] text-justify">{t('aboutLoans')}</h2>
                    </section>
                  </motion.div>
                </main>
              ) : (
                <section className="xl:pb-0 px-5 lg:px-0 gap-6 grid grid-cols-1 md:grid-cols-2 auto-rows-fr lg:mr-5 xl:mr-0">
                  {stockList.map(stock => (
                    <motion.div
                      key={stock.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                    >
                      <div className="flex justify-between w-full">
                          <div className="sm:mt-3 ml-6 flex flex-row items-center text-[20px] sm:text-[25px] gap-1 font-medium">
                            <h1 className="shine-text">{stock.name}</h1>
                          </div>

                          <button onClick={handleAboutStocks} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                      </div>

                      <div className="flex w-full sm:gap-10 md:gap-0 xl:gap-10 my-3 sm:mt-5 sm:mb-10 h-[70px] sm:h-[120px] justify-center items-center px-[10px] sm:px-[15px]">
                          <div className="flex flex-col justify-center items-center pl-[5px] pr-[20px]">
                              <div className="flex gap-1 font-medium text-[25px] sm:text-[30px] xl:text-[40px]">
                                <h1>{stock.value}</h1>
                              </div>

                              <div className="flex flex-row items-center text-[15px] md:text-[20px] xl:text-[20px] gap-1 font-medium">
                                  <h1 className="shine-text">{t('DY')}</h1>
                                  <h1 className="text-sbgreen">{stock.DY}</h1>
                              </div>
                          </div>

                          <div className="overflow-hidden w-[200px] lg:w-[280px] h-[100px] xl:h-[160px] border-[2px] rounded-[10px] border-sbgreen flex items-center justify-center">
                              <Image src={SbStock} alt="Stock image" className="h-full w-full object-contain scale-[160%] sm:scale-[195%]" />
                          </div>
                      </div>

                      <div className="translate-y-[-5px] sm:translate-y-[-15px] translate-x-[-5px] w-full flex justify-center sm:gap-10 lg:gap-0 xl:justify-between items-center scale-[72%] sm:scale-[100%]">
                          <div className="flex items-center ml-7 mr-[20px] sm:mr-0 gap-1 text-[#00FF37] font-medium">
                            <h1 className="block lg:hidden xl:block sm:translate-y-[3px] text-[25px]">{quantities[stock.name] || 0}</h1>
                          </div>

                          <div className="flex gap-3 h-[50px]">
                              <input
                                type="number"
                                min="1"
                                value={inputQuantities[stock.name] || ''}
                                onChange={e => setInputQuantities({ ...inputQuantities, [stock.name]: Number(e.target.value) })}
                                className="text-center w-[60px] text-[16px] border-[2px] border-tertiary bg-transparent rounded-[15px] focus:outline-none focus:border-sbgreen transition duration-300 ease" 
                              />

                              <button onClick={() => handleSellStock(stock)} className="bg-red-600 rounded-[13px] w-[70px] text-[15px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">
                                {t('sell')}
                              </button>

                              <button onClick={() => handleBuyStock(stock)} className="mr-[8px] bg-sbgreen rounded-[13px] w-[70px] text-[15px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">
                                {t('buy')}
                              </button>
                          </div>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    key="homeAboutUs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex flex-col justify-between items-center gap-5 overflow-auto"
                  >
                    <div className="w-full h-full relative flex justify-center items-center">
                      <Image src={SbBuilding} alt="Starbank building" fill className="rounded-[25px] object-cover opacity-50" />
                      
                      <a href="https://youtu.be/3rdr3UlUxWI" className="absolute rounded-[15px] px-7 py-2 text-[25px] sm:text-[30px] font-medium bg-othergreen active:bg-opacity-50 transition duration-300 ease">{t('aboutUs')}</a>
                    </div>
                  </motion.div>

                  <motion.div
                    key="homeHours"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.6, ease: "easeInOut"}}
                    className="flex flex-col justify-center items-center bg-secondary lg:bg-primary rounded-[25px]"
                  >
                    <h1 className="text-[35px] sm:text-[45px] font-semibold mb-[-5px]">{time.toLocaleTimeString()}</h1>
                    <h2 className="text-[30px] sm:text-[35px] font-semibold text-sbgreen">{time.toLocaleDateString()}</h2>
                  </motion.div>

                  <motion.div
                    key="homeLoans"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.6, ease: "easeInOut"}}
                    className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                  >
                    <div className="flex gap-2 text-[20px] sm:text-[30px] md:text-[22px] xl:text-[30px] mt-5">
                      <h2 className="text-sbgreen font-medium">24</h2>
                      <h2 className="shine-text font-light">{t('months')}</h2>
                      <h2 className="shine-text font-light">+</h2>
                      <h2 className="text-sbgreen font-medium">8%</h2>
                      <h2 className="shine-text font-light">{t('IR')}</h2>
                    </div>

                    <div className="flex gap-2 text-[35px] sm:text-[45px] mb-5 sm:mb-9 font-semibold">
                      <h1 className="text-sbgreen">$</h1>
                      <h1>5.000,00</h1>
                    </div>

                    <div className="flex w-full justify-between">
                      <span className="hidden sm:block"></span>
                      <button onClick={() => handleRequestLoan(5000, 8, 24)} disabled={remainingMonths > 0} className={`ml-[45px] translate-y-[-15px] sm:translate-y-[-25px] translate-x-[-30px] sm:translate-x-0 rounded-[15px] px-5 xl:px-9 py-2 text-[25px] sm:text-[30px] font-medium active:bg-opacity-25 transition duration-300 ease ${remainingMonths > 0 ? 'bg-sbgreen bg-opacity-25 cursor-not-allowed' : 'bg-sbgreen bg-opacity-50'}`}>{t(remainingMonths > 0 ? 'withdrawn' : 'withdraw')}</button>
                      <button onClick={() => handleAboutLoans()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transiton duration-300 ease w-[50px] rounded-br-[25px] rounded-tl-[25px]">i</button>
                    </div>
                  </motion.div>
                </section>
              )
            }
          </div>
        );
    };
  };

  return (
    <>
      <Head>
        <title>StarBank</title>
      </Head>

      <motion.div
        key="menu"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.6, ease: "easeInOut"}}
      >
        <main className="lg:mb-0 bg-primary lg:bg-secondary h-screen grid grid-rows-[85%_15%] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] 2xl:grid-cols-[1fr_4fr] select-none">
          <aside className="h-screen hidden lg:flex flex-col items-center bg-primary py-[40px] justify-between">
            <header>
              <Image src={Logo} alt="StarBank logo" className="hidden lg:block w-[225px] h-[45px]" />
              <h1 className="shine-text hidden md:block select-none text-[30px]">{t('account')}</h1>
            </header>

            <div className="flex flex-col justify-center">
              <button onClick={() => setActivePage('')} className={`mb-[25px] py-2 px-[55px] mx-[0px] bg-secondary border-[2px] rounded-xl text-[25px] hover:text-sbgreen ${['transfer', 'loans', 'stocks', 'historic', 'settings'].includes(activePage ?? '') ? 'text-tertiary border-transparent' : 'border-sbgreen text-sbgreen'} transition duration-300 ease`}>{t('home')}</button>
              <button onClick={() => setActivePage('transfer')} className={`mb-[25px] py-2 px-[55px] mx-[0px] bg-secondary border-[2px] rounded-xl text-[25px] hover:text-sbgreen ${activePage === 'transfer' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transition duration-300 ease`}>{t('transfer')}</button>
              <button onClick={() => setActivePage('loans')} className={`mb-[25px] py-2 px-[55px] mx-[0px] bg-secondary border-[2px] rounded-xl text-[25px] hover:text-sbgreen ${activePage === 'loans' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transition duration-300 ease`}>{t('loans')}</button>
              <button onClick={() => setActivePage('stocks')} className={`mb-[25px] py-2 px-[55px] mx-[0px] bg-secondary border-[2px] rounded-xl text-[25px] hover:text-sbgreen ${activePage === 'stocks' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transition duration-300 ease`}>{t('stocks')}</button>
              <button onClick={() => setActivePage('historic')} className={`mb-[25px] py-2 px-[55px] mx-[0px] bg-secondary border-[2px] rounded-xl text-[25px] hover:text-sbgreen ${activePage === 'historic' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transition duration-300 ease`}>{t('historic')}</button>
            </div>

            <section className="flex flex-col gap-6">
              <label className={`flex flex-row gap-2 items-center ${activePage === 'settings' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease active:opacity-50 focus:opacity-100 cursor-pointer`}>
                <Image src={SettingsIcon} alt="Settings icon" className="w-[35px] h-[35px] select-none" />
                <button onClick={() => setActivePage('settings')} className="text-[20px] text-sbgreen">{t('settings')}</button>
              </label>

              <label className="flex flex-row gap-3 items-center opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50 focus:opacity-100 cursor-pointer">
                <Image src={LogoutIcon} alt="Logout icon" className="w-[32px] h-[30px] select-none" />
                <button onClick={() => handleLogout()} className="text-[20px] text-sbgreen">{t('logout')}</button>
              </label>
            </section>
          </aside>


          <section className="sm:mx-[19px]">
            <div className="flex my-[10px] sm:my-[18px] scale-[90%] sm:scale-[100%] lg:mt-[20px] items-center justify-between lg:justify-end">
              <button onClick={() => setActivePage('settings')} className={`${activePage === 'settings' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={SettingsIcon} alt="Settings icon" className="block lg:hidden w-[40px] h-[40px]" /></button>
              
              <Link href="/" className="opacity-30 hover:opacity-100 transition duration-300 ease"><Image src={Logo} alt="StarBank logo" className="block lg:hidden w-[140px] h-[28px]" /></Link>

              <div className="flex items-center gap-5 sm:gap-7">
                <button onClick={() => changeLanguage()} className="opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50"><Image src={flag} alt="Country flag" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]" /></button>
              </div>
            </div>
            
            <label className="hidden lg:flex absolute mt-[-76px] gap-3 font-medium items-center cursor-pointer opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease">
              <motion.img
                key={showBalance ? "eye-open": "eye-closed"}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.6, ease: "easeInOut"}}
                src={showBalance ? EyeClosed.src : EyeOpen.src} alt="Show balance" className="w-[39px] h-[25px]"
              />
              <button onClick={() => handleShowBalance()} className="text-sbgreen text-[30px]">{t('balance')}</button>
            </label>

            <motion.div
              key={showBalance ? "balance-open": "balance-closed"}
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0}}
              transition={{ duration: 0.6, ease: "easeInOut"}}
              className="flex mt-5 sm:mt-0 items-center justify-center lg:justify-start gap-2 sm:gap-3 font-medium text-[25px] sm:text-[45px] lg:mt-[-30px] mb-10"
            >
              <h1 className="text-sbgreen">$</h1>
              <h1>{showBalance ? '•••••••' : balance.toFixed(2)}</h1>

              <Image src={showBalance ? EyeClosed : EyeOpen} alt="Show balance" className="block lg:hidden w-[28px] h-[18px] sm:w-[35px] sm:h-[25px] ml-2" onClick={handleShowBalance}/>
            </motion.div>

            {renderPage()}
          </section>

          <section className="lg:hidden fixed flex justify-center items-center w-full bottom-5">
            <div>
              <nav className="flex justify-center items-center bg-primary rounded-[23px] gap-7 sm:gap-10 sm:scale-[110%] p-6">
                <button onClick={() => setActivePage('')} className={`h-[25px] w-[25px] ${['transfer', 'loans', 'stocks', 'historic', 'settings'].includes(activePage ?? '') ? 'opacity-50' : 'opacity-100'} transition duration-300 ease`}><Image src={HomeIcon} alt="Home icon" /></button>
                <button onClick={() => setActivePage('transfer')} className={`h-[25px] w-[25px] ${activePage === 'transfer' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={TransferIcon} alt="Transfer icon" /></button>
                <button onClick={() => setActivePage('loans')} className={`h-[25px] w-[25px] ${activePage === 'loans' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={LoansIcon} alt="Loans icon" /></button>
                <button onClick={() => setActivePage('stocks')} className={`h-[25px] w-[25px] ${activePage === 'stocks' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={StocksIcon} alt="Stocks icon" /></button>
                <button onClick={() => setActivePage('historic')} className={`h-[25px] w-[25px] ${activePage === 'historic' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={HistoricIcon} alt="Historic icon" /></button>
              </nav>
            </div>
          </section>
        </main>
      </motion.div>
    </>
  );
};