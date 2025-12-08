import {useAtom, useSetAtom} from 'jotai';
import {themeModeAtom, lightThemeAtom, darkThemeAtom} from './themeAtom';
import {Theme, ThemeMode} from './types';

export const useThemeSelect = () => {
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);
	const setLightTheme = useSetAtom(lightThemeAtom);
	const setDarkTheme = useSetAtom(darkThemeAtom);

	return {
		themeMode,
		setThemeMode: (mode: ThemeMode) => setThemeMode(mode),
		setLightTheme: (theme: Theme) => setLightTheme(theme),
		setDarkTheme: (theme: Theme) => setDarkTheme(theme),
	};
};
