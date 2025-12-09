import {atomWithStorage} from 'jotai/utils';
import {atom} from 'jotai';
import {ThemeMode} from './types';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

export const lightThemeStylesAtom = atom<Record<string, any>>({});
export const darkThemeStylesAtom = atom<Record<string, any>>({});
export const staticStylesAtom = atom<Record<string, any>>({});
