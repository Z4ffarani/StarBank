const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";

import { motion } from "framer-motion";
import axios from 'axios';

import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

import { useUserContext } from "../../context/UserContext";

export default function Historic() {
    const { t, i18n } = useTranslation();

    const [category, setCategory] = useState<boolean>(false);
    const [transfers, setTransfers] = useState<any[]>([]);
    
    const { emailContext } = useUserContext();

    const handleCategory = () => {
        setCategory(!category);
    };

    const fetchHistoric = async () => {
        await handleHistoric();
    };

    useEffect(() => {
        const interval = setInterval(() => {
        fetchHistoric();
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleHistoric = async () => {
        try {
            const response = await axios.get(`${backendUrl}/transfer`);
            setTransfers(response.data);
        } catch (error) {
            alert(t('errorFetchingHistoric'));
        };
    };

    const receivedTransfers = transfers.filter(t => t.recipient === emailContext);
    const sentTransfers = transfers.filter(t => t.recipient !== emailContext);

    return (
        <main className="translate-y-[-50px]">
            <div className="flex justify-end mr-5 mb-4 sm:mr-4 mt-[80px] lg:mt-0">
                <label className="flex items-center gap-2 sm:gap-3 text-sbgreen active:opacity-50 transition duration-300 ease cursor-pointer">
                    <button onClick={handleCategory} className="font-medium text-[19px] sm:text-[30px]">
                        {category ? t('transference') : t('receipt')}
                    </button>
                    {category ? (
                        <BiSolidUpArrow className="text-[15px] sm:text-[20px]" />
                    ) : (
                        <BiSolidDownArrow className="text-[15px] sm:text-[20px]" />
                    )}
                </label>
            </div>

            <section className="lg:max-h-[700px] md:pb-[140px] lg:pb-5 xl:pb-0 px-5 lg:px-0 grid auto-rows-fr">
                <div className="overflow-y-auto space-y-6">
                    {category ? (
                        sentTransfers.map((transfer: any) => (
                            <motion.div
                                key={`sent-${transfer.date}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="flex flex-col-reverse xl:flex-row bg-secondary lg:bg-primary gap-6 xl:gap-0 p-5 sm:p-10 rounded-[25px] text-[19px] sm:text-[25px] justify-between font-medium lg:mr-3"
                            >
                                <div>
                                    <div className="flex gap-1 mb-2 flex flex-col md:flex-row">
                                        <div className="flex flex-row gap-[6px]">
                                            <h1 className="text-sbgreen">{t('transference')}</h1>
                                            <h1 className="text-tertiary">{t('to')}</h1>
                                            <h1 className="text-sbgreen">{transfer.recipient}</h1>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 font-medium mt-5 xl:mt-0 text-[30px] sm:text-[35px]">
                                        <h1 className="text-sbgreen">$</h1>
                                        <h1>{transfer.amount}</h1>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <h1>{transfer.message}</h1>
                                </div>
                                
                                <div className="flex flex-row justify-between xl:justify-center xl:flex-col xl:items-center">
                                    <h1 className="text-tertiary">
                                        {new Date(transfer.date).toLocaleString(i18n.language || 'en', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </h1>
                                    <h1 className="text-tertiary">
                                        {new Date(transfer.date).toLocaleString(i18n.language, {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </h1>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        receivedTransfers.map((transfer: any) => (
                            <motion.div
                                key={`received-${transfer.date}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="flex flex-col-reverse xl:flex-row bg-secondary lg:bg-primary gap-6 xl:gap-0 p-5 sm:p-10 rounded-[25px] text-[19px] sm:text-[25px] justify-between font-medium lg:mr-4"
                            >
                                <div>
                                    <div className="flex gap-1 mb-2 flex flex-col md:flex-row">
                                        <div className="flex flex-row gap-[6px]">
                                            <h1 className="text-sbgreen">{t('receipt')}</h1>
                                            <h1 className="text-tertiary">{t('from')}</h1>
                                            <h1 className="text-sbgreen">{transfer.sender}</h1>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 font-medium mt-5 xl:mt-0 text-[30px] sm:text-[35px]">
                                        <h1 className="text-sbgreen">$</h1>
                                        <h1>{transfer.amount}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between xl:justify-center xl:flex-col xl:items-center">
                                    <h1 className="text-tertiary">
                                        {new Date(transfer.date).toLocaleString(i18n.language || 'en', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </h1>
                                    <h1 className="text-tertiary">
                                        {new Date(transfer.date).toLocaleString(i18n.language, {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </h1>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
};