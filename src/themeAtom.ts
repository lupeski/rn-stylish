import {atomWithStorage} from 'jotai/utils';
import {atom} from 'jotai';
import {Theme, ThemeMode} from './types';
import {defaultLightTheme, defaultDarkTheme} from './defaultTheme';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Allow users to configure their custom themes
export const lightThemeAtom = atom<Theme>(defaultLightTheme);
export const darkThemeAtom = atom<Theme>(defaultDarkTheme);
