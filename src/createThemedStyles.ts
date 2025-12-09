import {
	StyleSheet,
	ViewStyle,
	TextStyle,
	ImageStyle,
	useColorScheme,
} from 'react-native';
import {useMemo} from 'react';
import {useAtomValue} from 'jotai';
import {
	themeModeAtom,
	lightThemeStylesAtom,
	darkThemeStylesAtom,
	staticStylesAtom,
} from './themeAtom';
import {Theme} from './types';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = {[P in keyof T]: RNStyle};

export function createThemedStyles<
	TThemeStyles extends Record<string, any>,
	TStaticStyles extends Record<string, any>,
	Props extends Record<string, any> = {},
	Styles extends NamedStyles<any> = NamedStyles<any>
>(
	stylesFn: (theme: Theme<TThemeStyles, TStaticStyles>, props: Props) => Styles
) {
	return (props?: Props) => {
		const mode = useAtomValue(themeModeAtom);
		const lightThemeStyles = useAtomValue(lightThemeStylesAtom) as TThemeStyles;
		const darkThemeStyles = useAtomValue(darkThemeStylesAtom) as TThemeStyles;
		const staticStyles = useAtomValue(staticStylesAtom) as TStaticStyles;

		const systemScheme = useColorScheme();

		let activeThemeStyles: TThemeStyles;

		if (mode === 'light') {
			activeThemeStyles = lightThemeStyles;
		} else if (mode === 'dark') {
			activeThemeStyles = darkThemeStyles;
		} else if (mode === 'system') {
			if (systemScheme === 'dark') {
				activeThemeStyles = darkThemeStyles;
			} else {
				activeThemeStyles = lightThemeStyles;
			}
		} else {
			// fallback if mode is somehow undefined
			activeThemeStyles = lightThemeStyles;
		}

		const activeTheme: Theme<TThemeStyles, TStaticStyles> = {
			themeStyles: activeThemeStyles,
			staticStyles,
		};

		const styles = useMemo(() => {
			return StyleSheet.create(stylesFn(activeTheme, (props ?? {}) as Props));
		}, [activeThemeStyles, staticStyles, props]);

		const getDynamicStyles = (dynamicProps: Props) => {
			return StyleSheet.create(stylesFn(activeTheme, dynamicProps));
		};

		return {styles, getDynamicStyles, theme: activeTheme};
	};
}
