export interface ThemeStyles {
	[key: string]: any;
}

export interface StaticStyles {
	[key: string]: any;
}

export interface Theme<
	TThemeStyles extends ThemeStyles = ThemeStyles,
	TStaticStyles extends StaticStyles = StaticStyles,
	Props extends Record<string, any> = {}
> {
	themeStyles: TThemeStyles;
	staticStyles: TStaticStyles;
	props?: Props;
}

export type ThemeMode = 'light' | 'dark' | 'system';
