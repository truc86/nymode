import { type langType } from '~/types/Language';

export const useLang = () => {
  const cookieLang = useCookie<langType>('lang').value;
  const lang = useState<langType>('lang', () => cookieLang || 'da');

  const setLang = (newLang: langType) => {
    lang.value = newLang;
    useCookie('lang').value = newLang;
  };

  const getLang = () => {
    return lang.value;
  };

  return {
    setLang,
    getLang,
  };
};
