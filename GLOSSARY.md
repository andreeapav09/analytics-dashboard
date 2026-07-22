# Agentic Coding and React Glossary

This glossary contains key terms and concepts that the learner has demonstrated clear understanding of during the preparation.

## Agentic Programming & Platform Terms

- **YAML (YAML Ain't Markup Language)**: A human-readable data serialization language commonly used for configuration files. It uses indentation instead of brackets or braces.
- **SDK (Software Development Kit)**: A collection of software development tools, libraries, code samples, and documentation packaged together to help developers build applications for a specific platform, API, or framework (e.g., Python SDK, Antigravity SDK).
- **Rules (AGENTS.md)**: Project-wide or global guidelines, style rules, and constraints that are appended to the agent's system prompt to enforce consistent behavior across a workspace.
- **Skill**: A single, focused unit of capability defined by a `SKILL.md` file (e.g., "teach", "deploy"), guiding the agent on how to perform a specific task.
  
  Typical workspace customization structure:
  ```text
  .agents/
  ├── AGENTS.md                  <-- Project-wide rules
  └── skills/
      └── teach/                 <-- The skill folder
          ├── SKILL.md           <-- YAML config + Markdown instructions
          └── resources/         <-- (Optional) resources
  ```
- **Plugin**: A larger, self-contained bundle of customizations that groups multiple skills, subagents, and configuration files (`plugin.json`) together for a specific feature or domain.
- **Subagent**: An autonomous helper spawned by the main agent to perform a highly focused task (e.g., UI testing in a browser) in a separate context. Once complete, it reports back with results, keeping the main conversation's context clean.

> [!NOTE]
> **Skill vs. Subagent**: The difference is that a Skill is passive knowledge, while a Subagent is an active worker. A Skill provides the "how-to" guidelines (instructions/checklists), whereas a Subagent is an actual running AI instance that executes the work.

---

## React & Web Development Terms

- **DOM**: tree representation of HTML
- **Vite**: A modern, extremely fast frontend build tool and development server. It serves code using native browser ES Modules and compiles assets using Esbuild (written in Go), replacing older bundlers like Webpack and Create React App.
- **JSX** (JavaScript XML) is a syntax extension for JavaScript. It looks like HTML, but it compiles down to regular JavaScript function calls.
- **The Strict Rules of JSX**:
    1. Return a **Single Root Element**: tags wrapped in parent tag like <div> or React Fragment (<>...</>)
    2. Close All Tags explicitly 
    3. **camelCase** Naming for Attributes: (JSX attributes map directly to JavaScript DOM properties) -> class is written as **className**, and **inline styles** are written as objects: style={{ color: 'red' }}
- **React Fragment (`<>...</>`)**: A special wrapper element in React that allows you to group multiple adjacent HTML/JSX tags without adding an extra node (like a `<div>`) to the final HTML DOM.
- **State**: The local, private, and mutable data structure owned and managed entirely within a specific React component. Updates to state trigger a re-render.
- **Props**: Read-only (immutable) configuration values passed from a parent component down to a child component. A child cannot modify its own props directly; instead, changes must occur in the parent (often triggered by callback functions passed as props), which flows new prop values down.
- **Reconciliation**: When a component's state or props change, React generates a new VDOM tree (**Re-rendering**) and compares it with the previous one (diffing) to determine exactly what changed. React uses an internal reconciliation engine called **React Fiber**.
- **Commit Phase**: The phase in React's rendering lifecycle where React applies the calculated differences from the reconciliation phase directly to the Real DOM. Unlike the render/reconciliation phase, which can be paused or restarted, the commit phase is synchronous and uninterrupted.
- **Cycle for a state change**: 
    Re-render: React runs your function and gets the new VDOM.
    Reconciliation: React compares the new VDOM to the old VDOM to find changes (**React Fiber**).
    Commit: React updates only the specific changed nodes in the browser's Real DOM.
- **`useState`**: Stores data that updates the screen when it changes (e.g., typing text, clicking a checkbox).
- **`useEffect`**: Runs actions outside of React, like API calls or timers (e.g., fetching data on page load, setting up event listeners).
- **`useRef`**: Stores private data that doesn't trigger re-renders, or grabs a direct link to a real HTML element (e.g., saving a timer ID, focusing an input box).
- **Reconciliation Key (`key={log.id}`)**: A unique, stable identifier assigned to items in a rendered list. It allows React Fiber to identify which specific items have changed, moved, or been removed, updating only those DOM nodes instead of destroying and rebuilding the entire list. (Avoid using array indexes for dynamic lists).
- **DOM Windowing / Slicing (`.slice(0, 100)`)**: A performance technique where expensive array operations (filtering/sorting 10,000 items) are computed in JavaScript memory, but only a small visible subset (e.g. 100 items) is rendered into the browser DOM to prevent HTML node bloat and browser rendering freeze.
- **Pagination State (`currentPage` & `pageSize`)**: Managing table pages by slicing the `useMemo` filtered array: `logs.slice((currentPage - 1) * pageSize, currentPage * pageSize)`. Automatically resets `currentPage = 1` whenever filter criteria change to prevent out-of-bound blank screens.
- **Callback Function**: A function passed as an argument to another function, intended to be executed ("called back") at a later time (e.g., when an event occurs or an async action completes).
- **`useReducer`**: A hook for managing complex component state logic, using actions and a pure reducer function (identical to NgRx/Redux principles).
- **Memoization**: An optimization technique of caching expensive calculations or rendering results. In React, it uses 3 main tools:
  * **`useMemo`**: Caches the *result* of a calculation (like sorting 10,000 logs) to avoid running it on every render.
  * **`React.memo`**: Caches the *component output* (like a list row), skipping re-renders if props have not changed.
  * **`useCallback`**: Caches a *function reference* so it isn't recreated on every render, preventing it from breaking `React.memo` in child components.

  **Memoization Cheat Sheet**:
  | Tool | What it Caches | Where it is Written |
  | :--- | :--- | :--- |
  | **`React.memo`** | A **Component's UI output** | Wraps the outer component function export. |
  | **`useMemo`** | A **Calculation / Value** | Hook called inside a component body. |
  | **`useCallback`** | A **Function Reference** | Hook called inside a component body. |

- **Callback Stabilization (`useCallback`)**: Wrapping a callback function in `useCallback` inside a parent component ensures that if the parent re-renders, the callback maintains an identical memory reference (`oldFn === newFn`). 

  **Golden Rule for `useCallback`**: You **ONLY** need `useCallback` when a function is:
  1. **Passed down as a prop** to a child component (especially one wrapped in `React.memo`).
  2. **Used as a dependency** inside a `useEffect` hook in a child component.
  *(Internal functions not passed as props, like `useEffect` handlers, do not need `useCallback`).*
- **Code Splitting & Lazy Loading (`React.lazy` / `Suspense`)**: Splitting the JavaScript bundle into smaller chunks loaded only on-demand (e.g., when a tab or modal is opened) to make the initial page load faster.
- **User-Centric Testing**: The philosophy (practiced by React Testing Library) of testing components based on how real users interact with them (e.g., using accessibility queries like **`getByRole`**) rather than asserting internal code state, class names, or IDs.
* **Content Projection (`children` prop)**: Instead of Angular's `<ng-content>` or Vue's `<slot>`, React automatically passes whatever HTML or components you put *inside* the opening and closing tags of your component under a special, built-in prop called **`children`**.
- **Stale Closure**: A bug where a function or `useEffect` holds onto an outdated variable or prop from a previous render pass because the effect wasn't re-executed when that variable changed.
- **Exhaustive Dependencies Rule**: A linting rule enforcing that every reactive value (props, state, functions) referenced inside a `useEffect` must be listed in its dependency array to prevent stale closures. (We use **`useCallback`** in the parent to stabilize function references so they don't trigger unnecessary effect restarts). (The rule applies to **useMemo** and **useCallback** also)

---

## DOM Update Comparison (High-Level)

* **React**: Re-runs component functions to build a new **Virtual DOM** tree, compares it with the previous one (diffing), and patches the changes to the Real DOM.
* **Angular**: No Virtual DOM. Compiles templates into JavaScript instructions that update the **Real DOM directly** when data changes (via scanning the tree or tracking signals - newer versions).
* **Vue**: Automatically tracks which components read which data. When that data changes, Vue re-renders only those specific components using an **optimized Virtual DOM**.

---

## Struggles coming from TS or Angular (Notes for Interview)

1. **Implicit Prop Structures**: Coming from Angular, I am used to strict TypeScript contracts. In plain React JSX, components just implicitly assume that props have certain structures, which can be error-prone. (Note: Using TSX solves this by introducing static type checking and prop interfaces).
2. **No Two-Way Data Binding (`[(ngModel)]`)**: React is strictly one-way. To mimic Angular's two-way binding, React uses the **Controlled Component** pattern: you must explicitly bind `value={state}` and an `onChange={(e) => setState(e.target.value)}` handler. While it requires more boilerplate, it makes data flow extremely predictable. 
  -> So it is one way because the component will always change itself using the value from ui, but not the ui will change the value, but the event/ setter from the component
  -> So:
    1. Props are data passed into a component (read-only).
    2. State is data managed inside a component (read/write, but only via updater functions).
3. In traditional Angular with default change detection, you can **mutate properties** directly with = because (Zone.js dirty-checks) it checks **template bindings**. 
But in React, everything requires **strict immutability** because React checks object **reference equality** (oldState === newState).
The only time Angular behaves like React is when you switch Angular to ChangeDetectionStrategy.OnPush, which also requires immutable reference changes to trigger updates.
The only time React mutates with = is when we use **useRef**.
4. **Component Execution Model (Class Methods vs Function Top-to-Bottom Execution)**: In Angular class components, you define class methods and call them explicitly. In React functional components, the entire function executes from top-to-bottom on every single render pass. Any code placed directly in the function body (like `renderCountRef.current += 1`) runs automatically on every re-render without needing a helper method call.
5. **Lazy Loading Granularity (Route-Level vs Component-Level Code-Splitting)**: 
- In Angular, lazy loading was historically route-based (`loadChildren` in router configs). 
- In React, `React.lazy()` and `<Suspense>` enable **component-level code-splitting** anywhere in the UI tree (e.g. lazy loading heavy charts, modals, or widgets), splitting the JavaScript bundle into smaller on-demand network chunks.

---

## Q&A

1. **When do you choose useReducer over useState?**
I use useState for simple, localized UI state (like form inputs or modal toggles). But when a view manages complex, multi-field state where updates depend on previous values or multiple properties change together, I prefer useReducer. It keeps state transitions predictable and allows me to unit-test the reducer logic in isolation.
2. **UseReducer vs useMemo**
  - The Reducer (useReducer): Its ONLY job is to store raw data (logs, searchQuery, selectedLevel, sortDirection). It does not do the filtering/sorting calculation itself!
  - The Component (useMemo): The component reads the raw logs, searchQuery, selectedLevel, and sortDirection from state, and uses useMemo to compute the filtered/sorted result.
3. **Why to use Reducer?**
To separate event intent (action) and state transitions (reducer) from UI calculations (component). This makes state changes completely predictable and allows me to unit-test all state logic in isolation without needing to render HTML or mock browser events.
4. **useEffect + useCallback for a timer - explanation**
  1. On Mount (isPollingActive = true): The setup code runs and starts Timer #1. The cleanup function is registered for later.
  2. User clicks "Pause" (isPollingActive changes to false):
    React runs the cleanup function from the previous render pass $\rightarrow$ clearInterval stops Timer #1.
    React runs the effect again $\rightarrow$ sees if (isPollingActive) is false $\rightarrow$ no timer is created!
  3. User clicks "Resume" (isPollingActive changes back to true):
    React runs the cleanup function (which safely finds null).
    React runs the effect again $\rightarrow$ starts Timer #2!
  4. onNewLog Dependency & useCallback: We add onNewLog to the array to satisfy the Exhaustive Dependencies Rule, and we wrap handleNewLog in useCallback in the parent so its reference stays identical and never restarts the timer by accident!
If we had forgotten the cleanup function, clicking Pause/Resume 5 times would leave 5 duplicate timers running in the background simultaneously, flooding the app with logs and causing a major memory leak!
5. **Why do console logs or component functions execute twice in React development?**
That is caused by <React.StrictMode>. In development, React intentionally double-invokes render functions and effects (to make sure the functions are pure) to help developers catch impure side-effects and cleanup bugs. In production builds, Strict Mode double-invocations are automatically removed.