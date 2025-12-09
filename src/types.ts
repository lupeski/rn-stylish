import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

// One big type that covers all RN style props
export type RNStyle = ViewStyle | TextStyle | ImageStyle;

// Helper type: each key in your styles object must be a valid RN style
export type NamedStyles<T> = {[P in keyof T]: RNStyle};

// Generic Theme interface - developers will extend this with their own theme structure
export interface Theme<
	ThemeStylesType extends Record<string, any> = Record<string, any>,
	StaticStylesType extends Record<string, any> = Record<string, any>
> {
	themeStyles: ThemeStylesType;
	staticStyles: StaticStylesType;
}

// Configuration options - support both dual-theme and single-theme modes
export type ThemeConfig<
	ThemeStylesType extends Record<string, any> = Record<string, any>,
	StaticStylesType extends Record<string, any> = Record<string, any>
> =
	| {
			// Dual-theme mode (light/dark switching)
			lightThemeStyles: ThemeStylesType;
			darkThemeStyles: ThemeStylesType;
			staticStyles: StaticStylesType;
			initialMode?: 'light' | 'dark' | 'system';
	  }
	| {
			// Single-theme mode (no light/dark switching)
			staticStyles: StaticStylesType;
			initialMode?: never;
	  };

// Return type for the hook
export interface ThemedStylesHook<
	Styles,
	ThemeStylesType extends Record<string, any>,
	StaticStylesType extends Record<string, any>
> {
	styles: Styles;
	getDynamicStyles: (dynamicProps: any) => Styles;
	theme: Theme<ThemeStylesType, StaticStylesType>;
}
