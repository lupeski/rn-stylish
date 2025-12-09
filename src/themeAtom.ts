import {atomWithStorage} from 'jotai/utils';
import {atom} from 'jotai';
import {ThemeColors, StaticColors, ThemeMode} from './types';
import {defaultLightTheme, defaultDarkTheme} from './defaultTheme';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Separate atoms for theme colors and static colors
export const lightThemeStylesAtom = atom<ThemeColors>(
	defaultLightTheme.themeColors
);
export const darkThemeStylesAtom = atom<ThemeColors>(
	defaultDarkTheme.themeColors
);
export const staticStylesAtom = atom<StaticColors>(
	defaultLightTheme.staticColors
);
