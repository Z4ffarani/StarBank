import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import UploadIcon from '../../../../public/icons/settings/upload.png';

export default function changeAvatar() {
  const { t } = useTranslation();

  return (
    <motion.section
      key="changeAvatar"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.6, ease: "easeInOut"}}
      className='bg-transparent flex flex-col justify-between lg:bg-primary rounded-[25px] px-6 sm:px-[50px] gap-[55px] lg:py-[45px] xl:py-[55px] mb-[250px] lg:mb-0'
    >
      <div className='flex justify-center xl:justify-start'>
        <h1 className='shine-text text-[35px] sm:text-[40px]'>{t('uploadAvatar')}</h1>
      </div>

      <div className='flex justify-center'>
        <button className='opacity-50 active:opacity-100 transition duration-300 ease'><Image src={UploadIcon} alt="Upload avatar image icon" className='w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]' /></button>
      </div>

      <div className='flex justify-center xl:justify-end'>
        <button type="submit" className="mt-1 h-[65px] px-8 text-[24px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('changeAvatar')}</button>
      </div>
    </motion.section>
  );
};