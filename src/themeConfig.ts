import {Theme, ThemeConfig, NamedStyles, ThemedStylesHook} from './types';
import {StyleSheet, useColorScheme} from 'react-native';
import {useMemo} from 'react';
import {useAtomValue, useAtom} from 'jotai';
import {themeModeAtom, ThemeMode} from './themeAtom';

export function configureTheme<
	ThemeStylesType extends Record<string, any>,
	StaticStylesType extends Record<string, any>
>(config: ThemeConfig<ThemeStylesType, StaticStylesType>) {
	const {
		lightThemeStyles,
		darkThemeStyles,
		staticStyles,
		initialMode = 'system',
	} = config;

	// Create the themed styles function with the configured themes
	function createThemedStyles<
		Props extends Record<string, any> = Record<string, any>,
		Styles extends NamedStyles<Styles> = NamedStyles<any>
	>(
		stylesFn: (
			theme: Theme<ThemeStylesType, StaticStylesType>,
			props: Props
		) => Styles
	) {
		return (
			props?: Props
		): ThemedStylesHook<Styles, ThemeStylesType, StaticStylesType> => {
			const systemScheme = useColorScheme();
			const mode = useAtomValue(themeModeAtom);

			// Build the full theme object with both themeStyles and staticStyles
			let activeTheme: Theme<ThemeStylesType, StaticStylesType>;
			if (mode === 'light') {
				activeTheme = {themeStyles: lightThemeStyles, staticStyles};
			} else if (mode === 'dark') {
				activeTheme = {themeStyles: darkThemeStyles, staticStyles};
			} else {
				const themeStyles =
					systemScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
				activeTheme = {themeStyles, staticStyles};
			}

			// Base styles (with optional props)
			const styles = useMemo(() => {
				return StyleSheet.create(stylesFn(activeTheme, (props ?? {}) as Props));
			}, [activeTheme, props]);

			// Helper for generating styles dynamically
			const getDynamicStyles = (dynamicProps: Props) => {
				return StyleSheet.create(stylesFn(activeTheme, dynamicProps));
			};

			return {styles, getDynamicStyles, theme: activeTheme};
		};
	}

	// Theme control hook
	function useThemeControl() {
		const [theme, setTheme] = useAtom(themeModeAtom);

		return {
			theme,
			setTheme,
		};
	}

	return {
		createThemedStyles,
		useThemeControl,
	};
}
