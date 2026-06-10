const code = (...lines) => lines.join("\n");

// Lessons for React Set 1 modules, shown above each module's questions.
// React examples are read-along (no in-browser JS runner yet).
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
  }
};
