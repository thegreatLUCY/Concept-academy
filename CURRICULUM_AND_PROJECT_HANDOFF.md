# Concept Academy Quiz: Curriculum and Project Handoff

This document records what has already been built, what concepts are already covered, how the question sets are structured, how new sets should be created, and how the work should be audited before it is considered done.

The project is a Vite + React teaching quiz app called Concept Academy. It began as a React/JavaScript zero-to-hero curriculum and has now expanded into a multi-track programming academy shell. React and Python are live tracks; the other landing-page topic panels are planned. The curriculum is intentionally progressive: early questions use recognition and simple completion, then later sets increasingly require typed code, workflow reasoning, and multi-concept program design.

## Current Status

- Project name in `package.json`: `react-zero-to-hero-quiz`
- Repository remote used in this project: `https://github.com/thegreatLUCY/Concept-academy.git`
- Current app default view: topic landing page
- Current live quiz panels: React and Python
- Current React quiz default set after opening React: `Set 5`
- Current Python quiz default set after opening Python: `Set 1`
- Current total curriculum size: `1086` questions
- Current React data sets:
  - React Set 1: `136` questions
  - React Set 2: `190` questions
  - React Set 3: `180` questions
  - React Set 4: `180` questions
  - React Set 5: `200` questions
- Current Python data sets:
  - Python Set 1: `200` questions
- Local development URL used during work: `http://127.0.0.1:5173/`
- Production build command: `npm run build`

## App Structure

The app is intentionally simple. The complexity belongs in the curriculum, not in the website shell.

- `package.json`
  - Defines a Vite React app.
  - Scripts:
    - `npm run dev`
    - `npm run build`
    - `npm run preview`
  - Dependencies:
    - `react`
    - `react-dom`
  - Dev dependencies:
    - `vite`
    - `@vitejs/plugin-react`
- `index.html`
  - Root HTML document for the Vite app.
- `src/main.jsx`
  - React entry point.
  - Mounts the app into the root container.
- `src/App.jsx`
  - Main application shell.
  - Renders the topic landing page first.
  - Defines the topic panel catalog for React, SQL, jQuery, Python, TypeScript, Matplotlib, NumPy, Pandas, Bash, and Linux.
  - Uses a track registry so available panels can open their own quiz curriculum.
  - Opens the React quiz when the React panel is clicked.
  - Opens the Python quiz when the Python panel is clicked.
  - Shows a planned/coming-soon notice for non-live panels until their curricula are built.
  - Supports filtering topic panels from the landing page.
  - Imports all live question sets.
  - Defines the set switcher for the active track.
  - Defines the module list for the active track.
  - Tracks active set, active module, current question, selected answer, fill answers, typed code answer, checked state, correctness, and completed progress.
  - Stores progress in localStorage under `react-zero-to-hero-progress`.
  - Validates MCQ, True/False, fill-in-the-blank, and typed-code questions.
  - Supports resetting progress per active set or all sets.
- `src/styles.css`
  - Visual styling for the teaching interface.
  - Light professional topic landing page with searchable topic cards.
  - Dark educational quiz UI with sidebar, progress, question cards, choices, feedback, and code-style blocks.
- `src/data/questions.js`
  - Set 1 question data.
- `src/data/set2Questions.js`
  - Set 2 question data.
- `src/data/set3Questions.js`
  - Set 3 question data.
- `src/data/set4Questions.js`
  - Set 4 question data.
- `src/data/set5Questions.js`
  - Set 5 question data.
- `src/data/pythonSet1Questions.js`
  - Python Set 1 question data.
- `PYTHON_SOURCE_QUESTIONS.md`
  - Captures the user-fed Python reference screenshots and observed pacing.
- `dist/`
  - Generated production build output.

## Question Data Model

Each question belongs to a set and module.

Common fields:

- `id`: globally unique question ID
- `setId`: curriculum set ID, such as `set5`
- `moduleId`: module/category ID
- `level`: human-facing type label
- `type`: internal type, one of `mcq`, `tf`, `fill`, `code`
- `prompt`: question text
- `explanation`: teaching explanation shown after checking or revealing

Question types:

- `mcq`
  - Has `choices`
  - Has `answer`
  - Correct when selected choice equals `answer`
- `tf`
  - Has boolean `answer`
  - Correct when selected True/False equals `answer`
- `fill`
  - Has `snippet`
  - Has `blanks`
  - Each blank has `label` and accepted `answers`
  - App normalizes whitespace, quotes, and trailing semicolons before checking
- `code`
  - Has `starter`
  - Has `expected`
  - Has `required`
  - May have `accepted`
  - App accepts either exact normalized match from `expected`/`accepted`, or a required-snippet match

Later sets use compact helper functions such as `mcq`, `tf`, `fill`, `typed`, and `attach` to keep large question files maintainable.

## Curriculum Design Rules

The curriculum was created from user-provided screenshot examples and then expanded into a complete learning path.

Important rules:

- Do not simply reuse the original screenshot questions.
- Rephrase, vary, and add twists while preserving the teaching intent.
- Keep the pace gradual at the beginning.
- Introduce concepts before asking the learner to combine them.
- Use at least two questions for every important concept.
- Prefer more than two questions when a concept is foundational or commonly misunderstood.
- Start with MCQ, True/False, and completion.
- Later require typed code.
- Later still require multi-step code and workflow decisions.
- Increase difficulty set by set.
- Be generous with question volume.
- Avoid skipping concepts.
- Every set must be audited after creation.

## Landing Page and Topic Panels

The app has been expanded from a React-only quiz into a broader programming academy shell.

Current topic panels:

- React: available and opens the existing quiz app.
- Python: available and opens Python Set 1.
- SQL: planned.
- jQuery: planned.
- TypeScript: planned.
- Matplotlib: planned.
- NumPy: planned.
- Pandas: planned.
- Bash: planned.
- Linux: planned.

Design decisions:

- NumPy, Pandas, and Matplotlib currently remain separate panels because they teach different concepts.
- A future grouped "Python Data Stack" path may also be added to sequence NumPy, Pandas, and Matplotlib together.
- Non-live panels are clickable but do not open a quiz yet; they show a planned notice.
- Live quiz tracks have a `Back to topics` button in the sidebar.
- The landing page includes current live platform stats: live question count, live module count, and completed count.

## Existing Curriculum Coverage

### Set 1: Foundations

Set 1 teaches the learner how React projects start, what the basic files mean, how JSX works, and the JavaScript minimum needed before real components make sense.

Modules:

- React Orientation: what React is, what a React app is, why components matter, and the idea of UI as reusable pieces.
- npm, Vite, and Project Files: installing/creating a Vite React app, `npm create vite@latest`, `npm install`, `npm run dev`, development server basics, package scripts, and the purpose of project files.
- Project Structure and Rendering: `src`, `App.jsx`, `main.jsx`, `index.html`, the root container, `createRoot`, rendering into a container, and live browser updates during development.
- Relative Import Paths: `./`, `../`, why file paths matter, importing `App` from `./App.jsx`, importing components such as `./components/Header.jsx`, and avoiding broken imports.
- JSX Basics and Fragments: JSX tags, closing tags, nested elements, `className`, JavaScript expressions in braces, JSX single-parent rule, and React fragments using `<>...</>`.
- Variables, Scope, and Functions: `var`, `let`, `const`, constants, variable scope, function declarations, arrow functions, parameters, and simple return values.
- Objects and Classes: object literals, property access with `user.name`, bracket access with `user["name"]`, class syntax, constructors, `new`, inheritance with `extends`, and parent constructor access with `super()`.
- Arrays, map(), and Keys: arrays, `map()`, returning a new array, rendering lists, accessing the current item, index parameter basics, and React list keys.
- Destructuring, Spread, Rest, and Templates: object destructuring, array destructuring, skipping array positions, default values, spread operator, rest operator, template strings, backticks, and `${expression}` interpolation.
- JavaScript Modules: named exports, default exports, named imports, default imports, curly braces for named imports, and import/export syntax.
- Components and Props: function components, rendering components, passing props, receiving props, destructuring props, and examples like `function Welcome({ name })`.
- Conditional Rendering: ternary operator basics, React ternary rendering, `&&` rendering, rendering one branch or another, and avoiding non-React conditional confusion.
- Events Basics: event handlers, `onClick`, passing handler functions, button interactions, and the first step toward interactive components.
- Typed Code Practice: early typed-code exercises that combine imports, JSX, props, conditionals, objects, arrays, and basic component shape.

User-added concepts included in Set 1:

- `package.json`
- dependencies vs devDependencies
- scripts
- `node_modules`
- `package-lock.json`
- relative import paths
- object basics before destructuring
- props
- fragments
- real React conditional rendering
- basic events

### Set 2: Interactive React

Set 2 moves from static components into state, events, forms, effects, and beginner-safe async behavior.

Modules:

- Rules of Hooks: hooks at the top level, no hooks in `if`, loops, nested functions, or event handlers, custom hooks also following the rules, and why stable hook order matters.
- useState and Re-rendering: state values, setter functions, initial state, re-rendering from state/props, local variables vs state, toggles, counters, and basic stateful components.
- Batching and Stale State: React batching, multiple `setCount(count + 1)` calls, why functional updates such as `setCount(prev => prev + 1)` fix repeated updates, stale state, and stale closure basics.
- Events with State: handlers that update state, passing handlers correctly, avoiding immediate calls, event-driven UI changes, and state transitions from user actions.
- Controlled Forms: controlled text inputs, `value`, `onChange`, `event.target.value`, controlled checkbox using `checked`, controlled select using `value`, controlled textarea using `value`, form submit basics, and form reset ideas.
- Object and Array State: immutable updates, spreading objects/arrays, updating nested values, adding/removing/updating array items, avoiding mutation, and state replacement.
- Derived State and Conditional UI: deriving values during render, avoiding unnecessary duplicated state, conditional messages, disabled states, and conditional component branches.
- Composition and children: using `children`, wrapper components, reusable panels/cards, composing UI instead of hardcoding everything, and passing JSX as content.
- Callbacks, Lifting State, Props vs State: parent-owned state, child callbacks, lifting state up, passing callbacks through props, deciding what is a prop and what is state.
- Interactive Lists, Keys, and State Reset: list interactions, key stability, why indexes can be dangerous, React preserving state by position, changing keys to reset state, and list item identity.
- useEffect Fundamentals: effect timing, dependency arrays, syncing after render, timers, browser APIs, network calls, and cleanup basics.
- Effect Escape Hatches, StrictMode, Cleanup: "you might not need useEffect", derived state should not be calculated in effects, effects for external systems, StrictMode double effect behavior in development, cleanup functions, timers, subscriptions, and safe effects.
- Fetching and localStorage: fetch basics, loading/error/data state, localStorage read/write, JSON with storage, ignoring old requests, avoiding state updates after unmount, and fetch cleanup patterns.
- Debugging and Mini Programs: reading error messages, debugging state, fixing broken components, combining state/forms/effects, and early small-program typed tasks.

User-added concepts included in Set 2:

- Rules of Hooks
- React batching
- stale state and stale closures
- controlled checkbox/select/textarea
- "you might not need useEffect"
- StrictMode double effects
- fetch cleanup and ignoring old requests
- state preservation and reset with keys

### Set 3: JavaScript Maturity

Set 3 deepens JavaScript so React code stops feeling magical. It focuses on real JavaScript behavior needed for forms, APIs, events, and data transformation.

Modules:

- Function Values and Callbacks: function declarations, function expressions, arrow functions, callbacks, functions as values, higher-order functions, passing callbacks without calling them, and React-style function usage.
- Execution Model and Event Loop: synchronous call stack, async callbacks, microtasks vs macrotasks at an introductory level, timers, promises, and why async results happen later.
- Scope, Closures, and this: lexical scope, closures, stale closures, `this` behavior, arrow functions and lexical `this`, and practical React implications.
- Type Conversion and Form Values: strings vs numbers, `Number()`, `parseInt()`, `parseFloat()`, `NaN`, checking numeric conversion, and why form values arrive as strings.
- Equality, Truthiness, and Safe Defaults: `===` vs loose equality, truthy/falsy values, `??`, `||`, optional chaining, safe fallback values, and avoiding accidental defaulting bugs.
- Arrays, Sorting, and Reduce: `map`, `filter`, `find`, `some`, `every`, `reduce`, `sort()` mutation, numeric sort compare functions, and copying before sorting with spread.
- Immutability and References: reference equality, object/array mutation, copying data, why mutation causes React bugs, and safe update patterns.
- JSON, Storage, and Request Bodies: `JSON.stringify`, `JSON.parse`, localStorage object storage, API request bodies, parsing API responses, and JSON failure handling.
- Destructuring for API Data: nested destructuring, aliases, defaults, safe destructuring from possibly missing data, and destructuring function parameters.
- Promises and async/await: promises, `.then`, `async`, `await`, `try/catch`, returning values from async functions, and error propagation.
- Fetch API and HTTP Handling: `fetch`, response parsing, `response.ok`, status codes, request methods, headers, JSON bodies, and throwing useful errors.
- AbortController and Stale Requests: aborting fetches, stale request prevention, race conditions, cleanup, and safe search/request patterns.
- Event Object and DOM Concepts: event object, `preventDefault`, `stopPropagation`, `event.target`, `event.currentTarget`, form events, bubbling, and DOM relationship to React.
- Browser APIs and Environment Variables: localStorage/sessionStorage basics, URL APIs, timers, browser-visible environment variables, Vite `import.meta.env`, and why frontend env vars are public.
- Modules, Utilities, and Imports: reusable helpers, named/default exports, barrel-file caution, import paths, utility organization, and separating pure logic.
- Data Transformation for UI: adapting API shapes to UI shapes, filtering, grouping, mapping, sorting for display, defensive transforms, and avoiding mutation.
- Defensive JavaScript and Debugging: guards, optional chaining, safe defaults, meaningful errors, reading stack traces, and debugging broken async/data code.
- Debounce and Mini Programs: debounce with `setTimeout`, cleanup, search input delay, avoiding fetch on every keystroke, and typed mini-programs that combine previous concepts.

User-added concepts included in Set 3:

- deeper function concepts
- type conversion from form input strings
- JSON.parse / JSON.stringify
- deeper destructuring
- sort mutation and numeric compare
- event object details
- debounce basics
- environment variables intro

### Set 4: React Architecture

Set 4 moves from isolated components into app architecture: reducers, context, custom hooks, routing basics, accessibility, testing, TypeScript, and performance judgment.

Modules:

- Component Architecture: presentational vs container components, component responsibility, splitting components, reusable APIs, `children`, page components, and avoiding huge `App.jsx`.
- State Architecture and Server State: state colocation, local vs shared state, server state as a different category, stale data, caching/refetching concerns, and when not to globalize state.
- useReducer Basics: reducer shape, `[state, dispatch]`, actions, `type`, switch statements, pure reducers, immutable returns, reset actions, and reducer-driven transitions.
- Reducer Patterns: action constants, payloads, default cases, request-state reducers, splitting reducers, form reducers, immutable item updates, and avoiding side effects inside reducers.
- Context API Basics: `createContext`, Provider, `value`, `useContext`, prop drilling, nearest provider, and Context as a sharing mechanism.
- Context Architecture: custom provider components, custom context hooks, guard errors when used outside providers, provider value design, splitting state and dispatch contexts, and provider memoization only when useful.
- useReducer with Context: shared reducer state, app-level actions, nested dispatch, cart/auth examples, Provider setup, and avoiding overuse for local state.
- Custom Hooks: `use` naming, reusable stateful logic, hook composition, custom hooks sharing logic but not state instances by default, `useToggle`, `useDebounce`, and `useLocalStorage`.
- Refs, Portals, and Error Boundaries: `useRef`, DOM refs, focus, mutable values without re-render, `forwardRef`, `createPortal`, modal rendering, React event bubbling through portals, and class-based error boundaries.
- React Router: routes, `Route`, `Link`, `Outlet`, layout routes, nested routes, params, `useParams`, `useNavigate`, protected routes, and `*` 404 routes.
- Lazy Loading and Suspense: `React.lazy`, dynamic imports, default exports for lazy components, `Suspense`, fallback UI, route-level code splitting, and when not to lazy-load.
- Form Architecture: reusable fields, labels/errors/input grouping, field-level errors, form-level errors, touched state, validation helpers, accessible error rendering, and later use of React Hook Form/Zod.
- Accessibility for Components: semantic buttons vs clickable divs, labels for inputs, `htmlFor`/`id`, icon button names with `aria-label`, keyboard navigation, focus management, modal accessibility, `aria-describedby`, and `role="alert"`.
- Testing Intro: testing pure helpers, component tests, React Testing Library, behavior over implementation, `getByRole`, user-event interactions, form behavior tests, and avoiding private state assertions.
- TypeScript Intro: typing props, callback props, reducer actions, context values, custom hooks, event types, discriminated unions at an introductory level, and compile-time safety.
- Component APIs and Performance Warnings: controlled vs uncontrolled component APIs, prop design, composition APIs, expensive rendering, `memo`, `useMemo`, and `useCallback` as measured tools rather than default habits.
- Folder Organization: feature folders, route/page organization, component folders, hooks, utilities, providers, services, and avoiding one giant folder or one giant file.
- Mini Architecture Programs: typed exercises combining architecture decisions, reducers, context, custom hooks, router basics, accessibility, and testing-style thinking.

User-added concepts included in Set 4:

- React Router
- server state and caching intro
- lazy loading and Suspense
- form architecture
- accessibility basics
- testing intro
- TypeScript intro
- Context warning: Context is not a full state manager
- Performance warning: memoization is not a default habit

### Set 5: Routing, Server Data, and Real App Workflows

Set 5 raises difficulty into route-driven workflows, data routers, server-state tooling, CRUD, auth, deployment bugs, and form library introductions.

Modules:

- Route Trees and Layouts: route objects, layout routes, nested routes, `Outlet`, parent layouts staying mounted, feature-based route placement, route object `children`, and route elements.
- Navigation and URL State: `Link`, `to`, `useNavigate`, programmatic navigation after save/cancel, URL as state, shareable URL state, `<Navigate />`, `replace`, and render-time redirect cautions.
- Params, Query Params, and Filters: dynamic route params, `useParams`, params as strings, search params for `page`, `sort`, and filters, `useSearchParams`, URL-backed filters, conversion, and avoiding secrets in URLs.
- Protected Routes and Auth Flow: protected routes, private pages, auth guards with `Outlet` and `Navigate`, frontend guard limitations, return-to routes after login, role-based guards, 401 vs 403, and server-side authorization warning.
- Router Loaders, Actions, and Errors: React Router loaders, actions, `useLoaderData`, `Form`, route action submissions, loader revalidation after actions, route error elements, throwing 404 responses, route loaders vs TanStack Query, and route-level data loading.
- Pending Navigation UI: `useNavigation`, `navigation.state`, `loading`, `submitting`, disabling submit buttons, skeleton/progress indicators, `navigation.formAction`, pending vs optimistic UI, and route-transition feedback.
- Route Architecture and SPA Deployment: SPA refresh problem, direct visits to `/dashboard` failing on static hosting, Vercel `vercel.json` rewrites, catch-all rewrite to `/index.html`, client-side `*` 404 routes, route-level lazy imports, and difference between hosting rewrites and app 404 UI.
- Server State Concepts: server-owned data, loading/error/data/empty states, stale data, refetching, retry UI, avoiding unnecessary duplication into local state, and recoverable request errors.
- TanStack Query Basics: `useQuery`, query keys, cache identity, including variables in query keys, `enabled`, invalidation, server-state responsibilities, and not treating the library as a UI-design replacement.
- Mutations and Optimistic Rollback: `useMutation`, mutation functions, invalidating queries after writes, optimistic UI, cache snapshots, rollback with `getQueryData` and `setQueryData`, failure handling, and when optimistic updates are risky.
- API Client and Error Shapes: API client/service layer, base URLs, headers, parsing, centralized error handling, consistent error shapes, field errors, 401/403/404/422/500 handling, `response.ok`, and avoiding hardcoded API URLs.
- Request Lifecycle and Error UI: idle/loading/success/error/empty, loading branches, empty vs error, retry buttons, unmount safety, race conditions, ignore-flag cleanup, and tool-managed async state vs UI design responsibility.
- Pagination and Infinite Queries: pagination, page in query keys, when pagination is better, infinite scrolling, `useInfiniteQuery`, load more button, `hasNextPage`, `isFetchingNextPage`, `getNextPageParam`, and infinite-scroll tradeoffs.
- Search, Filters, and URL Sync: debounced search, timeout cleanup, query keys for filters/sort/page, shareable URL filters, resetting page on new search, race risks in live search, `useDebounce`, and fetching with debounced values.
- CRUD Workflows and Toasts: create/read/update/delete, confirmed success feedback, success toasts, error toasts, inline field errors vs global notifications, avoiding fake success before server confirmation, delete confirmations, navigation after save, and edit-page workflow states.
- Auth Workflow and Security Warnings: authentication vs authorization, server-enforced authorization, bearer token headers, token storage tradeoffs, 401 handling, refresh-token concept, login success workflow, hiding admin UI vs API enforcement, and auth bootstrap requests.
- React Hook Form and Validation: `useForm`, `register`, `handleSubmit`, `formState`, schema validation with Zod/Yup, resolver setup, client validation vs authoritative server validation, mapping server field errors with `setError`, form-level errors, and submission handling.
- App Layout Workflows: application shell layouts, persistent navigation, `Outlet`, root providers, `QueryClientProvider`, modal routes, breadcrumbs from route metadata, NotFound inside layouts, pending indicators in layouts, and auth-aware shell UI.
- Environment and API Configuration: env variables for API URLs, Vite `VITE_` prefix, frontend env vars being public, private keys staying on server/backend, `.env.local`, restarting Vite after env changes, config modules, and config guards.
- Mini Real-App Programs: multi-concept tasks combining URL params, loaders/actions, pending UI, server state, mutation success workflows, cache invalidation, toasts, validation mapping, route-level 404s, and navigation after CRUD.

User-added concepts included in Set 5:

- React Router loaders/actions
- `useLoaderData`
- React Router `Form`
- route error elements
- router loaders vs TanStack Query
- pending navigation UI
- pending submission UI
- skeletons while route data loads
- React Hook Form
- Zod/Yup schema validation
- client validation vs server validation
- server field errors
- toast notifications
- inline error vs global notification
- avoiding fake success before server confirmation
- optimistic update rollback
- infinite query/load more concepts
- pagination vs infinite scroll tradeoffs
- consistent API error shape
- handling 401, 403, 404, 422, 500
- field errors vs general errors
- SPA deployment refresh/404 problem
- Vercel/static-hosting rewrites

### Python Set 1: Foundations

Python Set 1 mirrors the early pacing of the React curriculum: it starts with recognition questions, True/False checks, and small completion exercises, then gradually asks for typed code and small multi-line programs. The set is based on the user-fed Python reference screenshots but rephrased and expanded instead of copied.

Modules:

- Python Intro and Interpreter: what Python is used for, `.py` files, the interpreter, script names, and the difference between source files and the tool that runs them.
- Python Files and Terminal Workflow: checking Python installation with `python --version` and `python3 --version`, running `.py` files with `python file.py` and `python3 file.py`, using the interactive shell, and exiting with `exit()`.
- Syntax, Lines, and Indentation: indentation as syntax, colons after block headers, `if` blocks, correct indentation, `IndentationError`, and beginner block structure.
- Expressions and Statements: expressions as value-producing code, statements as actions, assignment from expressions, `print()` as an action, semicolon misconceptions, and execution order.
- Print Text, Numbers, and Variables: `print()`, printing strings, printing numbers, quoted text vs variable names, printing stored values, and using print for beginner debugging.
- Print Arguments and Concatenation: comma-separated `print()` arguments, automatic spacing, string concatenation with `+`, numeric addition with `+`, and the difference between text joining and math.
- Input Basics: `input()`, prompts, storing user input, printing greetings, `input()` always returning strings, and converting input before numeric math.
- Comments and Multiline Strings: `#` comments, inline comments, commented-out code, triple-quoted multiline strings, and the difference between real comments and standalone multiline strings.
- Variables and Assignment: Python variable assignment without `var`/`let`/`const`, assigning numbers and strings, reassignment, using variables after creation, and direct instruction-to-code exercises.
- Variable Names: legal and illegal identifiers, hyphens vs underscores, case sensitivity, starting names with underscores, not starting with numbers, and snake_case style.
- Multiple Values and Unpacking: chained assignment, assigning several values in one line, unpacking lists and tuples, matching variable/value counts, and reading unpacked outputs.
- Data Types and `type()`: `print(type(x))`, `int`, `str`, `float`, `bool`, `list`, `tuple`, `dict`, `set`, `NoneType`, and recognizing types from literal syntax.
- Numbers: integers, floats, negative numbers, scientific notation, numeric addition, decimal points, and printing/comparing numeric types.
- Casting and Conversion: `int()`, `float()`, `str()`, converting strings to numbers, converting numbers to strings, why `"5" + 5` fails, and `int(input(...))`.
- String Basics: single and double quotes, `len()`, string indexing, zero-based indexing, apostrophes inside strings, and combining string assignment with output.
- f-Strings and String Output: `f"..."`, inserting variables with `{name}`, inserting numbers, expressions inside f-string braces, input plus f-string output, and modern string formatting.
- Booleans and Comparisons: `True`, `False`, comparison results, `==`, `!=`, assignment vs equality, `bool(0)`, truthy strings, and boolean variables.
- Operators and Precedence: arithmetic operators, `**`, `//`, `%`, `+=`, comparison operators, logical `and`, multiplication before addition, and parentheses changing evaluation order.
- Scope and Global Variables: global vs local variables, local variables inside functions, `def`, `global x`, how global assignment changes outer variables, and early function-scope reasoning.
- Beginner Errors and Mini Programs: `SyntaxError`, `NameError`, `TypeError`, `IndentationError`, missing quotes, missing colons, missing parentheses, using variables before creating them, and small programs combining input, casting, variables, and f-strings.

User-added concepts included in Python Set 1:

- `input()`
- `input()` always returns a string
- `int(input(...))` and `float(input(...))`
- running `.py` files from the terminal
- `python file.py`
- `python3 file.py`
- beginner error reading
- `SyntaxError`
- `NameError`
- `TypeError`
- `IndentationError`
- missing quotes
- missing parentheses
- missing colons
- using a variable before creating it
- f-strings
- `None` and `NoneType`
- expression vs statement
- operator precedence

## Current Module Inventory

Set 1:

- React Orientation: 6
- npm, Vite, and Project Files: 12
- Project Structure and Rendering: 10
- Relative Import Paths: 8
- JSX Basics and Fragments: 12
- Variables, Scope, and Functions: 12
- Objects and Classes: 10
- Arrays, map(), and Keys: 10
- Destructuring, Spread, Rest, and Templates: 12
- JavaScript Modules: 8
- Components and Props: 12
- Conditional Rendering: 8
- Events Basics: 8
- Typed Code Practice: 8

Set 2:

- Rules of Hooks: 8
- useState and Re-rendering: 12
- Batching and Stale State: 14
- Events with State: 12
- Controlled Forms: 21
- Object and Array State: 16
- Derived State and Conditional UI: 12
- Composition and children: 10
- Callbacks, Lifting State, Props vs State: 12
- Interactive Lists, Keys, and State Reset: 12
- useEffect Fundamentals: 14
- Effect Escape Hatches, StrictMode, Cleanup: 14
- Fetching and localStorage: 21
- Debugging and Mini Programs: 12

Set 3:

- Function Values and Callbacks: 10
- Execution Model and Event Loop: 10
- Scope, Closures, and this: 10
- Type Conversion and Form Values: 10
- Equality, Truthiness, and Safe Defaults: 10
- Arrays, Sorting, and Reduce: 10
- Immutability and References: 10
- JSON, Storage, and Request Bodies: 10
- Destructuring for API Data: 10
- Promises and async/await: 10
- Fetch API and HTTP Handling: 10
- AbortController and Stale Requests: 10
- Event Object and DOM Concepts: 10
- Browser APIs and Environment Variables: 10
- Modules, Utilities, and Imports: 10
- Data Transformation for UI: 10
- Defensive JavaScript and Debugging: 10
- Debounce and Mini Programs: 10

Set 4:

- Component Architecture: 10
- State Architecture and Server State: 10
- useReducer Basics: 10
- Reducer Patterns: 10
- Context API Basics: 10
- Context Architecture: 10
- useReducer with Context: 10
- Custom Hooks: 10
- Refs, Portals, and Error Boundaries: 10
- React Router: 10
- Lazy Loading and Suspense: 10
- Form Architecture: 10
- Accessibility for Components: 10
- Testing Intro: 10
- TypeScript Intro: 10
- Component APIs and Performance Warnings: 10
- Folder Organization: 10
- Mini Architecture Programs: 10

Set 5:

- Route Trees and Layouts: 10
- Navigation and URL State: 10
- Params, Query Params, and Filters: 10
- Protected Routes and Auth Flow: 10
- Router Loaders, Actions, and Errors: 10
- Pending Navigation UI: 10
- Route Architecture and SPA Deployment: 10
- Server State Concepts: 10
- TanStack Query Basics: 10
- Mutations and Optimistic Rollback: 10
- API Client and Error Shapes: 10
- Request Lifecycle and Error UI: 10
- Pagination and Infinite Queries: 10
- Search, Filters, and URL Sync: 10
- CRUD Workflows and Toasts: 10
- Auth Workflow and Security Warnings: 10
- React Hook Form and Validation: 10
- App Layout Workflows: 10
- Environment and API Configuration: 10
- Mini Real-App Programs: 10

Python Set 1:

- Python Intro and Interpreter: 10
- Python Files and Terminal Workflow: 10
- Syntax, Lines, and Indentation: 10
- Expressions and Statements: 10
- Print Text, Numbers, and Variables: 10
- Print Arguments and Concatenation: 10
- Input Basics: 10
- Comments and Multiline Strings: 10
- Variables and Assignment: 10
- Variable Names: 10
- Multiple Values and Unpacking: 10
- Data Types and `type()`: 10
- Numbers: 10
- Casting and Conversion: 10
- String Basics: 10
- f-Strings and String Output: 10
- Booleans and Comparisons: 10
- Operators and Precedence: 10
- Scope and Global Variables: 10
- Beginner Errors and Mini Programs: 10

## How New Sets Should Be Added

1. Discuss the concept bullets with the user first.
2. Let the user add missing concepts.
3. Confirm the final concept list.
4. Create a new data file, for example `src/data/set6Questions.js` or `src/data/pythonSet2Questions.js`.
5. Prefer the helper pattern used in Set 4 and Set 5:
   - `code`
   - `item`
   - `mcq`
   - `tf`
   - `fill`
   - `typed`
   - `attach`
6. Export:
   - `set6Modules`
   - `set6Questions`
7. Add the new imports in `src/App.jsx`.
8. Add the new set to the correct track's set list.
9. Add modules and questions to the correct track arrays.
10. Consider making the newest set the default active set for that track.
11. Run the focused data audit.
12. Run the production build.
13. Smoke test in the browser.
14. Reset any test progress before finishing.
15. Give the user a concise summary of what was added and what passed.

## Audit Workflow

Every new set should be checked before the work is considered done.

Focused set audit should verify:

- Correct module count
- Correct question count
- Expected number of questions per module
- No duplicate IDs
- Every question has a valid `setId`
- Every question belongs to an existing module
- MCQ answer exists in choices
- True/False answer is boolean
- Fill questions have blanks and accepted answers
- Typed code questions have `expected` and `required`

Build audit:

```bash
npm run build
```

Browser smoke test:

- Open or reload `http://127.0.0.1:5173/`.
- Confirm the newest set appears in the set switcher.
- Confirm the total question count is correct.
- Confirm all modules are listed.
- Answer one easy question.
- Confirm progress increments.
- Reset progress back to zero.

Known note:

- A full cross-set audit currently reports an older Set 1 typed-code metadata issue for `relative-imports-8`.
- This existed before Set 5 and was not changed during the Set 5 pass.
- If doing a cleanup pass, inspect and normalize that question so the full global audit can be strict.

## Git Workflow Notes

- Check status before committing:

```bash
git status --short
```

- Stage only intended files.
- Commit after verification.
- Push only when the user asks.
- The worktree may contain generated `dist/` output after builds.
- Do not revert user changes unless the user explicitly asks.

## Future Curriculum Planning

The user wants each curriculum to continue toward extreme difficulty and professional development. The remaining sets should be planned with the user before implementation.

Possible next planning tasks are React Set 6 or Python Set 2, depending on which path the user chooses next.

Potential future areas to discuss with the user:

- Advanced TypeScript for React:
  - strict props
  - generics
  - discriminated unions
  - typed events
  - typed API responses
  - typed reducers
  - typed custom hooks
  - schema inference with Zod
- Advanced React patterns:
  - compound components
  - controlled/uncontrolled APIs in depth
  - render props
  - headless components
  - component composition at scale
  - reusable design-system primitives
- State management beyond Context:
  - Redux Toolkit
  - Zustand
  - Jotai or other atom stores
  - state machines with XState
  - when not to add a global state library
- Advanced server-state workflows:
  - dependent queries
  - prefetching
  - query cancellation
  - mutations with complex rollback
  - normalized vs query-cache thinking
  - offline/retry behavior
- Testing depth:
  - unit tests
  - integration tests
  - React Testing Library deeper patterns
  - mocking network with MSW
  - E2E testing with Playwright
  - testing auth and routing
  - testing accessibility behavior
- Production forms:
  - multi-step forms
  - dynamic field arrays
  - file uploads
  - async validation
  - server error reconciliation
  - form performance
- Accessibility depth:
  - modals
  - menus
  - comboboxes
  - focus traps
  - roving tabindex
  - live regions
  - accessibility testing
- Performance and rendering:
  - React Profiler
  - expensive renders
  - virtualization
  - code splitting strategy
  - memoization with measurement
  - `startTransition`
  - `useDeferredValue`
- React 19 and modern APIs:
  - Actions
  - `useActionState`
  - `useOptimistic`
  - `useTransition`
  - Server Components conceptually, if the roadmap expands beyond plain Vite SPA
- Full-stack and framework path:
  - Next.js or Remix/React Router framework mode
  - SSR vs CSR
  - SSG
  - route loaders on server
  - server actions/forms
  - deployment constraints
- Security:
  - XSS
  - CSRF
  - token storage tradeoffs
  - role/permission enforcement
  - input validation
  - safe redirects
  - avoiding leaked secrets
- Production engineering:
  - environment management
  - CI/CD
  - linting
  - formatting
  - error monitoring
  - logging
  - feature flags
  - release workflow
- Capstone projects:
  - CRUD dashboard
  - auth-protected app
  - e-commerce flow
  - real-time UI
  - admin table with filters
  - form-heavy workflow
  - tested and deployed production app

Set 6 should not be implemented until its concept bullets are agreed with the user.

## Continuation Checklist for Another Agent

Before continuing:

- Read this document.
- Inspect `src/App.jsx`.
- Inspect the latest set file.
- Run `git status --short`.
- Confirm with the user whether the next task is planning, implementation, cleanup, git push, deployment, or review.

When planning the next set:

- Start by proposing bullet points only.
- Wait for the user to add missing concepts.
- Do not implement until the user says to proceed.
- Preserve the teaching pace: recognition, then completion, then typed code, then full workflow tasks.
- Keep making the material harder, but do not skip prerequisite concepts.
