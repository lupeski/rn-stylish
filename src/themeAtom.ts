import {atomWithStorage} from 'jotai/utils';
import {atom} from 'jotai';
import {ThemeColors, StaticColors, ThemeMode} from './types';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Initialize with empty objects - users must set their own themes
export const lightThemeStylesAtom = atom<ThemeColors>({
	background: '',
	text: '',
	linkText: '',
});

export const darkThemeStylesAtom = atom<ThemeColors>({
	background: '',
	text: '',
	linkText: '',
});

export const staticStylesAtom = atom<StaticColors>({});
