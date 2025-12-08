# rn-stylish

A flexible theming system for React Native with light/dark mode support using Jotai.

## Installation

```
npm install rn-stylish
```

## Basic Usage

```javascript
import {Text, View} from 'react-native';
import {createThemedStyles, useThemeSelect} from 'rn-stylish';

// Create themed styles
const useStyles = createThemedStyles(theme => ({
	container: {
		flex: 1,
		backgroundColor: theme.themeColors.background,
	},
	text: {
		color: theme.themeColors.text,
	},
}));

// Use in component
function MyComponent() {
	const {styles, theme} = useStyles();
	const {theme: themeMode, setTheme} = useThemeSelect();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to rn-stylish!</Text>
		</View>
	);
}
```

## Custom Themes

```javascript
import {useSetAtom} from 'jotai';
import {lightThemeAtom, darkThemeAtom, Theme} from 'rn-stylish';

// Define your custom theme
const myLightTheme: Theme = {
	themeColors: {
		background: '#F5F5F5',
		text: '#333333',
		linkText: '#007AFF',
	},
	staticColors: {
		brand: '#FF6B6B',
		white: '#FFFFFF',
	},
};

// Set it in your app
function App() {
	const setLightTheme = useSetAtom(lightThemeAtom);
	const setDarkTheme = useSetAtom(darkThemeAtom);

	useEffect(() => {
		setLightTheme(myLightTheme);
		setDarkTheme(myDarkTheme);
	}, []);

	return;
}
```

## License

MIT
