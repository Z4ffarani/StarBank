const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function changePassword() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
  
  const { t } = useTranslation();

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
        alert(t('passwordChanged'));
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
    <motion.form
      key="changePassword"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.6, ease: "easeInOut"}}
      className='bg-transparent flex flex-col justify-center lg:bg-primary rounded-[25px] px-6 sm:p-14 sm:px-[50px] mb-[250px] lg:mb-0'
      onSubmit={handleChangePassword}
    >
      <div>
        <fieldset className="flex flex-col group">
          <label htmlFor="password" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('email')}</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
        </fieldset>

        <fieldset className="flex flex-col group">
          <label htmlFor="password" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('newPassword')}</label>
          <input type="password" onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
        </fieldset>

        <fieldset className="flex flex-col group">
          <label htmlFor="password" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('repeatNewPassword')}</label>
          <input type="password" onChange={(e) => setRepeatNewPassword(e.target.value)} required className="mt-1 mb-[60px] xl:mb-[80px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
        </fieldset>
      </div>

      <div className='flex flex justify-center xl:justify-end'>
        <button type="submit" className="mt-1 h-[65px] px-8 text-[20px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('changePassword')}</button>
      </div>
    </motion.form>
  );
};