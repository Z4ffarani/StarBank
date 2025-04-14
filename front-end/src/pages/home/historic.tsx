import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

export default function Historic() {
    const { t } = useTranslation();
    const [category, setCategory] = useState<boolean>(false);

    const handleCategory = () => {
        setCategory(!category);
    }

    return category ? (
        <main className="translate-y-[-50px]">
            <div className="flex justify-end mr-5 mb-4 sm:mr-4 mt-[80px] lg:mt-0">
                <label className="flex items-center gap-2 sm:gap-3 text-sbgreen active:opacity-50 transition duration-300 ease cursor-pointer">
                    <button onClick={handleCategory} className="font-medium text-[19px] sm:text-[30px]">{t('transference')}</button>
                    <BiSolidDownArrow className="rotate-180 text-[15px] sm:text-[20px]" />
                </label>
            </div>

            <section className="pb-[140px] lg:pb-5 xl:pb-0 px-5 lg:px-0 gap-6 grid auto-rows-fr">
                <motion.div
                    key="historicTransfer"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.6, ease: "easeInOut"}}
                    className="flex flex-col-reverse xl:flex-row bg-secondary lg:bg-primary gap-6 xl:gap-0 p-5 sm:p-10 rounded-[25px] text-[19px] sm:text-[25px] justify-between font-medium"
                >
                    <div>
                        <div className="flex gap-1 mb-2 flex flex-col md:flex-row">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sbgreen">{t('receipt')}</h1>
                                <h1 className="text-tertiary">{t('from')}</h1>
                            </div>

                            <h1 className="text-sbgreen">ronaldreaggen@gmail.com</h1>
                        </div>

                        <div className="flex gap-1 font-medium mt-5 xl:mt-0 text-[30px] sm:text-[35px]">
                            <h1 className="text-sbgreen">{t('currency')}</h1>
                            <h1>10.000,00</h1>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between xl:justify-center xl:flex-col xl:items-center">
                        <h1 className="text-tertiary">01/10/2025</h1>
                        <h1 className="text-tertiary">10:30 AM</h1>
                    </div>  
                </motion.div>
            </section>
        </main>
    ) : (
        <main className="translate-y-[-50px]">
            <div className="flex justify-end mr-5 mb-4 sm:mr-4 mt-[80px] lg:mt-0">
                <label className="flex items-center gap-2 sm:gap-3 text-sbgreen active:opacity-50 transition duration-300 ease cursor-pointer">
                    <button onClick={handleCategory} className="font-medium text-[19px] sm:text-[30px]">{t('receipt')}</button>
                    <BiSolidUpArrow className="rotate-180 text-[15px] sm:text-[20px]" />
                </label>
            </div>

            <section className="pb-[140px] lg:pb-5 xl:pb-0 px-5 lg:px-0 gap-6 grid auto-rows-fr">
                <motion.div
                    key="historicReceipt"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.6, ease: "easeInOut"}}
                    className="flex flex-col-reverse xl:flex-row bg-secondary lg:bg-primary gap-6 xl:gap-0 p-5 sm:p-10 rounded-[25px] text-[19px] sm:text-[25px] justify-between font-medium"
                >
                    <div>
                        <div className="flex gap-1 mb-2 flex flex-col md:flex-row">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sbgreen">{t('receipt')}</h1>
                                <h1 className="text-tertiary">{t('from')}</h1>
                            </div>

                            <h1 className="text-sbgreen">ronaldreaggen@gmail.com</h1>
                        </div>

                        <div className="flex gap-1 font-medium mt-5 xl:mt-0 text-[30px] sm:text-[35px]">
                            <h1 className="text-sbgreen">{t('currency')}</h1>
                            <h1>10.000,00</h1>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between xl:justify-center xl:flex-col xl:items-center">
                        <h1 className="text-tertiary">01/10/2025</h1>
                        <h1 className="text-tertiary">10:30 AM</h1>
                    </div>  
                </motion.div>
            </section>
        </main>
    )
}