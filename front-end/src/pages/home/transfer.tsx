import { useTransfer } from '../../providers/TransferProvider';

import { useTranslation } from "next-i18next";

export default function Transfer() {
    const { setAmount, setRecipient, setPassword, setMessage, handleTransfer } = useTransfer();
    
    const { t } = useTranslation();

    return (
        <form onSubmit={handleTransfer} className="lg:mt-[19px] bg-primary rounded-[25px] grid grid-cols-1 lg:grid-cols-2 px-6 md:px-[80px] lg:p-[50px] xl:p-[70px] gap-[40px] lg:gap-[70px]">
            <section>
                <fieldset className="flex flex-col group">
                    <label htmlFor="number" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('amount')}</label>
                    <input type="number" step="0.01" onChange={(e) => setAmount(parseFloat(e.target.value))} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                </fieldset>

                <fieldset className="flex flex-col group">
                    <label htmlFor="number" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('recipient')}</label>
                    <input type="email" onChange={(e) => setRecipient(e.target.value)} required className="mt-1 mb-[40px] h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                </fieldset>

                <fieldset className="flex flex-col group">
                    <label htmlFor="password" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('password')}</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required className="mt-1 h-[50px] pl-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                </fieldset>
            </section>

            <section className='flex flex-col mb-[160px] lg:mb-0'>
                <fieldset className="flex flex-col group">
                    <label htmlFor="message" className="text-[20px] text-tertiary group-focus-within:text-sbgreen transition duration-300 ease">{t('message')}</label>
                    <textarea rows={5} onChange={(e) => setMessage(e.target.value)} required className="mt-1 mb-[60px] p-3 text-[20px] rounded-lg border-tertiary border-[2px] bg-primary focus:outline-none focus:border-sbgreen transition duration-300 ease" />
                </fieldset>

                <div className='flex justify-center xl:justify-end'>
                    <button type="submit" className="mt-1 h-[65px] px-8 text-[20px] font-semibold rounded-lg bg-sbgreen bg-opacity-50 active:bg-opacity-25 transition duration-200 ease">{t('transfer')}</button>
                </div>
            </section>
        </form>
    );
};