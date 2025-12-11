# rn-stylish

A flexible and type-safe theming system for React Native with automatic light/dark mode support powered by Jotai.

## Features

- 🎨 **Automatic theme switching** - Light, dark, and system modes with persistent storage
- 💪 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Simple API** - Easy to use hooks and utilities
- ⚡ **Performance** - Memoized styles with efficient re-renders
- 🎭 **Fully customizable** - Define your own theme structure and styles
- 🔄 **Dynamic theme updates** - Load and apply custom themes at runtime
- 🔄 **Flexible styling** - Support for colors, font sizes, padding, margins, and any style values
- 💾 **Persistent preferences** - Theme mode saved automatically across app sessions
- 📦 **Lightweight** - Minimal dependencies (Jotai and AsyncStorage)

## Installation

```bash
npm install rn-stylish
```

## Quick Start

### Step 1: Configure Your Themes

Choose the setup that fits your needs:

#### Option A: Dual-Theme Mode (Light/Dark Switching)

Create a `themes.ts` or `themes.js` file:

```javascript
// themes.js
import {configureTheme} from 'rn-stylish';

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

export const {createThemedStyles, useThemeControl, updateThemeConfig} =
	configureTheme({
		lightThemeStyles,
		darkThemeStyles,
		staticStyles,
		initialMode: 'system', // optional: 'light' | 'dark' | 'system' (default: 'system')
	});
```

#### Option B: Single-Theme Mode

If you don't need light/dark switching:

```javascript
// themes.js
import {configureTheme} from 'rn-stylish';

const staticStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
	brand: 'dodgerblue',
	success: '#008521',
};

export const {createThemedStyles, useThemeControl, updateThemeConfig} =
	configureTheme({
		staticStyles,
	});
```

**Note - Single-Theme Mode:** In single-theme mode, access all styles from `theme.staticStyles` (not `theme.themeStyles`). ThemeMode switching functions will have no effect.

### Step 2: Create Themed Styles

#### Basic Usage

**Note:** `createThemedStyles` is returned from configureTheme() and must be imported from where you configured your theme, not from the rn-stylish package directly.

```javascript
import {View, Text} from 'react-native';
import {createThemedStyles} from './themes';

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			backgroundColor: theme.themeStyles.background,
			flex: 1,
		},
		text: {
			color: theme.themeStyles.text,
		},
		brandText: {
			color: theme.staticStyles.brand,
			fontWeight: 'bold',
		},
	};
});

// Use in your component
function MyComponent() {
	const {styles} = useStyles();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>This text color changes with theme</Text>
			<Text style={styles.brandText}>This stays your brand color</Text>
		</View>
	);
}
```

#### Styles with Props

Pass dynamic values to your styles:

```javascript
import {useHeaderHeight} from '@react-navigation/elements';
import {createThemedStyles} from './themes';

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			paddingTop: props.headerHeight + 15,
			paddingHorizontal: 16,
			gap: 15,
			backgroundColor: theme.themeStyles.background,
		},
		title: {
			color: theme.themeStyles.text,
			fontSize: 24,
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

#### Dynamic Styles with `getDynamicStyles`

Use `getDynamicStyles` when you need to compute styles inline with different values (like in lists):

**Note:** If extracting a list item into a full react component, you can simply use the useStyles hook in that component. The getDynamicStyles helper function is just for generating the style inline, if the list item is rendered inline.

```javascript
import {createThemedStyles} from './themes';

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
			borderRadius: 8,
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

**Note - ThemeMode Switching (Dual-Theme Mode Only):** Use the `useThemeControl` hook to allow users to switch between light, dark, and system themes. This hook is returned from `configureTheme()` and must be imported from where you configured your theme, not from the rn-stylish package directly.

```javascript
import {useThemeControl} from './themes';

function ThemeToggle() {
	const {themeMode, setThemeMode, resetThemeMode} = useThemeControl();

	return (
		<View>
			<Button title="Light" onPress={() => setThemeMode('light')} />
			<Button title="Dark" onPress={() => setThemeMode('dark')} />
			<Button title="System" onPress={() => setThemeMode('system')} />
			<Button title="Reset to Default" onPress={resetThemeMode} />
			<Text>Current: {themeMode}</Text>
		</View>
	);
}
```

If using single-theme mode, theme mode switching has no effect.

**Note - Accessing Theme Directly:** Sometimes you need theme values outside of styles. The `useStyles()` hook returns a `theme` object that you can use directly:

```typescript
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

## Advanced Usage

### Dynamic Theme Updates

Load and apply custom themes at runtime (perfect for user-customizable themes or loading from remote config):

**Note:** `updateThemeConfig` is returned from configureTheme() and must be imported from where you configured your theme, not from the rn-stylish package directly.

```javascript
// App.js
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateThemeConfig} from './themes';

function App() {
	useEffect(() => {
		async function loadCustomTheme() {
			// Load custom theme from storage or API
			const saved = await AsyncStorage.getItem('customTheme');

			if (saved) {
				const customTheme = JSON.parse(saved);

				// Update themes dynamically - all components auto re-render!
				updateThemeConfig({
					lightThemeStyles: customTheme.light,
					darkThemeStyles: customTheme.dark,
					staticStyles: customTheme.static,
				});
			}
		}

		loadCustomTheme();
	}, []);

	return <YourApp />;
}
```

**How it works:**

- App starts immediately with default themes from `configureTheme()`
- Custom themes load in the background
- `updateThemeConfig()` updates themes and triggers re-renders
- No splash screen needed - smooth transition to custom themes

**Use cases:**

- User-customizable themes stored in AsyncStorage
- A/B testing different color schemes
- Loading themes from remote config
- Dynamic branding per tenant/organization

## API Reference

### `configureTheme(config)`

Creates a `createThemedStyles` function, `useThemeControl` hook, and `updateThemeConfig` function configured with your theme definitions.

**Parameters**

- `config: ThemeConfig`
  - `lightThemeStyles: ThemeStylesType` - Styles for light mode
  - `darkThemeStyles: ThemeStylesType` - Styles for dark mode
  - `staticStyles: StaticStylesType` - Styles that don't change with theme
  - `initialMode?: 'light' | 'dark' | 'system'` - Initial theme mode (default: 'system'). Only used on first app launch; subsequent launches load from storage.

**Returns:** `{ createThemedStyles, useThemeControl, updateThemeConfig }`

### `createThemedStyles(stylesFn)`

Creates a hook that returns themed styles.

**Parameters:**

- `stylesFn: (theme: Theme, props: Props) => StyleSheet` - Function that receives theme and props, returns style object

**Returns:** A hook that accepts optional props and returns:

- `styles` - StyleSheet object with all your styles
- `getDynamicStyles(props)` - Function to generate styles with different props at runtime
- `theme` - Current active theme object with `themeStyles` and `staticStyles`

### `useThemeControl()`

Hook for managing theme mode. Theme preference is automatically persisted to storage. **This hook is returned from `configureTheme()` and must be imported from where you configured your theme**, not from the rn-stylish package directly.

**Note:** This hook is only useful when you've configured light and dark themes. In single-theme mode, theme switching has no effect.

**Returns:**

- `themeMode: 'light' | 'dark' | 'system'` - Current theme mode setting
- `setThemeMode(mode: 'light' | 'dark' | 'system')` - Change theme mode
- `resetThemeMode()` - Reset theme mode back to the `initialMode` specified in `configureTheme()`

### `updateThemeConfig(newConfig)`

Dynamically updates theme configuration at runtime. All components using themed styles will automatically re-render with the new theme.

**Parameters:**

- `newConfig: Partial<ThemeConfig>` - Partial theme configuration to update
  - `lightThemeStyles?: ThemeStylesType` - New light theme styles
  - `darkThemeStyles?: ThemeStylesType` - New dark theme styles
  - `staticStyles?: StaticStylesType` - New static styles

**Example:**

```javascript
updateThemeConfig({
	lightThemeStyles: {background: '#F0F0F0', text: '#333333'},
	darkThemeStyles: {background: '#000000', text: '#F0F0F0'},
	staticStyles: {brand: '#FF6B6B'},
});
```

## Types

```typescript
type ThemeMode = 'light' | 'dark' | 'system';

interface Theme<
	ThemeStylesType extends Record<string, any> = Record<string, any>,
	StaticStylesType extends Record<string, any> = Record<string, any>
> {
	themeStyles: ThemeStylesType;
	staticStyles: StaticStylesType;
}

type ThemeConfig<
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

interface ThemedStylesHook<
	Styles,
	ThemeStylesType extends Record<string, any>,
	StaticStylesType extends Record<string, any>
> {
	styles: Styles;
	getDynamicStyles: (dynamicProps: any) => Styles;
	theme: Theme<ThemeStylesType, StaticStylesType>;
}

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type NamedStyles<T> = {[P in keyof T]: RNStyle};
```

## Default Themes

rn-stylish does not include default themes. You must define your own theme styles when setting up your app. This gives you complete control over your app's appearance.

See the "Configure Your Themes" section above for examples.

## Best Practices

1. **Use `themeStyles` for values that should adapt** to light/dark mode (backgrounds, text colors, borders)
2. **Use `staticStyles` for brand identity and constants** that should stay consistent (your logo color, success green, error red, border radius)
3. **Set custom themes at app startup** - Call `configureTheme` once in your themes file
4. **Think beyond colors** - Include fontSize, padding, margin, borderRadius, shadows, etc.
5. **Theme preferences persist automatically** - User's theme choice is saved and restored on app restart
6. **Use `updateThemeConfig` for runtime updates** - Perfect for user-customizable themes or remote config

## Contributing

Issues and pull requests are welcome! Visit our [GitHub repository](https://github.com/lupeski/rn-stylish).

## License

MIT

## Credits

Using [Jotai](https://jotai.org/) for state management and persistent storage.
