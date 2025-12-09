import {atomWithStorage} from 'jotai/utils';
import {atom} from 'jotai';
import {ThemeStyles, StaticStyles, ThemeMode} from './types';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Initialize with empty objects - users must set their own themes
export const lightThemeStylesAtom = atom<ThemeStyles>({});
export const darkThemeStylesAtom = atom<ThemeStyles>({});
export const staticStylesAtom = atom<StaticStyles>({});
