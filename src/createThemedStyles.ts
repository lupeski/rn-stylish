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
import {themeModeAtom, lightThemeAtom, darkThemeAtom} from './themeAtom';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = {[P in keyof T]: RNStyle};

export function createThemedStyles<
	Props extends Record<string, any> = Record<string, any>,
	Styles extends NamedStyles<Styles> = NamedStyles<any>
>(stylesFn: (theme: Theme, props: Props) => Styles) {
	return (props?: Props) => {
		const systemScheme = useColorScheme();
		const mode = useAtomValue(themeModeAtom);
		const lightTheme = useAtomValue(lightThemeAtom);
		const darkTheme = useAtomValue(darkThemeAtom);

		let activeTheme: Theme;
		if (mode === 'light') {
			activeTheme = lightTheme;
		} else if (mode === 'dark') {
			activeTheme = darkTheme;
		} else {
			activeTheme = systemScheme === 'dark' ? darkTheme : lightTheme;
		}

		const styles = useMemo(() => {
			return StyleSheet.create(stylesFn(activeTheme, (props ?? {}) as Props));
		}, [activeTheme, props, lightTheme, darkTheme]);

		const getDynamicStyles = (dynamicProps: Props) => {
			return StyleSheet.create(stylesFn(activeTheme, dynamicProps));
		};

		return {styles, getDynamicStyles, theme: activeTheme};
	};
}
