# Teaching Notes & Preferences

## User Preferences
- **Prior Frameworks**: Angular (not fresh, 2+ years old) and Vue (very minimal). Avoid relying on heavy comparisons.
- **Teaching Method**: Fresh, ground-up explanation of React concepts.
- **Interactive Project**: Co-build a step-by-step developer dashboard. The agent provides high-level structure, steps, and explanations; the user implements the code.
- **Goal**: Technical interview preparation.

## Project Plan: Developer Productivity Dashboard
To hit all requested topics, the project will cover:
1. **Setup & JSX Fundamentals**: Initialize Vite + React project.
2. **Components & Props**: Core UI elements (Card, Button, Input) written by the user.
3. **State & Core Hooks**: Pomodoro timer using `useState`, `useEffect`, `useRef`.
4. **Complex State & Reducers**: Kanban board using `useReducer` for task additions, movements, and deletes.
5. **Storybook & Styling**: Add CSS Modules / Styled Components. Set up Storybook stories.
6. **Data Flow & Global State**: Theme customization (Dark/Light mode) using Context API and `localStorage`.
7. **Performance & Memoization**: Optimizing Kanban columns via `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders.
8. **Testing**: Unit tests for the Reducer and components using React Testing Library.
9. **Advanced Patterns**: Code splitting, lazy loading, and `forwardRef`.
10. **State Managers**: Upgrade/Refactor parts of the board to Redux Toolkit or Jotai.
