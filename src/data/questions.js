const code = (...lines) => lines.join("\n");

export const modules = [
  { id: "react-orientation", title: "React Orientation" },
  { id: "npm-vite", title: "npm, Vite, and Project Files" },
  { id: "structure-rendering", title: "Project Structure and Rendering" },
  { id: "relative-imports", title: "Relative Import Paths" },
  { id: "jsx", title: "JSX Basics and Fragments" },
  { id: "variables-functions", title: "Variables, Scope, and Functions" },
  { id: "objects-classes", title: "Objects and Classes" },
  { id: "arrays-lists", title: "Arrays, map(), and Keys" },
  { id: "destructuring-modern-js", title: "Destructuring, Spread, Rest, and Templates" },
  { id: "modules", title: "JavaScript Modules" },
  { id: "components-props", title: "Components and Props" },
  { id: "conditional-rendering", title: "Conditional Rendering" },
  { id: "events", title: "Events Basics" },
  { id: "typed-practice", title: "Typed Code Practice" }
];

export const questions = [
  {
    id: "react-orientation-1",
    moduleId: "react-orientation",
    level: "MCQ",
    type: "mcq",
    prompt: "Which description best matches React?",
    choices: [
      "A database used to store users",
      "A JavaScript library for building user interfaces",
      "A replacement for every browser API"
    ],
    answer: "A JavaScript library for building user interfaces",
    explanation: "React helps you build interactive UI by composing pieces called components."
  },
  {
    id: "react-orientation-2",
    moduleId: "react-orientation",
    level: "MCQ",
    type: "mcq",
    prompt: "What is the main idea behind breaking a page into React components?",
    choices: [
      "Each UI piece can be reused and reasoned about separately",
      "Every component automatically becomes a database table",
      "Components prevent JavaScript from running in the browser"
    ],
    answer: "Each UI piece can be reused and reasoned about separately",
    explanation: "A component is a reusable unit of UI logic and markup."
  },
  {
    id: "react-orientation-3",
    moduleId: "react-orientation",
    level: "True/False",
    type: "tf",
    prompt: "JSX is exactly the same thing as plain HTML copied into a JavaScript file.",
    answer: false,
    explanation: "JSX looks like HTML, but it is JavaScript syntax that React tools transform."
  },
  {
    id: "react-orientation-4",
    moduleId: "react-orientation",
    level: "MCQ",
    type: "mcq",
    prompt: "In a React app, what usually owns the changing screen logic?",
    choices: [
      "Only index.html",
      "React components",
      "The package-lock.json file"
    ],
    answer: "React components",
    explanation: "Components describe what should appear on screen for a given state and props."
  },
  {
    id: "react-orientation-5",
    moduleId: "react-orientation",
    level: "Complete",
    type: "fill",
    prompt: "Complete the simplest component function name.",
    snippet: code(
      "function __1__() {",
      "  return <h1>Hello React</h1>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["App"] }],
    explanation: "The root component is often named App, though the name itself is a convention."
  },
  {
    id: "react-orientation-6",
    moduleId: "react-orientation",
    level: "Typed Code",
    type: "code",
    prompt: "Write a function component named Badge that returns a span containing the text New.",
    starter: code("function Badge() {", "  ", "}"),
    expected: code("function Badge() {", "  return <span>New</span>;", "}"),
    required: ["function Badge", "return <span>New</span>"],
    explanation: "A function component returns JSX."
  },
  {
    id: "react-orientation-7",
    moduleId: "react-orientation",
    level: "MCQ",
    type: "mcq",
    prompt: "What does React do when the data a component uses changes?",
    choices: [
      "Re-renders that component so the screen matches the new data",
      "Edits the HTML file on disk",
      "Reloads the whole browser page"
    ],
    answer: "Re-renders that component so the screen matches the new data",
    explanation: "React's core job is keeping the UI in sync with data by re-rendering components."
  },
  {
    id: "react-orientation-8",
    moduleId: "react-orientation",
    level: "True/False",
    type: "tf",
    prompt: "A React function component is a regular JavaScript function that returns JSX.",
    answer: true,
    explanation: "Components are plain functions; what makes them components is returning UI."
  },
  {
    id: "react-orientation-9",
    moduleId: "react-orientation",
    level: "MCQ",
    type: "mcq",
    prompt: "Which name is valid for a React component?",
    choices: ["UserCard", "userCard", "user-card"],
    answer: "UserCard",
    explanation: "Component names must start with a capital letter so JSX can tell them apart from HTML tags."
  },
  {
    id: "react-orientation-10",
    moduleId: "react-orientation",
    level: "Complete",
    type: "fill",
    prompt: "Components must start with a capital letter. Complete this component so it is named Profile.",
    snippet: code(
      "function __1__() {",
      "  return <p>Hi</p>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["Profile"] }],
    explanation: "Lowercase names are treated as HTML tags; capitalized names are components."
  },
  {
    id: "npm-vite-1",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "Which command creates a new Vite project from npm?",
    choices: [
      "npm create vite@latest",
      "npm build vite",
      "npm install browser"
    ],
    answer: "npm create vite@latest",
    explanation: "The npm create command runs a project generator, and vite@latest selects Vite's latest scaffold."
  },
  {
    id: "npm-vite-2",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "After opening a fresh project folder, which command installs everything listed in package.json?",
    choices: ["npm run dev", "npm install", "npm start vite"],
    answer: "npm install",
    explanation: "npm install reads package.json and downloads dependencies into node_modules."
  },
  {
    id: "npm-vite-3",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "Which npm script is commonly used by Vite to start the local development server?",
    choices: ["npm run dev", "npm run open", "npm package"],
    answer: "npm run dev",
    explanation: "Vite templates usually define a dev script that starts the development server."
  },
  {
    id: "npm-vite-4",
    moduleId: "npm-vite",
    level: "True/False",
    type: "tf",
    prompt: "A Vite development server usually updates the browser after you save React files.",
    answer: true,
    explanation: "Vite provides fast refresh during development."
  },
  {
    id: "npm-vite-5",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "What is package.json mainly used for in a JavaScript project?",
    choices: [
      "Storing project metadata, scripts, and dependency lists",
      "Rendering React components into the DOM",
      "Replacing CSS files"
    ],
    answer: "Storing project metadata, scripts, and dependency lists",
    explanation: "package.json tells npm what the project is, what commands it has, and what packages it needs."
  },
  {
    id: "npm-vite-6",
    moduleId: "npm-vite",
    level: "Complete",
    type: "fill",
    prompt: "Complete the package.json script that starts Vite.",
    snippet: code(
      "{",
      "  \"scripts\": {",
      "    \"dev\": \"__1__\"",
      "  }",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["vite"] }],
    explanation: "The dev script can point directly to the vite command."
  },
  {
    id: "npm-vite-7",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "Which package.json section usually contains libraries needed by the app when it runs, such as react?",
    choices: ["dependencies", "scripts", "private"],
    answer: "dependencies",
    explanation: "dependencies are packages the app relies on. React belongs there in most Vite React apps."
  },
  {
    id: "npm-vite-9",
    moduleId: "npm-vite",
    level: "True/False",
    type: "tf",
    prompt: "The scripts section of package.json lets you create shortcut commands such as npm run build.",
    answer: true,
    explanation: "npm run <name> runs a command from package.json scripts."
  },
  {
    id: "npm-vite-10",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "What is node_modules?",
    choices: [
      "The folder where installed packages are placed",
      "The file where React JSX is written",
      "The browser tab opened by Vite"
    ],
    answer: "The folder where installed packages are placed",
    explanation: "npm install creates node_modules and fills it with downloaded packages."
  },
  {
    id: "npm-vite-11",
    moduleId: "npm-vite",
    level: "MCQ",
    type: "mcq",
    prompt: "What does package-lock.json help npm do?",
    choices: [
      "Lock exact dependency versions for repeatable installs",
      "Tell React where the root div is",
      "Convert JSX into CSS"
    ],
    answer: "Lock exact dependency versions for repeatable installs",
    explanation: "package-lock.json records the exact dependency tree npm installed."
  },
  {
    id: "structure-rendering-1",
    moduleId: "structure-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "In a Vite React project, which folder usually contains App.jsx and main.jsx?",
    choices: ["public", "src", "node_modules"],
    answer: "src",
    explanation: "Application source code usually lives in src."
  },
  {
    id: "structure-rendering-2",
    moduleId: "structure-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "Which file usually contains the div that React mounts into?",
    choices: ["index.html", "App.jsx", "package-lock.json"],
    answer: "index.html",
    explanation: "The container element is part of the HTML document."
  },
  {
    id: "structure-rendering-3",
    moduleId: "structure-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete the common root container in index.html.",
    snippet: "<div id=\"__1__\"></div>",
    blanks: [{ label: "__1__", answers: ["root"] }],
    explanation: "root is a common convention for the container id."
  },
  {
    id: "structure-rendering-4",
    moduleId: "structure-rendering",
    level: "True/False",
    type: "tf",
    prompt: "The root container must be named root or React will refuse to render.",
    answer: false,
    explanation: "The id can be different as long as your JavaScript selects the matching element."
  },
  {
    id: "structure-rendering-5",
    moduleId: "structure-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete the React DOM import.",
    snippet: "import { __1__ } from \"__2__\";",
    blanks: [
      { label: "__1__", answers: ["createRoot"] },
      { label: "__2__", answers: ["react-dom/client"] }
    ],
    explanation: "React 18+ apps commonly import createRoot from react-dom/client."
  },
  {
    id: "structure-rendering-6",
    moduleId: "structure-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "What does createRoot(container).render(<App />) do?",
    choices: [
      "Mounts the App component inside the selected container",
      "Deletes package.json",
      "Creates a new npm package"
    ],
    answer: "Mounts the App component inside the selected container",
    explanation: "React renders the component tree into the DOM container you pass to createRoot."
  },
  {
    id: "structure-rendering-7",
    moduleId: "structure-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete the selection of the root element.",
    snippet: "document.__1__(\"root\")",
    blanks: [{ label: "__1__", answers: ["getElementById"] }],
    explanation: "document.getElementById finds an element by its id."
  },
  {
    id: "structure-rendering-8",
    moduleId: "structure-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "Which file usually connects React to the DOM in a Vite React app?",
    choices: ["main.jsx", "README.md", "package-lock.json"],
    answer: "main.jsx",
    explanation: "main.jsx usually imports App and renders it into the root container."
  },
  {
    id: "structure-rendering-9",
    moduleId: "structure-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete a basic main.jsx render call.",
    snippet: code(
      "createRoot(document.getElementById(\"root\")).__1__(<__2__ />);"
    ),
    blanks: [
      { label: "__1__", answers: ["render"] },
      { label: "__2__", answers: ["App"] }
    ],
    explanation: "The render method receives the JSX you want React to mount."
  },
  {
    id: "structure-rendering-10",
    moduleId: "structure-rendering",
    level: "True/False",
    type: "tf",
    prompt: "App.jsx usually defines UI, while main.jsx usually mounts that UI into the page.",
    answer: true,
    explanation: "This separation is common in Vite React projects."
  },
  {
    id: "relative-imports-1",
    moduleId: "relative-imports",
    level: "MCQ",
    type: "mcq",
    prompt: "Which import points to App.jsx in the same folder as the current file?",
    choices: [
      "import App from \"./App.jsx\";",
      "import App from \"../App.jsx\";",
      "import App from \"/components/App.jsx\";"
    ],
    answer: "import App from \"./App.jsx\";",
    explanation: "./ means start from the current folder."
  },
  {
    id: "relative-imports-2",
    moduleId: "relative-imports",
    level: "Complete",
    type: "fill",
    prompt: "Complete the import for Header.jsx inside a components folder.",
    snippet: "import Header from \"__1__/components/Header.jsx\";",
    blanks: [{ label: "__1__", answers: ["."] }],
    explanation: "The path ./components/Header.jsx starts inside the current folder."
  },
  {
    id: "relative-imports-3",
    moduleId: "relative-imports",
    level: "MCQ",
    type: "mcq",
    prompt: "What does ../ mean in a relative import path?",
    choices: [
      "Go up one folder",
      "Install a dependency",
      "Open the browser console"
    ],
    answer: "Go up one folder",
    explanation: "../ moves from the current folder to the parent folder."
  },
  {
    id: "relative-imports-4",
    moduleId: "relative-imports",
    level: "True/False",
    type: "tf",
    prompt: "If you move a component file into a different folder, some relative import paths may need to change.",
    answer: true,
    explanation: "Relative imports depend on where the current file is located."
  },
  {
    id: "relative-imports-5",
    moduleId: "relative-imports",
    level: "MCQ",
    type: "mcq",
    prompt: "A file at src/components/Card.jsx needs to import src/data/products.js. Which path is most likely correct?",
    choices: [
      "import products from \"../data/products.js\";",
      "import products from \"./data/products.js\";",
      "import products from \"../../components/products.js\";"
    ],
    answer: "import products from \"../data/products.js\";",
    explanation: "From src/components you go up to src, then into data."
  },
  {
    id: "relative-imports-6",
    moduleId: "relative-imports",
    level: "Complete",
    type: "fill",
    prompt: "Complete the import from a parent folder.",
    snippet: "import formatName from \"__1__/utils/formatName.js\";",
    blanks: [{ label: "__1__", answers: [".."] }],
    explanation: "../utils means go up one folder, then enter utils."
  },
  {
    id: "relative-imports-7",
    moduleId: "relative-imports",
    level: "MCQ",
    type: "mcq",
    prompt: "Why do file paths matter in import statements?",
    choices: [
      "The bundler needs the path to find the module",
      "React changes the path into CSS",
      "Only package-lock.json can read imports"
    ],
    answer: "The bundler needs the path to find the module",
    explanation: "If the path is wrong, the build tool cannot locate the imported file."
  },
  {
    id: "relative-imports-8",
    moduleId: "relative-imports",
    level: "Typed Code",
    type: "code",
    prompt: "Write an import statement for Header from ./components/Header.jsx.",
    starter: "",
    expected: "import Header from \"./components/Header.jsx\";",
    accepted: [
      "import Header from \"./components/Header.jsx\";",
      "import Header from './components/Header.jsx';"
    ],
    required: ["import Header from", "./components/Header.jsx"],
    explanation: "A default export can be imported with any local name, and ./ starts from the current folder."
  },
  {
    id: "relative-imports-9",
    moduleId: "relative-imports",
    level: "MCQ",
    type: "mcq",
    prompt: "Which import loads a package from node_modules instead of one of your own files?",
    choices: [
      "import { useState } from \"react\";",
      "import { useState } from \"./react.js\";",
      "import { useState } from \"../react\";"
    ],
    answer: "import { useState } from \"react\";",
    explanation: "No ./ or ../ prefix means the bundler resolves the name in node_modules."
  },
  {
    id: "relative-imports-10",
    moduleId: "relative-imports",
    level: "True/False",
    type: "tf",
    prompt: "In a Vite project, import \"./styles.css\" is a valid import that loads a CSS file.",
    answer: true,
    explanation: "Bundlers extend imports beyond JavaScript — importing CSS attaches those styles to the app."
  },
  {
    id: "jsx-1",
    moduleId: "jsx",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX expression is valid?",
    choices: [
      "<h1>{2 + 3}</h1>",
      "<h1>[2 + 3]</h1>",
      "<h1>$2 + 3</h1>"
    ],
    answer: "<h1>{2 + 3}</h1>",
    explanation: "JavaScript expressions inside JSX use curly braces."
  },
  {
    id: "jsx-2",
    moduleId: "jsx",
    level: "Complete",
    type: "fill",
    prompt: "Complete the JSX heading.",
    snippet: "__1__Welcome__2__",
    blanks: [
      { label: "__1__", answers: ["<h1>"] },
      { label: "__2__", answers: ["</h1>"] }
    ],
    explanation: "JSX elements need matching opening and closing tags unless they are self-closing."
  },
  {
    id: "jsx-3",
    moduleId: "jsx",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX attribute should you use instead of HTML class?",
    choices: ["className", "class", "cssClass"],
    answer: "className",
    explanation: "JSX uses className because class is a JavaScript keyword."
  },
  {
    id: "jsx-4",
    moduleId: "jsx",
    level: "True/False",
    type: "tf",
    prompt: "A React component can return two sibling JSX elements without wrapping them.",
    answer: false,
    explanation: "A component return needs one parent wrapper, such as a div or fragment."
  },
  {
    id: "jsx-5",
    moduleId: "jsx",
    level: "MCQ",
    type: "mcq",
    prompt: "Which wrapper avoids adding an extra DOM element?",
    choices: ["<>...</>", "<div>...</div>", "<body>...</body>"],
    answer: "<>...</>",
    explanation: "A React Fragment groups JSX without creating an extra element in the DOM."
  },
  {
    id: "jsx-7",
    moduleId: "jsx",
    level: "MCQ",
    type: "mcq",
    prompt: "Which self-closing JSX tag is written correctly?",
    choices: ["<img />", "<img>", "</img />"],
    answer: "<img />",
    explanation: "Elements without children can be self-closed in JSX."
  },
  {
    id: "jsx-8",
    moduleId: "jsx",
    level: "Complete",
    type: "fill",
    prompt: "Complete the component return using one parent element.",
    snippet: code(
      "function Intro() {",
      "  return (",
      "    __1__",
      "      <h1>Intro</h1>",
      "      <p>Start here</p>",
      "    __2__",
      "  );",
      "}"
    ),
    blanks: [
      { label: "__1__", answers: ["<>", "<div>"] },
      { label: "__2__", answers: ["</>", "</div>"] }
    ],
    explanation: "A fragment or a div can wrap sibling JSX elements."
  },
  {
    id: "jsx-9",
    moduleId: "jsx",
    level: "MCQ",
    type: "mcq",
    prompt: "Which line correctly displays a variable named score in JSX?",
    choices: [
      "<p>Score: {score}</p>",
      "<p>Score: ${score}</p>",
      "<p>Score: score</p>"
    ],
    answer: "<p>Score: {score}</p>",
    explanation: "JSX uses braces to enter JavaScript expression mode."
  },
  {
    id: "jsx-10",
    moduleId: "jsx",
    level: "True/False",
    type: "tf",
    prompt: "Inside JSX, {name.toUpperCase()} is allowed because it is a JavaScript expression.",
    answer: true,
    explanation: "Function calls and calculations can be used inside JSX braces when they produce a value."
  },
  {
    id: "jsx-12",
    moduleId: "jsx",
    level: "Typed Code",
    type: "code",
    prompt: "Write a component named EmptyState that returns a fragment with h2 No items and p Try again later.",
    starter: code("function EmptyState() {", "  return (", "    ", "  );", "}"),
    expected: code(
      "function EmptyState() {",
      "  return (",
      "    <>",
      "      <h2>No items</h2>",
      "      <p>Try again later</p>",
      "    </>",
      "  );",
      "}"
    ),
    required: ["function EmptyState", "<>", "<h2>No items</h2>", "<p>Try again later</p>", "</>"],
    explanation: "Fragments are useful when returning adjacent elements."
  },
  {
    id: "variables-functions-1",
    moduleId: "variables-functions",
    level: "MCQ",
    type: "mcq",
    prompt: "Which keyword creates a binding that cannot be reassigned?",
    choices: ["var", "let", "const"],
    answer: "const",
    explanation: "const prevents reassignment of the variable binding."
  },
  {
    id: "variables-functions-3",
    moduleId: "variables-functions",
    level: "True/False",
    type: "tf",
    prompt: "let and const are block-scoped.",
    answer: true,
    explanation: "A block is usually created by curly braces, such as in if statements and loops."
  },
  {
    id: "variables-functions-4",
    moduleId: "variables-functions",
    level: "True/False",
    type: "tf",
    prompt: "var is block-scoped in the same way as let.",
    answer: false,
    explanation: "var is function-scoped, not block-scoped."
  },
  {
    id: "variables-functions-5",
    moduleId: "variables-functions",
    level: "Complete",
    type: "fill",
    prompt: "Create a constant named limit with the value 10.",
    snippet: "__1__ limit = __2__;",
    blanks: [
      { label: "__1__", answers: ["const"] },
      { label: "__2__", answers: ["10"] }
    ],
    explanation: "Use const when the binding should not be reassigned."
  },
  {
    id: "variables-functions-6",
    moduleId: "variables-functions",
    level: "MCQ",
    type: "mcq",
    prompt: "Which arrow function returns 'Hi' using implicit return?",
    choices: [
      "const sayHi = () => 'Hi';",
      "const sayHi => 'Hi';",
      "const sayHi = function => 'Hi';"
    ],
    answer: "const sayHi = () => 'Hi';",
    explanation: "The arrow goes after the parameter list."
  },
  {
    id: "variables-functions-7",
    moduleId: "variables-functions",
    level: "Complete",
    type: "fill",
    prompt: "Complete the no-parameter arrow function.",
    snippet: "const greet = __1__ => \"Hello\";",
    blanks: [{ label: "__1__", answers: ["()"] }],
    explanation: "No-parameter arrow functions use empty parentheses."
  },
  {
    id: "variables-functions-8",
    moduleId: "variables-functions",
    level: "Complete",
    type: "fill",
    prompt: "Complete the arrow function with one parameter.",
    snippet: "const double = (__1__) => n * 2;",
    blanks: [{ label: "__1__", answers: ["n"] }],
    explanation: "The parameter name becomes available inside the arrow function body."
  },
  {
    id: "variables-functions-9",
    moduleId: "variables-functions",
    level: "MCQ",
    type: "mcq",
    prompt: "When an arrow function uses curly braces for its body, what is usually needed to send back a value?",
    choices: ["return", "render", "send"],
    answer: "return",
    explanation: "Curly braces create a function body, so you need return for a result."
  },
  {
    id: "variables-functions-10",
    moduleId: "variables-functions",
    level: "Typed Code",
    type: "code",
    prompt: "Write an arrow function named add that returns the sum of a and b.",
    starter: "const add = ",
    expected: "const add = (a, b) => a + b;",
    accepted: [
      "const add = (a, b) => a + b;",
      "const add = (a,b) => a+b;"
    ],
    required: ["const add", "=>", "a", "b"],
    explanation: "Arrow functions are common when mapping arrays and handling events."
  },
  {
    id: "variables-functions-11",
    moduleId: "variables-functions",
    level: "MCQ",
    type: "mcq",
    prompt: "Which callback style is common inside React list rendering?",
    choices: ["items.map(item => ...)", "items.loop(item -> ...)", "items.each = item"],
    answer: "items.map(item => ...)",
    explanation: "React list rendering commonly uses map with an arrow function callback."
  },
  {
    id: "objects-classes-1",
    moduleId: "objects-classes",
    level: "MCQ",
    type: "mcq",
    prompt: "Which code creates a JavaScript object with name and age?",
    choices: [
      "const user = { name: \"Ali\", age: 20 };",
      "const user = [ name: \"Ali\", age: 20 ];",
      "const user = object(\"Ali\", 20);"
    ],
    answer: "const user = { name: \"Ali\", age: 20 };",
    explanation: "Object literals use curly braces and key-value pairs."
  },
  {
    id: "objects-classes-2",
    moduleId: "objects-classes",
    level: "Complete",
    type: "fill",
    prompt: "Complete the object property access using dot notation.",
    snippet: code(
      "const user = { name: \"Ali\", age: 20 };",
      "user.__1__"
    ),
    blanks: [{ label: "__1__", answers: ["name"] }],
    explanation: "user.name reads the name property."
  },
  {
    id: "objects-classes-3",
    moduleId: "objects-classes",
    level: "MCQ",
    type: "mcq",
    prompt: "Which bracket notation reads the name property?",
    choices: ["user[\"name\"]", "user(name)", "user->name"],
    answer: "user[\"name\"]",
    explanation: "Bracket notation uses a string key."
  },
  {
    id: "objects-classes-4",
    moduleId: "objects-classes",
    level: "True/False",
    type: "tf",
    prompt: "Dot notation and bracket notation can both read object properties.",
    answer: true,
    explanation: "Dot notation is shorter, while bracket notation is useful for dynamic keys."
  },
  {
    id: "objects-classes-5",
    moduleId: "objects-classes",
    level: "Complete",
    type: "fill",
    prompt: "Complete the class definition.",
    snippet: code(
      "__1__ Car {",
      "  __2__(brand) {",
      "    this.brand = brand;",
      "  }",
      "}"
    ),
    blanks: [
      { label: "__1__", answers: ["class"] },
      { label: "__2__", answers: ["constructor"] }
    ],
    explanation: "Classes use the class keyword and a constructor method."
  },
  {
    id: "objects-classes-6",
    moduleId: "objects-classes",
    level: "MCQ",
    type: "mcq",
    prompt: "Which keyword creates an instance from a class?",
    choices: ["new", "copy", "instance"],
    answer: "new",
    explanation: "new Car('Ford') creates a new Car object."
  },
  {
    id: "objects-classes-7",
    moduleId: "objects-classes",
    level: "MCQ",
    type: "mcq",
    prompt: "Which keyword lets one JavaScript class inherit from another?",
    choices: ["extends", "inherits", "parent"],
    answer: "extends",
    explanation: "class Dog extends Animal creates a child class."
  },
  {
    id: "objects-classes-8",
    moduleId: "objects-classes",
    level: "MCQ",
    type: "mcq",
    prompt: "What must a child class constructor call before using this?",
    choices: ["super()", "parent()", "this()"],
    answer: "super()",
    explanation: "super() calls the parent constructor."
  },
  {
    id: "objects-classes-9",
    moduleId: "objects-classes",
    level: "Complete",
    type: "fill",
    prompt: "Create a Car instance.",
    snippet: "const myCar = __1__ Car(\"Ford\");",
    blanks: [{ label: "__1__", answers: ["new"] }],
    explanation: "Use new with a class constructor."
  },
  {
    id: "objects-classes-10",
    moduleId: "objects-classes",
    level: "Typed Code",
    type: "code",
    prompt: "Write an object named user with name Ali and age 20.",
    starter: "const user = ",
    expected: "const user = { name: \"Ali\", age: 20 };",
    accepted: [
      "const user = { name: \"Ali\", age: 20 };",
      "const user = { name: 'Ali', age: 20 };"
    ],
    required: ["const user", "name", "Ali", "age", "20"],
    explanation: "Objects are essential before props and destructuring make sense."
  },
  {
    id: "arrays-lists-1",
    moduleId: "arrays-lists",
    level: "MCQ",
    type: "mcq",
    prompt: "What does array.map() return?",
    choices: ["A new array", "undefined", "The original array changed in place"],
    answer: "A new array",
    explanation: "map returns a new array containing the callback results."
  },
  {
    id: "arrays-lists-2",
    moduleId: "arrays-lists",
    level: "Complete",
    type: "fill",
    prompt: "Complete the expression that doubles each number.",
    snippet: "const doubled = numbers.__1__(n => n * 2);",
    blanks: [{ label: "__1__", answers: ["map"] }],
    explanation: "map transforms every item into a new value."
  },
  {
    id: "arrays-lists-3",
    moduleId: "arrays-lists",
    level: "MCQ",
    type: "mcq",
    prompt: "Which map callback parameter usually gives the current position?",
    choices: ["index", "place", "number"],
    answer: "index",
    explanation: "The second map callback parameter is the index."
  },
  {
    id: "arrays-lists-4",
    moduleId: "arrays-lists",
    level: "Complete",
    type: "fill",
    prompt: "Complete the map callback with item and index.",
    snippet: "items.map((__1__, __2__) => item)",
    blanks: [
      { label: "__1__", answers: ["item"] },
      { label: "__2__", answers: ["index"] }
    ],
    explanation: "map passes the item first, then the index."
  },
  {
    id: "arrays-lists-5",
    moduleId: "arrays-lists",
    level: "MCQ",
    type: "mcq",
    prompt: "When rendering an array of JSX elements, what prop should each item have?",
    choices: ["key", "name", "indexOnly"],
    answer: "key",
    explanation: "React uses keys to track list items between renders."
  },
  {
    id: "arrays-lists-6",
    moduleId: "arrays-lists",
    level: "Complete",
    type: "fill",
    prompt: "Complete the list rendering.",
    snippet: code(
      "{users.map(user => (",
      "  <li __1__={user.id}>{user.name}</li>",
      "))}"
    ),
    blanks: [{ label: "__1__", answers: ["key"] }],
    explanation: "A stable id is usually a better key than an index."
  },
  {
    id: "arrays-lists-7",
    moduleId: "arrays-lists",
    level: "True/False",
    type: "tf",
    prompt: "Using map() to render JSX is common because JSX is still JavaScript.",
    answer: true,
    explanation: "JSX can be returned from callbacks and stored in arrays."
  },
  {
    id: "arrays-lists-8",
    moduleId: "arrays-lists",
    level: "MCQ",
    type: "mcq",
    prompt: "Which key is usually the safest for a list of database records?",
    choices: ["record.id", "Math.random()", "The array length"],
    answer: "record.id",
    explanation: "Keys should be stable and unique among siblings."
  },
  {
    id: "arrays-lists-9",
    moduleId: "arrays-lists",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that renders names as li elements with each name as the key.",
    starter: "{names.",
    expected: "{names.map(name => <li key={name}>{name}</li>)}",
    required: ["names.map", "<li", "key={name}", "{name}", "</li>"],
    explanation: "The result of map can be placed directly inside JSX braces."
  },
  {
    id: "arrays-lists-10",
    moduleId: "arrays-lists",
    level: "MCQ",
    type: "mcq",
    prompt: "Why is Math.random() a poor key for list items?",
    choices: [
      "It changes on every render",
      "It can only be used in CSS",
      "It makes map return undefined"
    ],
    answer: "It changes on every render",
    explanation: "Changing keys cause React to lose track of which item is which."
  },
  {
    id: "destructuring-modern-js-1",
    moduleId: "destructuring-modern-js",
    level: "MCQ",
    type: "mcq",
    prompt: "Which syntax destructures name and age from an object?",
    choices: [
      "const { name, age } = user;",
      "const [ name, age ] = user;",
      "const name, age = user;"
    ],
    answer: "const { name, age } = user;",
    explanation: "Object destructuring uses curly braces and property names."
  },
  {
    id: "destructuring-modern-js-2",
    moduleId: "destructuring-modern-js",
    level: "Complete",
    type: "fill",
    prompt: "Complete the object destructuring.",
    snippet: "const { __1__, __2__ } = user;",
    blanks: [
      { label: "__1__", answers: ["name"] },
      { label: "__2__", answers: ["age"] }
    ],
    explanation: "The variable names match the object property names."
  },
  {
    id: "destructuring-modern-js-3",
    moduleId: "destructuring-modern-js",
    level: "MCQ",
    type: "mcq",
    prompt: "Which syntax skips the second array item?",
    choices: [
      "const [first, , third] = values;",
      "const [first skip third] = values;",
      "const [first...third] = values;"
    ],
    answer: "const [first, , third] = values;",
    explanation: "A blank position between commas skips an array item."
  },
  {
    id: "destructuring-modern-js-4",
    moduleId: "destructuring-modern-js",
    level: "Complete",
    type: "fill",
    prompt: "Set a default name while destructuring.",
    snippet: "const { name __1__ \"Guest\" } = user;",
    blanks: [{ label: "__1__", answers: ["="] }],
    explanation: "Default values use = inside the destructuring pattern."
  },
  {
    id: "destructuring-modern-js-5",
    moduleId: "destructuring-modern-js",
    level: "MCQ",
    type: "mcq",
    prompt: "Which symbol is used for spread syntax?",
    choices: ["...", "+++", "==="],
    answer: "...",
    explanation: "Three dots can spread arrays or objects."
  },
  {
    id: "destructuring-modern-js-6",
    moduleId: "destructuring-modern-js",
    level: "Complete",
    type: "fill",
    prompt: "Combine two arrays without changing the originals.",
    snippet: "const combined = [__1__a, __2__b];",
    blanks: [
      { label: "__1__", answers: ["..."] },
      { label: "__2__", answers: ["..."] }
    ],
    explanation: "Spreading arrays inside a new array copies their items into that array."
  },
  {
    id: "destructuring-modern-js-7",
    moduleId: "destructuring-modern-js",
    level: "MCQ",
    type: "mcq",
    prompt: "In const [first, ...rest] = numbers, what is rest?",
    choices: [
      "An array of the remaining values",
      "Only the second number",
      "The original numbers variable"
    ],
    answer: "An array of the remaining values",
    explanation: "Rest syntax collects remaining values."
  },
  {
    id: "destructuring-modern-js-9",
    moduleId: "destructuring-modern-js",
    level: "MCQ",
    type: "mcq",
    prompt: "How do you insert a variable inside a template literal?",
    choices: ["${name}", "{name}", "#name"],
    answer: "${name}",
    explanation: "Template literal interpolation uses ${expression}."
  },
  {
    id: "destructuring-modern-js-10",
    moduleId: "destructuring-modern-js",
    level: "Complete",
    type: "fill",
    prompt: "Complete the template literal.",
    snippet: "const message = __1__Hello, ${__2__}!__3__;",
    blanks: [
      { label: "__1__", answers: ["`"] },
      { label: "__2__", answers: ["name"] },
      { label: "__3__", answers: ["`"] }
    ],
    explanation: "Use backticks around the whole template and ${name} inside."
  },
  {
    id: "destructuring-modern-js-12",
    moduleId: "destructuring-modern-js",
    level: "Complete",
    type: "fill",
    prompt: "Complete the ternary expression.",
    snippet: "const label = isOpen __1__ \"Close\" __2__ \"Open\";",
    blanks: [
      { label: "__1__", answers: ["?"] },
      { label: "__2__", answers: [":"] }
    ],
    explanation: "A ternary chooses between two expressions."
  },
  {
    id: "modules-1",
    moduleId: "modules",
    level: "Complete",
    type: "fill",
    prompt: "Complete the named export.",
    snippet: code(
      "const name = \"Ali\";",
      "const age = 20;",
      "",
      "__1__ { __2__, __3__ };"
    ),
    blanks: [
      { label: "__1__", answers: ["export"] },
      { label: "__2__", answers: ["name"] },
      { label: "__3__", answers: ["age"] }
    ],
    explanation: "Named exports can export multiple values from one file."
  },
  {
    id: "modules-2",
    moduleId: "modules",
    level: "MCQ",
    type: "mcq",
    prompt: "How do you import a named export called total?",
    choices: [
      "import { total } from \"./math.js\";",
      "import total from \"./math.js\";",
      "import default total from \"./math.js\";"
    ],
    answer: "import { total } from \"./math.js\";",
    explanation: "Named imports use curly braces."
  },
  {
    id: "modules-3",
    moduleId: "modules",
    level: "MCQ",
    type: "mcq",
    prompt: "How do you import a default export?",
    choices: [
      "import message from \"./message.js\";",
      "import { message } from \"./message.js\";",
      "import default { message } from \"./message.js\";"
    ],
    answer: "import message from \"./message.js\";",
    explanation: "Default imports do not use curly braces."
  },
  {
    id: "modules-4",
    moduleId: "modules",
    level: "True/False",
    type: "tf",
    prompt: "A JavaScript module can have many default exports.",
    answer: false,
    explanation: "A module can have only one default export."
  },
  {
    id: "modules-5",
    moduleId: "modules",
    level: "MCQ",
    type: "mcq",
    prompt: "Which export style is common for a single React component file?",
    choices: ["export default App;", "export many App;", "module App;"],
    answer: "export default App;",
    explanation: "Many component files export their main component as the default export."
  },
  {
    id: "modules-6",
    moduleId: "modules",
    level: "Complete",
    type: "fill",
    prompt: "Complete the default export.",
    snippet: "__1__ __2__ Button;",
    blanks: [
      { label: "__1__", answers: ["export"] },
      { label: "__2__", answers: ["default"] }
    ],
    explanation: "export default marks the module's main exported value."
  },
  {
    id: "modules-7",
    moduleId: "modules",
    level: "MCQ",
    type: "mcq",
    prompt: "Which statement is true?",
    choices: [
      "Named imports must match exported names",
      "Default imports must always match the original name",
      "Named exports cannot be functions"
    ],
    answer: "Named imports must match exported names",
    explanation: "Named exports are imported by their exported names unless you use an alias."
  },
  {
    id: "modules-8",
    moduleId: "modules",
    level: "Typed Code",
    type: "code",
    prompt: "Write a named import for Button and Card from ./ui.js.",
    starter: "import ",
    expected: "import { Button, Card } from \"./ui.js\";",
    accepted: [
      "import { Button, Card } from \"./ui.js\";",
      "import {Button, Card} from './ui.js';"
    ],
    required: ["import", "{", "Button", "Card", "}", "from", "./ui.js"],
    explanation: "Multiple named imports share one pair of curly braces."
  },
  {
    id: "modules-9",
    moduleId: "modules",
    level: "Complete",
    type: "fill",
    prompt: "Rename the imported total to sum.",
    snippet: "import { total __1__ sum } from \"./math.js\";",
    blanks: [{ label: "__1__", answers: ["as"] }],
    explanation: "The as keyword renames a named import locally without touching the exporting file."
  },
  {
    id: "modules-10",
    moduleId: "modules",
    level: "True/False",
    type: "tf",
    prompt: "One file can have several named exports and a default export at the same time.",
    answer: true,
    explanation: "Files commonly mix many named exports with one default export — only multiple defaults are forbidden."
  },
  {
    id: "components-props-1",
    moduleId: "components-props",
    level: "MCQ",
    type: "mcq",
    prompt: "What are props in React?",
    choices: [
      "Values passed from a parent component to a child component",
      "A replacement for npm scripts",
      "The folder where packages are installed"
    ],
    answer: "Values passed from a parent component to a child component",
    explanation: "Props let components receive data from the place where they are used."
  },
  {
    id: "components-props-2",
    moduleId: "components-props",
    level: "Complete",
    type: "fill",
    prompt: "Pass a name prop to Welcome.",
    snippet: "<Welcome __1__=\"Sara\" />",
    blanks: [{ label: "__1__", answers: ["name"] }],
    explanation: "JSX attributes become props."
  },
  {
    id: "components-props-4",
    moduleId: "components-props",
    level: "Complete",
    type: "fill",
    prompt: "Receive the name prop using destructuring.",
    snippet: code(
      "function Welcome({ __1__ }) {",
      "  return <h1>Hello {name}</h1>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["name"] }],
    explanation: "Destructuring props can make component code shorter."
  },
  {
    id: "components-props-5",
    moduleId: "components-props",
    level: "MCQ",
    type: "mcq",
    prompt: "Which component usage passes a number prop instead of a string?",
    choices: [
      "<Counter start={5} />",
      "<Counter start=\"5\" />",
      "<Counter start:5 />"
    ],
    answer: "<Counter start={5} />",
    explanation: "Use JSX braces to pass a JavaScript number."
  },
  {
    id: "components-props-6",
    moduleId: "components-props",
    level: "True/False",
    type: "tf",
    prompt: "A child component should normally change its props directly.",
    answer: false,
    explanation: "Props are read-only from the child component's perspective."
  },
  {
    id: "components-props-7",
    moduleId: "components-props",
    level: "MCQ",
    type: "mcq",
    prompt: "Which line renders a component named Header?",
    choices: ["<Header />", "Header()", "<header-component>"],
    answer: "<Header />",
    explanation: "React components in JSX are written like custom tags and usually start with uppercase letters."
  },
  {
    id: "components-props-9",
    moduleId: "components-props",
    level: "MCQ",
    type: "mcq",
    prompt: "Which props object would Header receive from <Header title=\"Home\" />?",
    choices: [
      "{ title: \"Home\" }",
      "{ Header: \"Home\" }",
      "[\"title\", \"Home\"]"
    ],
    answer: "{ title: \"Home\" }",
    explanation: "JSX attributes become properties on the props object."
  },
  {
    id: "components-props-10",
    moduleId: "components-props",
    level: "Complete",
    type: "fill",
    prompt: "Read a nested user object passed as props.",
    snippet: code(
      "function Profile({ user }) {",
      "  return <p>{user.__1__}</p>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["name"] }],
    explanation: "Destructuring can receive user, then dot notation reads user.name."
  },
  {
    id: "components-props-11",
    moduleId: "components-props",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Welcome component that destructures name and returns h1 Hello {name}.",
    starter: code("function Welcome() {", "  return ", "}"),
    expected: code(
      "function Welcome({ name }) {",
      "  return <h1>Hello {name}</h1>;",
      "}"
    ),
    required: ["function Welcome", "{ name }", "<h1>Hello {name}</h1>"],
    explanation: "This is one of the most common beginner prop patterns."
  },
  {
    id: "components-props-12",
    moduleId: "components-props",
    level: "Typed Code",
    type: "code",
    prompt: "Render Welcome and pass the name prop with the value Mona.",
    starter: "return ",
    expected: "return <Welcome name=\"Mona\" />;",
    accepted: [
      "return <Welcome name=\"Mona\" />;",
      "return <Welcome name='Mona' />;"
    ],
    required: ["<Welcome", "name", "Mona"],
    explanation: "String props can be passed with quotes."
  },
  {
    id: "conditional-rendering-1",
    moduleId: "conditional-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX correctly chooses between two paragraphs?",
    choices: [
      "{isLoggedIn ? <p>Welcome</p> : <p>Please login</p>}",
      "{isLoggedIn : <p>Welcome</p> ? <p>Please login</p>}",
      "{if isLoggedIn <p>Welcome</p> else <p>Please login</p>}"
    ],
    answer: "{isLoggedIn ? <p>Welcome</p> : <p>Please login</p>}",
    explanation: "Ternaries are expressions, so they work inside JSX braces."
  },
  {
    id: "conditional-rendering-2",
    moduleId: "conditional-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete the JSX ternary.",
    snippet: "{isLoggedIn __1__ <p>Welcome</p> __2__ <p>Please login</p>}",
    blanks: [
      { label: "__1__", answers: ["?"] },
      { label: "__2__", answers: [":"] }
    ],
    explanation: "The true branch comes after ?, and the false branch comes after :."
  },
  {
    id: "conditional-rendering-3",
    moduleId: "conditional-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX renders Welcome only when isLoggedIn is true?",
    choices: [
      "{isLoggedIn && <p>Welcome</p>}",
      "{isLoggedIn || <p>Welcome</p>}",
      "{isLoggedIn ?? <p>Welcome</p>}"
    ],
    answer: "{isLoggedIn && <p>Welcome</p>}",
    explanation: "The && pattern renders the right side only when the left side is truthy."
  },
  {
    id: "conditional-rendering-4",
    moduleId: "conditional-rendering",
    level: "True/False",
    type: "tf",
    prompt: "&& conditional rendering is useful when there is no else UI.",
    answer: true,
    explanation: "Use && when you only want to show something in the true case."
  },
  {
    id: "conditional-rendering-5",
    moduleId: "conditional-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Complete this one-sided conditional render.",
    snippet: "{hasError __1__ <p>Something went wrong</p>}",
    blanks: [{ label: "__1__", answers: ["&&"] }],
    explanation: "&& is often used for optional messages."
  },
  {
    id: "conditional-rendering-6",
    moduleId: "conditional-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "When should a ternary be preferred over && in JSX?",
    choices: [
      "When you need both true and false UI",
      "When rendering a list with map",
      "When importing a default export"
    ],
    answer: "When you need both true and false UI",
    explanation: "A ternary has two branches."
  },
  {
    id: "conditional-rendering-7",
    moduleId: "conditional-rendering",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that shows <p>Admin</p> when isAdmin is true, otherwise <p>User</p>.",
    starter: "{",
    expected: "{isAdmin ? <p>Admin</p> : <p>User</p>}",
    required: ["isAdmin", "?", "<p>Admin</p>", ":", "<p>User</p>"],
    explanation: "The condition goes before the question mark."
  },
  {
    id: "conditional-rendering-8",
    moduleId: "conditional-rendering",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that renders <p>Saved</p> only when saved is true.",
    starter: "{",
    expected: "{saved && <p>Saved</p>}",
    required: ["saved", "&&", "<p>Saved</p>"],
    explanation: "The && pattern is concise for a single optional element."
  },
  {
    id: "conditional-rendering-9",
    moduleId: "conditional-rendering",
    level: "MCQ",
    type: "mcq",
    prompt: "What does {count && <p>{count}</p>} render when count is 0?",
    choices: ["The number 0", "Nothing at all", "<p>0</p>"],
    answer: "The number 0",
    explanation: "0 is falsy, so && short-circuits and JSX renders the 0 itself — a classic gotcha. Use count > 0 && ... instead."
  },
  {
    id: "conditional-rendering-10",
    moduleId: "conditional-rendering",
    level: "Complete",
    type: "fill",
    prompt: "Render nothing when the panel is not visible.",
    snippet: code(
      "function Panel({ visible }) {",
      "  if (!visible) return __1__;",
      "  return <div>Details</div>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["null"] }],
    explanation: "Returning null from a component renders nothing — the early-return pattern for hiding UI."
  },
  {
    id: "events-1",
    moduleId: "events",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX event prop handles a button click?",
    choices: ["onClick", "onclick", "onPressBrowser"],
    answer: "onClick",
    explanation: "React event props use camelCase, such as onClick."
  },
  {
    id: "events-2",
    moduleId: "events",
    level: "Complete",
    type: "fill",
    prompt: "Complete the button event handler prop.",
    snippet: "<button __1__={handleClick}>Click</button>",
    blanks: [{ label: "__1__", answers: ["onClick"] }],
    explanation: "Pass the function reference to onClick."
  },
  {
    id: "events-3",
    moduleId: "events",
    level: "MCQ",
    type: "mcq",
    prompt: "Which line correctly passes a click handler without calling it immediately?",
    choices: [
      "<button onClick={handleClick}>Click</button>",
      "<button onClick={handleClick()}>Click</button>",
      "<button onClick=\"handleClick\">Click</button>"
    ],
    answer: "<button onClick={handleClick}>Click</button>",
    explanation: "handleClick is the function reference. handleClick() calls the function during render."
  },
  {
    id: "events-4",
    moduleId: "events",
    level: "True/False",
    type: "tf",
    prompt: "React event names are usually camelCase.",
    answer: true,
    explanation: "Examples include onClick, onChange, and onSubmit."
  },
  {
    id: "events-5",
    moduleId: "events",
    level: "Complete",
    type: "fill",
    prompt: "Complete the click handler function.",
    snippet: code(
      "function handleClick() {",
      "  __1__.log(\"Clicked\");",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["console"] }],
    explanation: "console.log is a simple way to confirm an event handler ran."
  },
  {
    id: "events-6",
    moduleId: "events",
    level: "MCQ",
    type: "mcq",
    prompt: "Which event is commonly used for typing into an input?",
    choices: ["onChange", "onTypeOnly", "onInputReactOnly"],
    answer: "onChange",
    explanation: "React commonly uses onChange to respond to form input changes."
  },
  {
    id: "events-7",
    moduleId: "events",
    level: "Typed Code",
    type: "code",
    prompt: "Write a button that calls saveProfile when clicked.",
    starter: "<button ",
    expected: "<button onClick={saveProfile}>Save</button>",
    required: ["<button", "onClick={saveProfile}", "Save", "</button>"],
    explanation: "Event handlers are passed inside JSX braces."
  },
  {
    id: "events-8",
    moduleId: "events",
    level: "Typed Code",
    type: "code",
    prompt: "Write a handleClick function that logs Clicked.",
    starter: code("function handleClick() {", "  ", "}"),
    expected: code("function handleClick() {", "  console.log(\"Clicked\");", "}"),
    accepted: [
      code("function handleClick() {", "  console.log(\"Clicked\");", "}"),
      code("function handleClick() {", "  console.log('Clicked');", "}")
    ],
    required: ["function handleClick", "console.log", "Clicked"],
    explanation: "Before state, logging is a simple way to verify event flow."
  },
  {
    id: "events-9",
    moduleId: "events",
    level: "MCQ",
    type: "mcq",
    prompt: "Which onClick passes the item id to the handler without calling it during render?",
    choices: [
      "onClick={() => removeItem(id)}",
      "onClick={removeItem(id)}",
      "onClick={removeItem id}"
    ],
    answer: "onClick={() => removeItem(id)}",
    explanation: "Wrapping the call in an arrow function defers it until the click; removeItem(id) would run immediately."
  },
  {
    id: "events-10",
    moduleId: "events",
    level: "Complete",
    type: "fill",
    prompt: "Read what the user typed inside an input change handler.",
    snippet: "<input onChange={(e) => setName(__1__)} />",
    blanks: [{ label: "__1__", answers: ["e.target.value"] }],
    explanation: "The change event's target is the input element, and value is its current text."
  },
  {
    id: "typed-practice-1",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a complete Product component that receives title and price props and renders them in an article.",
    starter: code("function Product() {", "  return (", "    ", "  );", "}"),
    expected: code(
      "function Product({ title, price }) {",
      "  return (",
      "    <article>",
      "      <h2>{title}</h2>",
      "      <p>{price}</p>",
      "    </article>",
      "  );",
      "}"
    ),
    required: ["function Product", "{ title, price }", "<article>", "<h2>{title}</h2>", "<p>{price}</p>", "</article>"],
    explanation: "This combines components, props, destructuring, and JSX expressions."
  },
  {
    id: "typed-practice-2",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Users component that maps users to li elements using user.id as the key.",
    starter: code("function Users({ users }) {", "  return <ul>{}</ul>;", "}"),
    expected: code(
      "function Users({ users }) {",
      "  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;",
      "}"
    ),
    required: ["function Users", "{ users }", "users.map", "key={user.id}", "{user.name}"],
    explanation: "This is the core list-rendering pattern in React."
  },
  {
    id: "typed-practice-3",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Status component that shows Online when online is true and Offline otherwise.",
    starter: code("function Status({ online }) {", "  return ", "}"),
    expected: code(
      "function Status({ online }) {",
      "  return online ? <p>Online</p> : <p>Offline</p>;",
      "}"
    ),
    required: ["function Status", "{ online }", "online", "?", "<p>Online</p>", ":", "<p>Offline</p>"],
    explanation: "A ternary can choose between two pieces of UI."
  },
  {
    id: "typed-practice-4",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write an App component that renders Header from ./components/Header.jsx.",
    starter: code("import ", "", "function App() {", "  return ", "}", "", "export default App;"),
    expected: code(
      "import Header from \"./components/Header.jsx\";",
      "",
      "function App() {",
      "  return <Header />;",
      "}",
      "",
      "export default App;"
    ),
    required: ["import Header from", "./components/Header.jsx", "function App", "return <Header />", "export default App"],
    explanation: "This combines relative imports, components, rendering, and default export."
  },
  {
    id: "typed-practice-5",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Create a ProfileCard component that receives a user object and renders user.name and user.age.",
    starter: code("function ProfileCard() {", "  return (", "    ", "  );", "}"),
    expected: code(
      "function ProfileCard({ user }) {",
      "  return (",
      "    <div>",
      "      <h2>{user.name}</h2>",
      "      <p>{user.age}</p>",
      "    </div>",
      "  );",
      "}"
    ),
    required: ["function ProfileCard", "{ user }", "<h2>{user.name}</h2>", "<p>{user.age}</p>"],
    explanation: "This checks object access and prop destructuring together."
  },
  {
    id: "typed-practice-6",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Toolbar component that returns a fragment with two buttons: Save and Cancel.",
    starter: code("function Toolbar() {", "  return (", "    ", "  );", "}"),
    expected: code(
      "function Toolbar() {",
      "  return (",
      "    <>",
      "      <button>Save</button>",
      "      <button>Cancel</button>",
      "    </>",
      "  );",
      "}"
    ),
    required: ["function Toolbar", "<>", "<button>Save</button>", "<button>Cancel</button>", "</>"],
    explanation: "Fragments let the component return sibling elements without an extra wrapper."
  },
  {
    id: "typed-practice-7",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a small main.jsx that imports createRoot and App, then renders App into root.",
    starter: code("import ", "import ", "", "createRoot("),
    expected: code(
      "import { createRoot } from \"react-dom/client\";",
      "import App from \"./App.jsx\";",
      "",
      "createRoot(document.getElementById(\"root\")).render(<App />);"
    ),
    required: ["import { createRoot }", "react-dom/client", "import App from", "./App.jsx", "document.getElementById", "root", ".render(<App />)"],
    explanation: "This is the standard bridge between React and the HTML root container."
  },
  {
    id: "typed-practice-8",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Notification component that renders a message only when message exists.",
    starter: code("function Notification({ message }) {", "  return ", "}"),
    expected: code(
      "function Notification({ message }) {",
      "  return <>{message && <p>{message}</p>}</>;",
      "}"
    ),
    required: ["function Notification", "{ message }", "message &&", "<p>{message}</p>"],
    explanation: "This combines props, fragments, JSX expressions, and && conditional rendering."
  },
  {
    id: "typed-practice-9",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Price component that receives an amount prop and renders <p>Total: {amount}</p>.",
    starter: "function Price",
    expected: code(
      "function Price({ amount }) {",
      "  return <p>Total: {amount}</p>;",
      "}"
    ),
    required: ["function Price", "amount", "<p>Total: {amount}</p>"],
    explanation: "Destructure the prop in the parameter list and embed it with curly braces."
  },
  {
    id: "typed-practice-10",
    moduleId: "typed-practice",
    level: "Typed Code",
    type: "code",
    prompt: "Write a LogoutButton component that renders a button with the text Logout and calls onLogout when clicked.",
    starter: "function LogoutButton",
    expected: code(
      "function LogoutButton({ onLogout }) {",
      "  return <button onClick={onLogout}>Logout</button>;",
      "}"
    ),
    required: ["function LogoutButton", "onLogout", "onClick={onLogout}", "Logout"],
    explanation: "Callback props connect child events to parent logic — pass the function itself to onClick."
  },
];
