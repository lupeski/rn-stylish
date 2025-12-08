import {useAtom} from 'jotai';
import {themeModeAtom} from './themeAtom';

export const useThemeSelect = () => {
	const [theme, setTheme] = useAtom(themeModeAtom);

	return {
		theme,
		setTheme,
	};
};
