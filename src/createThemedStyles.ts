import {
	StyleSheet,
	useColorScheme,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from 'react-native';
import {useMemo} from 'react';
import {useAtomValue} from 'jotai';
import {
	themeModeAtom,
	lightThemeStylesAtom,
	darkThemeStylesAtom,
	staticStylesAtom,
} from './themeAtom';
import {Theme, ThemeStyles, StaticStyles} from './types';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = {[P in keyof T]: RNStyle};

export function createThemedStyles<
	TThemeStyles extends ThemeStyles,
	TStaticStyles extends StaticStyles,
	Props extends Record<string, any> = {},
	Styles extends NamedStyles<Styles> = NamedStyles<any>
>(
	stylesFn: (theme: Theme<TThemeStyles, TStaticStyles>, props: Props) => Styles
) {
	return (props?: Props) => {
		const systemScheme = useColorScheme();
		const mode = useAtomValue(themeModeAtom);
		const lightThemeStyles = useAtomValue(lightThemeStylesAtom) as TThemeStyles;
		const darkThemeStyles = useAtomValue(darkThemeStylesAtom) as TThemeStyles;
		const staticStyles = useAtomValue(staticStylesAtom) as TStaticStyles;

		let activeThemeStyles: TThemeStyles;
		if (mode === 'light') {
			activeThemeStyles = lightThemeStyles;
		} else if (mode === 'dark') {
			activeThemeStyles = darkThemeStyles;
		} else {
			activeThemeStyles =
				systemScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
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
