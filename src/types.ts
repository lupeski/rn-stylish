import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

// One big type that covers all RN style props
export type RNStyle = ViewStyle | TextStyle | ImageStyle;

// Helper type: each key in your styles object must be a valid RN style
export type NamedStyles<T> = {[P in keyof T]: RNStyle};

// Generic Theme interface - developers will extend this with their own theme structure
export interface Theme {
	themeStyles: Record<string, any>;
	staticStyles?: Record<string, any>;
	[key: string]: any; // Allow any additional properties
}

// Return type for the hook
export interface ThemedStylesHook<Styles, ThemeType extends Theme> {
	styles: Styles;
	getDynamicStyles: (dynamicProps: any) => Styles;
	theme: ThemeType;
}

// Configuration options
export interface ThemeConfig<ThemeType extends Theme = Theme> {
	lightTheme: ThemeType;
	darkTheme: ThemeType;
	initialMode?: 'light' | 'dark' | 'system';
}
