"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Image from 'next/image';

import ChangeEmailIcon from '../../../../public/icons/settings/email.png';
import ChangePasswordIcon from '../../../../public/icons/settings/lock.png';
import ChangeAvatarIcon from '../../../../public/icons/settings/avatar.png';
import ResetWalletIcon from '../../../../public/icons/settings/money-sign.png';
import DeleteAccountIcon from '../../../../public/icons/settings/trash-bin.png';

import ChangePassword from './changePassword';
import ChangeAvatar from './changeAvatar';
import ResetWallet from './resetWallet';
import DeleteAccount from './deleteAccount';

import DarkLogo from '../../../../public/logos/dark-logo.png';

export default function Settings() {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState<string | null>(null);  
  
  const renderPage = () => {
    switch (activePage) {
      case 'changeAvatar':
        return <ChangeAvatar />;
      case 'changePassword':
        return <ChangePassword />;
      case 'deleteAccount':
        return <DeleteAccount />;
      case 'resetWallet':
        return <ResetWallet />;
      default:
        return (
          <motion.section
            key="changeEmail"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.6, ease: "easeInOut"}}
            className='bg-transparent flex flex-col justify-center lg:bg-primary rounded-[25px] 2xl:gap-8 px-6 sm:px-[50px] mb-[250px] lg:mb-0'
          >
            <div>
              <fieldset className="flex flex-col group">
                <label htmlFor="email" className="text-[25px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('previousEmail')}</label>
                <input id="email" type="email" required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
              </fieldset>

              <fieldset className="flex flex-col group">
                <label htmlFor="email" className="text-[25px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('newEmail')}</label>
                <input id="email" type="email" required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
              </fieldset>

              <fieldset className="flex flex-col group">
                <label htmlFor="email" className="text-[25px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('repeatNewEmail')}</label>
                <input id="email" type="email" required className="mt-1 mb-[60px] xl:mb-[120px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
              </fieldset>
            </div>

            <div className='flex justify-center xl:justify-end'>
              <button type="submit" className="mt-1 h-[65px] px-8 text-[24px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('changeEmail')}</button>
            </div>
          </motion.section>
        )
    };
  };

  return (
    <>
      <Head>
        <title>StarBank</title>
      </Head>

      <motion.div
        key="menuSettings"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.6, ease: "easeInOut"}}
      >
        <main className='lg:gap-5 grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] 2xl:grid-cols-[1fr_4fr] select-none'>
          <div className="hidden lg:block">
            <button onClick={() => setActivePage('')} className={`w-full mb-[30px] py-3 px-[20px] bg-primary border-[2px] rounded-xl text-[20px] xl:text-[25px] hover:text-sbgreen ${['changePassword', 'changeAvatar', 'resetWallet', 'deleteAccount'].includes(activePage ?? '') ? 'text-tertiary border-transparent' : 'border-sbgreen text-sbgreen'} transiton duration-300 ease`}>{t('changeEmail')}</button>
            <button onClick={() => setActivePage('changePassword')} className={`w-full mb-[30px] py-3 px-[20px] bg-primary border-[2px] rounded-xl text-[20px] xl:text-[25px] hover:text-sbgreen ${activePage === 'changePassword' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transiton duration-300 ease`}>{t('changePassword')}</button>
            <button onClick={() => setActivePage('changeAvatar')} className={`w-full mb-[30px] py-3 px-[20px] bg-primary border-[2px] rounded-xl text-[20px] xl:text-[25px] hover:text-sbgreen ${activePage === 'changeAvatar' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transiton duration-300 ease`}>{t('changeAvatar')}</button>
            <button onClick={() => setActivePage('resetWallet')} className={`w-full mb-[30px] py-3 px-[20px] bg-primary border-[2px] rounded-xl text-[20px] xl:text-[25px] hover:text-sbgreen ${activePage === 'resetWallet' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transiton duration-300 ease`}>{t('resetWallet')}</button>
            <button onClick={() => setActivePage('deleteAccount')} className={`w-full mb-[30px] py-3 px-[20px] bg-primary border-[2px] rounded-xl text-[20px] xl:text-[25px] hover:text-sbgreen ${activePage === 'deleteAccount' ? 'border-sbgreen text-sbgreen' : 'text-tertiary border-transparent'} transiton duration-300 ease`}>{t('deleteAccount')}</button>

            <Image src={DarkLogo} alt="SB dark logo" className='scale-90 hidden sm:block mt-5'/>
          </div>

          {renderPage()}
        </main>

        <section className="sm:mx-[-19px] lg:hidden fixed flex justify-center items-center w-full bottom-[90px]">
          <div>
            <nav className="flex justify-center items-center bg-primary rounded-[23px] gap-7 sm:gap-10 sm:scale-[110%] p-6">
              <button onClick={() => setActivePage('')} className={`h-[25px] w-[25px] ${['changePassword', 'changeAvatar', 'resetWallet', 'deleteAccount'].includes(activePage ?? '') ? 'opacity-50' : 'opacity-100'} transition duration-300 ease`}><Image src={ChangeEmailIcon} alt="Change e-mail icon" /></button>
              <button onClick={() => setActivePage('changePassword')} className={`h-[25px] w-[25px] ${activePage === 'changePassword' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={ChangePasswordIcon} alt="Change password icon" /></button>
              <button onClick={() => setActivePage('changeAvatar')} className={`h-[25px] w-[25px] ${activePage === 'changeAvatar' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={ChangeAvatarIcon} alt="Change avatar icon" /></button>
              <button onClick={() => setActivePage('resetWallet')} className={`h-[25px] w-[25px] ${activePage === 'resetWallet' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={ResetWalletIcon} alt="Stocks icon" /></button>
              <button onClick={() => setActivePage('deleteAccount')} className={`h-[25px] w-[25px] ${activePage === 'deleteAccount' ? 'opacity-100' : 'opacity-50'} transition duration-300 ease`}><Image src={DeleteAccountIcon} alt="Delete account icon" /></button>
            </nav>
          </div>
        </section>
      </motion.div>
    </>
  );
};