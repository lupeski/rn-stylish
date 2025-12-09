import {atomWithStorage} from 'jotai/utils';

export type ThemeMode = 'light' | 'dark' | 'system';

// This atom will auto-load from storage on subsequent app launches
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');
