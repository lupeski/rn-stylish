import {Theme, ThemeConfig} from './types';
import {NamedStyles, ThemedStylesHook} from './types';
import {StyleSheet, useColorScheme} from 'react-native';
import {useMemo} from 'react';
import {useAtomValue, useAtom} from 'jotai';
import {themeModeAtom, ThemeMode} from './themeAtom';

export function configureTheme<ThemeType extends Theme>(
	config: ThemeConfig<ThemeType>
) {
	const {lightTheme, darkTheme, initialMode = 'system'} = config;

	// Create the themed styles function with the configured themes
	function createThemedStyles<
		Props extends Record<string, any> = Record<string, any>,
		Styles extends NamedStyles<Styles> = NamedStyles<any>
	>(stylesFn: (theme: ThemeType, props: Props) => Styles) {
		return (props?: Props): ThemedStylesHook<Styles, ThemeType> => {
			const systemScheme = useColorScheme();
			const mode = useAtomValue(themeModeAtom);

			let activeTheme: ThemeType;
			if (mode === 'light') {
				activeTheme = lightTheme;
			} else if (mode === 'dark') {
				activeTheme = darkTheme;
			} else {
				activeTheme = systemScheme === 'dark' ? darkTheme : lightTheme;
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
