import SETTINGS from "@/enums/common-text";

export const getTranslator = () => {
  const settings: any = SETTINGS;
  return (key: string, params?: { [key: string]: string | number }) => {
    let translation = key.split(".").reduce((obj, key) => obj && obj[key], settings);
    if (!translation) {
      return key;
    }
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation!.replace(`{${key}}`, String(value));
      });
    }
    return translation;
  };
};
