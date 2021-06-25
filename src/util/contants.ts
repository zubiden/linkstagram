
export const TABLET_WIDTH = 512;
export const DESKTOP_WIDTH = 1014;

export const IS_DESKTOP = () => window.innerWidth >= DESKTOP_WIDTH;
export const IS_TABLET = () => window.innerWidth >= TABLET_WIDTH && window.innerWidth < DESKTOP_WIDTH;
export const IS_MOBILE = () => window.innerWidth < TABLET_WIDTH;

export const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); //browsers usually don't change at runtime

export const BASE_URL = "https://zubiden.github.io/linkstagram";