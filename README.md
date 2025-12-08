# rn-stylish

A flexible and type-safe theming system for React Native with automatic light/dark mode support powered by Jotai.

## Features

- 🎨 **Automatic theme switching** - Light, dark, and system modes
- 💪 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Simple API** - Easy to use hooks and utilities
- ⚡ **Performance** - Memoized styles with efficient re-renders
- 🎭 **Customizable** - Override default themes with your own colors
- 📦 **Lightweight** - Minimal dependencies (just Jotai for state)

## Installation

```bash
npm install rn-stylish
```

## Quick Start

### 1. Basic Usage

```javascript
import {createThemedStyles} from 'rn-stylish';
import {View, Text} from 'react-native';

// Create themed styles
const useStyles = createThemedStyles(theme => ({
	container: {
		backgroundColor: theme.themeColors.background,
		flex: 1,
		padding: 20,
	},
	text: {
		color: theme.themeColors.text,
		fontSize: 16,
	},
	brandText: {
		color: theme.staticColors.brand,
	},
}));

// Use in your component
function MyComponent() {
	const {styles, theme} = useStyles();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello World</Text>
			<Text style={styles.brandText}>Brand Color</Text>
		</View>
	);
}
```

### 2. Theme Switching

```javascript
import {useThemeSelect} from 'rn-stylish';

function ThemeToggle() {
	const {themeMode, setThemeMode} = useThemeSelect();

	return (
		<View>
			<Button title="Light" onPress={() => setThemeMode('light')} />
			<Button title="Dark" onPress={() => setThemeMode('dark')} />
			<Button title="System" onPress={() => setThemeMode('system')} />
			<Text>Current: {themeMode}</Text>
		</View>
	);
}
```

## Advanced Usage

### Custom Themes

Define your own color schemes:

```typescript
import {useThemeSelect, Theme} from 'rn-stylish';
import {useEffect} from 'react';

const myLightTheme: Theme = {
	themeColors: {
		background: '#F5F5F5',
		text: '#333333',
		linkText: '#007AFF',
		primary: '#FF6B6B',
		secondary: '#4ECDC4',
	},
	staticColors: {
		brand: '#FF6B6B',
		white: '#FFFFFF',
		black: '#000000',
		success: '#51CF66',
		error: '#FF6B6B',
		warning: '#FFD93D',
	},
};

const myDarkTheme: Theme = {
	themeColors: {
		background: '#1A1A1A',
		text: '#FFFFFF',
		linkText: '#66B2FF',
		primary: '#FF8787',
		secondary: '#63E6E1',
	},
	staticColors: {
		brand: '#FF8787',
		white: '#FFFFFF',
		black: '#000000',
		success: '#69DB7C',
		error: '#FF8787',
		warning: '#FFE066',
	},
};

function App() {
	const {setLightTheme, setDarkTheme} = useThemeSelect();

	useEffect(() => {
		setLightTheme(myLightTheme);
		setDarkTheme(myDarkTheme);
	}, []);

	return <YourApp />;
}
```

### Dynamic Styles with Props

Create styles that respond to component props:

```typescript
interface ButtonProps {
	variant: 'primary' | 'secondary';
	size: 'small' | 'large';
}

const useStyles = createThemedStyles<ButtonProps>((theme, props) => ({
	button: {
		backgroundColor:
			props.variant === 'primary'
				? theme.staticColors.brand
				: theme.themeColors.background,
		padding: props.size === 'large' ? 16 : 8,
		borderRadius: 8,
	},
	text: {
		color:
			props.variant === 'primary'
				? theme.staticColors.white
				: theme.themeColors.text,
		fontSize: props.size === 'large' ? 18 : 14,
	},
}));

function CustomButton({variant, size, title}: ButtonProps & {title: string}) {
	const {styles} = useStyles({variant, size});

	return (
		<TouchableOpacity style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}
```

### Runtime Dynamic Styles

For styles that change during interactions:

```typescript
const useStyles = createThemedStyles(theme => ({
	container: {
		backgroundColor: theme.themeColors.background,
		flex: 1,
	},
}));

function AnimatedComponent() {
	const {getDynamicStyles, theme} = useStyles();
	const [isPressed, setIsPressed] = useState(false);

	const dynamicStyles = getDynamicStyles({isPressed});

	return (
		<Pressable
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			style={[dynamicStyles.container, {opacity: isPressed ? 0.7 : 1}]}
		>
			<Text>Press me!</Text>
		</Pressable>
	);
}
```

### Accessing Theme Directly

Sometimes you need theme values outside of styles:

```typescript
const useStyles = createThemedStyles(theme => ({
	container: {
		backgroundColor: theme.themeColors.background,
	},
}));

function MyComponent() {
	const {styles, theme} = useStyles();

	// Use theme values directly
	const statusBarStyle =
		theme.themeColors.background === '#FFFFFF'
			? 'dark-content'
			: 'light-content';

	return (
		<>
			<StatusBar barStyle={statusBarStyle} />
			<View style={styles.container}>
				<Text>Content</Text>
			</View>
		</>
	);
}
```

## API Reference

### `createThemedStyles(stylesFn)`

Creates a hook that returns themed styles.

**Parameters:**

- `stylesFn: (theme: Theme, props: Props) => StyleSheet` - Function that receives theme and props, returns style object

**Returns:** A hook that accepts optional props and returns:

- `styles` - StyleSheet object with all your styles
- `getDynamicStyles(props)` - Function to generate styles with different props at runtime
- `theme` - Current active theme object

### `useThemeSelect()`

Hook for managing theme mode and custom themes.

**Returns:**

- `themeMode: 'light' | 'dark' | 'system'` - Current theme mode
- `setThemeMode(mode: ThemeMode)` - Change theme mode
- `setLightTheme(theme: Theme)` - Override light theme colors
- `setDarkTheme(theme: Theme)` - Override dark theme colors

### Types

```typescript
interface Theme {
	themeColors: ThemeColors; // Colors that change with theme
	staticColors: StaticColors; // Colors that stay the same
}

interface ThemeColors {
	background: string;
	text: string;
	linkText: string;
	[key: string]: string; // Add your own colors
}

interface StaticColors {
	[key: string]: string; // Brand colors, etc.
}

type ThemeMode = 'light' | 'dark' | 'system';
```

## Default Themes

rn-stylish comes with sensible defaults:

**Light Theme:**

```typescript
{
  themeColors: {
    background: '#FFFFFF',
    text: '#000000',
    linkText: '#0000EE',
  },
  staticColors: {
    brand: 'dodgerblue',
    white: 'white',
    green: '#008521',
    red: '#FF3B30',
    gray: '#808080',
  }
}
```

**Dark Theme:**

```typescript
{
  themeColors: {
    background: '#1C1C1E',
    text: '#FFFFFF',
    linkText: '#ADD8E6',
  },
  staticColors: {
    // Same as light theme
  }
}
```

## Best Practices

1. **Use `themeColors` for colors that change** between light/dark modes
2. **Use `staticColors` for brand colors** that stay consistent
3. **Set custom themes early** in your app's lifecycle (in App.tsx or index.js)
4. **Leverage TypeScript** - the package is fully typed for great autocomplete
5. **Memoize expensive style calculations** - the hook already does this for you

## Example: Complete App Setup

```typescript
// App.tsx
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useThemeSelect, createThemedStyles} from 'rn-stylish';
import {myLightTheme, myDarkTheme} from './themes';

const useStyles = createThemedStyles(theme => ({
	container: {
		flex: 1,
		backgroundColor: theme.themeColors.background,
	},
}));

function App() {
	const {setLightTheme, setDarkTheme} = useThemeSelect();
	const {styles} = useStyles();

	useEffect(() => {
		// Set your custom themes once at app start
		setLightTheme(myLightTheme);
		setDarkTheme(myDarkTheme);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Your app content */}
		</SafeAreaView>
	);
}

export default App;
```

## Contributing

Issues and pull requests are welcome! Visit our [GitHub repository](https://github.com/lupeski/rn-stylish).

## License

MIT

## Credits

Built with ❤️ using [Jotai](https://jotai.org/) for state management.
