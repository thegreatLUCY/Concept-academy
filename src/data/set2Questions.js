const code = (...lines) => lines.join("\n");

export const set2Modules = [
  { id: "set2-hooks-rules", setId: "set2", title: "Rules of Hooks" },
  { id: "set2-state-basics", setId: "set2", title: "useState and Re-rendering" },
  { id: "set2-batching-stale", setId: "set2", title: "Batching and Stale State" },
  { id: "set2-events-state", setId: "set2", title: "Events with State" },
  { id: "set2-controlled-forms", setId: "set2", title: "Controlled Forms" },
  { id: "set2-object-array-state", setId: "set2", title: "Object and Array State" },
  { id: "set2-derived-conditional", setId: "set2", title: "Derived State and Conditional UI" },
  { id: "set2-composition-children", setId: "set2", title: "Composition and children" },
  { id: "set2-callbacks-lifting", setId: "set2", title: "Callbacks, Lifting State, Props vs State" },
  { id: "set2-lists-keys-reset", setId: "set2", title: "Interactive Lists, Keys, and State Reset" },
  { id: "set2-effects", setId: "set2", title: "useEffect Fundamentals" },
  { id: "set2-effects-escape", setId: "set2", title: "Effect Escape Hatches, StrictMode, Cleanup" },
  { id: "set2-fetch-storage", setId: "set2", title: "Fetching and localStorage" },
  { id: "set2-debug-mini", setId: "set2", title: "Debugging and Mini Programs" }
];

export const set2Questions = [
  {
    id: "set2-hooks-rules-1",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "MCQ",
    type: "mcq",
    prompt: "Where should React hooks such as useState and useEffect be called?",
    choices: [
      "At the top level of a function component or custom hook",
      "Inside any if statement that needs state",
      "Only inside event handlers"
    ],
    answer: "At the top level of a function component or custom hook",
    explanation: "Hooks must be called in the same order on every render, so they belong at the top level."
  },
  {
    id: "set2-hooks-rules-2",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "True/False",
    type: "tf",
    prompt: "Calling useState inside a for loop is safe if the loop always runs three times.",
    answer: false,
    explanation: "Hooks should not be called inside loops. React depends on a stable hook call order."
  },
  {
    id: "set2-hooks-rules-3",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "MCQ",
    type: "mcq",
    prompt: "Which component follows the Rules of Hooks?",
    choices: [
      "function App() { const [count, setCount] = useState(0); return <p>{count}</p>; }",
      "function App() { if (ready) { useState(0); } return null; }",
      "function App() { function click() { useState(0); } return <button onClick={click}>Go</button>; }"
    ],
    answer: "function App() { const [count, setCount] = useState(0); return <p>{count}</p>; }",
    explanation: "The hook is called directly in the component body, before any conditional return path changes hook order."
  },
  {
    id: "set2-hooks-rules-4",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "Complete",
    type: "fill",
    prompt: "Complete the import needed before using useState.",
    snippet: "import { __1__ } from \"react\";",
    blanks: [{ label: "__1__", answers: ["useState"] }],
    explanation: "useState is a named export from react."
  },
  {
    id: "set2-hooks-rules-5",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "MCQ",
    type: "mcq",
    prompt: "Why are hooks not allowed inside nested functions?",
    choices: [
      "React would not be able to guarantee the same hook order on each render",
      "Nested functions cannot read props",
      "JavaScript prevents functions from containing other functions"
    ],
    answer: "React would not be able to guarantee the same hook order on each render",
    explanation: "The hook order is how React connects a hook call to its stored state."
  },
  {
    id: "set2-hooks-rules-6",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "True/False",
    type: "tf",
    prompt: "Custom hooks must also follow the Rules of Hooks.",
    answer: true,
    explanation: "A custom hook can call hooks, but it must still call them unconditionally at the top level."
  },
  {
    id: "set2-hooks-rules-7",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "MCQ",
    type: "mcq",
    prompt: "Which name looks like a valid custom hook name?",
    choices: ["useWindowWidth", "windowWidthHook", "getWindowWidth"],
    answer: "useWindowWidth",
    explanation: "Custom hooks should start with use so React tooling can recognize hook rules."
  },
  {
    id: "set2-hooks-rules-8",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "Typed Code",
    type: "code",
    prompt: "Write the first line of a component that creates visible state with an initial value of true.",
    starter: "function Panel() {\n  ",
    expected: "const [visible, setVisible] = useState(true);",
    required: ["const [visible, setVisible]", "useState(true)"],
    explanation: "The hook is called at the top level of the component body."
  },
  {
    id: "set2-hooks-rules-9",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "MCQ",
    type: "mcq",
    prompt: "Between renders, how does React know which useState call matches which stored state value?",
    choices: [
      "By the order the hooks are called in",
      "By the variable names you assign the state to",
      "By a string id you pass to useState"
    ],
    answer: "By the order the hooks are called in",
    explanation: "React tracks hooks by call order — that is exactly why hooks must never run conditionally."
  },
  {
    id: "set2-hooks-rules-10",
    setId: "set2",
    moduleId: "set2-hooks-rules",
    level: "True/False",
    type: "tf",
    prompt: "You may call useState inside an onClick handler as long as the component has already rendered once.",
    answer: false,
    explanation: "Hooks only run at the top level of a component or custom hook during render — never inside handlers."
  },
  {
    id: "set2-state-basics-1",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "MCQ",
    type: "mcq",
    prompt: "What does useState return?",
    choices: [
      "An array with the current state value and a setter function",
      "An object with render and update methods",
      "Only the current state value"
    ],
    answer: "An array with the current state value and a setter function",
    explanation: "The common pattern is const [value, setValue] = useState(initialValue)."
  },
  {
    id: "set2-state-basics-2",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "Complete",
    type: "fill",
    prompt: "Complete the counter state declaration.",
    snippet: "const [__1__, __2__] = useState(0);",
    blanks: [
      { label: "__1__", answers: ["count"] },
      { label: "__2__", answers: ["setCount"] }
    ],
    explanation: "The first value is state, and the second value updates that state."
  },
  {
    id: "set2-state-basics-3",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "True/False",
    type: "tf",
    prompt: "Changing a normal local variable inside a component automatically updates the UI.",
    answer: false,
    explanation: "React re-renders when state or props change, not when ordinary local variables are reassigned."
  },
  {
    id: "set2-state-basics-4",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "MCQ",
    type: "mcq",
    prompt: "Which line asks React to update state and re-render?",
    choices: ["setCount(count + 1);", "count = count + 1;", "return count + 1;"],
    answer: "setCount(count + 1);",
    explanation: "State setter functions schedule an update."
  },
  {
    id: "set2-state-basics-5",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "Complete",
    type: "fill",
    prompt: "Complete the state declaration for a text input.",
    snippet: "const [name, __1__] = useState(\"\");",
    blanks: [{ label: "__1__", answers: ["setName"] }],
    explanation: "Setter names usually start with set followed by the state name."
  },
  {
    id: "set2-state-basics-6",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "MCQ",
    type: "mcq",
    prompt: "What usually causes a React component to re-render?",
    choices: [
      "Calling a state setter for that component or receiving new props",
      "Adding a comment in the file",
      "Declaring a const variable"
    ],
    answer: "Calling a state setter for that component or receiving new props",
    explanation: "State and props are the main inputs React tracks for rendering."
  },
  {
    id: "set2-state-basics-7",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "Complete",
    type: "fill",
    prompt: "Complete the button that increments count.",
    snippet: "<button onClick={() => __1__(count + 1)}>Add</button>",
    blanks: [{ label: "__1__", answers: ["setCount"] }],
    explanation: "The event handler calls the setter to request a state update."
  },
  {
    id: "set2-state-basics-9",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "True/False",
    type: "tf",
    prompt: "The setter function returned by useState replaces the old state value with a new one.",
    answer: true,
    explanation: "For primitive state, the setter receives the next value. For objects and arrays, you still provide a new object or array."
  },
  {
    id: "set2-state-basics-11",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "Typed Code",
    type: "code",
    prompt: "Write a LikeButton component with liked state starting as false and a button that shows Like.",
    starter: code("function LikeButton() {", "  ", "}"),
    expected: code(
      "function LikeButton() {",
      "  const [liked, setLiked] = useState(false);",
      "  return <button>Like</button>;",
      "}"
    ),
    required: ["function LikeButton", "const [liked, setLiked]", "useState(false)", "return <button>Like</button>"],
    explanation: "This checks the basic shape of state inside a component."
  },
  {
    id: "set2-state-basics-12",
    setId: "set2",
    moduleId: "set2-state-basics",
    level: "Typed Code",
    type: "code",
    prompt: "Write one line that toggles a boolean state variable named open.",
    starter: "setOpen(",
    expected: "setOpen(!open);",
    required: ["setOpen", "!open"],
    explanation: "This works for simple toggles, though functional updates are safer when the new value depends on previous state."
  },
  {
    id: "set2-batching-stale-1",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "MCQ",
    type: "mcq",
    prompt: "What does it mean that React batches state updates?",
    choices: [
      "React can group multiple state updates before re-rendering",
      "React stores state only in arrays",
      "React prevents multiple buttons on a page"
    ],
    answer: "React can group multiple state updates before re-rendering",
    explanation: "Batching helps React avoid unnecessary renders."
  },
  {
    id: "set2-batching-stale-2",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "MCQ",
    type: "mcq",
    prompt: "count is 0 when a click handler runs these three lines. What is count on the next render?",
    snippet: code(
      "setCount(count + 1);",
      "setCount(count + 1);",
      "setCount(count + 1);"
    ),
    choices: ["1", "3", "React crashes"],
    answer: "1",
    explanation: "Each line reads the same count value from that render, so they all request 1."
  },
  {
    id: "set2-batching-stale-3",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "Complete",
    type: "fill",
    prompt: "Complete the safer functional state update.",
    snippet: "setCount(__1__ => __1__ + 1);",
    blanks: [{ label: "__1__", answers: ["prev", "c", "count"] }],
    explanation: "The updater function receives the latest pending state value."
  },
  {
    id: "set2-batching-stale-5",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "True/False",
    type: "tf",
    prompt: "Functional state updates are helpful when the next state depends on the previous state.",
    answer: true,
    explanation: "This is the exact situation where prev => next is safest."
  },
  {
    id: "set2-batching-stale-6",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "MCQ",
    type: "mcq",
    prompt: "What is stale state?",
    choices: [
      "A value captured from an older render and used later",
      "State stored in package.json",
      "A state value that is always an object"
    ],
    answer: "A value captured from an older render and used later",
    explanation: "Closures can hold onto values from the render in which they were created."
  },
  {
    id: "set2-batching-stale-8",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "Complete",
    type: "fill",
    prompt: "Complete the interval-safe increment.",
    snippet: code(
      "setInterval(() => {",
      "  setCount(__1__ => __1__ + 1);",
      "}, 1000);"
    ),
    blanks: [{ label: "__1__", answers: ["prev", "c", "n"] }],
    explanation: "Use a functional update inside delayed callbacks like timers."
  },
  {
    id: "set2-batching-stale-10",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "MCQ",
    type: "mcq",
    prompt: "Why can console.log(count) right after setCount(count + 1) show the old value?",
    choices: [
      "The log runs in the same render before React has produced the next render",
      "console.log cannot print numbers",
      "useState only works after refresh"
    ],
    answer: "The log runs in the same render before React has produced the next render",
    explanation: "State variables are snapshots for a render."
  },
  {
    id: "set2-batching-stale-11",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "Complete",
    type: "fill",
    prompt: "Fix this state update so it always uses the latest pending value.",
    snippet: "setScore(__1__ => __1__ + points);",
    blanks: [{ label: "__1__", answers: ["prev", "s", "score"] }],
    explanation: "The parameter represents the previous pending state."
  },
  {
    id: "set2-batching-stale-13",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "Typed Code",
    type: "code",
    prompt: "Write three state updates that reliably add 3 to count.",
    starter: code("setCount(", "setCount(", "setCount("),
    expected: code(
      "setCount(c => c + 1);",
      "setCount(c => c + 1);",
      "setCount(c => c + 1);"
    ),
    required: ["setCount", "=>", "+ 1"],
    explanation: "Functional updates compose correctly in a batch."
  },
  {
    id: "set2-batching-stale-14",
    setId: "set2",
    moduleId: "set2-batching-stale",
    level: "Typed Code",
    type: "code",
    prompt: "Write a safe timer increment body using setCount.",
    starter: code("setInterval(() => {", "  ", "}, 1000);"),
    expected: code(
      "setInterval(() => {",
      "  setCount(count => count + 1);",
      "}, 1000);"
    ),
    required: ["setInterval", "setCount", "=>", "+ 1"],
    explanation: "Timers are a classic place where stale closures appear."
  },
  {
    id: "set2-events-state-1",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which button changes state only after the user clicks?",
    choices: [
      "<button onClick={handleClick}>Click</button>",
      "<button onClick={handleClick()}>Click</button>",
      "<button click={handleClick}>Click</button>"
    ],
    answer: "<button onClick={handleClick}>Click</button>",
    explanation: "Pass the function reference. Calling handleClick() runs it during render."
  },
  {
    id: "set2-events-state-2",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "Complete",
    type: "fill",
    prompt: "Complete the inline click handler that toggles open.",
    snippet: "<button onClick={() => __1__(!open)}>Toggle</button>",
    blanks: [{ label: "__1__", answers: ["setOpen"] }],
    explanation: "Inline arrow functions are useful for small handlers and passing arguments."
  },
  {
    id: "set2-events-state-3",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "MCQ",
    type: "mcq",
    prompt: "How do you pass an id to a delete handler from a button?",
    choices: [
      "<button onClick={() => onDelete(id)}>Delete</button>",
      "<button onClick={onDelete(id)}>Delete</button>",
      "<button onClick={id => onDelete}>Delete</button>"
    ],
    answer: "<button onClick={() => onDelete(id)}>Delete</button>",
    explanation: "The arrow function delays the call until the click happens."
  },
  {
    id: "set2-events-state-4",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "True/False",
    type: "tf",
    prompt: "A click handler can call a state setter.",
    answer: true,
    explanation: "Events are the most common place to update state."
  },
  {
    id: "set2-events-state-5",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "Complete",
    type: "fill",
    prompt: "Complete the handler that shows a panel.",
    snippet: code(
      "function handleOpen() {",
      "  __1__(true);",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["setOpen"] }],
    explanation: "Handlers are ordinary functions that can request state changes."
  },
  {
    id: "set2-events-state-6",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which React event name is correct for form submission?",
    choices: ["onSubmit", "onsubmit", "submitOn"],
    answer: "onSubmit",
    explanation: "React event props use camelCase."
  },
  {
    id: "set2-events-state-7",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which pattern is better for a long or reused click behavior?",
    choices: [
      "Define a named handler function and pass it to onClick",
      "Put every line of logic inside JSX forever",
      "Use a string event handler"
    ],
    answer: "Define a named handler function and pass it to onClick",
    explanation: "Named handlers keep JSX readable and are easier to test mentally."
  },
  {
    id: "set2-events-state-8",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "Complete",
    type: "fill",
    prompt: "Complete the counter click handler using a functional update.",
    snippet: code(
      "function handleAdd() {",
      "  setCount(c => c __1__ 1);",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["+"] }],
    explanation: "Functional updates are safe when incrementing from the previous value."
  },
  {
    id: "set2-events-state-11",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "Typed Code",
    type: "code",
    prompt: "Write a button that calls setOpen(true) when clicked.",
    starter: "<button ",
    expected: "<button onClick={() => setOpen(true)}>Open</button>",
    required: ["<button", "onClick", "setOpen(true)", "Open", "</button>"],
    explanation: "The arrow function calls setOpen only when the click happens."
  },
  {
    id: "set2-events-state-12",
    setId: "set2",
    moduleId: "set2-events-state",
    level: "Typed Code",
    type: "code",
    prompt: "Write a handler named handleReset that sets count to 0.",
    starter: code("function handleReset() {", "  ", "}"),
    expected: code("function handleReset() {", "  setCount(0);", "}"),
    required: ["function handleReset", "setCount(0)"],
    explanation: "Handlers can set a fixed next state value."
  },
  {
    id: "set2-controlled-forms-1",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "MCQ",
    type: "mcq",
    prompt: "What is a controlled input in React?",
    choices: [
      "An input whose value is driven by React state",
      "An input that cannot be typed into",
      "An input stored in node_modules"
    ],
    answer: "An input whose value is driven by React state",
    explanation: "Controlled inputs use state as the source of truth."
  },
  {
    id: "set2-controlled-forms-2",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "Complete",
    type: "fill",
    prompt: "Complete the controlled text input.",
    snippet: "<input value={name} onChange={e => __1__(e.target.__2__)} />",
    blanks: [
      { label: "__1__", answers: ["setName"] },
      { label: "__2__", answers: ["value"] }
    ],
    explanation: "Text inputs read from event.target.value."
  },
  {
    id: "set2-controlled-forms-3",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "MCQ",
    type: "mcq",
    prompt: "Which prop controls a checkbox in React?",
    choices: ["checked", "value", "selectedText"],
    answer: "checked",
    explanation: "Controlled checkboxes and radios use checked, not value."
  },
  {
    id: "set2-controlled-forms-4",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "Complete",
    type: "fill",
    prompt: "Complete the controlled checkbox.",
    snippet: "<input type=\"checkbox\" __1__={subscribed} onChange={e => setSubscribed(e.target.__2__)} />",
    blanks: [
      { label: "__1__", answers: ["checked"] },
      { label: "__2__", answers: ["checked"] }
    ],
    explanation: "For checkboxes, both the prop and event value are based on checked."
  },
  {
    id: "set2-controlled-forms-5",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "MCQ",
    type: "mcq",
    prompt: "Which prop controls the selected option in a select element?",
    choices: ["value", "checked", "optionIndexOnly"],
    answer: "value",
    explanation: "A controlled select receives a value prop and an onChange handler."
  },
  {
    id: "set2-controlled-forms-8",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "True/False",
    type: "tf",
    prompt: "A controlled input with value but no onChange can become read-only.",
    answer: true,
    explanation: "If React controls the value, you normally need onChange to update state."
  },
  {
    id: "set2-controlled-forms-9",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "Complete",
    type: "fill",
    prompt: "Prevent the browser's default form submit refresh.",
    snippet: code(
      "function handleSubmit(event) {",
      "  event.__1__();",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["preventDefault"] }],
    explanation: "preventDefault keeps the single-page React app in control."
  },
  {
    id: "set2-controlled-forms-10",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "MCQ",
    type: "mcq",
    prompt: "Which handler is attached to a form, not a button click, for submit behavior?",
    choices: ["onSubmit", "onChange", "onInputValue"],
    answer: "onSubmit",
    explanation: "A form's onSubmit catches Enter key submission and submit button clicks."
  },
  {
    id: "set2-controlled-forms-14",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "MCQ",
    type: "mcq",
    prompt: "Which is the best way to read typed text from an input change event?",
    choices: ["event.target.value", "event.value.target", "input.valueFromReact"],
    answer: "event.target.value",
    explanation: "The DOM input element is event.target, and its text is value."
  },
  {
    id: "set2-object-array-state-1",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which object state update preserves the other user fields?",
    choices: [
      "setUser({ ...user, name: \"Ali\" });",
      "user.name = \"Ali\";",
      "setUser({ name: \"Ali\" });"
    ],
    answer: "setUser({ ...user, name: \"Ali\" });",
    explanation: "Spread copies existing fields, then name is replaced."
  },
  {
    id: "set2-object-array-state-2",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "True/False",
    type: "tf",
    prompt: "Directly mutating an object in state can prevent React from seeing a meaningful change.",
    answer: true,
    explanation: "React state should be treated as immutable. Create a new object or array."
  },
  {
    id: "set2-object-array-state-3",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "Complete",
    type: "fill",
    prompt: "Complete the object update that changes only age.",
    snippet: "setUser({ __1__user, age: 21 });",
    blanks: [{ label: "__1__", answers: ["..."] }],
    explanation: "The spread operator copies the current object fields."
  },
  {
    id: "set2-object-array-state-4",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which line adds a todo without mutating the array?",
    choices: [
      "setTodos([...todos, newTodo]);",
      "todos.push(newTodo); setTodos(todos);",
      "setTodos(todos.push(newTodo));"
    ],
    answer: "setTodos([...todos, newTodo]);",
    explanation: "This creates a new array containing the old items and the new item."
  },
  {
    id: "set2-object-array-state-5",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "Complete",
    type: "fill",
    prompt: "Complete the deletion of a todo by id.",
    snippet: "setTodos(todos.__1__(todo => todo.id !== id));",
    blanks: [{ label: "__1__", answers: ["filter"] }],
    explanation: "filter returns a new array with only the items that pass the condition."
  },
  {
    id: "set2-object-array-state-6",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which array method is useful for updating one item while keeping the rest?",
    choices: ["map", "push", "pop"],
    answer: "map",
    explanation: "map can return a changed item for one id and unchanged items for the rest."
  },
  {
    id: "set2-object-array-state-8",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Why is array.push usually wrong for React state?",
    choices: [
      "It mutates the existing array",
      "It creates too many components",
      "It only works with strings"
    ],
    answer: "It mutates the existing array",
    explanation: "State updates should provide a new array reference."
  },
  {
    id: "set2-object-array-state-10",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "MCQ",
    type: "mcq",
    prompt: "Which update is safest when adding to an array based on previous state?",
    choices: [
      "setItems(items => [...items, newItem]);",
      "items.push(newItem);",
      "setItems(items.push(newItem));"
    ],
    answer: "setItems(items => [...items, newItem]);",
    explanation: "It combines immutability with a functional update."
  },
  {
    id: "set2-object-array-state-15",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "Typed Code",
    type: "code",
    prompt: "Write a state update that adds newTodo to todos without mutation.",
    starter: "setTodos(",
    expected: "setTodos(todos => [...todos, newTodo]);",
    required: ["setTodos", "=>", "...todos", "newTodo"],
    explanation: "Functional update plus spread is robust for array additions."
  },
  {
    id: "set2-object-array-state-16",
    setId: "set2",
    moduleId: "set2-object-array-state",
    level: "Typed Code",
    type: "code",
    prompt: "Write a state update that changes user.name to Ali while keeping other fields.",
    starter: "setUser(",
    expected: "setUser(user => ({ ...user, name: \"Ali\" }));",
    required: ["setUser", "=>", "...user", "name", "Ali"],
    explanation: "Return a new object with copied fields and the changed name."
  },
  {
    id: "set2-derived-conditional-1",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "MCQ",
    type: "mcq",
    prompt: "What is derived state?",
    choices: [
      "A value calculated from existing state or props",
      "State that must always live in localStorage",
      "A setter function returned by useEffect"
    ],
    answer: "A value calculated from existing state or props",
    explanation: "Examples include totals, counts, and filtered arrays."
  },
  {
    id: "set2-derived-conditional-2",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "MCQ",
    type: "mcq",
    prompt: "Which value is better derived during render instead of stored separately?",
    choices: [
      "const itemCount = items.length;",
      "const [items, setItems] = useState([]);",
      "const [query, setQuery] = useState(\"\");"
    ],
    answer: "const itemCount = items.length;",
    explanation: "itemCount can be calculated from items, so it does not need separate state."
  },
  {
    id: "set2-derived-conditional-3",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "True/False",
    type: "tf",
    prompt: "Storing derived values can create bugs if the source state and derived state get out of sync.",
    answer: true,
    explanation: "If a value can be calculated from current data, calculating it avoids synchronization bugs."
  },
  {
    id: "set2-derived-conditional-4",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "Complete",
    type: "fill",
    prompt: "Complete the derived completed count.",
    snippet: "const completedCount = todos.__1__(todo => todo.done).length;",
    blanks: [{ label: "__1__", answers: ["filter"] }],
    explanation: "Filtering done todos and reading length derives a count from existing state."
  },
  {
    id: "set2-derived-conditional-5",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "MCQ",
    type: "mcq",
    prompt: "Which UI state combination is common for data screens?",
    choices: [
      "loading, error, empty, success",
      "package, install, lock, node",
      "class, constructor, super, extends only"
    ],
    answer: "loading, error, empty, success",
    explanation: "Real interfaces need to represent several data states."
  },
  {
    id: "set2-derived-conditional-6",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "Complete",
    type: "fill",
    prompt: "Complete a conditional render for an empty list.",
    snippet: "{items.length === 0 __1__ <p>No items</p>}",
    blanks: [{ label: "__1__", answers: ["&&"] }],
    explanation: "&& works well for one-sided conditional UI."
  },
  {
    id: "set2-derived-conditional-7",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "MCQ",
    type: "mcq",
    prompt: "Which JSX is best when you need loading UI or content UI?",
    choices: [
      "{isLoading ? <Spinner /> : <Content />}",
      "{isLoading && <Spinner /> : <Content />}",
      "{if isLoading then <Spinner /> else <Content />}"
    ],
    answer: "{isLoading ? <Spinner /> : <Content />}",
    explanation: "Use a ternary when both branches have UI."
  },
  {
    id: "set2-derived-conditional-10",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "MCQ",
    type: "mcq",
    prompt: "Which is a good derived total for cart items with price and quantity?",
    choices: [
      "items.reduce((sum, item) => sum + item.price * item.quantity, 0)",
      "setTotal(total + 1) on every render",
      "items.push(total)"
    ],
    answer: "items.reduce((sum, item) => sum + item.price * item.quantity, 0)",
    explanation: "A total can be computed from the current cart items."
  },
  {
    id: "set2-derived-conditional-11",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "Typed Code",
    type: "code",
    prompt: "Write a derived variable named visibleTodos that filters todos by query.",
    starter: "const visibleTodos = ",
    expected: "const visibleTodos = todos.filter(todo => todo.text.includes(query));",
    required: ["const visibleTodos", "todos.filter", "todo.text.includes(query)"],
    explanation: "Filtering can happen during render when it is derived from todos and query."
  },
  {
    id: "set2-derived-conditional-12",
    setId: "set2",
    moduleId: "set2-derived-conditional",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that shows <p>Empty</p> only when items.length is 0.",
    starter: "{",
    expected: "{items.length === 0 && <p>Empty</p>}",
    required: ["items.length", "=== 0", "&&", "<p>Empty</p>"],
    explanation: "This is a common empty-state pattern."
  },
  {
    id: "set2-composition-children-1",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "MCQ",
    type: "mcq",
    prompt: "What does component composition mean?",
    choices: [
      "Building larger UI by combining smaller components",
      "Putting every feature inside one component",
      "Changing package-lock.json by hand"
    ],
    answer: "Building larger UI by combining smaller components",
    explanation: "Composition is central to React's component model."
  },
  {
    id: "set2-composition-children-2",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "MCQ",
    type: "mcq",
    prompt: "Which component is likely reusable?",
    choices: [
      "A Button component that receives label and onClick props",
      "One App component with all code duplicated",
      "A component that only works with one hardcoded user forever"
    ],
    answer: "A Button component that receives label and onClick props",
    explanation: "Reusable components accept props for the parts that change."
  },
  {
    id: "set2-composition-children-3",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "Complete",
    type: "fill",
    prompt: "Receive and render children in a wrapper component.",
    snippet: code(
      "function Card({ __1__ }) {",
      "  return <section>{__1__}</section>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["children"] }],
    explanation: "children contains JSX placed between component tags."
  },
  {
    id: "set2-composition-children-4",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "MCQ",
    type: "mcq",
    prompt: "In <Card><h2>Hello</h2></Card>, what does Card receive?",
    choices: [
      "children containing <h2>Hello</h2>",
      "A prop named h2",
      "A state setter"
    ],
    answer: "children containing <h2>Hello</h2>",
    explanation: "Nested JSX becomes the children prop."
  },
  {
    id: "set2-composition-children-5",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "True/False",
    type: "tf",
    prompt: "A layout component can use children to wrap different page content.",
    answer: true,
    explanation: "children is perfect for cards, modals, layouts, and slots."
  },
  {
    id: "set2-composition-children-6",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "Complete",
    type: "fill",
    prompt: "Complete the reusable Alert component.",
    snippet: code(
      "function Alert({ type, children }) {",
      "  return <div className={type}>{__1__}</div>;",
      "}"
    ),
    blanks: [{ label: "__1__", answers: ["children"] }],
    explanation: "The component controls the wrapper while callers provide the inside content."
  },
  {
    id: "set2-composition-children-7",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "MCQ",
    type: "mcq",
    prompt: "Why split a large component into smaller components?",
    choices: [
      "To make UI easier to read, reuse, and test mentally",
      "To make React ignore state updates",
      "To avoid importing React"
    ],
    answer: "To make UI easier to read, reuse, and test mentally",
    explanation: "Smaller components can clarify responsibility."
  },
  {
    id: "set2-composition-children-8",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "True/False",
    type: "tf",
    prompt: "Props and children can be used together in the same component.",
    answer: true,
    explanation: "For example, <Modal title=\"Edit\">...</Modal> uses both title and children."
  },
  {
    id: "set2-composition-children-9",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "Typed Code",
    type: "code",
    prompt: "Write a Card component that renders children inside an article.",
    starter: code("function Card() {", "  return ", "}"),
    expected: code(
      "function Card({ children }) {",
      "  return <article>{children}</article>;",
      "}"
    ),
    required: ["function Card", "{ children }", "<article>{children}</article>"],
    explanation: "children makes wrapper components flexible."
  },
  {
    id: "set2-composition-children-10",
    setId: "set2",
    moduleId: "set2-composition-children",
    level: "Typed Code",
    type: "code",
    prompt: "Render Card with an h2 child that says Profile.",
    starter: "<Card>",
    expected: "<Card><h2>Profile</h2></Card>",
    required: ["<Card>", "<h2>Profile</h2>", "</Card>"],
    explanation: "The h2 becomes the Card component's children prop."
  },
  {
    id: "set2-callbacks-lifting-1",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "MCQ",
    type: "mcq",
    prompt: "What is a callback prop?",
    choices: [
      "A function passed to a child component through props",
      "A CSS class generated by React",
      "A special package.json script"
    ],
    answer: "A function passed to a child component through props",
    explanation: "Callback props let child components notify parents about events."
  },
  {
    id: "set2-callbacks-lifting-2",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "Complete",
    type: "fill",
    prompt: "Complete the child button that calls a callback prop.",
    snippet: "function DeleteButton({ onDelete }) { return <button onClick={__1__}>Delete</button>; }",
    blanks: [{ label: "__1__", answers: ["onDelete"] }],
    explanation: "The child does not delete by itself; it calls the function it received."
  },
  {
    id: "set2-callbacks-lifting-4",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "True/False",
    type: "tf",
    prompt: "A child component should mutate a parent's state variable directly.",
    answer: false,
    explanation: "The parent owns the state and passes callbacks to request changes."
  },
  {
    id: "set2-callbacks-lifting-5",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "MCQ",
    type: "mcq",
    prompt: "What does lifting state up mean?",
    choices: [
      "Moving shared state to the closest common parent",
      "Moving every state variable into index.html",
      "Changing state into props by renaming it"
    ],
    answer: "Moving shared state to the closest common parent",
    explanation: "When siblings need the same data, their parent often owns it."
  },
  {
    id: "set2-callbacks-lifting-6",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "MCQ",
    type: "mcq",
    prompt: "Two sibling components both need the selected user. Where should selectedUser probably live?",
    choices: [
      "In their closest shared parent",
      "Inside only one sibling with no callback",
      "Inside package-lock.json"
    ],
    answer: "In their closest shared parent",
    explanation: "The parent can pass the selected user down to both siblings."
  },
  {
    id: "set2-callbacks-lifting-7",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "Complete",
    type: "fill",
    prompt: "Pass a parent handler to a child as onToggle.",
    snippet: "<TodoItem todo={todo} __1__={handleToggle} />",
    blanks: [{ label: "__1__", answers: ["onToggle"] }],
    explanation: "The child can call props.onToggle or destructure onToggle."
  },
  {
    id: "set2-callbacks-lifting-8",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "MCQ",
    type: "mcq",
    prompt: "Which statement about props vs state is correct?",
    choices: [
      "Props are received from a parent; state is owned by the component",
      "Props and state are always the same thing",
      "State can only be used in child components"
    ],
    answer: "Props are received from a parent; state is owned by the component",
    explanation: "Props are inputs. State is local memory."
  },
  {
    id: "set2-callbacks-lifting-9",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "True/False",
    type: "tf",
    prompt: "Props are read-only from the receiving component's perspective.",
    answer: true,
    explanation: "A child should not assign to props. It asks the parent to change data through callbacks."
  },
  {
    id: "set2-callbacks-lifting-11",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "Typed Code",
    type: "code",
    prompt: "Write a child component line that calls onSelect(user.id) when clicked.",
    starter: "<button ",
    expected: "<button onClick={() => onSelect(user.id)}>Select</button>",
    required: ["<button", "onClick", "onSelect(user.id)", "Select", "</button>"],
    explanation: "Callback props let children send event details upward."
  },
  {
    id: "set2-callbacks-lifting-12",
    setId: "set2",
    moduleId: "set2-callbacks-lifting",
    level: "Typed Code",
    type: "code",
    prompt: "Write a TodoItem function signature that receives todo and onToggle props by destructuring.",
    starter: "function TodoItem(",
    expected: "function TodoItem({ todo, onToggle }) {",
    required: ["function TodoItem", "{ todo, onToggle }"],
    explanation: "Destructuring props is common for small reusable child components."
  },
  {
    id: "set2-lists-keys-reset-1",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "MCQ",
    type: "mcq",
    prompt: "Which key is best for an interactive todo list?",
    choices: ["todo.id", "Math.random()", "index when items can be deleted"],
    answer: "todo.id",
    explanation: "Stable ids keep item identity correct as the list changes."
  },
  {
    id: "set2-lists-keys-reset-2",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "True/False",
    type: "tf",
    prompt: "Using array index as a key can cause confusing state bugs when items are reordered or deleted.",
    answer: true,
    explanation: "React may preserve state by position, so unstable keys can attach state to the wrong item."
  },
  {
    id: "set2-lists-keys-reset-3",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "Complete",
    type: "fill",
    prompt: "Complete the dynamic todo item key.",
    snippet: "{todos.map(todo => <TodoItem __1__={todo.id} todo={todo} />)}",
    blanks: [{ label: "__1__", answers: ["key"] }],
    explanation: "A key belongs on the element created inside map."
  },
  {
    id: "set2-lists-keys-reset-4",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "MCQ",
    type: "mcq",
    prompt: "How does React decide whether to preserve state for a component?",
    choices: [
      "By its position in the tree, and by key when a key is provided",
      "Only by the component's file name",
      "Only by the text inside the component"
    ],
    answer: "By its position in the tree, and by key when a key is provided",
    explanation: "State is tied to a component's identity in the rendered tree."
  },
  {
    id: "set2-lists-keys-reset-5",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "MCQ",
    type: "mcq",
    prompt: "How can you intentionally reset a component's state?",
    choices: [
      "Render it with a different key",
      "Rename package.json",
      "Call the component function manually"
    ],
    answer: "Render it with a different key",
    explanation: "Changing a key tells React this is a different component instance."
  },
  {
    id: "set2-lists-keys-reset-6",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "Complete",
    type: "fill",
    prompt: "Complete the key that resets ProfileForm when selectedUserId changes.",
    snippet: "<ProfileForm __1__={selectedUserId} userId={selectedUserId} />",
    blanks: [{ label: "__1__", answers: ["key"] }],
    explanation: "A changing key recreates the component and resets its local state."
  },
  {
    id: "set2-lists-keys-reset-7",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "True/False",
    type: "tf",
    prompt: "Keys are only for removing console warnings and have no behavior impact.",
    answer: false,
    explanation: "Keys affect how React matches old and new children."
  },
  {
    id: "set2-lists-keys-reset-10",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "MCQ",
    type: "mcq",
    prompt: "If a list item has its own input state, why are stable keys important?",
    choices: [
      "They help React keep that input state attached to the correct item",
      "They make inputs uncontrolled",
      "They replace onChange"
    ],
    answer: "They help React keep that input state attached to the correct item",
    explanation: "Unstable keys can make local item state appear to jump between rows."
  },
  {
    id: "set2-lists-keys-reset-11",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that maps todos to TodoItem using todo.id as key and passes todo.",
    starter: "{todos.",
    expected: "{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}",
    required: ["todos.map", "<TodoItem", "key={todo.id}", "todo={todo}"],
    explanation: "Stable keys are essential for dynamic interactive lists."
  },
  {
    id: "set2-lists-keys-reset-12",
    setId: "set2",
    moduleId: "set2-lists-keys-reset",
    level: "Typed Code",
    type: "code",
    prompt: "Write a UserForm render that resets when user.id changes.",
    starter: "<UserForm ",
    expected: "<UserForm key={user.id} user={user} />",
    required: ["<UserForm", "key={user.id}", "user={user}"],
    explanation: "A key can intentionally reset preserved form state."
  },
  {
    id: "set2-effects-1",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "What is useEffect mainly for?",
    choices: [
      "Synchronizing a component with an external system",
      "Calculating every derived value",
      "Replacing event handlers"
    ],
    answer: "Synchronizing a component with an external system",
    explanation: "External systems include browser APIs, timers, network requests, subscriptions, and localStorage."
  },
  {
    id: "set2-effects-3",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "When does an effect with no dependency array run?",
    choices: [
      "After every render",
      "Only once after mount",
      "Never"
    ],
    answer: "After every render",
    explanation: "No dependency array means React runs the effect after every render."
  },
  {
    id: "set2-effects-4",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "When does an effect with [] run?",
    choices: [
      "After the component first mounts",
      "On every keypress automatically",
      "Only before package install"
    ],
    answer: "After the component first mounts",
    explanation: "An empty dependency array means the effect does not depend on reactive values."
  },
  {
    id: "set2-effects-5",
    setId: "set2",
    moduleId: "set2-effects",
    level: "Complete",
    type: "fill",
    prompt: "Run an effect when query changes.",
    snippet: code(
      "useEffect(() => {",
      "  console.log(query);",
      "}, [__1__]);"
    ),
    blanks: [{ label: "__1__", answers: ["query"] }],
    explanation: "Reactive values used by the effect should be listed as dependencies."
  },
  {
    id: "set2-effects-7",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "Which effect dependency is missing?",
    snippet: code(
      "useEffect(() => {",
      "  document.title = title;",
      "}, []);"
    ),
    choices: ["title", "document", "useEffect"],
    answer: "title",
    explanation: "The effect reads title, so title should be in the dependency array if it can change."
  },
  {
    id: "set2-effects-8",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "Why should the effect callback itself not be async?",
    choices: [
      "An async function returns a Promise, but effects should return nothing or a cleanup function",
      "Async JavaScript is not allowed in React projects",
      "Promises cannot be used inside components"
    ],
    answer: "An async function returns a Promise, but effects should return nothing or a cleanup function",
    explanation: "Define an async function inside the effect and call it."
  },
  {
    id: "set2-effects-9",
    setId: "set2",
    moduleId: "set2-effects",
    level: "Complete",
    type: "fill",
    prompt: "Complete the effect cleanup function shape.",
    snippet: code(
      "useEffect(() => {",
      "  const id = setInterval(tick, 1000);",
      "  __1__ () => clearInterval(id);",
      "}, []);"
    ),
    blanks: [{ label: "__1__", answers: ["return"] }],
    explanation: "Returning a function from an effect registers cleanup."
  },
  {
    id: "set2-effects-10",
    setId: "set2",
    moduleId: "set2-effects",
    level: "MCQ",
    type: "mcq",
    prompt: "What should an interval effect cleanup usually do?",
    choices: ["clearInterval(id)", "setInterval(id)", "delete useEffect"],
    answer: "clearInterval(id)",
    explanation: "Cleanup stops the interval when the component unmounts or before the effect re-runs."
  },
  {
    id: "set2-effects-13",
    setId: "set2",
    moduleId: "set2-effects",
    level: "Typed Code",
    type: "code",
    prompt: "Write an effect that updates document.title when title changes.",
    starter: "useEffect(() => {",
    expected: code(
      "useEffect(() => {",
      "  document.title = title;",
      "}, [title]);"
    ),
    required: ["useEffect", "document.title", "title", "[title]"],
    explanation: "The effect synchronizes the browser tab title with React state or props."
  },
  {
    id: "set2-effects-14",
    setId: "set2",
    moduleId: "set2-effects",
    level: "Typed Code",
    type: "code",
    prompt: "Write an interval effect that cleans itself up.",
    starter: "useEffect(() => {",
    expected: code(
      "useEffect(() => {",
      "  const id = setInterval(tick, 1000);",
      "  return () => clearInterval(id);",
      "}, []);"
    ),
    required: ["useEffect", "setInterval", "return", "clearInterval", "[]"],
    explanation: "Cleanup prevents duplicate timers and leaks."
  },
  {
    id: "set2-effects-escape-1",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "MCQ",
    type: "mcq",
    prompt: "Which task usually does not need useEffect?",
    choices: [
      "Calculating const total = items.length",
      "Starting an interval",
      "Writing to localStorage"
    ],
    answer: "Calculating const total = items.length",
    explanation: "Derived values can usually be calculated during render."
  },
  {
    id: "set2-effects-escape-2",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "True/False",
    type: "tf",
    prompt: "Effects are an escape hatch for syncing with systems outside React.",
    answer: true,
    explanation: "If normal rendering logic can handle it, you probably do not need an effect."
  },
  {
    id: "set2-effects-escape-3",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "MCQ",
    type: "mcq",
    prompt: "Which code is better than storing fullName with an effect?",
    choices: [
      "const fullName = firstName + \" \" + lastName;",
      "useEffect(() => setFullName(firstName + lastName), [firstName, lastName]);",
      "setFullName inside render"
    ],
    answer: "const fullName = firstName + \" \" + lastName;",
    explanation: "fullName is derived from existing state, so calculate it directly."
  },
  {
    id: "set2-effects-escape-5",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "MCQ",
    type: "mcq",
    prompt: "In development StrictMode, why might an effect appear to run twice on mount?",
    choices: [
      "React intentionally checks whether setup and cleanup are safe",
      "The browser clicked the button twice",
      "package-lock.json runs effects twice"
    ],
    answer: "React intentionally checks whether setup and cleanup are safe",
    explanation: "StrictMode can re-run effects in development to reveal cleanup bugs."
  },
  {
    id: "set2-effects-escape-7",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "MCQ",
    type: "mcq",
    prompt: "What makes StrictMode double setup safer for subscriptions?",
    choices: [
      "Returning cleanup that unsubscribes",
      "Removing the dependency array forever",
      "Calling the component manually"
    ],
    answer: "Returning cleanup that unsubscribes",
    explanation: "React can run setup, cleanup, then setup again without leaving duplicates."
  },
  {
    id: "set2-effects-escape-8",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "Complete",
    type: "fill",
    prompt: "Complete cleanup for a window event listener.",
    snippet: code(
      "useEffect(() => {",
      "  window.addEventListener(\"resize\", onResize);",
      "  return () => window.__1__(\"resize\", onResize);",
      "}, []);"
    ),
    blanks: [{ label: "__1__", answers: ["removeEventListener"] }],
    explanation: "Every subscription setup should have matching cleanup."
  },
  {
    id: "set2-effects-escape-9",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "MCQ",
    type: "mcq",
    prompt: "Which is the better place to update state after a user clicks?",
    choices: [
      "Inside the click handler",
      "Inside useEffect that watches every render",
      "Inside index.html"
    ],
    answer: "Inside the click handler",
    explanation: "If logic happens because of a specific event, put it in that event handler."
  },
  {
    id: "set2-effects-escape-12",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "Complete",
    type: "fill",
    prompt: "Complete a cleanup that cancels a timeout.",
    snippet: code(
      "const id = setTimeout(show, 500);",
      "return () => __1__(id);"
    ),
    blanks: [{ label: "__1__", answers: ["clearTimeout"] }],
    explanation: "Timeouts should be cleared when the effect is cleaned up."
  },
  {
    id: "set2-effects-escape-13",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "Typed Code",
    type: "code",
    prompt: "Write a derived fullName variable without useEffect.",
    starter: "const fullName = ",
    expected: "const fullName = `${firstName} ${lastName}`;",
    required: ["const fullName", "firstName", "lastName"],
    explanation: "No effect is needed because fullName is computed from current render data."
  },
  {
    id: "set2-effects-escape-14",
    setId: "set2",
    moduleId: "set2-effects-escape",
    level: "Typed Code",
    type: "code",
    prompt: "Write a resize listener effect with cleanup.",
    starter: "useEffect(() => {",
    expected: code(
      "useEffect(() => {",
      "  window.addEventListener(\"resize\", onResize);",
      "  return () => window.removeEventListener(\"resize\", onResize);",
      "}, []);"
    ),
    required: ["useEffect", "addEventListener", "resize", "return", "removeEventListener", "[]"],
    explanation: "This pattern remains safe even with StrictMode development checks."
  },
  {
    id: "set2-fetch-storage-1",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Where is basic data fetching commonly started in a component?",
    choices: [
      "Inside useEffect",
      "Directly inside JSX",
      "Inside package.json"
    ],
    answer: "Inside useEffect",
    explanation: "Fetching synchronizes the component with a network system outside React."
  },
  {
    id: "set2-fetch-storage-2",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Why should an effect not be declared as async directly?",
    choices: [
      "It would return a Promise instead of cleanup or nothing",
      "fetch cannot be used in React",
      "async functions cannot call setters"
    ],
    answer: "It would return a Promise instead of cleanup or nothing",
    explanation: "Create and call an async function inside the effect."
  },
  {
    id: "set2-fetch-storage-4",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Which states are commonly used for fetching data?",
    choices: [
      "data, loading, error",
      "class, extends, super",
      "checked, selected, textarea only"
    ],
    answer: "data, loading, error",
    explanation: "These states let the UI show progress, failure, and success."
  },
  {
    id: "set2-fetch-storage-6",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "Complete",
    type: "fill",
    prompt: "Complete the ignore flag cleanup pattern.",
    snippet: code(
      "useEffect(() => {",
      "  let ignore = false;",
      "  fetchUser().then(user => {",
      "    if (!ignore) setUser(user);",
      "  });",
      "  return () => { ignore = __1__; };",
      "}, [userId]);"
    ),
    blanks: [{ label: "__1__", answers: ["true"] }],
    explanation: "Cleanup flips ignore so older requests do not update state later."
  },
  {
    id: "set2-fetch-storage-7",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "What problem can the ignore flag solve in fetching effects?",
    choices: [
      "An old request overwriting newer data",
      "A missing CSS class",
      "A broken import path"
    ],
    answer: "An old request overwriting newer data",
    explanation: "When userId changes quickly, an older slower response can arrive last."
  },
  {
    id: "set2-fetch-storage-9",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Which browser API stores small strings across page reloads?",
    choices: ["localStorage", "useState only", "createRoot"],
    answer: "localStorage",
    explanation: "localStorage persists string data in the browser."
  },
  {
    id: "set2-fetch-storage-11",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Why use JSON.stringify before saving an array to localStorage?",
    choices: [
      "localStorage stores strings",
      "React state can only be JSON",
      "useEffect cannot read arrays"
    ],
    answer: "localStorage stores strings",
    explanation: "Arrays and objects need to be converted to strings for storage."
  },
  {
    id: "set2-fetch-storage-13",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "MCQ",
    type: "mcq",
    prompt: "Which useState initializer avoids reading localStorage on every render?",
    choices: [
      "useState(() => JSON.parse(localStorage.getItem(\"todos\") || \"[]\"))",
      "useState(JSON.parse(localStorage.getItem(\"todos\") || \"[]\"))",
      "useState(localStorage.setItem(\"todos\", []))"
    ],
    answer: "useState(() => JSON.parse(localStorage.getItem(\"todos\") || \"[]\"))",
    explanation: "A function initializer runs only for the initial state setup."
  },
  {
    id: "set2-fetch-storage-15",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "Typed Code",
    type: "code",
    prompt: "Write an effect that saves theme to localStorage whenever theme changes.",
    starter: "useEffect(() => {",
    expected: code(
      "useEffect(() => {",
      "  localStorage.setItem(\"theme\", theme);",
      "}, [theme]);"
    ),
    required: ["useEffect", "localStorage.setItem", "theme", "[theme]"],
    explanation: "This syncs React state to an external browser storage system."
  },
  {
    id: "set2-debug-mini-1",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "MCQ",
    type: "mcq",
    prompt: "What is wrong with <button onClick={setCount(count + 1)}>Add</button>?",
    choices: [
      "It calls setCount during render instead of waiting for a click",
      "Buttons cannot update state",
      "count must be a string"
    ],
    answer: "It calls setCount during render instead of waiting for a click",
    explanation: "Wrap it in a handler: onClick={() => setCount(count + 1)}."
  },
  {
    id: "set2-debug-mini-2",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "MCQ",
    type: "mcq",
    prompt: "What is wrong with todos.map(todo => { <li>{todo.text}</li> })?",
    choices: [
      "The callback uses braces but does not return JSX",
      "map cannot render li elements",
      "todo must be named item"
    ],
    answer: "The callback uses braces but does not return JSX",
    explanation: "Use return inside braces or use parentheses for implicit return."
  },
  {
    id: "set2-debug-mini-3",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "Complete",
    type: "fill",
    prompt: "Fix the map callback by adding the missing keyword.",
    snippet: "todos.map(todo => { __1__ <li key={todo.id}>{todo.text}</li>; })",
    blanks: [{ label: "__1__", answers: ["return"] }],
    explanation: "Curly brace arrow bodies need return."
  },
  {
    id: "set2-debug-mini-4",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "MCQ",
    type: "mcq",
    prompt: "What is wrong with <input value={name} /> in a controlled form?",
    choices: [
      "It has value but no onChange handler",
      "Inputs cannot use state",
      "value must be named text"
    ],
    answer: "It has value but no onChange handler",
    explanation: "A controlled input needs onChange unless intentionally read-only."
  },
  {
    id: "set2-debug-mini-5",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "True/False",
    type: "tf",
    prompt: "Missing key warnings in dynamic lists should be ignored because the UI still appears.",
    answer: false,
    explanation: "Missing or unstable keys can cause real identity bugs in interactive lists."
  },
  {
    id: "set2-debug-mini-6",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "MCQ",
    type: "mcq",
    prompt: "Which bug can happen when an effect depends on userId but [] is used?",
    choices: [
      "The effect will not re-run when userId changes",
      "userId becomes a dependency automatically",
      "The component stops rendering JSX"
    ],
    answer: "The effect will not re-run when userId changes",
    explanation: "Dependencies describe when an effect should re-run."
  },
  {
    id: "set2-debug-mini-7",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "Complete",
    type: "fill",
    prompt: "Fix the missing dependency.",
    snippet: code(
      "useEffect(() => {",
      "  fetchUser(userId);",
      "}, [__1__]);"
    ),
    blanks: [{ label: "__1__", answers: ["userId"] }],
    explanation: "The effect uses userId, so it should depend on userId."
  },
  {
    id: "set2-debug-mini-8",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "MCQ",
    type: "mcq",
    prompt: "Which is the cleanest fix for stale interval count?",
    choices: [
      "setCount(c => c + 1)",
      "setCount(count + 1) with empty dependencies forever",
      "count++"
    ],
    answer: "setCount(c => c + 1)",
    explanation: "Functional updates avoid relying on the old closure value."
  },
  {
    id: "set2-debug-mini-9",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "Typed Code",
    type: "code",
    prompt: "Write a complete Counter component with count state and an Add button.",
    starter: code("function Counter() {", "  ", "}"),
    expected: code(
      "function Counter() {",
      "  const [count, setCount] = useState(0);",
      "  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;",
      "}"
    ),
    required: ["function Counter", "useState(0)", "onClick", "setCount", "=>", "{count}"],
    explanation: "This combines state, rendering, events, and functional updates."
  },
  {
    id: "set2-debug-mini-12",
    setId: "set2",
    moduleId: "set2-debug-mini",
    level: "Typed Code",
    type: "code",
    prompt: "Write a safe deleteTodo update that removes the matching id.",
    starter: "setTodos(",
    expected: "setTodos(todos => todos.filter(todo => todo.id !== id));",
    required: ["setTodos", "todos.filter", "todo.id !== id"],
    explanation: "This is the standard immutable delete-by-id update."
  },
  {
    id: "set2-controlled-forms-21",
    setId: "set2",
    moduleId: "set2-controlled-forms",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that shows an error paragraph only when error exists.",
    starter: "{",
    expected: "{error && <p>{error}</p>}",
    required: ["error", "&&", "<p>{error}</p>"],
    explanation: "Validation messages are often one-sided conditional renders."
  },
  {
    id: "set2-fetch-storage-21",
    setId: "set2",
    moduleId: "set2-fetch-storage",
    level: "Typed Code",
    type: "code",
    prompt: "Write JSX that shows an error paragraph when error exists, otherwise shows Users.",
    starter: "{",
    expected: "{error ? <p>{error}</p> : <Users />}",
    required: ["error", "?", "<p>{error}</p>", ":", "<Users />"],
    explanation: "A ternary is useful when error and success UI are alternatives."
  }
];
