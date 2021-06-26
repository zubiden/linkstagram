import { en, PluralCategory, uk } from "make-plural";
import { EffectCallback, useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectLanguageCode, selectTranslationStrings } from '../slices/localizationSlice';
import { selectIsLoggedIn, selectIsLoggingIn } from "../slices/profileSlice";
import type { AppDispatch, RootState } from '../store';
import { LanguageValue, LocalizationParameters } from '../types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export const useAuthorization = () => {
    const loggedIn = useAppSelector(selectIsLoggedIn);
    const loggingIn = useAppSelector(selectIsLoggingIn);
    const history = useHistory();

    return (func?: Function) => {
        if (loggingIn) return; // no account is available at this moment
        if (loggedIn) {
            func?.()
        } else {
            history.push("/login");
        }
    }
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export const useLocalization = () => {
    const strings = useAppSelector(selectTranslationStrings);
    const code = useAppSelector(selectLanguageCode);

    const lp = (key: LocalizationParameters | string = "NO_TRANSLATION_KEY_PROVIDED", replaces: { [key: string]: string } = {}, count: number = 1, defaultValue: string | undefined = undefined): string => {
        if (isLocalizationParameters(key)) return lp(key.key, key.replaces, key.count, key.defaultValue);
        let value = strings[key];
        if (!value) {
            return defaultValue || key;
        }

        let found = key;
        if (isLanguageValue(value)) {
            found = value[countToPluralCode(code, count)] || value.other;
        } else {
            found = value;
        }

        for (let replace in replaces) {
            let replacement = replaces[replace];
            found = found.replaceAll(`{${replace}}`, replacement);
        }
        return found;
    }

    return lp;
}

const countToPluralCode = (code: string, count: number): PluralCategory => {
    const plurals: { [key: string]: (n: number | string, ord?: boolean) => PluralCategory } = {
        "uk": uk,
        "en": en
    }
    return plurals[code](count);
}

// TODO autogenerate guards based on fields and accept any
// move from hooks
export const isLocalizationParameters = (key: LocalizationParameters | string): key is LocalizationParameters => {
    return (key as string).length === undefined;
}

export const isLanguageValue = (value: LanguageValue | string): value is LanguageValue => {
    return (value as string).length === undefined;
}