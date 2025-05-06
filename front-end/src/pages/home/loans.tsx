"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { FaArrowLeft } from "react-icons/fa";

import { useLoans } from "../../providers/LoansProvider";

export default function Loans() {
    const { t } = useTranslation();
    
    const { aboutLoans, handleAboutLoans, handleRequestLoan, remainingMonths } = useLoans();

    return (
        <>
            {aboutLoans ?
                (
                    <main className="select-none">
                        <motion.div
                            key="aboutLoans"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            >
                            <header className="flex flex-row justify-between items-center mt-10 mx-7 lg:mx-1">
                                <button onClick={() => handleAboutLoans()} className="text-sbgreen text-[35px] opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease"><FaArrowLeft /></button>
                                <h1 className="shine-text hidden md:block text-[40px]">{t('titleAboutLoans')}</h1>
                                <span></span>
                            </header>

                            <section className="flex justify-center items-center pt-[35px] px-[30px] 2xl:px-[300px]">
                                <h2 className="text-[18px] sm:text-[20px] text-justify">{t('aboutLoans')}</h2>
                            </section>
                        </motion.div>
                    </main>
                ) : (
                    <section className="pb-[140px] lg:pb-5 xl:pb-0 px-5 lg:px-0 gap-6 grid grid-cols-1 md:grid-cols-2 auto-rows-fr">
                        <motion.div
                            key="loan1"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex gap-2 text-[20px] sm:text-[30px] md:text-[22px] xl:text-[30px] mt-5">
                                <h2 className="text-sbgreen font-medium">12</h2>
                                <h2 className="shine-text font-light">{t('months')}</h2>
                                <h2 className="shine-text font-light">+</h2>
                                <h2 className="text-sbgreen font-medium">10%</h2>
                                <h2 className="shine-text font-light">{t('IR')}</h2>
                            </div>

                            <div className="flex gap-2 text-[35px] sm:text-[45px] mb-5 sm:mb-9 font-semibold">
                                <h1 className="text-sbgreen">$</h1>
                                <h1>1.000,00</h1>
                            </div>

                            <div className="flex w-full justify-between">
                                <span className="hidden sm:block"></span>
                                <button onClick={() => handleRequestLoan(1000, 10, 12)} disabled={remainingMonths > 0} className={`ml-[45px] translate-y-[-15px] sm:translate-y-[-25px] translate-x-[-30px] sm:translate-x-0 rounded-[15px] px-5 xl:px-9 py-2 text-[25px] sm:text-[30px] font-medium active:bg-opacity-25 transition duration-300 ease ${remainingMonths > 0 ? 'bg-sbgreen bg-opacity-25 cursor-not-allowed' : 'bg-sbgreen bg-opacity-50'}`}>{t(remainingMonths > 0 ? 'withdrawn' : 'withdraw')}</button>
                                <button onClick={() => handleAboutLoans()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-300 ease w-[50px] rounded-br-[25px] rounded-tl-[25px]">i</button>
                            </div>
                        </motion.div>

                        <motion.div
                            key="loan2"
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
                                <button onClick={() => handleAboutLoans()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-300 ease w-[50px] rounded-br-[25px] rounded-tl-[25px]">i</button>
                            </div>
                        </motion.div>

                        <motion.div
                            key="loan3"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex gap-2 text-[20px] sm:text-[30px] md:text-[22px] xl:text-[30px] mt-5">
                                <h2 className="text-sbgreen font-medium">36</h2>
                                <h2 className="shine-text font-light">{t('months')}</h2>
                                <h2 className="shine-text font-light">+</h2>
                                <h2 className="text-sbgreen font-medium">6%</h2>
                                <h2 className="shine-text font-light">{t('IR')}</h2>
                            </div>

                            <div className="flex gap-2 text-[35px] sm:text-[45px] mb-5 sm:mb-9 font-semibold">
                                <h1 className="text-sbgreen">$</h1>
                                <h1>10.000,00</h1>
                            </div>

                            <div className="flex w-full justify-between">
                                <span className="hidden sm:block"></span>
                                <button onClick={() => handleRequestLoan(10000, 6, 36)} disabled={remainingMonths > 0} className={`ml-[45px] translate-y-[-15px] sm:translate-y-[-25px] translate-x-[-30px] sm:translate-x-0 rounded-[15px] px-5 xl:px-9 py-2 text-[25px] sm:text-[30px] font-medium active:bg-opacity-25 transition duration-300 ease ${remainingMonths > 0 ? 'bg-sbgreen bg-opacity-25 cursor-not-allowed' : 'bg-sbgreen bg-opacity-50'}`}>{t(remainingMonths > 0 ? 'withdrawn' : 'withdraw')}</button>
                                <button onClick={() => handleAboutLoans()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-300 ease w-[50px] rounded-br-[25px] rounded-tl-[25px]">i</button>
                            </div>
                        </motion.div>

                        <motion.div
                            key="loan4"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.6, ease: "easeInOut"}}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px]"
                        >
                            <div className="flex gap-2 text-[20px] sm:text-[30px] md:text-[22px] xl:text-[30px] mt-5">
                                <h2 className="text-sbgreen font-medium">60</h2>
                                <h2 className="shine-text font-light">{t('months')}</h2>
                                <h2 className="shine-text font-light">+</h2>
                                <h2 className="text-sbgreen font-medium">3%</h2>
                                <h2 className="shine-text font-light">{t('IR')}</h2>
                            </div>

                            <div className="flex gap-2 text-[35px] sm:text-[45px] mb-5 sm:mb-9 font-semibold">
                                <h1 className="text-sbgreen">$</h1>
                                <h1>100.000,00</h1>
                            </div>

                            <div className="flex w-full justify-between">
                                <span className="hidden sm:block"></span>
                                <button onClick={() => handleRequestLoan(100000, 3, 60)} disabled={remainingMonths > 0} className={`ml-[45px] translate-y-[-15px] sm:translate-y-[-25px] translate-x-[-30px] sm:translate-x-0 rounded-[15px] px-5 xl:px-9 py-2 text-[25px] sm:text-[30px] font-medium active:bg-opacity-25 transition duration-300 ease ${remainingMonths > 0 ? 'bg-sbgreen bg-opacity-25 cursor-not-allowed' : 'bg-sbgreen bg-opacity-50'}`}>{t(remainingMonths > 0 ? 'withdrawn' : 'withdraw')}</button>
                                <button onClick={() => handleAboutLoans()} className="text-[35px] font-medium bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-300 ease w-[50px] rounded-br-[25px] rounded-tl-[25px]">i</button>
                            </div>
                        </motion.div>
                    </section>
                )
            }
        </>
    );
};