import {useAtom, useSetAtom} from 'jotai';
import {
	themeModeAtom,
	lightThemeStylesAtom,
	darkThemeStylesAtom,
	staticStylesAtom,
} from './themeAtom';
import {ThemeColors, StaticColors, ThemeMode} from './types';

export const useThemeSelect = () => {
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);
	const setLightThemeStyles = useSetAtom(lightThemeStylesAtom);
	const setDarkThemeStyles = useSetAtom(darkThemeStylesAtom);
	const setStaticStyles = useSetAtom(staticStylesAtom);

	return {
		themeMode,
		setThemeMode: (mode: ThemeMode) => setThemeMode(mode),
		setLightThemeStyles: (styles: ThemeColors) => setLightThemeStyles(styles),
		setDarkThemeStyles: (styles: ThemeColors) => setDarkThemeStyles(styles),
		setStaticStyles: (styles: StaticColors) => setStaticStyles(styles),
	};
};
