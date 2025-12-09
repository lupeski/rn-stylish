import {atomWithStorage} from 'jotai/utils';

export type ThemeMode = 'light' | 'dark' | 'system';

// Function to create the theme atom with a custom initial value
export function createThemeModeAtom(initialMode: ThemeMode = 'system') {
	// atomWithStorage will use initialMode only on first launch
	// On subsequent launches, it loads from storage
	return atomWithStorage<ThemeMode>('themeMode', initialMode);
}
