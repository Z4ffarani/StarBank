const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useState } from 'react';

import { useTranslation } from "next-i18next";
import { motion } from 'framer-motion';
import axios from 'axios';

export default function resetWallet() {
  const { t } = useTranslation();
  
  const [addBalance, setAddBalance] = useState<string>('');

  const handleResetWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.put(`${backendUrl}/user/resetWallet`, {
        balance: addBalance
      });

    } catch (error) {
      alert(t('errorResettingWallet'));
    };

    alert(t('walletReset'));
  };

  return (
    <motion.form
      key="changePassword"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.6, ease: "easeInOut"}}
      className='bg-transparent flex flex-col justify-between lg:bg-primary gap-[80px] rounded-[25px] px-6 sm:px-[50px] lg:py-[55px] mb-[250px] lg:mb-0'
      onSubmit={handleResetWallet}
    >
      <div>
        <fieldset className="flex flex-col group mb-12">
          <label className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('newBalance')}</label>
          <input type='number' min={1} onChange={(e) => setAddBalance(e.target.value)} required className="mt-1 mb-3 h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
          <p className='text-[15px] text-tertiary'>{t('alertBalance')}</p>
        </fieldset> 
      </div>

      <div className='flex justify-center xl:justify-end'>
        <button type='submit' className="mt-1 h-[65px] px-8 text-[20px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('resetWallet')}</button>
      </div>
    </motion.form>
  );
};