import {
	StyleSheet,
	useColorScheme,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from 'react-native';
import {useMemo} from 'react';
import {useAtomValue} from 'jotai';
import {Theme} from './types';
import {
	themeModeAtom,
	lightThemeStylesAtom,
	darkThemeStylesAtom,
	staticStylesAtom,
} from './themeAtom';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = {[P in keyof T]: RNStyle};

export function createThemedStyles<
	Props extends Record<string, any> = Record<string, any>,
	Styles extends NamedStyles<Styles> = NamedStyles<any>
>(stylesFn: (theme: Theme, props: Props) => Styles) {
	return (props?: Props) => {
		const systemScheme = useColorScheme();
		const mode = useAtomValue(themeModeAtom);
		const lightThemeStyles = useAtomValue(lightThemeStylesAtom);
		const darkThemeStyles = useAtomValue(darkThemeStylesAtom);
		const staticStyles = useAtomValue(staticStylesAtom);

		let activeThemeColors;
		if (mode === 'light') {
			activeThemeColors = lightThemeStyles;
		} else if (mode === 'dark') {
			activeThemeColors = darkThemeStyles;
		} else {
			activeThemeColors =
				systemScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
		}

		// Compose the theme object
		const activeTheme: Theme = {
			themeColors: activeThemeColors,
			staticColors: staticStyles,
		};

		const styles = useMemo(() => {
			return StyleSheet.create(stylesFn(activeTheme, (props ?? {}) as Props));
		}, [activeThemeColors, staticStyles, props]);

		const getDynamicStyles = (dynamicProps: Props) => {
			return StyleSheet.create(stylesFn(activeTheme, dynamicProps));
		};

		return {styles, getDynamicStyles, theme: activeTheme};
	};
}
