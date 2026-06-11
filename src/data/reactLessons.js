const code = (...lines) => lines.join("\n");

// Lessons for React Set 1 modules, shown above each module's questions.
// Runnable examples get a Run button (Babel + React, right in the browser).
export const reactLessons = {
  "react-orientation": {
    summary:
      "React is a JavaScript library for building user interfaces out of components — small, reusable functions that return what should appear on screen. Instead of writing one giant HTML page, you compose a UI from pieces like Header, ProductCard, and Footer, and React keeps the screen in sync with your data.",
    points: [
      "A component is a JavaScript function that returns UI.",
      "Apps are trees of components nested inside each other.",
      "React updates the page automatically when data changes."
    ],
    example: code(
      "function Welcome() {",
      "  return <h1>Hello, React!</h1>;",
      "}"
    )
  },
  "npm-vite": {
    summary:
      "Real React projects are created with tooling. npm create vite@latest scaffolds a project, npm install downloads its dependencies into node_modules, and npm run dev starts a development server with instant reload. package.json records your dependencies and the scripts you can run; package-lock.json pins exact versions.",
    points: [
      "npm create vite@latest → new project; npm install → dependencies; npm run dev → dev server.",
      "dependencies are needed at runtime; devDependencies only while developing.",
      "node_modules is generated — never edit it, never commit it."
    ],
    example: code(
      "# terminal workflow",
      "npm create vite@latest my-app",
      "cd my-app",
      "npm install",
      "npm run dev"
    )
  },
  "structure-rendering": {
    summary:
      "A Vite React app has one HTML file (index.html) containing an empty <div id=\"root\">. src/main.jsx finds that div, creates a React root with createRoot, and renders the <App /> component into it. Everything you see on screen flows from that single render call.",
    points: [
      "index.html holds the root container; React fills it.",
      "main.jsx is the entry point: createRoot(container).render(<App />).",
      "App.jsx is the top component the rest of the UI hangs from."
    ],
    example: code(
      "import { createRoot } from \"react-dom/client\";",
      "import App from \"./App.jsx\";",
      "",
      "createRoot(document.getElementById(\"root\")).render(<App />);"
    )
  },
  "relative-imports": {
    summary:
      "Imports between your own files use relative paths: ./ means \"this folder\", ../ means \"one folder up\". The bundler follows the path literally, so a wrong path breaks the build. Package imports (like react) have no ./ — that is how the bundler knows to look in node_modules instead.",
    points: [
      "./App.jsx — same folder; ../utils.js — parent folder.",
      "import Header from \"./components/Header.jsx\" walks INTO a subfolder.",
      "No ./ prefix = a package from node_modules."
    ],
    example: code(
      "import { useState } from \"react\";          // package",
      "import Header from \"./components/Header.jsx\"; // your file"
    )
  },
  "jsx": {
    summary:
      "JSX lets you write UI as HTML-like syntax inside JavaScript. It has stricter rules than HTML: every tag must close (including <img />), class becomes className, and a component must return ONE parent element — use a fragment <>...</> when you do not want an extra div. Curly braces embed live JavaScript expressions in the markup.",
    points: [
      "className instead of class; htmlFor instead of for.",
      "One parent rule: wrap siblings in <>...</> fragments.",
      "{expression} injects JavaScript values into JSX."
    ],
    example: code(
      "function Profile() {",
      "  const name = \"Aya\";",
      "  return (",
      "    <>",
      "      <h1 className=\"title\">{name}</h1>",
      "      <p>{2 + 3} unread messages</p>",
      "    </>",
      "  );",
      "}"
    )
  },
  "variables-functions": {
    summary:
      "Modern JavaScript uses const for values that are never reassigned and let for ones that are — var is legacy. Arrow functions are the compact function syntax you will see everywhere in React: (a, b) => a + b. Variables live in the scope (function or block) where they are declared.",
    points: [
      "Default to const; use let only when you reassign.",
      "const double = (n) => n * 2 — arrow function with implicit return.",
      "Block scope: variables inside { } are invisible outside."
    ],
    example: code(
      "const rate = 1.2;",
      "let total = 0;",
      "",
      "const applyRate = (amount) => amount * rate;",
      "total = applyRate(100);"
    )
  },
  "objects-classes": {
    summary:
      "Objects group related data as key-value pairs: user.name reads a property, user[\"name\"] does the same with a string key. Classes are blueprints with a constructor and methods; extends inherits from a parent and super() calls the parent constructor. In React you will mostly use plain objects — but classes still appear in older code and error boundaries.",
    points: [
      "const user = { name: \"Aya\", age: 25 } — then user.name.",
      "class Admin extends User { constructor() { super(); } }",
      "Props and state in React are plain objects."
    ],
    example: code(
      "const user = { name: \"Aya\", role: \"admin\" };",
      "console.log(user.name);",
      "console.log(user[\"role\"]);"
    )
  },
  "arrays-lists": {
    summary:
      "map() transforms each item of an array into something new and returns a new array — it is THE tool for rendering lists in React: items.map(item => <li>...</li>). Every list item needs a stable key prop so React can track which item is which between renders.",
    points: [
      "map returns a NEW array; the original is untouched.",
      "In JSX: {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}",
      "Keys should be stable IDs, not array indexes when items can move."
    ],
    example: code(
      "const fruits = [\"apple\", \"kiwi\"];",
      "",
      "function FruitList() {",
      "  return (",
      "    <ul>",
      "      {fruits.map((fruit) => (",
      "        <li key={fruit}>{fruit}</li>",
      "      ))}",
      "    </ul>",
      "  );",
      "}"
    )
  },
  "destructuring-modern-js": {
    summary:
      "Destructuring unpacks values from objects and arrays into variables: const { name } = user, const [first, second] = list. The spread operator ... copies arrays/objects or merges them; rest collects leftovers. Template strings with backticks embed values: `Hello, ${name}`. React code leans on all of these constantly.",
    points: [
      "const { name, age = 18 } = user — with a default value.",
      "const copy = [...items] — spread copies; { ...user, age: 26 } merges.",
      "`Total: ${price * 2}` — template strings interpolate expressions."
    ],
    example: code(
      "const user = { name: \"Aya\", city: \"Cairo\" };",
      "const { name, city } = user;",
      "",
      "const nums = [1, 2, 3];",
      "const doubled = [...nums, 4];",
      "",
      "console.log(`${name} from ${city}`, doubled);"
    )
  },
  "modules": {
    summary:
      "JavaScript files share code through exports. A file can have many named exports (import { sum } from ...) and at most one default export (import anything from ...). Named imports need exact names inside curly braces; default imports can pick any local name. Components are usually default exports.",
    points: [
      "export function sum() {} → import { sum } from \"./math.js\".",
      "export default App → import App from \"./App.jsx\" (no braces).",
      "Braces = named; no braces = default."
    ],
    example: code(
      "// math.js",
      "export const PI = 3.14;",
      "export default function square(n) { return n * n; }",
      "",
      "// app.js",
      "import square, { PI } from \"./math.js\";"
    )
  },
  "components-props": {
    summary:
      "Props are how parents pass data into components, like function arguments: <Welcome name=\"Aya\" /> delivers { name: \"Aya\" }. Components usually destructure props right in the parameter list. Props flow one direction — down — and a component must never modify the props it receives.",
    points: [
      "function Welcome({ name }) { return <h1>Hi {name}</h1>; }",
      "Pass anything: strings, numbers ({age}), arrays, functions.",
      "Props are read-only; data flows parent → child."
    ],
    example: code(
      "function Welcome({ name }) {",
      "  return <h1>Hello, {name}!</h1>;",
      "}",
      "",
      "function App() {",
      "  return <Welcome name=\"Aya\" />;",
      "}"
    )
  },
  "conditional-rendering": {
    summary:
      "React renders conditionally with ordinary JavaScript: a ternary picks between two pieces of UI ({isLoggedIn ? <Profile /> : <Login />}), and && renders something or nothing ({hasError && <Alert />}). There is no special if-syntax inside JSX — expressions only.",
    points: [
      "Ternary for either/or; && for show/hide.",
      "Beware {count && ...} when count can be 0 — 0 renders as text.",
      "Full if statements work ABOVE the return, not inside JSX."
    ],
    example: code(
      "function Status({ isOnline }) {",
      "  return (",
      "    <div>",
      "      {isOnline ? <span>Online</span> : <span>Away</span>}",
      "      {isOnline && <button>Send message</button>}",
      "    </div>",
      "  );",
      "}"
    )
  },
  "events": {
    summary:
      "React handles events with camelCase props that receive a FUNCTION: onClick={handleClick}. The most common beginner bug is calling the function instead of passing it — onClick={handleClick()} fires immediately during render. To pass arguments, wrap in an arrow: onClick={() => greet(\"Aya\")}.",
    points: [
      "onClick={handleClick} — pass the function, no parentheses.",
      "onClick={() => remove(id)} — arrow wrapper when you need arguments.",
      "Event names are camelCase: onClick, onChange, onSubmit."
    ],
    example: code(
      "function Counter() {",
      "  function handleClick() {",
      "    console.log(\"clicked!\");",
      "  }",
      "",
      "  return <button onClick={handleClick}>Click me</button>;",
      "}"
    )
  },
  "typed-practice": {
    summary:
      "This module combines everything from Set 1 into typed components: imports, JSX structure, props with destructuring, lists with map and keys, conditionals, and events. Write the code by hand — the muscle memory of typing real components is what makes the next set feel natural.",
    points: [
      "Re-read the lesson of any module that trips you up.",
      "Type the code; do not mentally skim it.",
      "Every exercise is a real component shape you will write again."
    ],
    example: code(
      "import { useState } from \"react\";",
      "",
      "function TodoList({ todos }) {",
      "  return (",
      "    <ul>",
      "      {todos.map((todo) => (",
      "        <li key={todo.id}>{todo.done ? \"✓ \" : \"\"}{todo.text}</li>",
      "      ))}",
      "    </ul>",
      "  );",
      "}"
    )
  },

  // ---- Set 2: Interactive React ----
  "set2-hooks-rules": {
    summary:
      "Hooks (functions starting with use) give components memory and side effects, but they obey two rules. Call them only at the TOP LEVEL of a component — never inside if, loops, or nested functions — and only from React functions (components or custom hooks). React tracks hooks by call ORDER, so conditional hooks would scramble that order and break.",
    points: [
      "Only call hooks at the top level — never inside conditions or loops.",
      "Only call hooks from components or other hooks.",
      "React matches state to hooks by call order, so the order must be stable."
    ],
    example: code(
      "function Profile({ showBio }) {",
      "  const [name, setName] = useState(\"Aya\"); // OK: top level",
      "  // BAD: if (showBio) { const [bio] = useState(\"\"); }",
      "  return <h1>{name}</h1>;",
      "}"
    )
  },
  "set2-state-basics": {
    summary:
      "useState gives a component a value that survives re-renders and a setter to change it: const [count, setCount] = useState(0). Calling the setter tells React to re-render with the new value. A plain local variable would reset every render and never update the screen — state is what makes the UI react to change.",
    points: [
      "const [value, setValue] = useState(initial).",
      "Calling setValue triggers a re-render with the new value.",
      "Local variables reset each render; state persists and drives the UI."
    ],
    example: code(
      "function Counter() {",
      "  const [count, setCount] = useState(0);",
      "  return (",
      "    <button onClick={() => setCount(count + 1)}>",
      "      Count: {count}",
      "    </button>",
      "  );",
      "}"
    )
  },
  "set2-batching-stale": {
    summary:
      "React batches state updates within an event, so calling setCount(count + 1) three times still only adds one — they all read the same stale count. The fix is the functional updater: setCount(prev => prev + 1), which receives the latest value each time. Reach for it whenever the new state depends on the old.",
    points: [
      "React batches updates; multiple setCount(count+1) use the same stale count.",
      "Functional update setCount(prev => prev + 1) always sees the latest value.",
      "Use the updater form whenever new state derives from old state."
    ],
    example: code(
      "// adds 1, not 3 — all read the same stale count:",
      "setCount(count + 1); setCount(count + 1); setCount(count + 1);",
      "",
      "// adds 3 — each gets the latest value:",
      "setCount(prev => prev + 1);",
      "setCount(prev => prev + 1);",
      "setCount(prev => prev + 1);"
    )
  },
  "set2-events-state": {
    summary:
      "Interactivity is events that update state. Pass a handler to onClick/onChange and update state inside it; the re-render reflects the change. The classic mistake is calling the handler instead of passing it: onClick={handleClick} passes the function, while onClick={handleClick()} runs it immediately during render.",
    points: [
      "Pass the function: onClick={handleClick}, not onClick={handleClick()}.",
      "Wrap to pass arguments: onClick={() => remove(id)}.",
      "Update state inside the handler; React re-renders with the result."
    ],
    example: code(
      "function Toggle() {",
      "  const [on, setOn] = useState(false);",
      "  return (",
      "    <button onClick={() => setOn(!on)}>",
      "      {on ? \"ON\" : \"OFF\"}",
      "    </button>",
      "  );",
      "}"
    )
  },
  "set2-controlled-forms": {
    summary:
      "In a controlled input, React state is the single source of truth: the input's value comes from state and onChange writes every keystroke back via event.target.value. Checkboxes use checked instead of value. Controlled inputs let you validate, transform, or reset form data because React always knows the current value.",
    points: [
      "value={state} + onChange={e => setState(e.target.value)} = controlled input.",
      "Checkboxes use checked={state}; selects use value={state}.",
      "Controlled = React owns the value, enabling validation and reset."
    ],
    example: code(
      "function NameField() {",
      "  const [name, setName] = useState(\"\");",
      "  return (",
      "    <input",
      "      value={name}",
      "      onChange={(e) => setName(e.target.value)}",
      "    />",
      "  );",
      "}"
    )
  },
  "set2-object-array-state": {
    summary:
      "Never mutate state directly — React detects changes by reference, so editing an object/array in place may not re-render. Instead create a NEW value with the spread operator: { ...user, age: 26 } or [...items, newItem]. To update or remove array items, use map and filter, which return new arrays.",
    points: [
      "Don't mutate: create new objects/arrays with spread (...).",
      "Add: [...items, item]; update: items.map(...); remove: items.filter(...).",
      "React compares by reference — a mutated same-reference value may not re-render."
    ],
    example: code(
      "// update one field immutably:",
      "setUser({ ...user, age: 26 });",
      "",
      "// add and remove array items immutably:",
      "setItems([...items, newItem]);",
      "setItems(items.filter((i) => i.id !== id));"
    )
  },
  "set2-derived-conditional": {
    summary:
      "If a value can be COMPUTED from existing state or props, compute it during render — do not store it as extra state that can fall out of sync. A full name derives from first + last; a filtered list derives from items + query. Conditional UI then renders from that derived data with ternaries and &&.",
    points: [
      "Derive values during render instead of duplicating them in state.",
      "Less state = fewer bugs from values getting out of sync.",
      "Render branches with {cond ? <A/> : <B/>} and {cond && <A/>}."
    ],
    example: code(
      "function Cart({ items }) {",
      "  const total = items.reduce((sum, i) => sum + i.price, 0);",
      "  return items.length",
      "    ? <p>Total: ${total}</p>",
      "    : <p>Your cart is empty</p>;",
      "}"
    )
  },
  "set2-composition-children": {
    summary:
      "Composition builds UI by nesting components instead of hardcoding everything. The special children prop holds whatever JSX you place between a component's tags, so a reusable Card or Panel can wrap any content. Composition is React's answer to reuse — prefer it over copying markup.",
    points: [
      "children is whatever JSX sits between <Comp>...</Comp>.",
      "Build reusable wrappers (Card, Modal, Panel) that accept children.",
      "Compose small pieces rather than duplicating markup."
    ],
    example: code(
      "function Card({ children }) {",
      "  return <div className=\"card\">{children}</div>;",
      "}",
      "",
      "// usage:",
      "// <Card><h2>Title</h2><p>Body</p></Card>"
    )
  },
  "set2-callbacks-lifting": {
    summary:
      "When two components need the same data, LIFT the state up to their closest common parent, which owns it and passes it down. The parent also passes callback functions so children can ask it to change that state. The rule of thumb: props flow down, events (callbacks) flow up.",
    points: [
      "Shared state lives in the closest common parent.",
      "Pass data down as props; pass callbacks down so children can update.",
      "Data flows down, events flow up — one-directional data flow."
    ],
    example: code(
      "function Parent() {",
      "  const [count, setCount] = useState(0);",
      "  return <Child count={count} onAdd={() => setCount(count + 1)} />;",
      "}",
      "",
      "function Child({ count, onAdd }) {",
      "  return <button onClick={onAdd}>{count}</button>;",
      "}"
    )
  },
  "set2-lists-keys-reset": {
    summary:
      "Rendering lists with map needs a stable key on each item so React can track identity across renders. Prefer a real id over the array index — indexes break when items reorder or get removed, causing state to attach to the wrong row. Changing a component's key is also a deliberate trick to RESET its state.",
    points: [
      "Each mapped element needs a stable, unique key (a real id, not the index).",
      "Index keys cause bugs when the list reorders or items are removed.",
      "Changing a key remounts the component, resetting its internal state."
    ],
    example: code(
      "<ul>",
      "  {users.map((user) => (",
      "    <li key={user.id}>{user.name}</li>",
      "  ))}",
      "</ul>"
    )
  },
  "set2-effects": {
    summary:
      "useEffect runs code AFTER render to sync with things outside React — timers, subscriptions, network requests, the DOM. Its dependency array controls when it re-runs: [] runs once after mount, [value] re-runs when value changes, and no array runs after every render. Effects are for side effects, not for computing values you can derive during render.",
    points: [
      "useEffect(fn, deps) runs after render; deps decide when it re-runs.",
      "[] = once on mount; [x] = when x changes; omitted = every render.",
      "Use effects for external systems, not for derived values."
    ],
    example: code(
      "useEffect(() => {",
      "  document.title = `Count: ${count}`;",
      "}, [count]); // re-runs only when count changes"
    )
  },
  "set2-effects-escape": {
    summary:
      "Many things do NOT need an effect — derived values belong in render, and event responses belong in handlers. When an effect sets up something ongoing (a timer, a subscription), RETURN a cleanup function to tear it down. In development, StrictMode intentionally runs effects twice to surface missing cleanup.",
    points: [
      "'You might not need an effect' — derive in render, react in handlers.",
      "Return a cleanup function from effects that set up timers/subscriptions.",
      "StrictMode double-invokes effects in dev to expose missing cleanup."
    ],
    example: code(
      "useEffect(() => {",
      "  const id = setInterval(tick, 1000);",
      "  return () => clearInterval(id); // cleanup on unmount/re-run",
      "}, []);"
    )
  },
  "set2-fetch-storage": {
    summary:
      "Fetching data in an effect means tracking loading, error, and data states. Guard against race conditions and updates after unmount with an 'ignore' flag set in the cleanup. localStorage persists small data across sessions as strings — use JSON.stringify to save objects and JSON.parse to read them back.",
    points: [
      "Model three states: loading, error, and data.",
      "Use an ignore flag in cleanup to drop stale/late responses.",
      "localStorage stores strings: JSON.stringify to save, JSON.parse to load."
    ],
    example: code(
      "useEffect(() => {",
      "  let ignore = false;",
      "  fetch(url).then(r => r.json()).then(data => {",
      "    if (!ignore) setData(data);",
      "  });",
      "  return () => { ignore = true; };",
      "}, [url]);"
    )
  },
  "set2-debug-mini": {
    summary:
      "This module combines state, events, forms, and effects into small debuggable programs. Reading React's error messages, checking what re-renders, and confirming state updates with temporary logs are core skills. The recurring fixes: pass handlers (don't call them), update state immutably, and give effects the right dependencies.",
    points: [
      "Read the error message and the component stack it points to.",
      "Most bugs: called handlers, mutated state, or wrong effect deps.",
      "Temporary console.log of state/props is a fast way to see reality."
    ],
    example: code(
      "// common fix: immutable update + functional setter",
      "function add(item) {",
      "  setItems((prev) => [...prev, item]);",
      "}"
    )
  },

  // ---- Set 3: JavaScript Maturity ----
  "set3-functions-callbacks": {
    summary:
      "In JavaScript functions are VALUES — you can store them in variables, pass them as arguments, and return them. A callback is just a function passed to another function to be called later. This is why array methods (map, filter) and event handlers work the way they do. Pass the function itself; do not call it unless you mean to run it now.",
    points: [
      "Functions are values: assign, pass, and return them freely.",
      "A callback is a function given to another function to call later.",
      "arr.map(fn) passes fn; arr.map(fn()) would pass fn's RESULT."
    ],
    example: code(
      "const nums = [1, 2, 3];",
      "const double = (n) => n * 2;",
      "console.log(nums.map(double)); // [2, 4, 6]"
    )
  },
  "set3-execution-event-loop": {
    summary:
      "JavaScript runs on a single thread with a call stack. Synchronous code runs top to bottom; async work (timers, promises, fetch) is handed off and its callback runs LATER via the event loop. That is why a setTimeout(fn, 0) callback runs after the current synchronous code finishes — async results always arrive later.",
    points: [
      "Single-threaded: one call stack runs synchronous code in order.",
      "Async callbacks (timers, promises) run later via the event loop.",
      "Promise microtasks run before timer callbacks (macrotasks)."
    ],
    example: code(
      "console.log(\"A\");",
      "setTimeout(() => console.log(\"B\"), 0);",
      "console.log(\"C\");",
      "// prints A, C, then B — B is deferred"
    )
  },
  "set3-scope-closures-this": {
    summary:
      "A closure is a function that remembers variables from where it was DEFINED, even after that outer function has returned — the basis of hooks like useState. Scope is lexical (determined by where code is written). Arrow functions also capture this lexically, which is why they avoid the classic this-binding bugs of regular functions.",
    points: [
      "A closure 'remembers' variables from its defining scope.",
      "Scope is lexical — determined by where a function is written.",
      "Arrow functions inherit this from their surrounding scope."
    ],
    example: code(
      "function makeCounter() {",
      "  let count = 0;",
      "  return () => ++count; // closes over count",
      "}",
      "const next = makeCounter();",
      "console.log(next(), next()); // 1 2"
    )
  },
  "set3-type-conversion": {
    summary:
      "Form inputs and many APIs hand you STRINGS, so '5' + 5 is '55', not 10. Convert explicitly: Number(x), parseInt(x), parseFloat(x) to numbers; String(x) to text. A failed numeric conversion yields NaN — test it with Number.isNaN. Most 'weird math' bugs in React forms are really string-vs-number bugs.",
    points: [
      "Inputs are strings: convert with Number(), parseInt(), parseFloat().",
      "'5' + 5 is '55' (concatenation); 5 + 5 is 10.",
      "Failed conversion gives NaN; check with Number.isNaN(x)."
    ],
    example: code(
      "const raw = \"42\";",
      "console.log(raw + 1);          // \"421\"",
      "console.log(Number(raw) + 1);  // 43"
    )
  },
  "set3-equality-truthiness": {
    summary:
      "Use === (strict equality) — it compares type and value without surprising coercion, unlike ==. Values are 'truthy' or 'falsy': 0, '', null, undefined, NaN are falsy; everything else is truthy. Provide safe defaults with ?? (nullish coalescing, which only falls back on null/undefined) and reach into maybe-missing data with optional chaining ?..",
    points: [
      "Prefer === over ==; it avoids surprising type coercion.",
      "Falsy: 0, '', null, undefined, NaN, false. Everything else is truthy.",
      "?? defaults only on null/undefined; ?. safely reads nested data."
    ],
    example: code(
      "const count = 0;",
      "const user = { address: { city: \"Cairo\" } };",
      "console.log(count || 5);   // 5  (0 is falsy — maybe wrong!)",
      "console.log(count ?? 5);   // 0  (?? respects 0)",
      "console.log(user?.address?.city); // safe even if user were missing"
    )
  },
  "set3-arrays-sorting-reduce": {
    summary:
      "Master the array toolkit: map transforms, filter selects, find returns the first match, some/every test conditions, and reduce folds an array into a single value. Two traps: sort() mutates in place and sorts as STRINGS by default, so numbers need a compare function — and copy with spread before sorting if you want to keep the original.",
    points: [
      "map/filter/find/some/every/reduce are the everyday transforms.",
      "sort() mutates and is alphabetical by default — pass (a,b)=>a-b for numbers.",
      "Copy before sorting: [...nums].sort(...) keeps the original intact."
    ],
    example: code(
      "const nums = [10, 2, 1];",
      "console.log([...nums].sort((a, b) => a - b)); // [1, 2, 10]",
      "console.log(nums.reduce((sum, n) => sum + n, 0)); // 13"
    )
  },
  "set3-immutability-references": {
    summary:
      "Objects and arrays are held by REFERENCE: b = a means both names point at the same object, so changing one changes the other. React relies on reference identity to detect changes, which is why you copy before editing (spread) instead of mutating. Primitives (numbers, strings) are copied by value and have no such issue.",
    points: [
      "Objects/arrays are shared by reference; primitives are copied by value.",
      "b = a shares the object; const copy = {...a} makes a new one.",
      "Mutating shared state causes React's hardest-to-find bugs."
    ],
    example: code(
      "const a = { n: 1 };",
      "const b = a;",
      "b.n = 99;",
      "console.log(a.n); // 99 — same object",
      "const c = { ...a }; // independent copy"
    )
  },
  "set3-json-storage-api": {
    summary:
      "JSON is the text format for sending and storing data. JSON.stringify turns a JS object into a JSON string (for request bodies and localStorage); JSON.parse turns a JSON string back into an object. Parsing invalid JSON throws, so wrap risky parses in try/catch. localStorage only stores strings, so objects must be stringified.",
    points: [
      "JSON.stringify(obj) -> string; JSON.parse(str) -> object.",
      "Request bodies and localStorage need strings — stringify first.",
      "JSON.parse throws on bad input; guard with try/catch."
    ],
    example: code(
      "const user = { name: \"Aya\" };",
      "localStorage.setItem(\"user\", JSON.stringify(user));",
      "const saved = JSON.parse(localStorage.getItem(\"user\"));",
      "console.log(saved.name);"
    )
  },
  "set3-destructuring-api": {
    summary:
      "Destructuring pulls fields out of API responses cleanly, with defaults for missing values and renaming for clarity: const { name, age = 0 } = user. Nested destructuring reaches into deep shapes, and you can destructure right in function parameters. Defaults guard against undefined fields in real-world data.",
    points: [
      "const { a, b = fallback } = obj — extract with defaults.",
      "Rename: const { name: userName } = user.",
      "Destructure nested data and function parameters directly."
    ],
    example: code(
      "const res = { data: { name: \"Aya\" }, ok: true };",
      "const { data: { name }, ok } = res;",
      "console.log(name, ok);"
    )
  },
  "set3-promises-async": {
    summary:
      "A promise represents a future value. async/await is the readable way to use them: await pauses until a promise resolves, and try/catch handles rejections. An async function always returns a promise. await only works inside an async function. This is the foundation of every data fetch you will write.",
    points: [
      "async functions return promises; await unwraps a resolved value.",
      "Wrap awaits in try/catch to handle rejected promises.",
      "await is only valid inside an async function."
    ],
    example: code(
      "async function load() {",
      "  try {",
      "    const res = await fetch(\"/api\");",
      "    return await res.json();",
      "  } catch (err) {",
      "    console.log(\"failed\", err);",
      "  }",
      "}"
    )
  },
  "set3-fetch-http": {
    summary:
      "fetch makes HTTP requests and returns a promise. A crucial gotcha: fetch only rejects on network failure, NOT on 404 or 500 — you must check response.ok yourself and throw. Parse the body with await response.json(). Configure method, headers, and a JSON body in the options object for POST/PUT requests.",
    points: [
      "fetch resolves even on 404/500 — check response.ok and throw if not.",
      "await response.json() parses the body.",
      "POST: fetch(url, { method, headers, body: JSON.stringify(data) })."
    ],
    example: code(
      "const res = await fetch(\"/api/users\");",
      "if (!res.ok) throw new Error(`HTTP ${res.status}`);",
      "const users = await res.json();"
    )
  },
  "set3-abort-stale-requests": {
    summary:
      "When requests fire faster than they return (live search), a slow earlier response can overwrite a newer one — a race condition. AbortController cancels an in-flight request; calling controller.abort() in cleanup stops the stale one. This pairs with effect cleanup to keep fast-changing UIs correct.",
    points: [
      "Race condition: an older response lands after a newer one.",
      "AbortController.abort() cancels an in-flight fetch.",
      "Abort in effect cleanup so stale requests do not update state."
    ],
    example: code(
      "useEffect(() => {",
      "  const ctrl = new AbortController();",
      "  fetch(url, { signal: ctrl.signal });",
      "  return () => ctrl.abort(); // cancel on change/unmount",
      "}, [url]);"
    )
  },
  "set3-events-dom": {
    summary:
      "Event handlers receive an event object. event.preventDefault() stops default behavior (like a form reloading the page); event.stopPropagation() stops bubbling up to parents. event.target is where the event originated; currentTarget is where the handler is attached. React wraps native events in a consistent SyntheticEvent across browsers.",
    points: [
      "event.preventDefault() stops defaults (form submit page reload).",
      "Events bubble up; stopPropagation() halts that.",
      "target = origin element; currentTarget = handler's element."
    ],
    example: code(
      "function Form() {",
      "  function onSubmit(e) {",
      "    e.preventDefault(); // stop the page reload",
      "    console.log(\"submitted\");",
      "  }",
      "  return <form onSubmit={onSubmit}><button>Go</button></form>;",
      "}"
    )
  },
  "set3-browser-env": {
    summary:
      "The browser exposes APIs: localStorage/sessionStorage for storage, the URL API for parsing links, timers (setTimeout/setInterval). In Vite, environment variables prefixed with VITE_ are exposed via import.meta.env — but remember frontend env vars are PUBLIC (shipped to the browser), so never put secrets there.",
    points: [
      "Browser APIs: localStorage, sessionStorage, URL, timers.",
      "Vite exposes import.meta.env.VITE_* variables to the app.",
      "Frontend env vars are public — secrets belong on the server."
    ],
    example: code(
      "const apiUrl = import.meta.env.VITE_API_URL;",
      "// VITE_ vars are bundled into the client — never secret keys"
    )
  },
  "set3-modules-utilities": {
    summary:
      "Split reusable logic into utility modules with named and default exports. Keep helpers pure (no side effects) so they are easy to test and reuse. Import only what you need. Avoid giant barrel files that re-export everything when they create circular imports or bloat — organize by feature, not by one dumping ground.",
    points: [
      "Named exports for many helpers; default export for the main thing.",
      "Pure functions (input -> output, no side effects) are easy to test.",
      "Import what you need; organize utilities by purpose."
    ],
    example: code(
      "// money.js",
      "export const format = (n) => `$${n.toFixed(2)}`;",
      "",
      "// usage:",
      "import { format } from \"./money.js\";",
      "console.log(format(9.5)); // $9.50"
    )
  },
  "set3-data-transformation": {
    summary:
      "Real API shapes rarely match what the UI needs, so transform data before rendering: map to reshape, filter to narrow, sort for display, reduce to aggregate. Do it defensively — guard against missing fields and nulls. Transforming in one clear step keeps components simple and rendering predictable.",
    points: [
      "Adapt API shapes to UI shapes with map/filter/sort/reduce.",
      "Guard against missing/null fields while transforming.",
      "Transform once into UI-ready data; keep components dumb."
    ],
    example: code(
      "const apiUsers = [",
      "  { id: 1, name: \"Aya\", active: true },",
      "  { id: 2, name: null, active: true },",
      "  { id: 3, name: \"Bo\", active: false }",
      "];",
      "const uiUsers = apiUsers",
      "  .filter((u) => u.active)",
      "  .map((u) => ({ id: u.id, label: u.name ?? \"Unknown\" }));",
      "console.log(uiUsers);"
    )
  },
  "set3-defensive-debugging": {
    summary:
      "Defensive JavaScript anticipates bad data: optional chaining (?.), nullish defaults (??), and guard clauses prevent 'cannot read property of undefined' crashes. When something breaks, read the error and stack trace, and reproduce with small inputs. Throwing clear, specific errors makes failures easy to trace later.",
    points: [
      "Guard nested access with ?. and supply defaults with ??.",
      "Read the error message and stack trace before changing code.",
      "Throw clear, specific errors so failures are easy to locate."
    ],
    example: code(
      "function firstCity(user) {",
      "  return user?.addresses?.[0]?.city ?? \"Unknown\";",
      "}",
      "console.log(firstCity(null)); // Unknown, not a crash"
    )
  },
  "set3-debounce-mini": {
    summary:
      "Debouncing delays an action until input stops, so a search box waits until the user pauses typing instead of firing a request per keystroke. You implement it with setTimeout and clear the pending timer on each change (and in cleanup). This module combines closures, timers, and cleanup into small real programs.",
    points: [
      "Debounce: wait until activity pauses before acting.",
      "setTimeout schedules; clearTimeout cancels the pending call.",
      "Clear the timer on each new input and in effect cleanup."
    ],
    example: code(
      "useEffect(() => {",
      "  const id = setTimeout(() => search(query), 300);",
      "  return () => clearTimeout(id); // reset the timer on each keystroke",
      "}, [query]);"
    )
  },

  // ---- Set 4: React Architecture ----
  "set4-component-architecture": {
    summary:
      "As apps grow, split components by responsibility. Presentational components handle how things look (given props); container components handle data and logic. Keep components small and focused, lift shared layout into reusable pieces, and avoid one giant App.jsx. A component that does too much is the first thing to break up.",
    points: [
      "Separate presentational (looks) from container (data/logic) concerns.",
      "Small, single-responsibility components are easier to reuse and test.",
      "Compose pages from components; avoid one massive App.jsx."
    ],
    example: code(
      "// presentational: just renders props",
      "function UserCard({ name, email }) {",
      "  return <div><h3>{name}</h3><p>{email}</p></div>;",
      "}",
      "// a container would fetch users and render <UserCard /> for each"
    )
  },
  "set4-state-architecture": {
    summary:
      "Decide WHERE state lives. Colocate state as close as possible to where it is used; lift it only when shared. Crucially, SERVER state (data from an API) is a different category from UI state — it can be stale, needs refetching and caching, and usually should not be copied into local state. Recognizing that distinction prevents most data bugs.",
    points: [
      "Colocate state near its use; lift only when truly shared.",
      "Server state (API data) differs from local UI state.",
      "Don't duplicate server data into local state — it goes stale."
    ],
    example: code(
      "// local UI state: belongs in the component",
      "const [isOpen, setIsOpen] = useState(false);",
      "// server state: cached/refetched by a data library, not copied around"
    )
  },
  "set4-usereducer-basics": {
    summary:
      "useReducer manages complex state with a reducer: a pure function (state, action) => newState. You get [state, dispatch] and call dispatch({ type: 'increment' }) to trigger transitions. Reducers must be pure and return NEW state immutably. Reach for useReducer when state updates are interrelated or logic gets tangled in many useState calls.",
    points: [
      "const [state, dispatch] = useReducer(reducer, initial).",
      "reducer(state, action) is pure and returns new immutable state.",
      "dispatch({ type, payload }) describes WHAT happened, not how to change."
    ],
    example: code(
      "function reducer(state, action) {",
      "  switch (action.type) {",
      "    case \"inc\": return { count: state.count + 1 };",
      "    default: return state;",
      "  }",
      "}",
      "// const [state, dispatch] = useReducer(reducer, { count: 0 });"
    )
  },
  "set4-reducer-patterns": {
    summary:
      "Real reducers use action constants, carry a payload, and always include a default case that returns state unchanged. Split large reducers by concern, model request states (loading/success/error) as actions, and update items immutably with map/filter. Never perform side effects (fetching, logging) inside a reducer — keep it a pure data transformation.",
    points: [
      "Actions carry a type and often a payload; always handle a default case.",
      "Model loading/success/error as distinct actions.",
      "Reducers stay pure — no fetching or side effects inside them."
    ],
    example: code(
      "case \"loaded\":",
      "  return { ...state, loading: false, data: action.payload };",
      "case \"error\":",
      "  return { ...state, loading: false, error: action.payload };"
    )
  },
  "set4-context-basics": {
    summary:
      "Context shares values across the component tree without passing props through every level (prop drilling). createContext makes a context, a Provider supplies a value, and useContext reads the nearest provider's value. It is a sharing mechanism — not a full state manager — best for things many components need, like theme or current user.",
    points: [
      "createContext + <Provider value={...}> + useContext(ctx).",
      "Solves prop drilling: deep components read directly.",
      "Context shares values; it is not by itself a state manager."
    ],
    example: code(
      "const ThemeContext = createContext(\"light\");",
      "function Button() {",
      "  const theme = useContext(ThemeContext);",
      "  return <button className={theme}>Click</button>;",
      "}"
    )
  },
  "set4-context-architecture": {
    summary:
      "Wrap context in a custom provider component and a custom hook (useAuth) that throws a clear error if used outside its provider — this gives a clean API and catches misuse early. Design the provider's value carefully; splitting state and dispatch into separate contexts can reduce unnecessary re-renders in large trees.",
    points: [
      "Expose a custom hook (useAuth) instead of raw useContext everywhere.",
      "Throw a helpful error when the hook is used outside its provider.",
      "Consider splitting state and dispatch contexts to limit re-renders."
    ],
    example: code(
      "function useAuth() {",
      "  const ctx = useContext(AuthContext);",
      "  if (!ctx) throw new Error(\"useAuth must be inside <AuthProvider>\");",
      "  return ctx;",
      "}"
    )
  },
  "set4-reducer-context": {
    summary:
      "Combine useReducer with Context to share app-level state and dispatch across the tree — a lightweight alternative to external state libraries for things like a cart or auth. The provider holds the reducer; components read state and call dispatch via a hook. Reserve this for genuinely shared state; local state should stay local.",
    points: [
      "Provider runs the reducer; children consume state + dispatch via context.",
      "Good for app-wide concerns: cart, auth, theme.",
      "Don't globalize state that only one component needs."
    ],
    example: code(
      "function AppProvider({ children }) {",
      "  const [state, dispatch] = useReducer(reducer, initial);",
      "  return (",
      "    <AppContext.Provider value={{ state, dispatch }}>",
      "      {children}",
      "    </AppContext.Provider>",
      "  );",
      "}"
    )
  },
  "set4-custom-hooks": {
    summary:
      "A custom hook is a function starting with use that bundles reusable stateful logic by calling other hooks. It shares LOGIC, not state — each component that calls it gets its own independent state. Custom hooks (useToggle, useDebounce, useLocalStorage) are how you keep components clean and avoid copy-pasting effect/state code.",
    points: [
      "Custom hooks start with use and call other hooks inside.",
      "They share logic; each caller gets its own separate state.",
      "Extract repeated state/effect logic into a named hook."
    ],
    example: code(
      "function useToggle(initial = false) {",
      "  const [on, setOn] = useState(initial);",
      "  const toggle = () => setOn((v) => !v);",
      "  return [on, toggle];",
      "}"
    )
  },
  "set4-refs-portals-errors": {
    summary:
      "useRef holds a mutable value that does NOT trigger re-renders — used for DOM access (focusing an input) or storing values between renders. createPortal renders children into a different DOM node (modals, tooltips) while keeping React event bubbling. Error boundaries (class components) catch render errors in their subtree and show a fallback.",
    points: [
      "useRef: mutable value / DOM handle that doesn't cause re-renders.",
      "createPortal renders outside the parent DOM (modals) but keeps React events.",
      "Error boundaries catch subtree render errors and show fallback UI."
    ],
    example: code(
      "function NameInput() {",
      "  const inputRef = useRef(null);",
      "  return (",
      "    <button onClick={() => inputRef.current.focus()}>",
      "      <input ref={inputRef} />",
      "    </button>",
      "  );",
      "}"
    )
  },
  "set4-router": {
    summary:
      "React Router maps URLs to components. Define routes, navigate with <Link> (not <a>, which reloads the page), and render nested routes into a parent's <Outlet>. Read URL params with useParams and navigate programmatically with useNavigate. A catch-all path '*' renders a 404 page.",
    points: [
      "<Link to=\"/about\"> navigates without a full page reload.",
      "Nested routes render into the parent's <Outlet/>.",
      "useParams() reads :id; useNavigate() navigates in code; '*' is 404."
    ],
    example: code(
      "<Routes>",
      "  <Route path=\"/\" element={<Home />} />",
      "  <Route path=\"/users/:id\" element={<User />} />",
      "  <Route path=\"*\" element={<NotFound />} />",
      "</Routes>"
    )
  },
  "set4-lazy-suspense": {
    summary:
      "React.lazy loads a component's code only when it is first rendered (code splitting), shrinking the initial bundle. Wrap lazy components in <Suspense fallback={...}> to show a loader while the code downloads. Lazy components must be default exports. Apply this at the route level for the biggest win — don't lazy-load tiny components.",
    points: [
      "React.lazy(() => import('./Page')) splits code by component.",
      "<Suspense fallback={...}> shows UI while the chunk loads.",
      "Lazy-load routes/large components, not trivial ones."
    ],
    example: code(
      "const Dashboard = React.lazy(() => import(\"./Dashboard\"));",
      "<Suspense fallback={<p>Loading...</p>}>",
      "  <Dashboard />",
      "</Suspense>"
    )
  },
  "set4-form-architecture": {
    summary:
      "Structured forms reuse field components that group a label, input, and error together. Track which fields are 'touched' so errors show only after interaction, validate with helper functions, and distinguish field-level from form-level errors. Accessible error rendering (tying messages to inputs) comes built in when fields are componentized well.",
    points: [
      "Reusable Field components bundle label + input + error.",
      "Show errors after a field is touched, not on first render.",
      "Separate field-level errors from form-level errors."
    ],
    example: code(
      "function Field({ label, error, ...props }) {",
      "  return (",
      "    <label>{label}<input {...props} />",
      "      {error && <span className=\"err\">{error}</span>}",
      "    </label>",
      "  );",
      "}"
    )
  },
  "set4-accessibility": {
    summary:
      "Accessible components work for everyone, including keyboard and screen-reader users. Use real semantic elements (a <button>, not a clickable <div>), label every input (htmlFor/id), give icon-only buttons an aria-label, manage focus in modals, and announce dynamic messages with role=\"alert\". Semantic HTML gets most of this for free.",
    points: [
      "Use semantic elements: <button>, <nav>, <main> — they're keyboard-ready.",
      "Label inputs (htmlFor/id); name icon buttons with aria-label.",
      "Manage focus in modals; use role=\"alert\" for dynamic messages."
    ],
    example: code(
      "<label htmlFor=\"email\">Email</label>",
      "<input id=\"email\" type=\"email\" />",
      "<button aria-label=\"Close\">×</button>"
    )
  },
  "set4-testing": {
    summary:
      "Test behavior, not implementation. React Testing Library queries the DOM the way users do — getByRole, getByLabelText — and simulates interaction with user-event. Assert on what the user sees and can do, not on internal state. Start by testing pure helper functions, then component behavior (a click updates the visible text).",
    points: [
      "Query by role/label/text — how users find things — not by internals.",
      "Simulate real interaction with user-event.",
      "Test outcomes (visible result), not private state."
    ],
    example: code(
      "// click the button, expect the count text to update",
      "fireEvent.click(screen.getByRole(\"button\"));",
      "expect(screen.getByText(\"Count: 1\")).toBeInTheDocument();"
    )
  },
  "set4-typescript-intro": {
    summary:
      "TypeScript adds types to React. Type props with an interface, type useState when inference is not enough (useState<User | null>(null)), type event handlers, and model reducer actions with discriminated unions. Types catch wrong props and missing fields at compile time — a major reliability boost as components grow.",
    points: [
      "Type props: function Welcome({ name }: { name: string }).",
      "useState<Type>(initial) when the type can't be inferred.",
      "Discriminated unions type reducer actions safely."
    ],
    example: code(
      "interface Props {",
      "  name: string;",
      "  age?: number;",
      "}",
      "function Welcome({ name }: Props) {",
      "  return <h1>Hi {name}</h1>;",
      "}"
    )
  },
  "set4-component-api-performance": {
    summary:
      "Design clear component APIs (controlled vs uncontrolled, well-named props). For performance, memo skips re-rendering when props are unchanged; useMemo caches expensive computations; useCallback stabilizes function identity. But these are MEASURED tools, not defaults — premature memoization adds complexity and can even slow things down. Profile first.",
    points: [
      "memo/useMemo/useCallback optimize re-renders and expensive work.",
      "They are tools to apply after MEASURING, not by default.",
      "Premature memoization adds complexity for no proven gain."
    ],
    example: code(
      "// memo skips re-render when props are shallow-equal",
      "const Row = memo(function Row({ label }) {",
      "  return <li>{label}</li>;",
      "});"
    )
  },
  "set4-folder-organization": {
    summary:
      "Organize by FEATURE, not by file type, as projects grow: group a feature's components, hooks, and tests together. Keep pages/routes, shared components, hooks, utilities, and services in clear places. The goal is findability — a new developer should guess where code lives. Avoid one giant components folder or one giant file.",
    points: [
      "Group by feature (cart/, auth/) over by type once an app grows.",
      "Clear homes for pages, shared components, hooks, utils, services.",
      "Optimize for findability; avoid one dumping-ground folder/file."
    ],
    example: code(
      "// feature-based layout",
      "// src/features/cart/{ CartPage.jsx, useCart.js, cart.test.js }",
      "// src/components/  (shared UI)   src/lib/  (utilities)"
    )
  },
  "set4-mini-architecture": {
    summary:
      "This module combines architecture decisions into small programs: choosing useState vs useReducer, deciding what belongs in context, extracting a custom hook, wiring basic routes, and applying accessibility. The skill is judgment — picking the right tool for the size of the problem rather than reaching for the heaviest option.",
    points: [
      "Match the tool to the problem size; don't over-engineer.",
      "Local state, then lifted state, then context, then a library — in that order.",
      "Extract hooks and components when logic or markup repeats."
    ],
    example: code(
      "// judgment: a simple toggle needs useState, not a reducer + context",
      "const [open, setOpen] = useState(false);"
    )
  },

  // ---- Set 5: Routing, Server Data, and Real App Workflows ----
  "set5-route-trees-layouts": {
    summary:
      "Real apps nest routes under shared layouts. A layout route renders persistent UI (nav, sidebar) and an <Outlet> where child routes appear; the layout stays mounted as children change. Defining routes as a tree (with children) mirrors the URL structure and keeps shared chrome in one place.",
    points: [
      "Layout routes hold shared UI + an <Outlet/> for children.",
      "The layout stays mounted while nested routes swap inside it.",
      "Route children mirror nested URL segments."
    ],
    example: code(
      "<Route element={<Layout />}>",
      "  <Route path=\"dashboard\" element={<Dashboard />} />",
      "  <Route path=\"settings\" element={<Settings />} />",
      "</Route>"
    )
  },
  "set5-navigation-url": {
    summary:
      "Treat the URL as state — it is shareable and survives refresh. <Link to> and useNavigate move between routes; navigate after a save or cancel. <Navigate> redirects during render (use replace to avoid polluting history). Prefer putting shareable state (filters, page) in the URL over local state.",
    points: [
      "useNavigate() navigates in code (after save/cancel).",
      "<Navigate to replace /> redirects during render.",
      "The URL is shareable, refresh-safe state — use it for that."
    ],
    example: code(
      "const navigate = useNavigate();",
      "async function save() {",
      "  await api.save(form);",
      "  navigate(\"/items\"); // go to the list after saving",
      "}"
    )
  },
  "set5-params-query": {
    summary:
      "Dynamic segments (/users/:id) are read with useParams — and params always arrive as STRINGS, so convert when needed. Query params (?page=2&sort=name) are read and written with useSearchParams, making filters and pagination shareable via the URL. Never put secrets in the URL; it is visible and logged.",
    points: [
      "useParams() reads :id (always a string — convert for math).",
      "useSearchParams() reads/writes ?page=&sort= for shareable filters.",
      "URLs are public — never put secrets in them."
    ],
    example: code(
      "const { id } = useParams();",
      "const [params, setParams] = useSearchParams();",
      "const page = Number(params.get(\"page\") ?? 1);"
    )
  },
  "set5-protected-auth-routes": {
    summary:
      "A protected route checks auth and renders an <Outlet> if allowed or redirects to login with <Navigate> if not. Remember the return-to pattern so users land back where they intended after logging in. Crucially, frontend guards are UX only — the SERVER must enforce real authorization, since anyone can bypass client checks.",
    points: [
      "Guard renders <Outlet/> when authed, else <Navigate to=login>.",
      "Remember the intended destination to return to after login.",
      "Frontend guards are UX; the server must enforce real authorization."
    ],
    example: code(
      "function RequireAuth() {",
      "  const { user } = useAuth();",
      "  return user ? <Outlet /> : <Navigate to=\"/login\" replace />;",
      "}"
    )
  },
  "set5-data-routers": {
    summary:
      "Data routers move data loading into the route. A loader fetches before the route renders (no loading flicker in the component), useLoaderData reads it, and an action handles form submissions, after which loaders revalidate automatically. Route error elements catch loader/action failures. This is an alternative to fetching inside useEffect.",
    points: [
      "loader fetches before render; useLoaderData() reads the result.",
      "action handles submissions; loaders revalidate after it.",
      "errorElement catches loader/action errors per route."
    ],
    example: code(
      "// route: { path: 'users', loader: loadUsers, element: <Users/> }",
      "function Users() {",
      "  const users = useLoaderData();",
      "  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;",
      "}"
    )
  },
  "set5-pending-navigation": {
    summary:
      "When navigation triggers a loader, the transition takes time — show feedback. useNavigation exposes navigation.state ('idle' | 'loading' | 'submitting') so you can render a progress bar or disable a submit button while data loads. Pending UI (waiting for the real result) differs from optimistic UI (assuming success immediately).",
    points: [
      "useNavigation().state tells you loading/submitting/idle.",
      "Disable submit buttons and show progress during transitions.",
      "Pending UI waits; optimistic UI assumes success up front."
    ],
    example: code(
      "const nav = useNavigation();",
      "const busy = nav.state !== \"idle\";",
      "<button disabled={busy}>{busy ? \"Saving...\" : \"Save\"}</button>"
    )
  },
  "set5-route-architecture-deployment": {
    summary:
      "Single-page apps have a deployment gotcha: visiting /dashboard directly asks the static host for a file that does not exist, giving a 404. The fix is a catch-all rewrite that serves index.html for all paths (e.g., Vercel's rewrites), letting the client router take over. That hosting rewrite is different from your in-app '*' 404 route.",
    points: [
      "Direct visits to client routes 404 on static hosts without a rewrite.",
      "Rewrite all paths to /index.html so the router handles them.",
      "Hosting rewrite (server) differs from the app's '*' 404 route (client)."
    ],
    example: code(
      "// vercel.json",
      "{ \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }] }"
    )
  },
  "set5-server-state": {
    summary:
      "Server state is data owned by the backend: it can be stale, shared, and must be refetched. Model the full lifecycle — loading, error, data, and EMPTY (a successful response with no items, which beginners forget). Offer a retry on error. Don't duplicate server data into local state; read it from your data layer.",
    points: [
      "Server data is stale-able and shared — refetch, don't assume.",
      "Handle loading, error, data, AND empty states.",
      "Provide retry on failure; avoid copying server data into local state."
    ],
    example: code(
      "if (isLoading) return <Spinner />;",
      "if (error) return <Retry onClick={refetch} />;",
      "if (!items.length) return <Empty />;",
      "return <List items={items} />;"
    )
  },
  "set5-tanstack-query": {
    summary:
      "TanStack Query manages server state for you: useQuery({ queryKey, queryFn }) caches by key, dedupes requests, and refetches in the background. The query key identifies cached data — include every variable it depends on (['user', id]) or you'll serve the wrong cache. It handles caching/loading/refetch; it does not design your UI.",
    points: [
      "useQuery caches by queryKey and gives loading/error/data.",
      "Include all variables in the key: ['user', id], not just ['user'].",
      "It owns caching/refetching — not your component layout."
    ],
    example: code(
      "const { data, isLoading } = useQuery({",
      "  queryKey: [\"user\", id],",
      "  queryFn: () => fetchUser(id),",
      "});"
    )
  },
  "set5-mutations-rollback": {
    summary:
      "useMutation handles writes (create/update/delete). After a successful write, invalidate related queries so the cache refetches fresh data. Optimistic updates apply the change immediately for snappiness, snapshotting the old cache so you can ROLL BACK if the request fails. Optimism is risky for critical actions — use it where a failure is cheap to undo.",
    points: [
      "useMutation for writes; invalidate queries after success to refetch.",
      "Optimistic UI updates instantly, then rolls back on failure.",
      "Snapshot the cache before an optimistic update so rollback is possible."
    ],
    example: code(
      "const m = useMutation({",
      "  mutationFn: addTodo,",
      "  onSuccess: () => queryClient.invalidateQueries({ queryKey: [\"todos\"] }),",
      "});"
    )
  },
  "set5-api-service-layer": {
    summary:
      "Centralize HTTP calls in a service/client layer instead of scattering fetch everywhere: one base URL, shared headers, consistent parsing, and one place to handle errors. Map status codes to a consistent error shape (401, 403, 404, 422, 500) with field errors where relevant. Never hardcode API URLs throughout components.",
    points: [
      "One API client: base URL, headers, parsing, error handling.",
      "Map status codes (401/403/404/422/500) to a consistent error shape.",
      "Don't scatter fetch + hardcoded URLs across components."
    ],
    example: code(
      "async function api(path, options) {",
      "  const res = await fetch(BASE + path, options);",
      "  if (!res.ok) throw await toError(res);",
      "  return res.json();",
      "}"
    )
  },
  "set5-request-lifecycle": {
    summary:
      "Every request moves through states: idle, loading, success, error, and empty. Render a branch for each — a loader, an error with retry, an empty message, or the data. Guard against race conditions and updates after unmount. Modern data tools manage this for you, but you still own the UI for each state.",
    points: [
      "Render every state: idle/loading/success/error/empty.",
      "Empty (success with no data) is distinct from error — show different UI.",
      "Tools manage async state; you still design the UI for each branch."
    ],
    example: code(
      "switch (status) {",
      "  case \"loading\": return <Spinner />;",
      "  case \"error\":   return <Error onRetry={retry} />;",
      "  case \"empty\":   return <Empty />;",
      "  default:        return <Data items={items} />;",
      "}"
    )
  },
  "set5-pagination-infinite": {
    summary:
      "Large lists need pagination (page-by-page) or infinite scroll (load more as you go). Include the page in the query key so each page caches separately. useInfiniteQuery handles 'load more' with getNextPageParam and hasNextPage. Pagination is better for jumping to specific pages; infinite scroll suits feeds.",
    points: [
      "Put page in the query key: ['items', page].",
      "useInfiniteQuery + getNextPageParam + hasNextPage for load-more.",
      "Pagination for direct page access; infinite scroll for feeds."
    ],
    example: code(
      "const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({",
      "  queryKey: [\"items\"],",
      "  queryFn: ({ pageParam = 1 }) => fetchItems(pageParam),",
      "  getNextPageParam: (last) => last.nextPage,",
      "});"
    )
  },
  "set5-search-filter-sync": {
    summary:
      "Live search should debounce input (wait until typing pauses) and put the query, filters, sort, and page in the URL so results are shareable and survive refresh. Include those values in the query key so the cache is correct, reset to page 1 on a new search, and guard against out-of-order responses.",
    points: [
      "Debounce search input; sync query/filters/sort/page to the URL.",
      "Include all of them in the query key for correct caching.",
      "Reset to page 1 on a new search; guard against stale responses."
    ],
    example: code(
      "const debounced = useDebounce(query, 300);",
      "const { data } = useQuery({",
      "  queryKey: [\"search\", debounced, page],",
      "  queryFn: () => search(debounced, page),",
      "});"
    )
  },
  "set5-crud-workflows": {
    summary:
      "CRUD (create/read/update/delete) workflows need real feedback. Show a success toast only AFTER the server confirms — never fake success before the response. Use error toasts for failures and inline errors for field problems. Confirm destructive deletes, navigate after a save, and reflect edit-page states (loading, saving, done).",
    points: [
      "Confirm success only after the server responds — no fake success.",
      "Toasts for global outcomes; inline messages for field errors.",
      "Confirm deletes; navigate after save; show edit-page loading/saving states."
    ],
    example: code(
      "await api.delete(id);          // wait for the server",
      "toast.success(\"Deleted\");      // then confirm",
      "queryClient.invalidateQueries({ queryKey: [\"items\"] });"
    )
  },
  "set5-auth-workflow": {
    summary:
      "Authentication proves identity; authorization (server-enforced) controls access. Send a bearer token in the Authorization header; on 401, clear auth and redirect to login. Token storage is a tradeoff (memory vs localStorage vs httpOnly cookie). Hiding admin UI is not security — the API must enforce permissions regardless of what the client shows.",
    points: [
      "Send Authorization: Bearer <token>; handle 401 by re-authenticating.",
      "Authentication vs authorization — the latter is enforced server-side.",
      "Hiding admin buttons is UX; the API must still enforce access."
    ],
    example: code(
      "const token = localStorage.getItem(\"token\");",
      "fetch(\"/api/admin\", {",
      "  headers: { Authorization: `Bearer ${token}` },",
      "});",
      "// a 401 means: clear token, redirect to login"
    )
  },
  "set5-form-libraries": {
    summary:
      "React Hook Form manages forms with less re-rendering: register inputs, handleSubmit wraps your submit, and formState carries errors. Pair it with a schema validator (Zod/Yup) via a resolver for declarative validation. Client validation is for UX; the server is still the authoritative validator. Map server field errors back with setError.",
    points: [
      "useForm: register, handleSubmit, formState.errors.",
      "Validate declaratively with a Zod/Yup schema + resolver.",
      "Client validation is UX; the server is authoritative. Map server errors with setError."
    ],
    example: code(
      "const { register, handleSubmit, formState: { errors } } = useForm();",
      "<form onSubmit={handleSubmit(onSubmit)}>",
      "  <input {...register(\"email\")} />",
      "</form>"
    )
  },
  "set5-app-layouts": {
    summary:
      "Production apps have an application shell: persistent navigation, a root provider stack (router, QueryClientProvider, auth), and an <Outlet> for pages. Breadcrumbs can derive from route metadata, NotFound lives inside the layout, and pending indicators show during route transitions. The shell is the frame every page renders inside.",
    points: [
      "App shell: persistent nav + root providers + <Outlet/> for pages.",
      "Wrap the tree in router, QueryClientProvider, and auth providers.",
      "Layout hosts breadcrumbs, NotFound, and transition indicators."
    ],
    example: code(
      "<QueryClientProvider client={client}>",
      "  <AuthProvider>",
      "    <RouterProvider router={router} />",
      "  </AuthProvider>",
      "</QueryClientProvider>"
    )
  },
  "set5-env-config": {
    summary:
      "Configuration belongs in environment variables, not hardcoded. In Vite, only VITE_-prefixed vars reach the client via import.meta.env, and they are PUBLIC — private keys stay on the server/backend. Keep local values in .env.local (gitignored), restart Vite after changing env files, and centralize config in one module.",
    points: [
      "Vite exposes only VITE_* vars to the client via import.meta.env.",
      "Frontend env vars are public; private keys stay server-side.",
      ".env.local is gitignored; restart Vite after env changes."
    ],
    example: code(
      "// config.js — one place for configuration",
      "export const API_URL = import.meta.env.VITE_API_URL;",
      "// VITE_API_URL is public; never put a secret key here"
    )
  },
  "set5-mini-workflows": {
    summary:
      "This capstone module assembles full real-app flows: URL params driving a loader, pending UI during transitions, server-state caching, a mutation with cache invalidation and a success toast, mapped validation errors, and a route-level 404. The skill is wiring these pieces into a coherent feature the way a production app does.",
    points: [
      "Combine loaders, pending UI, caching, mutations, and toasts into one flow.",
      "Confirm success after the server; invalidate caches; map field errors.",
      "Wire URL state, data, and feedback together like a real feature."
    ],
    example: code(
      "// edit flow: load by param -> edit -> save -> invalidate -> toast -> navigate",
      "await save(form);",
      "queryClient.invalidateQueries({ queryKey: [\"item\", id] });",
      "toast.success(\"Saved\");",
      "navigate(`/items/${id}`);"
    )
  }
};
