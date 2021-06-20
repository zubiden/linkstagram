import { selectLanguageCode } from "../slices/localizationSlice";
import store from "../store";
import { LocalizationParameters } from "../types";

export function getRelativeDateKey(timestamp: number | string, now: number): LocalizationParameters {
    if(typeof timestamp === "string") timestamp = new Date(timestamp).getTime()/1000;
    const diff = Math.abs(now - timestamp)

    if (diff < 60) {
        return {
            key: "date_now"
        }
    }

    if (diff < 3600) {
        const minutes = Math.floor(diff / 60);

        return {
            key: "date_minutes",
            count: minutes,
            replaces: {
                count: minutes.toString()
            }
        }
    }

    if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return {
            key: "date_hours",
            count: hours,
            replaces: {
                count: hours.toString()
            }
        }
    }

    let date = new Date(timestamp*1000).toLocaleDateString(selectLanguageCode(store.getState()), {year: "numeric", month: "long", day: "2-digit"});
    return {
        key: "date_date",
        replaces: {
            date: date
        }
    }

}
