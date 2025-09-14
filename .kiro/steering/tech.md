# Technology Stack

## Frontend Technologies
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: ES6+ class-based architecture, no external frameworks

## Development Environment
- **VS Code**: Primary IDE with Edge debugging configuration
- **Live Server**: For local development (launch.json configured for Edge browser)
- **Browser**: Microsoft Edge for debugging and testing

## Architecture Patterns
- **Class-based JavaScript**: Single `StoryApp` class managing all application state
- **Event-driven**: DOM event listeners for user interactions
- **State management**: Internal class properties track current story, quiz progress, vocabulary
- **Section-based UI**: Single-page application with show/hide section navigation

## Code Style Guidelines
- **Naming**: camelCase for variables and methods, kebab-case for CSS classes and IDs
- **Structure**: Logical method grouping (initialization, events, story generation, quiz logic)
- **CSS**: BEM-like naming conventions, mobile-first responsive design
- **JavaScript**: ES6+ features, arrow functions, template literals, destructuring

## Common Development Commands
```bash
# No build system - direct file serving
# Open with Live Server extension in VS Code
# Or serve files with any static server

# For debugging, use VS Code launch configuration:
# F5 to launch index.html in Edge browser
```

## Browser Compatibility
- Modern browsers supporting ES6+ features
- CSS Grid and Flexbox support required
- No polyfills or transpilation currently implemented