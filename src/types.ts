export interface ThemeStyles {
	[key: string]: any;
}

export interface StaticStyles {
	[key: string]: any;
}

export interface Theme<
	TThemeStyles extends ThemeStyles = ThemeStyles,
	TStaticStyles extends StaticStyles = StaticStyles
> {
	themeStyles: TThemeStyles;
	staticStyles: TStaticStyles;
}

export type ThemeMode = 'light' | 'dark' | 'system';
