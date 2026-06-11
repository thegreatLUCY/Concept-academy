const code = (...lines) => lines.join("\n");

// Guided React project: built step by step, each step verified by compiling
// and running the learner's JSX for real. Tests run after the learner's code
// in the same scope; they render components (__renderToHtml) or mount the app
// and click around, throwing an Error with a teaching message on failure.
export const reactProjects = [
  {
    id: "react-todo-app",
    track: "react",
    runtime: "react",
    level: "Interactive React",
    title: "Interactive Todo App",
    description:
      "Build a working todo list from a single component up to add, toggle, and clear-completed — the same app every React interview expects you to write.",
    steps: [
      {
        title: "The TodoItem component",
        instructions:
          "Every list starts with one item. Write a TodoItem component that receives a text prop and returns an <li> with className \"todo\" displaying that text.",
        starter: code(
          "function TodoItem({ text }) {",
          "  // return an <li className=\"todo\"> that shows the text prop",
          "}"
        ),
        tests: code(
          "const html = __renderToHtml(TodoItem, { text: \"Buy milk\" });",
          "if (!html.includes(\"<li\")) throw new Error(\"TodoItem should render an <li> element.\");",
          "if (!html.includes(\"Buy milk\")) throw new Error(\"TodoItem should display its text prop.\");",
          "if (!html.includes(\"todo\")) throw new Error('The <li> needs className=\"todo\".');"
        ),
        hint: "return <li className=\"todo\">{text}</li>;"
      },
      {
        title: "TodoList renders the array",
        instructions:
          "Write a TodoList component that receives a todos prop (an array of { id, text } objects), and returns a <ul> that maps each todo to a TodoItem — using todo.id as the key and passing todo.text as the text prop.",
        starter: code(
          "function TodoItem({ text }) {",
          "  return <li className=\"todo\">{text}</li>;",
          "}",
          "",
          "function TodoList({ todos }) {",
          "  // return a <ul> mapping todos to <TodoItem key={...} text={...} />",
          "}"
        ),
        tests: code(
          "const html = __renderToHtml(TodoList, { todos: [",
          "  { id: 1, text: \"Learn JSX\" },",
          "  { id: 2, text: \"Practice hooks\" }",
          "] });",
          "if (!html.includes(\"<ul\")) throw new Error(\"TodoList should render a <ul>.\");",
          "const items = (html.match(/<li/g) ?? []).length;",
          "if (items !== 2) throw new Error(`Expected 2 <li> items, found ${items}. Map over the todos prop.`);",
          "if (!html.includes(\"Learn JSX\") || !html.includes(\"Practice hooks\")) {",
          "  throw new Error(\"Each todo's text should appear in the list.\");",
          "}"
        ),
        hint: "return <ul>{todos.map((todo) => <TodoItem key={todo.id} text={todo.text} />)}</ul>;"
      },
      {
        title: "App state and adding todos",
        instructions:
          "Write the App component. It holds the todos in useState (start with the 3 todos in the starter), plus a draft string for a controlled <input>. Clicking the Add button appends { id: Date.now(), text: draft, completed: false } to the list and clears the input. Render the input, the button (with the text Add), and the TodoList.",
        starter: code(
          "function TodoItem({ text }) {",
          "  return <li className=\"todo\">{text}</li>;",
          "}",
          "",
          "function TodoList({ todos }) {",
          "  return (",
          "    <ul>",
          "      {todos.map((todo) => (",
          "        <TodoItem key={todo.id} text={todo.text} />",
          "      ))}",
          "    </ul>",
          "  );",
          "}",
          "",
          "const START_TODOS = [",
          "  { id: 1, text: \"Learn JSX\", completed: true },",
          "  { id: 2, text: \"Practice hooks\", completed: false },",
          "  { id: 3, text: \"Build the app\", completed: false }",
          "];",
          "",
          "function App() {",
          "  // useState(START_TODOS), useState(\"\") for the draft,",
          "  // a controlled input, an Add button, and <TodoList todos={todos} />",
          "}"
        ),
        tests: code(
          "const root = document.getElementById(\"root\");",
          "ReactDOM.flushSync(() => ReactDOM.createRoot(root).render(<App />));",
          "if (root.querySelectorAll(\"li\").length !== 3) throw new Error(\"App should start with the 3 todos from START_TODOS.\");",
          "const input = root.querySelector(\"input\");",
          "if (!input) throw new Error(\"App needs an <input> for the draft text.\");",
          "const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, \"value\").set;",
          "valueSetter.call(input, \"New task\");",
          "input.dispatchEvent(new Event(\"input\", { bubbles: true }));",
          "ReactDOM.flushSync(() => {});",
          "const addButton = [...root.querySelectorAll(\"button\")].find((b) => b.textContent.includes(\"Add\"));",
          "if (!addButton) throw new Error(\"App needs a button with the text Add.\");",
          "addButton.click();",
          "ReactDOM.flushSync(() => {});",
          "if (root.querySelectorAll(\"li\").length !== 4) throw new Error(\"Clicking Add should append the typed todo.\");",
          "if (!root.innerHTML.includes(\"New task\")) throw new Error(\"The new todo's text should appear in the list.\");",
          "if (input.value !== \"\") throw new Error(\"Adding a todo should clear the input (set draft back to '').\");"
        ),
        hint: "const [todos, setTodos] = useState(START_TODOS); const [draft, setDraft] = useState(\"\"); onChange={(e) => setDraft(e.target.value)}; onClick adds [...todos, { id: Date.now(), text: draft, completed: false }] then setDraft(\"\")."
      },
      {
        title: "Toggle a todo by clicking it",
        instructions:
          "Make todos clickable. TodoItem now receives the whole todo plus an onToggle callback: clicking the <li> calls onToggle(todo.id), and its className is \"todo done\" when todo.completed is true, otherwise \"todo\". In App, toggling maps the array immutably, flipping completed for the matching id. TodoList passes both props through.",
        starter: code(
          "const START_TODOS = [",
          "  { id: 1, text: \"Learn JSX\", completed: true },",
          "  { id: 2, text: \"Practice hooks\", completed: false },",
          "  { id: 3, text: \"Build the app\", completed: false }",
          "];",
          "",
          "function TodoItem({ todo, onToggle }) {",
          "  // li with onClick={() => onToggle(todo.id)} and",
          "  // className todo.completed ? \"todo done\" : \"todo\"",
          "}",
          "",
          "function TodoList({ todos, onToggle }) {",
          "  // map todos to <TodoItem key todo onToggle />",
          "}",
          "",
          "function App() {",
          "  const [todos, setTodos] = useState(START_TODOS);",
          "",
          "  function toggleTodo(id) {",
          "    // setTodos with .map — flip completed on the matching id",
          "  }",
          "",
          "  return <TodoList todos={todos} onToggle={toggleTodo} />;",
          "}"
        ),
        tests: code(
          "const root = document.getElementById(\"root\");",
          "ReactDOM.flushSync(() => ReactDOM.createRoot(root).render(<App />));",
          "let items = root.querySelectorAll(\"li\");",
          "if (items.length !== 3) throw new Error(\"Expected the 3 starting todos.\");",
          "if (!items[0].className.includes(\"done\")) throw new Error(\"'Learn JSX' starts completed — its li needs the done class.\");",
          "if (items[1].className.includes(\"done\")) throw new Error(\"'Practice hooks' starts NOT completed — no done class yet.\");",
          "items[1].click();",
          "ReactDOM.flushSync(() => {});",
          "items = root.querySelectorAll(\"li\");",
          "if (!items[1].className.includes(\"done\")) throw new Error(\"Clicking a todo should add the done class (flip completed in state).\");",
          "items[1].click();",
          "ReactDOM.flushSync(() => {});",
          "items = root.querySelectorAll(\"li\");",
          "if (items[1].className.includes(\"done\")) throw new Error(\"Clicking again should toggle it back off.\");"
        ),
        hint: "setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));"
      },
      {
        title: "Remaining counter and Clear completed",
        instructions:
          "Finish the app. Derive the number of NOT-completed todos during render and show it as \"N left\" (for the starting data that is \"2 left\"). Add a button with the text Clear completed that removes every completed todo with filter.",
        starter: code(
          "const START_TODOS = [",
          "  { id: 1, text: \"Learn JSX\", completed: true },",
          "  { id: 2, text: \"Practice hooks\", completed: false },",
          "  { id: 3, text: \"Build the app\", completed: false }",
          "];",
          "",
          "function TodoItem({ todo, onToggle }) {",
          "  return (",
          "    <li",
          "      className={todo.completed ? \"todo done\" : \"todo\"}",
          "      onClick={() => onToggle(todo.id)}",
          "    >",
          "      {todo.text}",
          "    </li>",
          "  );",
          "}",
          "",
          "function TodoList({ todos, onToggle }) {",
          "  return (",
          "    <ul>",
          "      {todos.map((todo) => (",
          "        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />",
          "      ))}",
          "    </ul>",
          "  );",
          "}",
          "",
          "function App() {",
          "  const [todos, setTodos] = useState(START_TODOS);",
          "",
          "  function toggleTodo(id) {",
          "    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));",
          "  }",
          "",
          "  // 1. derive remaining = todos that are not completed",
          "  // 2. render <p>{remaining} left</p>",
          "  // 3. add a <button> Clear completed that filters them out",
          "",
          "  return <TodoList todos={todos} onToggle={toggleTodo} />;",
          "}"
        ),
        tests: code(
          "const root = document.getElementById(\"root\");",
          "ReactDOM.flushSync(() => ReactDOM.createRoot(root).render(<App />));",
          "if (!root.textContent.includes(\"2 left\")) throw new Error('Derive the remaining count — the starting data should show \"2 left\".');",
          "const clearButton = [...root.querySelectorAll(\"button\")].find((b) => b.textContent.includes(\"Clear completed\"));",
          "if (!clearButton) throw new Error(\"Add a button with the text Clear completed.\");",
          "clearButton.click();",
          "ReactDOM.flushSync(() => {});",
          "if (root.querySelectorAll(\"li\").length !== 2) throw new Error(\"Clear completed should remove completed todos with filter.\");",
          "if (root.innerHTML.includes(\"Learn JSX\")) throw new Error(\"'Learn JSX' was completed — it should be gone after clearing.\");",
          "if (!root.textContent.includes(\"2 left\")) throw new Error(\"The counter should still read 2 left — derived values update automatically.\");"
        ),
        hint: "const remaining = todos.filter((t) => !t.completed).length; and onClick={() => setTodos(todos.filter((t) => !t.completed))}."
      }
    ]
  }
];
