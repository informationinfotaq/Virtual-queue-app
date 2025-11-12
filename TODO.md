# TODO List for Fixing Estimated Wait and Dark Mode Issues

## Tasks
- [x] Update HomeScreen.tsx: Remove the "Est. wait" display from shop cards.
- [x] Update HomeScreen.tsx: Make styles theme-aware (dynamic backgrounds, text colors for light/dark mode).
- [x] Update SettingsScreen.tsx: Make styles theme-aware (dynamic backgrounds, text colors for light/dark mode).
- [x] Enhance color scheme: Add violet purple as accent color for components (e.g., buttons, titles), ensure nice colors throughout.
- [x] Test the changes: Attempted to run the app, but encountered PowerShell execution policy issue preventing script running. User needs to enable scripts or run via VSCode terminal.

## Notes
- Use ThemeContext to apply conditional styles.
- Violet purple color: #8A2BE2 or similar for accents.
- Testing blocked by system policy; recommend user runs `expo start` in VSCode terminal or enables PowerShell scripts.
