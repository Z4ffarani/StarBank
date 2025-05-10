"use client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import i18nLocales from "../i18nLocales";
import { useTranslation } from "next-i18next";

import { motion } from "framer-motion";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";

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

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== repeatNewPassword) {
      alert(t('passwordsDontMatch'));
      return;
    };

    try {
      const response = await axios.put(`${backendUrl}/auth/changePassword`, 
        { email },
        { params: { newPassword } }
      );

      if (response.status === 200) {
        router.push('/');
      };

    } catch (error: any) {
      if (error.response?.status === 409) {
        alert(t('samePassword'));
      } else {
        alert(t('errorChangingPassword'));
      };
    };
  };

  return (
    <main className="h-screen bg-primary">
      <Head>
        <title>StarBank</title>
      </Head>

      <motion.section
        key="forgotPassword"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.6, ease: "easeInOut"}}
      >
        <header className="flex flex-row px-5 sm:px-10 pt-[20px] sm:pt-[30px] justify-between md:justify-center items-center">
          <div className="flex flex-col md:mt-[70px]">
            <h1 className="shine-text hidden md:block text-[40px] mb-[-15px]">{t('newPassword')}</h1>
          </div>

          <Link href="/" className="absolute left-[30px] md:mb-[70px] text-sbgreen opacity-50 hover:opacity-100 text-[35px] active:opacity-50 transition duration-300 ease"><FaArrowLeft /></Link>

          <button onClick={() => changeLanguage()} className="sm:mr-[-8px] md:absolute md:right-[30px] md:mb-[70px] opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50"><Image src={flag} alt="Country flag" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]" /></button>
        </header>

        <section className="flex justify-center mt-[-30px] scale-[75%] sm:mt-[80px] sm:scale-[100%] md:mt-[60px]">
          <form onSubmit={handleChangePassword} className="flex flex-col justify-center w-[450px] h-[520px] bg-secondary border-tertiary border-[2px] px-12 py-6 rounded-[25px]">   
            <fieldset className="flex flex-col group">
              <label htmlFor="repeatPassword" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('email')}</label>
              <input type="string" onChange={(e) => setEmail(e.target.value)} required className="mt-1 mb-[20px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
            </fieldset>

            <fieldset className="flex flex-col group">
              <label htmlFor="password" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('newPassword')}</label>
              <input type="password" onChange={(e) => setNewPassword(e.target.value)} required className=" mt-1 mb-[20px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
            </fieldset>

            <fieldset className="flex flex-col group">
              <label htmlFor="password" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('repeatNewPassword')}</label>
              <input type="password" onChange={(e) => setRepeatNewPassword(e.target.value)} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
            </fieldset>

            <button type="submit" className="mt-1 h-[65px] pl-3 text-[25px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('changePassword')}</button>
          </form>
        </section>
      </motion.section>
    </main>
  );
};