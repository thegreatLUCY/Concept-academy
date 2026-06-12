const code = (...lines) => lines.join("\n");
const setId = "set4";

function item(type, data) {
  const levels = { mcq: "MCQ", tf: "True/False", fill: "Complete", code: "Typed Code" };
  return { type, level: levels[type], ...data };
}

const mcq = (prompt, choices, answer, explanation, snippet) =>
  item("mcq", { prompt, choices, answer, explanation, ...(snippet ? { snippet } : {}) });
const tf = (prompt, answer, explanation, snippet) =>
  item("tf", { prompt, answer, explanation, ...(snippet ? { snippet } : {}) });
const fill = (prompt, snippet, blanks, explanation) =>
  item("fill", { prompt, snippet, blanks, explanation });
const typed = (prompt, starter, expected, required, explanation, accepted) =>
  item("code", { prompt, starter, expected, required, explanation, ...(accepted ? { accepted } : {}) });

function attach(moduleId, items) {
  return items.map((question, index) => ({
    id: `${moduleId}-${String(index + 1).padStart(2, "0")}`,
    setId,
    moduleId,
    ...question
  }));
}

export const set4Modules = [
  { id: "set4-component-architecture", setId, title: "Component Architecture" },
  { id: "set4-state-architecture", setId, title: "State Architecture and Server State" },
  { id: "set4-usereducer-basics", setId, title: "useReducer Basics" },
  { id: "set4-reducer-patterns", setId, title: "Reducer Patterns" },
  { id: "set4-context-basics", setId, title: "Context API Basics" },
  { id: "set4-context-architecture", setId, title: "Context Architecture" },
  { id: "set4-reducer-context", setId, title: "useReducer with Context" },
  { id: "set4-custom-hooks", setId, title: "Custom Hooks" },
  { id: "set4-refs-portals-errors", setId, title: "Refs, Portals, and Error Boundaries" },
  { id: "set4-router", setId, title: "React Router" },
  { id: "set4-lazy-suspense", setId, title: "Lazy Loading and Suspense" },
  { id: "set4-form-architecture", setId, title: "Form Architecture" },
  { id: "set4-accessibility", setId, title: "Accessibility for Components" },
  { id: "set4-testing", setId, title: "Testing Intro" },
  { id: "set4-typescript-intro", setId, title: "TypeScript Intro" },
  { id: "set4-component-api-performance", setId, title: "Component APIs and Performance Warnings" },
  { id: "set4-folder-organization", setId, title: "Folder Organization" },
  { id: "set4-mini-architecture", setId, title: "Mini Architecture Programs" }
];

export const set4Questions = [
  ...attach("set4-component-architecture", [
    mcq("What is the main goal of component architecture?", ["Make code easier to understand, reuse, and change", "Put the whole app in App.jsx", "Avoid JavaScript functions"], "Make code easier to understand, reuse, and change", "Architecture is about clear responsibilities and sustainable change."),
    mcq("Which component is more presentational?", ["A Button that receives label and onClick props", "A Dashboard that fetches all app data", "A Provider that owns auth state"], "A Button that receives label and onClick props", "Presentational components focus on UI and receive data/handlers through props."),
    mcq("Which component is more container-like?", ["A ProductsPage that loads products and passes them to ProductGrid", "A Badge that renders children", "An IconButton with aria-label"], "A ProductsPage that loads products and passes them to ProductGrid", "Container components usually coordinate data and pass it to smaller UI components."),
    tf("A reusable component should usually know as little as possible about the page that uses it.", true, "Reusable pieces become stronger when they depend on props rather than page-specific globals."),
    fill("Complete the split: App should render a page component named DashboardPage.", "function App() { return <__1__ />; }", [{ label: "__1__", answers: ["DashboardPage"] }], "A page component can keep App from growing into a large mixed-responsibility file."),
    mcq("When should you split a component?", ["When one component has several responsibilities or repeated UI", "Every time it has more than one line", "Only after deployment"], "When one component has several responsibilities or repeated UI", "Splitting is useful when it improves clarity, reuse, or testability."),
    mcq("Which folder style groups files by product area?", ["features/cart/CartPage.jsx", "components/Everything.jsx", "all-code/App.jsx"], "features/cart/CartPage.jsx", "Feature folders keep related UI, hooks, and utilities together."),
    tf("A huge App.jsx that owns routing, fetching, forms, layout, and all UI becomes hard to maintain.", true, "As apps grow, separate pages, providers, routes, and components are easier to reason about."),
    fill("Complete the reusable card API.", "function Card({ __1__ }) { return <section>{__1__}</section>; }", [{ label: "__1__", answers: ["children"] }], "children lets callers provide content without hardcoding the card body."),
    typed("Write a presentational ProductCard signature receiving product and onSelect.", "function ProductCard(", "function ProductCard({ product, onSelect }) {", ["function ProductCard", "{ product, onSelect }"], "This is a reusable component API: data in, event callback out.")
  ]),
  ...attach("set4-state-architecture", [
    mcq("What is state colocation?", ["Keeping state as close as possible to where it is used", "Putting all state in Context", "Moving every value to localStorage"], "Keeping state as close as possible to where it is used", "Colocation reduces unnecessary shared state and keeps components simpler."),
    mcq("Which state should likely stay local?", ["Whether one dropdown is open", "The logged-in user used by the whole app", "A shopping cart used across pages"], "Whether one dropdown is open", "Small UI state that only affects one component should usually stay local."),
    mcq("What is server state?", ["Data fetched from a server and owned by an external source", "A boolean for opening a modal", "A ref to an input"], "Data fetched from a server and owned by an external source", "Server state can become stale and often needs caching/refetching rules."),
    mcq("Why is fetched data different from local UI state?", ["It can be stale, shared, cached, refetched, and fail independently", "It never changes", "It cannot have loading states"], "It can be stale, shared, cached, refetched, and fail independently", "Server state has network and cache concerns that local UI state does not."),
    tf("Context is the right answer for every piece of state in a React app.", false, "Context is useful, but local state and server-state tools are often better for many cases."),
    fill("Complete a local UI state declaration.", "const [isOpen, __1__] = useState(false);", [{ label: "__1__", answers: ["setIsOpen"] }], "Local UI state belongs near the UI it controls."),
    mcq("Which concern belongs to server-state management?", ["Caching and refetching product data", "Toggling a tooltip", "Focusing an input ref"], "Caching and refetching product data", "Server-state tools help coordinate freshness, cache, and request status."),
    mcq("What does stale data mean?", ["Cached data that may no longer match the server", "Data stored in a ref", "Data rendered inside a fragment"], "Cached data that may no longer match the server", "A cache can still display stale data while deciding when to refetch."),
    tf("TanStack Query is commonly used to manage async server state such as caching, loading, errors, and refetching.", true, "It is not required for every app, but it solves many server-state problems."),
    typed("Declare activeTab state with useState, starting with the value \"details\".", "const [", "const [activeTab, setActiveTab] = useState(\"details\");", ["activeTab", "setActiveTab", "useState"], "UI state should be named by the UI decision it controls.")
  ]),
  ...attach("set4-usereducer-basics", [
    mcq("What does useReducer return?", ["The current state and a dispatch function", "Only a setter function", "A Provider and Consumer"], "The current state and a dispatch function", "The common shape is const [state, dispatch] = useReducer(reducer, initialState)."),
    mcq("When is useReducer often better than multiple useState calls?", ["When state transitions are complex or action-based", "When rendering one static heading", "When avoiding all functions"], "When state transitions are complex or action-based", "Reducers centralize state transition logic."),
    fill("Complete the useReducer call.", "const [state, dispatch] = __1__(reducer, initialState);", [{ label: "__1__", answers: ["useReducer"] }], "useReducer receives a reducer and an initial state."),
    mcq("What is an action object?", ["A description of what happened, often with a type field", "A JSX element", "A CSS class"], "A description of what happened, often with a type field", "Reducers use actions to decide the next state."),
    fill("Complete the dispatch call.", "dispatch({ __1__: \"increment\" });", [{ label: "__1__", answers: ["type"] }], "The action type describes the requested transition."),
    tf("Reducers should be pure functions.", true, "Reducers should compute next state from state and action without side effects."),
    mcq("Which reducer update is pure?", ["return { ...state, count: state.count + 1 }", "state.count++; return state", "fetch('/api')"], "return { ...state, count: state.count + 1 }", "Pure reducer updates return new state without mutation or side effects."),
    fill("Complete a reducer switch branch.", "case \"reset\": return __1__;", [{ label: "__1__", answers: ["initialState"] }], "Reducers can reset by returning the initial state object."),
    mcq("What should dispatch receive?", ["An action", "A JSX string", "The DOM node"], "An action", "dispatch sends an action to the reducer."),
    typed("Write a counter reducer increment case.", "case \"increment\":", "case \"increment\":\n  return { ...state, count: state.count + 1 };", ["case \"increment\"", "return", "count", "+ 1"], "This is the basic reducer transition pattern.")
  ]),
  ...attach("set4-reducer-patterns", [
    mcq("Why use action type constants?", ["To avoid repeated typo-prone strings", "To make reducers mutate state", "To replace dispatch"], "To avoid repeated typo-prone strings", "Constants can make large reducers easier to maintain."),
    fill("Complete an action type constant.", "const ADD_TODO = \"__1__\";", [{ label: "__1__", answers: ["todos/add", "add_todo", "ADD_TODO"] }], "Action types should be specific and consistent."),
    mcq("What should a reducer default case usually do?", ["Return state or throw for unknown action depending on team style", "Always return null", "Mutate action"], "Return state or throw for unknown action depending on team style", "Returning state is common; throwing helps catch mistakes in stricter code."),
    tf("A reducer should call localStorage.setItem inside the switch case.", false, "Reducers should stay pure; effects or event handlers can perform side effects."),
    fill("Complete a todo add action payload read.", "return [...state, action.__1__];", [{ label: "__1__", answers: ["todo", "payload"] }], "Actions often carry data needed for the transition."),
    mcq("Which reducer pattern handles loading/error/data together?", ["A request state reducer", "A CSS reducer", "A route path reducer only"], "A request state reducer", "Reducers are good for state machines such as idle/loading/success/error."),
    mcq("When might you split a reducer?", ["When one reducer handles unrelated domains", "Whenever it has one action", "Only if React throws"], "When one reducer handles unrelated domains", "Separate domains like cart and auth can have separate reducers."),
    fill("Complete the immutable update for an item by id.", "items.map(item => item.id === id ? { ...item, done: __1__item.done } : item)", [{ label: "__1__", answers: ["!"] }], "Reducer updates still follow immutability rules."),
    tf("A form reducer can be useful when many fields and validation states change together.", true, "Reducers help make multi-field transitions explicit."),
    typed("Write a default reducer case that returns state.", "default:", "default:\n  return state;", ["default", "return state"], "Returning state keeps unknown actions from changing anything.")
  ]),
  ...attach("set4-context-basics", [
    mcq("What problem does Context primarily solve?", ["Passing values through the component tree without prop drilling", "Caching server data automatically", "Replacing all component props"], "Passing values through the component tree without prop drilling", "Context shares values with descendants that read the nearest provider."),
    fill("Complete context creation.", "const ThemeContext = __1__(\"light\");", [{ label: "__1__", answers: ["createContext"] }], "createContext creates a context object."),
    mcq("What component supplies a context value?", ["Provider", "Reducer", "Outlet"], "Provider", "A Provider makes a value available to descendants."),
    fill("Complete reading context.", "const theme = __1__(ThemeContext);", [{ label: "__1__", answers: ["useContext"] }], "useContext reads the nearest matching provider value."),
    tf("useContext subscribes the component to the nearest provider value.", true, "When that provider value changes, consumers may re-render."),
    mcq("When should you avoid Context?", ["For state used by only one small component", "For theme shared across the app", "For auth user read by many branches"], "For state used by only one small component", "Do not globalize state unnecessarily."),
    tf("Context is a full replacement for every state-management and server-state tool.", false, "Context shares values; it does not automatically solve caching, refetching, or complex updates."),
    fill("Complete a Provider value.", "<ThemeContext.Provider __1__={theme}>", [{ label: "__1__", answers: ["value"] }], "The value prop is what consumers receive."),
    mcq("What is prop drilling?", ["Passing props through layers that only forward them", "Rendering nested routes", "Using a reducer switch"], "Passing props through layers that only forward them", "Context can help when many intermediate components do not need the prop."),
    typed("Write a ThemeContext creation with default light.", "", "const ThemeContext = createContext(\"light\");", ["const ThemeContext", "createContext", "light"], "This is the starting point for a context value.")
  ]),
  ...attach("set4-context-architecture", [
    mcq("Why split state context and dispatch context?", ["Components that only dispatch do not need to subscribe to state value changes", "React requires two contexts", "It prevents all re-renders automatically"], "Components that only dispatch do not need to subscribe to state value changes", "Splitting contexts can reduce unnecessary subscriptions."),
    tf("Provider value design matters because consumers re-render when the provider value changes.", true, "Context is convenient, but provider values should be stable when possible."),
    fill("Complete a custom hook name for auth context.", "function __1__() { return useContext(AuthContext); }", [{ label: "__1__", answers: ["useAuth"] }], "Custom hooks give consumers a clean API."),
    mcq("Why guard against using context outside its provider?", ["To fail with a clear error instead of undefined behavior", "To disable hooks", "To make CSS load faster"], "To fail with a clear error instead of undefined behavior", "A custom hook can throw a clear message if context is missing."),
    fill("Complete a context guard check.", "if (!context) throw new __1__(\"useAuth must be used inside AuthProvider\");", [{ label: "__1__", answers: ["Error"] }], "Clear errors make provider mistakes easier to debug."),
    mcq("What is a custom provider component?", ["A component that wraps Context.Provider and owns the value logic", "A special HTML element", "A Vite plugin"], "A component that wraps Context.Provider and owns the value logic", "Provider components hide setup details from the rest of the app."),
    mcq("When can provider value memoization help?", ["When the value object is recreated often and consumers re-render unnecessarily", "Always, on every value, by default", "Only for static strings"], "When the value object is recreated often and consumers re-render unnecessarily", "Memoization is a tool for measured problems, not a default ritual."),
    tf("Context value memoization should be taught as a default habit for every provider.", false, "Memoize when it solves a real re-render problem."),
    fill("Complete a provider wrapper.", "return <AuthContext.Provider value={value}>{__1__}</AuthContext.Provider>;", [{ label: "__1__", answers: ["children"] }], "Providers usually wrap children."),
    typed("Write a useTheme hook that reads ThemeContext.", "", "function useTheme() {\n  return useContext(ThemeContext);\n}", ["function useTheme", "useContext(ThemeContext)"], "Custom context hooks keep imports and guard logic centralized.")
  ]),
  ...attach("set4-reducer-context", [
    mcq("Why combine useReducer with Context?", ["To let nested components dispatch app-level actions without prop drilling", "To avoid creating actions", "To fetch data automatically"], "To let nested components dispatch app-level actions without prop drilling", "Reducer handles transitions; Context shares state/dispatch."),
    fill("Complete the cart reducer setup.", "const [state, dispatch] = useReducer(__1__, initialCart);", [{ label: "__1__", answers: ["cartReducer"] }], "The reducer owns cart state transitions."),
    mcq("Which state fits reducer plus context well?", ["Cart items used across many branches", "One tooltip hover state", "One input's local value"], "Cart items used across many branches", "Shared, action-based state is a strong fit."),
    fill("Dispatch from a nested component.", "dispatch({ type: \"cart/add\", __1__: product });", [{ label: "__1__", answers: ["product", "payload"] }], "The action carries the product to add."),
    tf("Reducer plus Context should be used for every single useState call.", false, "It adds structure, but local useState is simpler for local state."),
    mcq("What should the reducer return after cart/add?", ["A new cart state", "The same mutated state object", "A JSX element"], "A new cart state", "Reducers compute next state."),
    fill("Complete an auth logout action.", "dispatch({ type: \"__1__\" });", [{ label: "__1__", answers: ["auth/logout", "logout"] }], "Named action types describe the event that happened."),
    mcq("Which component usually owns reducer/context setup?", ["A Provider component", "A list item", "A pure formatting helper"], "A Provider component", "The provider can create state and expose state/dispatch."),
    tf("Nested components can use dispatch without receiving it through every intermediate prop when dispatch is in Context.", true, "This is one of the useful cases for Context."),
    typed("Write a cart add button using dispatch.", "<button ", "<button onClick={() => dispatch({ type: \"cart/add\", product })}>Add</button>", ["onClick", "dispatch", "cart/add", "product"], "This practices dispatching actions from UI.")
  ]),
  ...attach("set4-custom-hooks", [
    mcq("What is a custom hook?", ["A reusable function that can call React hooks", "A component that must return JSX", "A CSS helper"], "A reusable function that can call React hooks", "Custom hooks extract reusable logic, not UI markup."),
    tf("A custom hook name should start with use.", true, "The use prefix lets React tooling enforce hook rules."),
    mcq("Do two components using the same custom hook automatically share state?", ["No, each call gets its own hook state unless the hook uses shared external state", "Yes, always", "Only in production"], "No, each call gets its own hook state unless the hook uses shared external state", "Custom hooks share logic, not state instances by default."),
    fill("Complete a toggle custom hook name.", "function __1__(initial = false) {", [{ label: "__1__", answers: ["useToggle"] }], "Custom hooks start with use."),
    mcq("When should you create a custom hook?", ["When stateful logic is repeated or conceptually reusable", "For every two-line component", "To hide all props"], "When stateful logic is repeated or conceptually reusable", "Extraction should make logic clearer."),
    fill("Return values from a hook.", "return [value, __1__];", [{ label: "__1__", answers: ["setValue", "toggle"] }], "Custom hooks can return values and functions."),
    tf("Custom hooks may call other hooks.", true, "They are the proper place to compose hook logic."),
    mcq("Which is a good custom hook example?", ["useDebounce(query, 300)", "debounceComponent.jsx()", "useClassNameOnlyWithoutHooks"], "useDebounce(query, 300)", "Parameterized hooks are common for reusable behavior."),
    fill("Inside a useLocalStorage(key) hook, complete the lazy initial read.", "const [value, setValue] = useState(() => localStorage.getItem(__1__));", [{ label: "__1__", answers: ["key"] }], "useLocalStorage often reads the initial value lazily."),
    typed("Write a simple useToggle return line.", "return ", "return [value, () => setValue(v => !v)];", ["return [value", "setValue", "=> !"], "A hook can expose state and an updater function.")
  ]),
  ...attach("set4-refs-portals-errors", [
    mcq("What is useRef useful for?", ["Storing mutable values or DOM nodes without triggering re-renders", "Replacing all state", "Creating routes"], "Storing mutable values or DOM nodes without triggering re-renders", "Refs persist between renders but changing them does not re-render."),
    fill("Create an input ref.", "const inputRef = __1__(null);", [{ label: "__1__", answers: ["useRef"] }], "DOM refs usually start as null."),
    fill("Focus an input through a ref.", "inputRef.current.__1__();", [{ label: "__1__", answers: ["focus"] }], "Refs are useful for focus management."),
    mcq("When should you use state instead of ref?", ["When a change should update the UI", "When storing a timer id", "When reading a DOM node"], "When a change should update the UI", "State drives rendering; refs are mutable escape hatches."),
    mcq("What does createPortal do?", ["Renders React children into a different DOM node", "Creates Context", "Runs a reducer"], "Renders React children into a different DOM node", "Portals are useful for modals, overlays, and tooltips."),
    tf("Events from portal content still bubble through the React tree.", true, "Portals change DOM placement, not the React parent relationship."),
    mcq("What do error boundaries catch?", ["Render-time errors in their child tree", "All async fetch errors automatically", "Errors inside event handlers automatically"], "Render-time errors in their child tree", "Async and event errors need separate handling."),
    mcq("What kind of component is traditionally required for an error boundary?", ["Class component", "Only a hook", "Only a route component"], "Class component", "React error boundaries are class-based in the traditional API."),
    fill("Complete forwardRef usage.", "const Input = __1__((props, ref) => <input ref={ref} {...props} />);", [{ label: "__1__", answers: ["forwardRef"] }], "forwardRef lets a parent pass a ref through a child component."),
    typed("Write a portal render expression for modal children.", "", "return createPortal(children, document.body);", ["createPortal", "children", "document.body"], "This is the core portal idea.")
  ]),
  ...attach("set4-router", [
    mcq("What does React Router provide?", ["Client-side routing for React apps", "A CSS reset", "A database"], "Client-side routing for React apps", "Routers map URLs to UI without full page reloads."),
    fill("Complete a basic route path.", "<Route path=\"__1__\" element={<Home />} />", [{ label: "__1__", answers: ["/"] }], "The slash route commonly renders the home page."),
    mcq("What renders child routes inside a layout route?", ["Outlet", "Provider", "Suspense"], "Outlet", "Nested route elements render where Outlet appears."),
    fill("Complete the layout placeholder.", "function Layout() { return <main><__1__ /></main>; }", [{ label: "__1__", answers: ["Outlet"] }], "Outlet marks where nested routes appear."),
    mcq("How do you read a dynamic route parameter such as /users/:id?", ["useParams()", "useContext(Route)", "useReducer(params)"], "useParams()", "React Router exposes route params through useParams."),
    fill("Complete a route param path.", "<Route path=\"users/:__1__\" element={<UserPage />} />", [{ label: "__1__", answers: ["id"] }], "A colon marks a dynamic segment."),
    mcq("Which API is commonly used for programmatic navigation?", ["useNavigate", "useParams", "useRef"], "useNavigate", "useNavigate returns a function for navigation."),
    mcq("What is a protected route?", ["A route that redirects or blocks access when the user is not allowed", "A route that cannot render JSX", "A route with no path"], "A route that redirects or blocks access when the user is not allowed", "Auth checks often wrap private screens."),
    fill("Complete a 404 catch-all route.", "<Route path=\"__1__\" element={<NotFound />} />", [{ label: "__1__", answers: ["*"] }], "The star route can catch unmatched paths."),
    typed("Write a Link to the dashboard route.", "", "<Link to=\"/dashboard\">Dashboard</Link>", ["<Link", "to=\"/dashboard\"", "Dashboard"], "Links navigate without full page reloads.")
  ]),
  ...attach("set4-lazy-suspense", [
    mcq("What does React.lazy do?", ["Defers loading a component's code until it is rendered", "Stores state globally", "Creates a route param"], "Defers loading a component's code until it is rendered", "lazy is React's built-in code-splitting helper for components."),
    fill("Complete a lazy import.", "const SettingsPage = __1__(() => import(\"./SettingsPage.jsx\"));", [{ label: "__1__", answers: ["lazy"] }], "lazy wraps a dynamic import."),
    mcq("What component provides fallback UI while lazy code loads?", ["Suspense", "Context", "Reducer"], "Suspense", "Suspense displays fallback content while children suspend."),
    fill("Complete Suspense fallback.", "<Suspense __1__={<p>Loading...</p>}>", [{ label: "__1__", answers: ["fallback"] }], "fallback is shown while lazy content loads."),
    tf("Lazy loading can be useful at route boundaries.", true, "Route-level splitting keeps less-used pages out of the initial bundle."),
    mcq("When should you avoid lazy loading?", ["For tiny always-needed components where splitting adds complexity", "For every route always", "For any component using props"], "For tiny always-needed components where splitting adds complexity", "Code splitting is a tradeoff."),
    mcq("What is a common route-level loading pattern?", ["Wrap lazy route elements in Suspense", "Call lazy inside an event handler", "Store imports in localStorage"], "Wrap lazy route elements in Suspense", "Suspense handles the loading boundary."),
    tf("React.lazy requires a default export from the dynamically imported module.", true, "The lazy API expects the promise to resolve to a module with a default component export."),
    fill("Complete the import from React.", "import { lazy, __1__ } from \"react\";", [{ label: "__1__", answers: ["Suspense"] }], "lazy and Suspense are imported from react."),
    typed("Write a Suspense wrapper around SettingsPage.", "", "<Suspense fallback={<p>Loading...</p>}><SettingsPage /></Suspense>", ["<Suspense", "fallback", "<SettingsPage />", "</Suspense>"], "This is the basic lazy-loading boundary.")
  ]),
  ...attach("set4-form-architecture", [
    mcq("What is field-level error state?", ["An error associated with one specific form field", "A route error page", "A reducer action type"], "An error associated with one specific form field", "Example: errors.email for the email input."),
    mcq("What is form-level error state?", ["An error for the whole form submission", "Only an input's value", "A CSS class name"], "An error for the whole form submission", "Example: 'Login failed' after submitting credentials."),
    fill("Complete a field-level error read.", "{errors.__1__ && <p>{errors.__1__}</p>}", [{ label: "__1__", answers: ["email"] }], "Field errors are often stored by field name."),
    mcq("What is touched state?", ["Whether the user has interacted with a field", "Whether the server is online", "Whether a route is nested"], "Whether the user has interacted with a field", "Touched state helps avoid showing validation before the user interacts."),
    tf("Reusable form fields should connect label, input, help text, and errors consistently.", true, "This improves maintainability and accessibility."),
    fill("Complete a reusable field prop.", "<TextField label=\"Email\" __1__={email} onChange={setEmail} />", [{ label: "__1__", answers: ["value"] }], "Reusable controlled fields receive value and change behavior."),
    mcq("What should a validation helper usually return?", ["A clear error object or message", "A DOM node", "A React route"], "A clear error object or message", "Helpers should be predictable and testable."),
    tf("React Hook Form and Zod can be introduced later for larger forms.", true, "They solve form-state and schema-validation complexity, but beginners should learn the concepts first."),
    mcq("Which is a good reason to extract a Field component?", ["Repeated label/error/input markup", "One input used once", "Avoiding all validation"], "Repeated label/error/input markup", "Extraction reduces duplicated markup and inconsistent error handling."),
    typed("Write JSX that shows a field error with role alert.", "", "{error && <p role=\"alert\">{error}</p>}", ["error", "role=\"alert\"", "{error}"], "Accessible error messages should be announced clearly.")
  ]),
  ...attach("set4-accessibility", [
    mcq("Which element should you use for a clickable action?", ["button", "div", "span"], "button", "Native buttons support keyboard and accessibility behavior by default."),
    fill("Associate a label with an input.", "<label htmlFor=\"email\">Email</label><input id=\"__1__\" />", [{ label: "__1__", answers: ["email"] }], "The label htmlFor must match the input id."),
    tf("A div with onClick is automatically keyboard accessible like a button.", false, "Use semantic elements before adding ARIA or keyboard handlers manually."),
    mcq("What should an icon-only button include?", ["An accessible name such as aria-label", "Only a color", "No text or label"], "An accessible name such as aria-label", "Screen readers need a name for controls."),
    fill("Complete an icon button accessible name.", "<button __1__=\"Close dialog\">X</button>", [{ label: "__1__", answers: ["aria-label"] }], "aria-label can name controls that have no visible text."),
    mcq("What is focus management important for?", ["Modals and keyboard navigation", "package-lock files", "Array sorting only"], "Modals and keyboard navigation", "When a modal opens, focus should move into it and return appropriately."),
    tf("Error messages should be connected to fields or announced in an accessible way.", true, "Accessible errors help keyboard and screen-reader users."),
    mcq("What should a modal usually support?", ["Escape/close behavior and focus containment", "Only mouse clicks", "No heading"], "Escape/close behavior and focus containment", "Modals are a place where accessibility matters a lot."),
    fill("Complete accessible input error linking.", "<input aria-describedby=\"email-error\" /><p id=\"__1__\">Invalid email</p>", [{ label: "__1__", answers: ["email-error"] }], "aria-describedby connects the input to explanatory text."),
    typed("Write an accessible close button.", "", "<button type=\"button\" aria-label=\"Close dialog\">X</button>", ["<button", "type=\"button\"", "aria-label=\"Close dialog\""], "Semantic button plus an accessible name is the base pattern.")
  ]),
  ...attach("set4-testing", [
    mcq("What should UI tests usually focus on?", ["User-visible behavior", "Private implementation details", "Exact hook order text"], "User-visible behavior", "Testing behavior makes tests more resilient to refactors."),
    mcq("Which library is commonly used for React component tests?", ["React Testing Library", "React Database Library", "Vite Router"], "React Testing Library", "React Testing Library encourages user-centered component tests."),
    tf("Pure helper functions are often easier to test than deeply coupled component logic.", true, "Pure functions have inputs and outputs without rendering setup."),
    mcq("Which query style matches Testing Library philosophy?", ["getByRole", "querySelector('.blue-card') only", "read component state directly"], "getByRole", "Role queries align with accessible user interactions."),
    fill("Complete a behavior assertion idea.", "expect(screen.getByRole(\"button\", { name: \"Save\" })).toBe__1__();", [{ label: "__1__", answers: ["Visible", "Enabled"] }], "Tests should assert what the user can see or do."),
    mcq("What does user-event simulate?", ["User interactions such as clicking and typing", "Webpack bundling", "Context creation"], "User interactions such as clicking and typing", "Interaction tests are more realistic than calling handlers directly."),
    tf("A test should usually call a component's private state setter directly.", false, "Prefer interacting with the UI and checking the resulting behavior."),
    mcq("Which is a good test for a form?", ["Typing invalid email shows an error message", "The component has a state variable named error", "The input is the third child"], "Typing invalid email shows an error message", "Behavior tests describe user outcomes."),
    fill("Complete a render call.", "__1__(<LoginForm />);", [{ label: "__1__", answers: ["render"] }], "React Testing Library render mounts a component for testing."),
    typed("Write a behavior test sentence as code-like pseudocode.", "", "user.click(screen.getByRole(\"button\", { name: \"Save\" }));", ["user.click", "screen.getByRole", "Save"], "This captures the user-centered interaction style.")
  ]),
  ...attach("set4-typescript-intro", [
    mcq("What does TypeScript add to React code?", ["Static types for props, state, actions, and helpers", "Automatic CSS design", "A built-in database"], "Static types for props, state, actions, and helpers", "TypeScript can catch many mistakes before runtime."),
    fill("Complete a props type.", "type ButtonProps = { label: __1__; };", [{ label: "__1__", answers: ["string"] }], "A label prop is commonly typed as string."),
    mcq("Which type fits a click prop?", ["onClick: () => void", "onClick: string", "onClick: number[]"], "onClick: () => void", "Callbacks are function types."),
    fill("Complete a typed component parameter.", "function Button({ label }: __1__) { return <button>{label}</button>; }", [{ label: "__1__", answers: ["ButtonProps"] }], "The props object can be typed with a named type."),
    mcq("What does a union type help with in reducer actions?", ["Restricting actions to known shapes", "Making every action any", "Running actions in parallel"], "Restricting actions to known shapes", "Union action types help reducers know which payload belongs to each action."),
    fill("Complete an action union member.", "type Action = { type: \"increment\" } | { type: \"add\", amount: __1__ };", [{ label: "__1__", answers: ["number"] }], "The add action carries a numeric amount."),
    tf("Context values can be typed so consumers know what properties exist.", true, "Typed context catches missing or wrong provider values."),
    mcq("Which type fits a custom hook that returns a boolean and function?", ["[boolean, () => void]", "string", "HTMLElement"], "[boolean, () => void]", "Tuple return types can describe custom hook return values."),
    tf("This set should teach full TypeScript mastery before any architecture patterns.", false, "Set 4 only introduces the typing ideas; a later TypeScript set can go deep."),
    typed("Write a simple User type with id and name.", "", "type User = { id: string; name: string; };", ["type User", "id: string", "name: string"], "Typed data shapes become important in real React apps.")
  ]),
  ...attach("set4-component-api-performance", [
    mcq("What is component API design?", ["Choosing props, callbacks, children, and behavior a component exposes", "Choosing only file names", "Writing package-lock manually"], "Choosing props, callbacks, children, and behavior a component exposes", "Good APIs make components predictable and reusable."),
    mcq("Which callback prop name follows React convention?", ["onSelect", "selectNow", "selectedFunctionValue"], "onSelect", "Event-like callback props usually start with on."),
    tf("Boolean props should be named clearly, such as disabled or isOpen.", true, "Clear boolean names make JSX easier to read."),
    mcq("What is composition over configuration?", ["Let callers pass children/components instead of adding many special props", "Never use props", "Always use Context"], "Let callers pass children/components instead of adding many special props", "Composition can avoid overloaded components."),
    fill("Complete a controlled component API.", "<SearchInput value={query} __1__={setQuery} />", [{ label: "__1__", answers: ["onChange"] }], "Controlled reusable components usually expose value and onChange."),
    mcq("When is React.memo useful?", ["When a component re-renders often with the same props and rendering is expensive", "For every component by default", "To fix broken logic"], "When a component re-renders often with the same props and rendering is expensive", "Memoization is a tool for measured performance issues."),
    tf("useMemo and useCallback should be taught as default habits for all values and functions.", false, "Memoization adds complexity and is only valuable in specific situations."),
    mcq("What is a common Context performance problem?", ["Provider value object recreated on every render", "Using a button element", "Having a package.json file"], "Provider value object recreated on every render", "Changing provider values can re-render consumers."),
    fill("Complete a memoized provider value.", "const value = useMemo(() => ({ user, logout }), [__1__, logout]);", [{ label: "__1__", answers: ["user"] }], "Memoization can stabilize provider value when needed."),
    typed("Write a controlled TextInput usage.", "", "<TextInput value={name} onChange={setName} />", ["<TextInput", "value={name}", "onChange={setName}"], "Small, predictable component APIs are easier to compose.")
  ]),
  ...attach("set4-folder-organization", [
    mcq("What belongs in hooks/ most often?", ["Reusable custom hooks", "Static images only", "Generated lockfiles"], "Reusable custom hooks", "hooks/ is a common home for shared hook logic."),
    mcq("What belongs in utils/ most often?", ["Pure helper functions", "All page components", "All CSS variables only"], "Pure helper functions", "Utilities should often be independent from React."),
    mcq("What belongs in services/ most often?", ["API client functions", "Button markup", "Test snapshots only"], "API client functions", "Services can centralize network calls."),
    mcq("What belongs in features/cart/ most naturally?", ["Cart components, hooks, reducer, and helpers", "Every unrelated page", "Only package.json"], "Cart components, hooks, reducer, and helpers", "Feature folders group related code by domain."),
    tf("Folder structure should serve the app's complexity, not impress people.", true, "Over-architecture can slow learning and development."),
    fill("Complete a likely custom hook import.", "import { useCart } from \"./features/cart/__1__\";", [{ label: "__1__", answers: ["useCart.js", "hooks/useCart.js"] }], "Feature folders can contain local hooks."),
    mcq("What is a pages/ folder commonly for?", ["Route-level screen components", "Only reusable buttons", "Reducers only"], "Route-level screen components", "Pages often map closely to routes."),
    mcq("What is one downside of barrel files?", ["They can hide dependency relationships and contribute to circular imports", "They prevent named exports", "They cannot export components"], "They can hide dependency relationships and contribute to circular imports", "Barrels are convenient but should not obscure architecture."),
    fill("Complete a feature-based path.", "src/features/__1__/CartPage.jsx", [{ label: "__1__", answers: ["cart"] }], "Feature folders organize by domain."),
    typed("Write a reasonable import for an API helper.", "", "import { getProducts } from \"./services/productsApi.js\";", ["import", "getProducts", "./services/productsApi.js"], "Service modules keep fetch details out of components.")
  ]),
  ...attach("set4-mini-architecture", [
    typed("Write a todo reducer add case.", "case \"todo/add\":", "case \"todo/add\":\n  return [...state, action.todo];", ["todo/add", "return", "...state", "action.todo"], "Mini reducers should return new state."),
    typed("Write a theme provider value line.", "const value = ", "const value = { theme, setTheme };", ["theme", "setTheme"], "Providers expose the values consumers need."),
    typed("Write a useDebounce hook timeout cleanup body.", "useEffect(() => {", "useEffect(() => {\n  const id = setTimeout(() => setDebouncedValue(value), delay);\n  return () => clearTimeout(id);\n}, [value, delay]);", ["setTimeout", "setDebouncedValue", "clearTimeout", "[value, delay]"], "This extracts a common search-delay pattern."),
    typed("Write a useLocalStorage setter effect.", "useEffect(() => {", "useEffect(() => {\n  localStorage.setItem(key, JSON.stringify(value));\n}, [key, value]);", ["localStorage.setItem", "JSON.stringify(value)", "[key, value]"], "This syncs hook state to browser storage."),
    typed("Write code to focus an input ref.", "", "inputRef.current?.focus();", ["inputRef.current", "focus"], "Refs make imperative focus possible."),
    typed("Write a modal portal return line.", "", "return createPortal(children, document.body);", ["createPortal", "children", "document.body"], "Portals move modal DOM placement."),
    typed("Write a protected route redirect expression.", "", "return user ? <Outlet /> : <Navigate to=\"/login\" />;", ["user", "<Outlet />", "<Navigate", "/login"], "Protected routes render child routes or redirect."),
    typed("Write a lazy route component declaration.", "", "const SettingsPage = lazy(() => import(\"./pages/SettingsPage.jsx\"));", ["lazy", "import", "SettingsPage"], "Route-level lazy loading splits page code."),
    typed("Write an accessible field error paragraph.", "", "<p id=\"email-error\" role=\"alert\">Invalid email</p>", ["id=\"email-error\"", "role=\"alert\"", "Invalid email"], "Form architecture should include accessible errors."),
    typed("Write a typed reducer action union for login/logout.", "", "type AuthAction = { type: \"login\"; user: User } | { type: \"logout\" };", ["type AuthAction", "login", "user: User", "logout"], "Typed actions make reducer transitions safer.")
  ])
];
