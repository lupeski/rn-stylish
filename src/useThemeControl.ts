import {useAtom} from 'jotai';
import {themeModeAtom} from './themeAtom';

export function useThemeControl() {
	const [theme, setTheme] = useAtom(themeModeAtom);

	return {
		theme,
		setTheme,
	};
}
