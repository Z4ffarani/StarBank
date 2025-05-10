"use client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import i18nLocales from "../i18nLocales"
import { useTranslation } from "next-i18next";

import { motion } from "framer-motion";
import axios from "axios";

import Logo from "../../public/logos/logo.png";
import LogoSimple from "../../public/logos/logo-simple.png";
import UsaFlag from "../../public/images/usa-flag.png";
import ChinaFlag from "../../public/images/china-flag.png";
import IndiaFlag from "../../public/images/india-flag.png";
import SpainFlag from "../../public/images/spain-flag.png";
import BrazilFlag from "../../public/images/brazil-flag.png";
import RussiaFlag from "../../public/images/russia-flag.png";
import FranceFlag from "../../public/images/france-flag.png";
import GermanyFlag from "../../public/images/germany-flag.png";
import JapanFlag from "../../public/images/japan-flag.png";
import ItalyFlag from "../../public/images/italy-flag.png";

import { useUserContext } from "../context/UserContext";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setEmailContext } = useUserContext();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("localPassword", password);

    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setEmailContext(email);
        router.push('/home');
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(t('wrongPassword'));
      } else if (error.response?.status === 404) {
        alert(t('userNotFound'));
      } else {
        alert(t('loginError'));
      };
    };
  };

  return (
    <main className="h-screen bg-primary select-none">
      <Head>
        <title>StarBank</title>
      </Head>

      <motion.div
        key="login"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.6, ease: "easeInOut"}}
      >
        <header className="flex flex-row sm:items-start px-5 sm:px-10 pt-[20px] sm:pt-[30px] md:items-center justify-between md:justify-center">
          <div className="flex flex-col md:mt-[20px]">
            <Image src={LogoSimple} alt="StarBank logo" className="block sm:hidden w-[110px] h-[70px]" />
            <h1 className="shine-text hidden md:block text-[30px] mb-[-10px] mr-[130px]">{t('welcome')}</h1>
            <Image src={Logo} alt="StarBank logo" priority className="hidden sm:block w-[300px] h-[60px]" />
          </div>

          <button onClick={() => changeLanguage()} className="sm:mr-[-8px] md:absolute md:right-[30px] md:mb-[70px] opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50"><Image src={flag} alt="Country flag" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]" /></button>
        </header>

        <div className="flex justify-center mt-[-30px] scale-[75%] sm:mt-[80px] sm:scale-[100%] md:mt-[60px]">
          <form onSubmit={handleLogin} className="flex flex-col justify-center w-[450px] h-[520px] bg-secondary border-tertiary border-[2px] px-12 py-6 rounded-[25px]">
            <fieldset className="flex flex-col group">
              <label htmlFor="email" className="text-[25px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('email')}</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} className="mt-1 mb-[30px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
            </fieldset>

            <fieldset className="flex flex-col group">
              <label htmlFor="password" className="text-[25px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('password')}</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className="mt-1 mb-[8px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
              <Link href="/forgotPassword" className="mb-[45px] text-center text-sbgreen text-[20px] font-medium whitespace-nowrap opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50">{t('forgotPassword')}</Link>
            </fieldset>

            <button type="submit" className="mt-1 mb-[45px] py-[10px] text-center text-[30px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('login')}</button>

            <div className="flex flex-row gap-2 justify-center text-[18px] sm:text-[23px]">
              <h2 className="shine-text">{t('noAccount')}</h2><Link href="/register" className="text-sbgreen font-medium opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50">{t('register')}</Link>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
};