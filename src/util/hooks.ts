import { en, PluralCategory, uk } from "make-plural";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectLanguageCode, selectTranslationStrings } from '../slices/localizationSlice';
import { selectIsLoggedIn } from "../slices/profileSlice";
import type { AppDispatch, RootState } from '../store';
import { LanguageValue, LocalizationParameters } from '../types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCheckLogin = () => {
    const loggedIn = useAppSelector(selectIsLoggedIn);
    const history = useHistory();

    return (func?: Function) => {
        if(loggedIn) {
            func?.()
        } else {
            history.push("/login");
        }
    }
}

export const useLocalization = () => {
    const strings = useAppSelector(selectTranslationStrings);
    const code = useAppSelector(selectLanguageCode);

    const lp = (key: LocalizationParameters | string = "NO_TRANSLATION_KEY_PROVIDED", replaces: {[key: string]: string} = {}, count: number = 1, defaultValue: string | undefined = undefined): string => {
		if(isLocalizationParameters(key)) return lp(key.key, key.replaces, key.count, key.defaultValue);
        let value = strings[key];
		if(!value) {
			return defaultValue || key;
		}

		let found = key;
		if(isLanguageValue(value)) {
            found = value[countToPluralCode(code, count)] || value.other; 
		} else {
			found = value;
		}

		for(let replace in replaces) {
			let replacement = replaces[replace];
			found = found.replaceAll(`{${replace}}`, replacement);
		}
        return found;
	}

    return lp;
}

function countToPluralCode(code: string, count: number): PluralCategory {
    const plurals: {[key: string]: (n: number | string, ord?: boolean) => PluralCategory} = {
        "uk": uk,
        "en": en
    }
    return plurals[code](count);
}

export function isLocalizationParameters(key: LocalizationParameters | string): key is LocalizationParameters {
    return (key as string).length === undefined;
}

export function isLanguageValue(value: LanguageValue | string): value is LanguageValue {
    return (value as string).length === undefined;
}