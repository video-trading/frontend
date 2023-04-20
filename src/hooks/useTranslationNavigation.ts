import { useRouter } from "next/router";
import { useEffect } from "react";
import { languageMap } from "../languages";

export function useTranslationNavigation() {
  const { locale, push, pathname } = useRouter();
  useEffect(() => {
    const browserLocale = languageMap[navigator.language];
    const routerLocale = locale;

    console.log("browserLocale", browserLocale, navigator.language);
    console.log("routerLocale", routerLocale);

    if (browserLocale !== routerLocale && browserLocale !== undefined) {
      push(pathname, pathname, { locale: browserLocale });
    }
  }, [locale]);
}
