# Project Structure

## File Organization

```
/
├── .kiro/                  # Kiro AI assistant configuration
│   └── steering/          # AI guidance documents
├── .vscode/               # VS Code workspace settings
│   ├── launch.json       # Edge browser debug configuration
│   └── settings.json     # Workspace-specific settings
├── index.html            # Main application entry point
├── script.js             # Core application logic (StoryApp class)
├── styles.css            # All styling and responsive design
├── debug.html            # Input debugging test page
└── test.html             # Simple input functionality test
```

## Core Application Files

### index.html
- Main application interface
- Three primary sections: theme input, story display, quiz
- Semantic HTML structure with accessibility considerations
- Links to styles.css and script.js

### script.js
- Single `StoryApp` class containing all application logic
- Methods organized by functionality:
  - Initialization: `constructor()`, `initializeElements()`, `bindEvents()`
  - Story generation: `generateStory()`, `createStoryFromTheme()`
  - Vocabulary: `extractVocabulary()`, `showVocabularyCard()`
  - Quiz logic: `generateQuizQuestions()`, `startQuiz()`, `selectAnswer()`
  - UI management: `showSection()`, `displayCurrentParagraph()`

### styles.css
- Complete styling for all UI components
- Responsive design with mobile breakpoints
- CSS animations and transitions
- Color scheme based on purple gradient theme

## Development and Testing Files

### debug.html & test.html
- Standalone testing pages for input functionality debugging
- Simplified versions for isolating UI issues
- Not part of main application flow

## Naming Conventions

### HTML/CSS
- IDs: kebab-case (`theme-input`, `story-section`)
- Classes: kebab-case with BEM-like structure (`vocab-card`, `answer-option`)
- Sections: descriptive names (`theme-section`, `story-section`, `quiz-section`)

### JavaScript
- Variables/methods: camelCase (`currentStory`, `generateStory()`)
- Class name: PascalCase (`StoryApp`)
- Constants: UPPER_SNAKE_CASE (when applicable)

## State Management
- All application state contained within `StoryApp` class instance
- Key state properties:
  - `currentStory`: Active story object with title and paragraphs
  - `currentParagraphIndex`: Progress through story reading
  - `vocabularyWords`: Array of vocabulary items for current story
  - `quizQuestions`: Generated quiz questions
  - `currentQuizIndex`: Progress through quiz
  - `quizScore`: User's quiz performance