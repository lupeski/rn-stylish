# rn-stylish

A flexible and type-safe theming system for React Native with automatic light/dark mode support powered by Jotai.

## Features

- 🎨 **Automatic theme switching** - Light, dark, and system modes
- 💪 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Simple API** - Easy to use hooks and utilities
- ⚡ **Performance** - Memoized styles with efficient re-renders
- 🎭 **Fully customizable** - Define your own theme structure and styles
- 🔄 **Flexible styling** - Support for colors, font sizes, padding, margins, and any style values
- 📦 **Lightweight** - Minimal dependencies (just Jotai for state)

## Installation

```bash
npm install rn-stylish
```

## Quick Start

### 1. Configure Your Themes

rn-stylish requires you to define your own theme styles. Set them up in your app's entry point before using any themed components.

#### Setup

Create a `themes.ts` or `themes.js` file to define your themes:

```javascript
export const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#0000EE',
};

export const darkThemeStyles = {
	background: '#1C1C1E',
	text: '#FFFFFF',
	linkText: '#ADD8E6',
};

export const staticStyles = {
	brand: 'dodgerblue',
	success: '#008521',
	error: '#FF3B30',
};
```

Then in your App:

```javascript
// App.tsx / App.js or wherever your app's entry point is
import {configureTheme} from 'rn-stylish';
import {
	lightThemeStyles,
	darkThemeStyles,
	staticStyles,
} from '../../styling/themes';

export const {createThemedStyles} = configureTheme({
	lightThemeStyles,
	darkThemeStyles,
	staticStyles,
	initialMode: 'system',
});

function App() {
	return <YourApp />;
}
```

Now when you use themes, you'll get autocomplete for all your custom properties.

### 2. Create Themed Styles

```javascript
import {View, Text} from 'react-native';
import {createThemedStyles} from './App.js';

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			backgroundColor: theme.themeStyles.background,
			flex: 1,
			padding: theme.themeStyles.padding,
		},
		text: {
			color: theme.themeStyles.text,
			fontSize: theme.themeStyles.fontSize,
		},
		card: {
			backgroundColor: theme.themeStyles.cardBackground,
			borderColor: theme.themeStyles.border,
			borderWidth: 1,
			borderRadius: theme.staticStyles.borderRadius,
			padding: 16,
		},
		brandText: {
			color: theme.staticStyles.brand,
			fontWeight: 'bold',
		},
		successButton: {
			backgroundColor: theme.staticStyles.success,
			padding: 12,
			borderRadius: theme.staticStyles.borderRadius,
		},
	};
});

// Use in your component
function MyComponent() {
	const {styles} = useStyles();

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.text}>This text color changes with theme</Text>
				<Text style={styles.brandText}>This stays your brand color</Text>
			</View>
		</View>
	);
}
```

### 3. Theme Switching

```javascript
import {useThemeSelect} from 'rn-stylish';

function ThemeToggle() {
	const {theme, setTheme} = useThemeSelect();

	return (
		<View>
			<Button title="Light" onPress={() => setTheme('light')} />
			<Button title="Dark" onPress={() => setTheme('dark')} />
			<Button title="System" onPress={() => setTheme('system')} />
			<Text>Current: {theme}</Text>
		</View>
	);
}
```

### 4. Single Theme Mode (No Light/Dark Switching)

If your app doesn't need theme switching, you simply omit light and dark themes, and just use staticStyles:

**Set both themes to the same values**

```javascript
const staticStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
};

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();

	useEffect(() => {
		// Just set static styles
		setStaticStyles(staticStyles);
	}, []);

	return <YourApp />;
}
```

## Advanced Usage

### Styles with Props

Pass dynamic values to your styles:

```javascript
import {useHeaderHeight} from '@react-navigation/elements';

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			paddingTop: props.headerHeight + 15, // headerHeight is passed to the useStyles hook
			paddingHorizontal: theme.themeStyles.padding,
			gap: 15,
			backgroundColor: theme.themeStyles.background,
		},
		title: {
			color: theme.themeStyles.text,
			fontSize: theme.themeStyles.fontSize,
		},
	};
});

function EmailValidation() {
	const headerHeight = useHeaderHeight();
	const {styles} = useStyles({headerHeight});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enter Email</Text>
		</View>
	);
}
```

### Dynamic Styles with `getDynamicStyles`

Use `getDynamicStyles` when you need to compute styles inline with different values (like in lists):

**NOTE**: If extracting a list item into a full react component, you can simply use the useStyles hook. The getDynamicStyles helper function is just for generating the style inline, if the list item is rendered inline.

```javascript
const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			flex: 1,
			backgroundColor: theme.themeStyles.background,
			justifyContent: 'center',
			gap: 12,
		},
		item: {
			padding: 16,
			borderRadius: theme.staticStyles.borderRadius,
			backgroundColor: props.isSelected
				? theme.staticStyles.success
				: theme.themeStyles.cardBackground,
		},
		itemText: {
			color: props.isSelected ? '#FFFFFF' : theme.themeStyles.text,
		},
	};
});

function ItemList({items}) {
	const {styles, getDynamicStyles} = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<SafeAreaView style={styles.container}>
			{items.map((item, index) => {
				// Generate styles dynamically for each item
				const dynamicStyle = getDynamicStyles({
					isSelected: index === selectedIndex,
				});

				return (
					<TouchableOpacity
						key={index}
						style={dynamicStyle.item}
						onPress={() => setSelectedIndex(index)}
					>
						<Text style={dynamicStyle.itemText}>{item.name}</Text>
					</TouchableOpacity>
				);
			})}
		</SafeAreaView>
	);
}
```

### Accessing Theme Directly

Sometimes you need theme values outside of styles:

```typescript
const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			backgroundColor: theme.themeStyles.background,
		},
	};
});

function MyComponent() {
	const {styles, theme} = useStyles();

	// Use theme values directly
	const statusBarStyle =
		theme.themeStyles.background === '#FFFFFF'
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

### `configureTheme(config)`

Creates a "createThemedStyles" function that returns the useStyles hook

**Parameters**

- `config: ThemeConfig` - `ThemeConfig : {lightThemeStyles: ThemeStylesType, darkThemeStyles: ThemeStylesType, staticStyles: StaticStylesType, initialMode: "light" | "dark" | "system"}`

### `createThemedStyles(stylesFn)`

Creates a hook that returns themed styles.

**Parameters:**

- `stylesFn: (theme: Theme, props: Props) => StyleSheet` - Function that receives theme and props, returns style object

**Returns:** A hook that accepts optional props and returns:

- `styles` - StyleSheet object with all your styles
- `getDynamicStyles(props)` - Function to generate styles with different props at runtime
- `theme` - Current active theme object

### `useThemeSelect()`

Hook for managing theme mode.

**Returns:**

- `theme: 'light' | 'dark' | 'system'` - Current theme mode
- `setTheme(mode: 'light' | 'dark' | 'system')` - Change theme mode

### Types

```typescript
interface Theme<
	ThemeStylesType extends Record<string, any> = Record<string, any>,
	StaticStylesType extends Record<string, any> = Record<string, any>
> {
	themeStyles: ThemeStylesType;
	staticStyles: StaticStylesType;
}

interface ThemeConfig<
	ThemeStylesType extends Record<string, any> = Record<string, any>,
	StaticStylesType extends Record<string, any> = Record<string, any>
> {
	lightThemeStyles: ThemeStylesType;
	darkThemeStyles: ThemeStylesType;
	staticStyles: StaticStylesType;
	initialMode?: 'light' | 'dark' | 'system';
}

interface ThemedStylesHook<
	Styles,
	ThemeStylesType extends Record<string, any>,
	StaticStylesType extends Record<string, any>
> {
	styles: Styles;
	getDynamicStyles: (dynamicProps: any) => Styles;
	theme: Theme<ThemeStylesType, StaticStylesType>;
}
```

## Default Themes

rn-stylish does not include default themes. You must define your own theme styles when setting up your app. This gives you complete control over your app's appearance.

See the "Configure Your Themes" section above for examples.

## Best Practices

1. **Use `themeStyles` for values that should adapt** to light/dark mode (backgrounds, text colors, borders, padding/margins that change with theme)
2. **Use `staticStyles` for brand identity and constants** that should stay consistent (your logo color, success green, error red, border radius, max widths)
3. **Set custom themes at app startup** - Call configureTheme to set up your light/dark/static themes.
4. **Think beyond colors** - Include fontSize, padding, margin, borderRadius, shadows, etc.

### Example: What goes where?

```typescript
// Theme styles - these CHANGE based on light/dark mode
lightThemeStyles: {
  background: '#FFFFFF',
  text: '#000000',
  cardBackground: '#F5F5F5',
  border: '#E0E0E0',
  padding: 16,
  fontSize: 16,
}

darkThemeStyles: {
  background: '#000000',
  text: '#FFFFFF',
  cardBackground: '#1C1C1E',
  border: '#3A3A3C',
  padding: 16,
  fontSize: 16,
}

// Static styles - these STAY THE SAME in both themes
staticStyles: {
  brand: '#FF6B6B',
  success: '#51CF66',
  error: '#FF3B30',
  warning: '#FFD93D',
  borderRadius: 8,
  maxWidth: 1200,
  headerHeight: 60,
}
```

## Example: Complete App Setup

```typescript
// App.tsx
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useThemeSelect, createThemedStyles} from 'rn-stylish';

// Define your theme styles
const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#0000EE',
};

const darkThemeStyles = {
	background: '#1C1C1E',
	text: '#FFFFFF',
	linkText: '#ADD8E6',
};

const staticStyles = {
	brand: 'dodgerblue',
	success: '#008521',
	error: '#FF3B30',
};

export const {createThemedStyles} = configureTheme({
	lightThemeStyles,
	darkThemeStyles,
	staticStyles,
	initialMode: 'system',
});

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			flex: 1,
			backgroundColor: theme.themeStyles.background,
		},
	};
});

function App() {
	const {styles} = useStyles();

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

Using [Jotai](https://jotai.org/) for state management.
