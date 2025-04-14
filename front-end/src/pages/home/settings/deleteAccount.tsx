import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function deleteAccount() {
  const { t } = useTranslation();

  return (
    <motion.section
      key="changePassword"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.6, ease: "easeInOut"}}
      className='bg-transparent flex flex-col justify-between lg:bg-primary gap-[50px] rounded-[25px] px-6 sm:px-[50px] lg:py-[55px] mb-[250px] lg:mb-0'
    >
      <div>
        <h1 className='text-tertiary text-[25px] lg:text-[30px] text-center lg:text-justify'>{t('aboutDeleteAccount')}</h1>
      </div>

      <div className='flex justify-center xl:justify-end'>
        <button type="submit" className="mt-1 h-[65px] px-8 text-[24px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('deleteAccount')}</button>
      </div>
    </motion.section>
  );
};