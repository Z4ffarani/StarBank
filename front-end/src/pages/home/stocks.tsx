"use client";

import { motion } from "framer-motion";

import { FaArrowLeft } from "react-icons/fa";

import { useTranslation } from "next-i18next";

import { useStocks } from "../../providers/StocksProvider";

export default function Stocks() {
    const { t } = useTranslation();
    
    const { aboutStocks, stockList, quantities, inputQuantities, handleAboutStocks, setInputQuantities, handleBuyStock, handleSellStock } = useStocks();

    return (
        <>
            { aboutStocks ? (
                <main className="select-none">
                    <motion.div
                        key="aboutStocks"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <header className="flex flex-row justify-between items-center mt-10 mx-7 lg:mx-1">
                            <button onClick={() => handleAboutStocks()} className="text-sbgreen text-[35px] opacity-50 hover:opacity-100 active:opacity-50 transition duration-300 ease">
                                <FaArrowLeft />
                            </button>
                            <h1 className="shine-text hidden md:block text-[40px]">{t('titleAboutStocks')}</h1>
                            <span></span>
                        </header>

                        <section className="flex justify-center items-center pt-[35px] px-[30px] 2xl:px-[300px]">
                            <h2 className="text-[18px] sm:text-[20px] text-justify">{t('aboutStocks')}</h2>
                        </section>
                    </motion.div>
                </main>
            ) : (
                <main className="lg:h-[400px] xl:h-[600px] 2xl:h-[700px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 pb-[110px] lg:pb-0 mx-[3px] lg:mx-[-3px]">
                    {stockList.map(stock => (
                        <motion.div
                            key={stock.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="flex flex-col justify-between items-center gap-5 bg-secondary lg:bg-primary rounded-[25px] mx-4 mb-8"
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
                                    <img src={stock.image} className="h-full w-full object-contain scale-[160%] sm:scale-[195%]" />
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

                                    <button onClick={() => handleSellStock(stock)} className="bg-red-600 rounded-[15px] w-[70px] text-[13px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">
                                        {t('sell')}
                                    </button>

                                    <button onClick={() => handleBuyStock(stock)} className="mr-[8px] bg-sbgreen rounded-[15px] w-[70px] text-[13px] font-medium bg-opacity-50 active:bg-opacity-25 transition duration-300 ease">
                                        {t('buy')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </main>
            )}
        </>
    );
};