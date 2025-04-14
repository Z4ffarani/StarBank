"use client";

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import Logo from "../../public/logos/logo.png";
import LogoSimple from "../../public/logos/logo-simple.png";
import UsaFlag from "../../public/images/usa-flag.png";
import BrazilFlag from "../../public/images/brazil-flag.png";
import SpainFlag from "../../public/images/spain-flag.png";

import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const lng = i18n.language;
  const flag = lng === 'en' ? UsaFlag : lng === 'pt-BR' ? BrazilFlag : SpainFlag;
  const { t } = useTranslation();

  const { setEmailContext } = useUserContext();

  const changeLanguage = () => {
    const lng = i18n.language;
    if (lng === 'en') { 
      i18n.changeLanguage('pt-BR');
    } else if (lng === 'pt-BR') {
      i18n.changeLanguage('es');
    } else {
      i18n.changeLanguage('en');
    }
  };

  if (!flag) {
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        setEmailContext(email);
        router.push("/home");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(t('wrongPassword'));
      } else if (error.response?.status === 404) {
        alert(t('userNotFound'));
      } else {
        alert(t('loginError'));
        console.error(error);
      }
    }
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

        <section className="flex justify-center mt-[-30px] scale-[75%] sm:mt-[80px] sm:scale-[100%] md:mt-[60px]">
          <form className="flex flex-col w-[450px] h-[520px] bg-secondary border-tertiary border-[2px] px-12 py-6 rounded-[25px]">
            <fieldset className="flex flex-col group">
              <label htmlFor="email" className="text-[30px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('e-mail')}</label>
              <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="mt-1 mb-[30px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
            </fieldset>

            <fieldset className="flex flex-col group">
              <label htmlFor="password" className="text-[30px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('password')}</label>
              <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="mt-1 mb-[8px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
              <button type="button" onClick={() => alert("This action has to define a new password in the same area")} className="mb-[45px] text-sbgreen text-[20px] font-medium whitespace-nowrap opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50">{t('forgotPassword')}</button>
            </fieldset>

            <button onClick={handleLogin} className="mt-1 mb-[45px] py-[10px] text-center text-[30px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('login')}</button>

            <div className="flex flex-row gap-2 justify-center text-[18px] sm:text-[23px]">
              <h2 className="shine-text">{t('noAccount')}</h2><Link href="/register" className="text-sbgreen font-medium opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50">{t('register')}</Link>
            </div>
          </form>
        </section>
      </motion.div>
    </main>
  );
};