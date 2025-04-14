"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";

export default function Stocks() {
    const { t } = useTranslation();

    const [aboutStocks, setAboutStocks] = useState(false);
  
    const handleAboutStocks = () => {
      setAboutStocks(!aboutStocks);
    };

    return (
        <>
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
                ) : (
                    <section className="pb-[140px] lg:pb-5 xl:pb-0 px-5 lg:px-0 gap-6 grid grid-cols-1 md:grid-cols-2 auto-rows-fr">
                        <motion.div
                            key="stock1"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex justify-between w-full">
                                <div className="sm:mt-3 ml-6 flex flex-row items-center text-[20px] sm:text-[25px] gap-1 font-medium">
                                    <h1 className="shine-text">Microsoft |</h1>
                                    <h1 className="text-sbgreen">MSFT</h1>
                                </div>

                                <button onClick={() => handleAboutStocks()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transiton duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                            </div>

                            <div className="flex w-full my-3 sm:mt-5 sm:mb-10 h-[120px] justify-center items-center px-[10px] sm:px-[15px]">
                                <div className="flex flex-col justify-center items-center pl-[5px] pr-[20px]">
                                    <div className="flex gap-1 font-medium text-[27px] sm:text-[30px] xl:text-[40px]">
                                        <h1 className="text-sbgreen">{t('currency')}</h1>
                                        <h1>408,02</h1>
                                    </div>

                                    <div className="flex flex-row items-center text-[13px] sm:text-[14px] xl:text-[19px] gap-1 font-medium">
                                        <h1 className="shine-text">{t('volume')}</h1>
                                        <h1 className="text-sbgreen">27.52M</h1>
                                    </div>
                                </div>

                                <div className="h-[120%] xl:h-[130%] w-full border-[2px] rounded-[10px] border-sbgreen">
                                    <h1>IMAGEM</h1>
                                </div>
                            </div>

                            <div className="translate-y-[-5px] sm:translate-y-[-15px] translate-x-[-5px] w-full flex justify-center sm:justify-between items-center scale-[72%] sm:scale-[100%]">
                                <div className="flex items-center ml-7 mr-[60px] sm:mr-0 gap-1 text-[#00FF37] font-medium">
                                    <BiSolidUpArrow className="text-[15px]" />
                                    <h1 className="sm:translate-y-[3px] text-[25px]">0.05%</h1>
                                </div>
                                
                                <div className="flex gap-3 h-[50px]">
                                    <input type="text" className="text-center w-[90px] text-[16px] border-[2px] border-tertiary bg-transparent rounded-[15px] focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                                    <button className="mr-[8px] bg-sbgreen rounded-[15px] w-[100px] sm:w-[80px] text-[17px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">{t('buy')}</button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            key="stock2"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex justify-between w-full">
                                <div className="sm:mt-3 ml-6 flex flex-row items-center text-[20px] sm:text-[25px] gap-1 font-medium">
                                    <h1 className="shine-text">NVIDIA |</h1>
                                    <h1 className="text-sbgreen">NVDA</h1>
                                </div>

                                <button onClick={() => handleAboutStocks()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transiton duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                            </div>

                            <div className="flex w-full my-3 sm:mt-5 sm:mb-10 h-[120px] justify-center items-center px-[10px] sm:px-[15px]">
                                <div className="flex flex-col justify-center items-center pl-[5px] pr-[20px]">
                                    <div className="flex gap-1 font-medium text-[27px] sm:text-[30px] xl:text-[40px]">
                                        <h1 className="text-sbgreen">{t('currency')}</h1>
                                        <h1>135,00</h1>
                                    </div>

                                    <div className="flex flex-row items-center text-[13px] sm:text-[14px] xl:text-[19px] gap-1 font-medium">
                                        <h1 className="shine-text">{t('volume')}</h1>
                                        <h1 className="text-sbgreen">228M</h1>
                                    </div>
                                </div>

                                <div className="h-[120%] xl:h-[130%] w-full border-[2px] rounded-[10px] border-sbgreen">
                                    <h1>IMAGEM</h1>
                                </div>
                            </div>

                            <div className="translate-y-[-5px] sm:translate-y-[-15px] translate-x-[-5px] w-full flex justify-center sm:justify-between items-center scale-[72%] sm:scale-[100%]">
                                <div className="flex items-center ml-7 mr-[60px] sm:mr-0 gap-1 text-red-600 font-medium">
                                    <BiSolidUpArrow className="text-[15px] rotate-180" />
                                    <h1 className="sm:translate-y-[3px] text-[25px]">0.05%</h1>
                                </div>

                                <div className="flex gap-3 h-[50px]">
                                    <input type="text" className="text-center w-[90px] text-[16px] border-[2px] border-tertiary bg-transparent rounded-[15px] focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                                    <button className="mr-[8px] bg-sbgreen rounded-[15px] w-[100px] sm:w-[80px] text-[17px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">{t('buy')}</button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            key="stock3"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex justify-between w-full">
                                <div className="sm:mt-3 ml-6 flex flex-row items-center text-[20px] sm:text-[25px] gap-1 font-medium">
                                    <h1 className="shine-text">Apple |</h1>
                                    <h1 className="text-sbgreen">AAPL</h1>
                                </div>

                                <button onClick={() => handleAboutStocks()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transiton duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                            </div>

                            <div className="flex w-full my-3 sm:mt-5 sm:mb-10 h-[120px] justify-center items-center px-[10px] sm:px-[15px]">
                                <div className="flex flex-col justify-center items-center pl-[5px] pr-[20px]">
                                    <div className="flex gap-1 font-medium text-[27px] sm:text-[30px] xl:text-[40px]">
                                        <h1 className="text-sbgreen">{t('currency')}</h1>
                                        <h1>245,03</h1>
                                    </div>

                                    <div className="flex flex-row items-center text-[13px] sm:text-[14px] xl:text-[19px] gap-1 font-medium">
                                        <h1 className="shine-text">{t('volume')}</h1>
                                        <h1 className="text-sbgreen">53.2M</h1>
                                    </div>
                                </div>

                                <div className="h-[120%] xl:h-[130%] w-full border-[2px] rounded-[10px] border-sbgreen">
                                    <h1>IMAGEM</h1>
                                </div>
                            </div>

                            <div className="translate-y-[-5px] sm:translate-y-[-15px] translate-x-[-5px] w-full flex justify-center sm:justify-between items-center scale-[72%] sm:scale-[100%]">
                                <div className="flex items-center ml-7 mr-[60px] sm:mr-0 gap-1 text-[#00FF37] font-medium">
                                    <BiSolidUpArrow className="text-[15px]" />
                                    <h1 className="sm:translate-y-[3px] text-[25px]">0.05%</h1>
                                </div>

                                <div className="flex gap-3 h-[50px]">
                                    <input type="text" className="text-center w-[90px] text-[16px] border-[2px] border-tertiary bg-transparent rounded-[15px] focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                                    <button className="mr-[8px] bg-sbgreen rounded-[15px] w-[100px] sm:w-[80px] text-[17px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">{t('buy')}</button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            key="stock4"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex justify-between w-full">
                                <div className="sm:mt-3 ml-6 flex flex-row items-center text-[20px] sm:text-[25px] gap-1 font-medium">
                                    <h1 className="shine-text">Alphabet |</h1>
                                    <h1 className="text-sbgreen">GOOGL</h1>
                                </div>

                                <button onClick={() => handleAboutStocks()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transiton duration-300 ease w-[50px] rounded-bl-[25px] rounded-tr-[25px]">i</button>
                            </div>

                            <div className="flex w-full my-3 sm:mt-5 sm:mb-10 h-[120px] justify-center items-center px-[10px] sm:px-[15px]">
                                <div className="flex flex-col justify-center items-center pl-[5px] pr-[20px]">
                                    <div className="flex gap-1 font-medium text-[27px] sm:text-[30px] xl:text-[40px]">
                                        <h1 className="text-sbgreen">{t('currency')}</h1>
                                        <h1>179,44</h1>
                                    </div>

                                    <div className="flex flex-row items-center text-[13px] sm:text-[14px] xl:text-[19px] gap-1 font-medium">
                                        <h1 className="shine-text">{t('volume')}</h1>
                                        <h1 className="text-sbgreen">350M</h1>
                                    </div>
                                </div>

                                <div className="h-[120%] xl:h-[130%] w-full border-[2px] rounded-[10px] border-sbgreen">
                                    <h1>IMAGEM</h1>
                                </div>
                            </div>

                            <div className="translate-y-[-5px] sm:translate-y-[-15px] translate-x-[-5px] w-full flex justify-center sm:justify-between items-center scale-[72%] sm:scale-[100%]">
                                <div className="flex items-center ml-7 mr-[60px] sm:mr-0 gap-1 text-red-600 font-medium">
                                    <BiSolidUpArrow className="text-[15px] rotate-180" />
                                    <h1 className="sm:translate-y-[3px] text-[25px]">0.05%</h1>
                                </div>

                                <div className="flex gap-3 h-[50px]">
                                    <input type="text" className="text-center w-[90px] text-[16px] border-[2px] border-tertiary bg-transparent rounded-[15px] focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                                    <button className="mr-[8px] bg-sbgreen rounded-[15px] w-[100px] sm:w-[80px] text-[17px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">{t('buy')}</button>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                )
            }
        </>
    );
};