import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

// Create storage adapter for React Native
const storage = createJSONStorage<ThemeMode>(() => AsyncStorage);

let cachedAtom: any = null;

// Function to create the theme atom with a custom initial value
// This ensures we only create one atom instance, even if called multiple times
export function createThemeModeAtom(initialMode: ThemeMode = 'system') {
	if (!cachedAtom) {
		// atomWithStorage will use initialMode only on first launch
		// On subsequent launches, it loads from AsyncStorage
		cachedAtom = atomWithStorage<ThemeMode>('themeMode', initialMode, storage);
	}
	return cachedAtom;
}
