import {useAtom, useSetAtom} from 'jotai';
import {
	themeModeAtom,
	lightThemeStylesAtom,
	darkThemeStylesAtom,
	staticStylesAtom,
} from './themeAtom';
import {ThemeStyles, StaticStyles, ThemeMode} from './types';

export const useThemeSelect = () => {
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);
	const setLightThemeStyles = useSetAtom(lightThemeStylesAtom);
	const setDarkThemeStyles = useSetAtom(darkThemeStylesAtom);
	const setStaticStyles = useSetAtom(staticStylesAtom);

	return {
		themeMode,
		setThemeMode: (mode: ThemeMode) => setThemeMode(mode),
		setLightThemeStyles: (styles: ThemeStyles) => setLightThemeStyles(styles),
		setDarkThemeStyles: (styles: ThemeStyles) => setDarkThemeStyles(styles),
		setStaticStyles: (styles: StaticStyles) => setStaticStyles(styles),
	};
};
