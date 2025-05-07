"use client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
console.log(backendUrl);

import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import i18n from "../i18n";
import { useTranslation } from 'react-i18next';
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

import { useUserContext } from "../context/UserContext";

export default function Home() {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const lng = i18n.language;
  const flag = lng === 'en' ? UsaFlag
  : lng === 'zh' ? ChinaFlag
  : lng === 'hi' ? IndiaFlag
  : lng === 'es' ? SpainFlag
  : lng === 'pt-BR' ? BrazilFlag
  : lng === 'ru' ? RussiaFlag
  : lng === 'fr' ? FranceFlag
  : lng === 'de' ? GermanyFlag
  : lng === 'ja' ? JapanFlag
  : lng === 'it' ? ItalyFlag
  : UsaFlag;
  const { t } = useTranslation();
  
  const [about, setAbout] = useState(false);

  const { setEmailContext } = useUserContext();

  const changeLanguage = () => {
    const lng = i18n.language;
    if (lng === 'en') {
      i18n.changeLanguage('zh');
    } else if (lng === 'zh') {
      i18n.changeLanguage('hi');
    } else if (lng === 'hi') {
      i18n.changeLanguage('es');
    } else if (lng === 'es') {
      i18n.changeLanguage('pt-BR');
    } else if (lng === 'pt-BR') {
      i18n.changeLanguage('ru');
    } else if (lng === 'ru') {
      i18n.changeLanguage('fr');
    } else if (lng === 'fr') {
      i18n.changeLanguage('de');
    } else if (lng === 'de') {
      i18n.changeLanguage('ja');
    } else if (lng === 'ja') {
      i18n.changeLanguage('it');
    } else {
      i18n.changeLanguage('en');
    }
  };

  const handleAbout = () => {
      setAbout(!about);
  };
  
  if (!flag) {
      return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
          
    try {
      if (password !== repeatPassword) {
        alert(t('bothPasswordsMatch'));
        return;
      };
  
      const response = await axios.post(`${backendUrl}/user`, {
        email,
        password,
      });
  
      if (response.status === 201 || response.status === 200) {
        setEmailContext(email);
        router.push("/");
      };

    } catch (error: any) {
      if (error.response?.status === 409) {
        alert(t('emailAlreadyRegistered'));
      } else {
        alert(t('registrationError'));
      };
    };
  };

  return (
      <>
          {about ? (
              <main className="bg-primary h-screen select-none">
                  <motion.div
                      key="aboutRegister"
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                      exit={{ opacity: 0}}
                      transition={{ duration: 0.6, ease: "easeInOut"}}
                  >
                      <header className="flex flex-row px-5 sm:px-10 pt-[20px] sm:pt-[30px] justify-between md:justify-center items-center">
                          <button onClick={() => setAbout(false)} className="absolute left-[30px] md:mb-[70px] text-[35px] text-sbgreen opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease"><FaArrowLeft /></button>
                          
                          <div className="flex flex-col md:mt-[70px]">
                              <h1 className="shine-text hidden md:block text-[40px] mb-[-15px]">{t('titleAboutRegister')}</h1>
                          </div>

                          <button onClick={() => changeLanguage()} className="sm:mr-[-8px] md:absolute md:right-[30px] md:mb-[70px] opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50"><Image src={flag} alt="Country flag" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]" /></button>
                      </header>

                      <section className="flex justify-center items-center pt-[45px] px-[30px] md:px-[50px] xl:px-[500px]">
                          <h2 className="text-[18px] sm:text-[20px] text-justify">{t('aboutRegister')}</h2>
                      </section>
                  </motion.div>
              </main>
          ) : (
              <main className="h-screen bg-primary">
                  <Head>
                      <title>StarBank</title>
                  </Head>
      
                  <motion.section
                      key="register"
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                      exit={{ opacity: 0}}
                      transition={{ duration: 0.6, ease: "easeInOut"}}
                  >
                      <header className="flex flex-row px-5 sm:px-10 pt-[20px] sm:pt-[30px] justify-between md:justify-center items-center">
                        <div className="flex flex-col md:mt-[70px]">
                            <h1 className="shine-text hidden md:block text-[40px] mb-[-15px]">{t('newAccount')}</h1>
                        </div>

                        <Link href="/" className="absolute left-[30px] md:mb-[70px] text-sbgreen opacity-50 hover:opacity-100 text-[35px] active:opacity-50 transition duration-300 ease"><FaArrowLeft /></Link>

                        <button onClick={() => changeLanguage()} className="sm:mr-[-8px] md:absolute md:right-[30px] md:mb-[70px] opacity-50 hover:opacity-100 transition duration-300 ease active:opacity-50"><Image src={flag} alt="Country flag" className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]" /></button>
                      </header>
          
                      <section className="flex justify-center mt-[-30px] scale-[75%] sm:mt-[80px] sm:scale-[100%] md:mt-[60px]">
                        <form onSubmit={handleRegister} className="flex flex-col w-[450px] h-[520px] bg-secondary border-tertiary border-[2px] px-12 py-6 rounded-[25px]">
                            <div className="flex flex-end justify-end w-full mt-[-26px] ml-[50px]">
                              <button onClick={() => handleAbout()} className="text-[35px] font-medium bg-othergreen active:bg-opacity-50 transiton duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                            </div>
        
                            <fieldset className="flex flex-col group">
                              <label htmlFor="email" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('email')}</label>
                              <input type="email" onChange={(e) => setEmail(e.target.value)} required className="mt-1 mb-[20px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                            </fieldset>
        
                            <fieldset className="flex flex-col group">
                              <label htmlFor="password" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('password')}</label>
                              <input type="password" onChange={(e) => setPassword(e.target.value)} required className="mt-1 mb-[20px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                            </fieldset>
        
                            <fieldset className="flex flex-col group">
                              <label htmlFor="repeatPassword" className="text-[22px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('repeatPassword')}</label>
                              <input type="password" onChange={(e) => setRepeatPassword(e.target.value)} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                            </fieldset>
        
                            <button type="submit" className="mt-1 h-[65px] pl-3 text-[25px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('register')}</button>
                        </form>
                      </section>
                  </motion.section>
              </main>
          )}
      </>
  );
};