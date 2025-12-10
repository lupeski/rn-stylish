import {Theme, ThemeConfig, NamedStyles, ThemedStylesHook} from './types';
import {StyleSheet, useColorScheme} from 'react-native';
import {useMemo} from 'react';
import {useAtom, useAtomValue, atom, createStore} from 'jotai';
import {createThemeModeAtom} from './themeAtom';

export function configureTheme<
	ThemeStylesType extends Record<string, any>,
	StaticStylesType extends Record<string, any>
>(config: ThemeConfig<ThemeStylesType, StaticStylesType>) {
	// Check if this is single-theme mode or dual-theme mode
	const isSingleThemeMode =
		!('lightThemeStyles' in config) || !('darkThemeStyles' in config);

	let lightThemeStyles =
		'lightThemeStyles' in config
			? config.lightThemeStyles
			: ({} as ThemeStylesType);
	let darkThemeStyles =
		'darkThemeStyles' in config
			? config.darkThemeStyles
			: ({} as ThemeStylesType);
	let staticStyles = config.staticStyles;
	const initialMode = 'initialMode' in config ? config.initialMode : 'system';

	// Create the theme atom with the specified initial mode
	const themeModeAtom = createThemeModeAtom(initialMode || 'system');

	// Counter atom to trigger re-renders when themes are updated
	const themeVersionAtom = atom(0);

	// Create a Jotai store instance for this theme configuration
	const store = createStore();

	// Function to update theme configuration dynamically
	function updateThemeConfig(
		newConfig: Partial<ThemeConfig<ThemeStylesType, StaticStylesType>>
	) {
		if ('lightThemeStyles' in newConfig && newConfig.lightThemeStyles) {
			lightThemeStyles = newConfig.lightThemeStyles;
		}
		if ('darkThemeStyles' in newConfig && newConfig.darkThemeStyles) {
			darkThemeStyles = newConfig.darkThemeStyles;
		}
		if ('staticStyles' in newConfig && newConfig.staticStyles) {
			staticStyles = newConfig.staticStyles;
		}

		// Trigger re-renders by incrementing the version using the store
		const currentVersion = store.get(themeVersionAtom);
		store.set(themeVersionAtom, currentVersion + 1);
	}

	// Create useThemeControl hook
	function useThemeControl() {
		const [themeMode, setThemeMode] = useAtom(themeModeAtom);

		const resetThemeMode = () => {
			setThemeMode(initialMode || 'system');
		};

		return {themeMode, setThemeMode, resetThemeMode};
	}

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
			const themeVersion = useAtomValue(themeVersionAtom, {store}); // Subscribe to theme updates via store

			// Build the full theme object with both themeStyles and staticStyles
			let activeTheme: Theme<ThemeStylesType, StaticStylesType>;

			if (isSingleThemeMode) {
				// Single-theme mode: themeStyles is empty, everything is in staticStyles
				activeTheme = {
					themeStyles: {} as ThemeStylesType,
					staticStyles,
				};
			} else {
				// Dual-theme mode: switch between light/dark
				if (mode === 'light') {
					activeTheme = {themeStyles: lightThemeStyles, staticStyles};
				} else if (mode === 'dark') {
					activeTheme = {themeStyles: darkThemeStyles, staticStyles};
				} else {
					const themeStyles =
						systemScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
					activeTheme = {themeStyles, staticStyles};
				}
			}

			// Base styles (with optional props)
			const styles = useMemo(() => {
				return StyleSheet.create(stylesFn(activeTheme, (props ?? {}) as Props));
			}, [activeTheme, props, themeVersion]); // Re-compute when theme version changes

			// Helper for generating styles dynamically
			const getDynamicStyles = (dynamicProps: Props) => {
				return StyleSheet.create(stylesFn(activeTheme, dynamicProps));
			};

			return {styles, getDynamicStyles, theme: activeTheme};
		};
	}

	return {
		createThemedStyles,
		useThemeControl,
		updateThemeConfig,
	};
}
