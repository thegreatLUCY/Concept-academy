const code = (...lines) => lines.join("\n");
const setId = "set6";

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

export const set6Modules = [
  { id: "set6-react19-overview", setId, title: "React 19: The New Mental Model" },
  { id: "set6-ref-as-prop", setId, title: "ref as a Prop and ref Cleanup" },
  { id: "set6-actions", setId, title: "Actions and Form Actions" },
  { id: "set6-useactionstate", setId, title: "useActionState" },
  { id: "set6-useformstatus", setId, title: "useFormStatus" },
  { id: "set6-useoptimistic", setId, title: "useOptimistic" },
  { id: "set6-use-api", setId, title: "The use() API" },
  { id: "set6-server-components", setId, title: "Server Components" },
  { id: "set6-server-actions", setId, title: "Server Functions and 'use server'" },
  { id: "set6-compiler-metadata", setId, title: "React Compiler, Metadata, and Migration" }
];

export const set6Lessons = {
  "set6-react19-overview": {
    summary:
      "React 19 changes how you handle the most common hard problems: submitting data (Actions handle pending, error, and optimistic states for you), reading async values (the use() API), and shipping less JavaScript (Server Components). It also deletes years of boilerplate — forwardRef, Context.Provider, and manual memoization all have simpler replacements.",
    points: [
      "Actions: async functions that React tracks — pending and error states come built in.",
      "use(promise) reads async data; Server Components move work off the client entirely.",
      "Less boilerplate: ref is a normal prop, <Context> is its own provider, the Compiler memoizes for you."
    ],
    example: code(
      "// React 19: a form submit with pending state — no useState juggling",
      "function Rename({ save }) {",
      "  const [error, submitAction, isPending] = useActionState(",
      "    async (prev, formData) => {",
      "      const err = await save(formData.get(\"name\"));",
      "      return err ?? null;",
      "    },",
      "    null",
      "  );",
      "",
      "  return (",
      "    <form action={submitAction}>",
      "      <input name=\"name\" />",
      "      <button disabled={isPending}>Save</button>",
      "      {error && <p>{error}</p>}",
      "    </form>",
      "  );",
      "}"
    )
  },
  "set6-ref-as-prop": {
    summary:
      "In React 19, function components receive ref as a regular prop — forwardRef is no longer needed. Ref callbacks can also return a cleanup function, which React calls when the element leaves the DOM, exactly like a useEffect cleanup. Together these make refs ordinary, predictable code.",
    points: [
      "function Input({ ref }) { return <input ref={ref} /> } — no forwardRef wrapper.",
      "A ref callback can return a cleanup: ref={(node) => { ...; return () => ... }}.",
      "forwardRef still works for old code, but new code should take ref as a prop."
    ],
    example: code(
      "// React 19: ref is just a prop",
      "function FancyInput({ ref, label }) {",
      "  return (",
      "    <label>",
      "      {label}",
      "      <input ref={ref} />",
      "    </label>",
      "  );",
      "}",
      "",
      "// ref callbacks can clean up after themselves",
      "<div ref={(node) => {",
      "  const observer = new ResizeObserver(log);",
      "  observer.observe(node);",
      "  return () => observer.disconnect();",
      "}} />"
    )
  },
  "set6-actions": {
    summary:
      "An Action is an async function used in a transition — most often passed to a form's action prop. React runs it, tracks its pending state, surfaces errors, and (for uncontrolled inputs) resets the form when it succeeds. What used to take three useState calls and a try/finally now takes none.",
    points: [
      "<form action={asyncFn}> — the function receives the form's FormData.",
      "React tracks the Action's pending state; no manual setLoading(true/false).",
      "After a successful Action, uncontrolled form fields reset automatically."
    ],
    example: code(
      "function Signup() {",
      "  async function signup(formData) {",
      "    await api.createAccount({",
      "      email: formData.get(\"email\"),",
      "      plan: formData.get(\"plan\")",
      "    });",
      "  }",
      "",
      "  return (",
      "    <form action={signup}>",
      "      <input name=\"email\" type=\"email\" />",
      "      <select name=\"plan\">",
      "        <option>free</option>",
      "        <option>pro</option>",
      "      </select>",
      "      <button>Create account</button>",
      "    </form>",
      "  );",
      "}"
    )
  },
  "set6-useactionstate": {
    summary:
      "useActionState wraps an Action with state. You pass an async function (previousState, formData) => newState and an initial value; you get back the latest state, a wrapped action for the form, and an isPending flag. It is the React 19 way to show validation errors and submission results.",
    points: [
      "const [state, formAction, isPending] = useActionState(fn, initialState).",
      "Your fn receives (previousState, formData) and returns the next state.",
      "Return error messages as state — render them under the form."
    ],
    example: code(
      "const [message, formAction, isPending] = useActionState(",
      "  async (previous, formData) => {",
      "    const name = formData.get(\"name\");",
      "    if (!name) return \"Name is required\";",
      "    await api.save(name);",
      "    return \"Saved!\";",
      "  },",
      "  null",
      ");",
      "",
      "<form action={formAction}>",
      "  <input name=\"name\" />",
      "  <button disabled={isPending}>{isPending ? \"Saving...\" : \"Save\"}</button>",
      "  {message && <p>{message}</p>}",
      "</form>"
    )
  },
  "set6-useformstatus": {
    summary:
      "useFormStatus reads the status of the nearest enclosing <form> — like a context for forms. A SubmitButton component can disable itself while pending without receiving any props. The rule: it must be called in a component rendered INSIDE the form, not in the component that renders the form itself.",
    points: [
      "const { pending, data } = useFormStatus() — from react-dom.",
      "Build one <SubmitButton /> and reuse it in every form.",
      "It reads the PARENT form: calling it in the same component as the <form> returns nothing useful."
    ],
    example: code(
      "import { useFormStatus } from \"react-dom\";",
      "",
      "function SubmitButton({ children }) {",
      "  const { pending } = useFormStatus();",
      "  return <button disabled={pending}>{pending ? \"Working...\" : children}</button>;",
      "}",
      "",
      "// reused everywhere:",
      "<form action={saveAction}>",
      "  <input name=\"title\" />",
      "  <SubmitButton>Save</SubmitButton>",
      "</form>"
    )
  },
  "set6-useoptimistic": {
    summary:
      "useOptimistic shows the result of an Action before the server confirms it. You give it the real state and a merge function; inside a transition you call addOptimistic(value) to render the hopeful version immediately. When the Action finishes, React swaps back to the real state — which now includes the saved data, or doesn't, if it failed.",
    points: [
      "const [optimisticItems, addOptimistic] = useOptimistic(items, mergeFn).",
      "Call addOptimistic inside the Action — UI updates instantly, server catches up.",
      "If the Action fails, React reverts to the real state automatically."
    ],
    example: code(
      "const [optimisticTodos, addOptimisticTodo] = useOptimistic(",
      "  todos,",
      "  (current, newTodo) => [...current, { ...newTodo, sending: true }]",
      ");",
      "",
      "async function addAction(formData) {",
      "  const todo = { text: formData.get(\"text\") };",
      "  addOptimisticTodo(todo);   // appears immediately, marked sending",
      "  await api.create(todo);    // real list updates when this resolves",
      "}"
    )
  },
  "set6-use-api": {
    summary:
      "use() reads a resource during render: use(promise) suspends until the promise resolves (your Suspense fallback shows meanwhile), and use(Context) reads context. Unlike hooks, use can be called inside conditions and loops — but the promise should be created by a parent or cache, not inside the component, or every render makes a new one.",
    points: [
      "const data = use(dataPromise) — suspends; pair with <Suspense fallback>.",
      "use(ThemeContext) works too, even inside an if block.",
      "Don't create the promise during render — pass it down or cache it."
    ],
    example: code(
      "function Comments({ commentsPromise }) {",
      "  // suspends until the promise resolves",
      "  const comments = use(commentsPromise);",
      "  return comments.map((c) => <p key={c.id}>{c.text}</p>);",
      "}",
      "",
      "function Page({ commentsPromise }) {",
      "  return (",
      "    <Suspense fallback={<p>Loading comments...</p>}>",
      "      <Comments commentsPromise={commentsPromise} />",
      "    </Suspense>",
      "  );",
      "}"
    )
  },
  "set6-server-components": {
    summary:
      "Server Components run on the server — at build time or per request — and send their OUTPUT to the browser, not their JavaScript. They can be async, await databases or files directly, and keep heavy dependencies off the client bundle. Components that need state, effects, or event handlers opt into the client with the 'use client' directive.",
    points: [
      "Server Components ship zero JS to the browser and can await data directly.",
      "No useState, useEffect, or onClick on the server — interactivity needs 'use client'.",
      "'use client' marks the entry to the client world; everything it imports comes too."
    ],
    example: code(
      "// Server Component — async, talks to the database, ships no JS",
      "async function Notes() {",
      "  const notes = await db.notes.findAll();",
      "  return notes.map((note) => <NoteCard key={note.id} note={note} />);",
      "}",
      "",
      "// NoteCard needs a click handler, so it is a Client Component:",
      "// --- NoteCard.jsx ---",
      "// \"use client\";",
      "// export function NoteCard({ note }) { ... onClick ... }"
    )
  },
  "set6-server-actions": {
    summary:
      "Server Functions (often called Server Actions) are functions marked with 'use server' that run on the server but can be called from client code — most naturally as form actions. The framework serializes the call, runs the function server-side with access to your database, and returns the result. No hand-written fetch endpoint needed.",
    points: [
      "'use server' at the top of a function (or file) makes it callable from the client.",
      "Pass a server function to <form action={...}> — submission becomes an RPC.",
      "They run with server powers (DB, secrets) — validate input like any API."
    ],
    example: code(
      "// actions.js",
      "\"use server\";",
      "",
      "export async function createNote(formData) {",
      "  const text = formData.get(\"text\");",
      "  if (!text) throw new Error(\"Text is required\");",
      "  await db.notes.create({ text });",
      "}",
      "",
      "// NoteForm.jsx (client)",
      "import { createNote } from \"./actions\";",
      "",
      "export function NoteForm() {",
      "  return (",
      "    <form action={createNote}>",
      "      <input name=\"text\" />",
      "      <button>Add note</button>",
      "    </form>",
      "  );",
      "}"
    )
  },
  "set6-compiler-metadata": {
    summary:
      "Around React 19 the ecosystem sheds boilerplate. The React Compiler memoizes components automatically at build time, so most useMemo/useCallback/memo calls become unnecessary. <title> and <meta> rendered anywhere are hoisted into <head>. <Context> works as its own provider. And old patterns — forwardRef, defaultProps on functions, propTypes, string refs — are deprecated or removed in favor of plain JavaScript.",
    points: [
      "React Compiler: automatic memoization — write plain code, get optimized re-renders.",
      "<title> and <meta> in any component are hoisted to the document <head>.",
      "<Context value={...}> replaces <Context.Provider>; default parameters replace defaultProps."
    ],
    example: code(
      "// document metadata, right where it belongs",
      "function BlogPost({ post }) {",
      "  return (",
      "    <article>",
      "      <title>{post.title}</title>",
      "      <meta name=\"author\" content={post.author} />",
      "      <h1>{post.title}</h1>",
      "      {post.body}",
      "    </article>",
      "  );",
      "}",
      "",
      "// React 19 context — the Provider wrapper is gone",
      "<ThemeContext value=\"dark\">",
      "  <App />",
      "</ThemeContext>"
    )
  }
};

export const set6Questions = [
  ...attach("set6-react19-overview", [
    mcq(
      "What problem do React 19 Actions primarily solve?",
      [
        "Manually wiring pending, error, and success states around async submissions",
        "Styling forms consistently across browsers",
        "Routing between pages without a router library"
      ],
      "Manually wiring pending, error, and success states around async submissions",
      "Actions let React track an async function's lifecycle, so the loading/error boilerplate disappears."
    ),
    mcq(
      "Which React 19 feature lets a component ship ZERO JavaScript to the browser?",
      ["Server Components", "useOptimistic", "the use() API"],
      "Server Components",
      "Server Components run on the server and send only their rendered output to the client."
    ),
    tf(
      "React 19 removes the need for forwardRef in new code because ref arrives as a regular prop.",
      true,
      "Function components now receive ref like any other prop; forwardRef remains only for compatibility."
    ),
    mcq(
      "Which pair belongs together in React 19's data-submission story?",
      [
        "<form action={asyncFn}> and useActionState",
        "<form onSubmit> and componentDidUpdate",
        "fetch() and useLayoutEffect"
      ],
      "<form action={asyncFn}> and useActionState",
      "Forms take async Actions directly, and useActionState wraps them with state, a form action, and isPending."
    ),
    tf(
      "Upgrading to React 19 requires rewriting every existing component to use Actions.",
      false,
      "React 19 is incremental — old patterns keep working; new APIs replace boilerplate where you choose."
    ),
    mcq(
      "Which hook shows a hopeful UI update before the server confirms it?",
      ["useOptimistic", "useFormStatus", "useId"],
      "useOptimistic",
      "useOptimistic renders the expected result immediately and reverts automatically if the Action fails."
    ),
    fill(
      "Complete the React 19 form that passes an async function directly to the form element.",
      code(
        "async function save(formData) {",
        "  await api.update(formData.get(\"name\"));",
        "}",
        "",
        "<form __1__={save}>",
        "  <input name=\"name\" />",
        "  <button>Save</button>",
        "</form>"
      ),
      [{ label: "__1__", answers: ["action"] }],
      "React 19 forms accept a function as their action prop — that function becomes an Action."
    ),
    fill(
      "Complete the API that reads a promise during render.",
      code(
        "function Profile({ userPromise }) {",
        "  const user = __1__(userPromise);",
        "  return <h1>{user.name}</h1>;",
        "}"
      ),
      [{ label: "__1__", answers: ["use"] }],
      "use(promise) suspends the component until the promise resolves."
    ),
    typed(
      "Write the directive (with quotes and semicolon) that marks a file's exports as client components.",
      "",
      "\"use client\";",
      ["use client"],
      "The 'use client' directive at the top of a file marks the boundary where client-side React begins.",
      ["\"use client\";", "'use client';"]
    ),
    mcq(
      "What does the React Compiler do?",
      [
        "Automatically memoizes components at build time so manual useMemo/useCallback is rarely needed",
        "Compiles JSX into HTML files served statically",
        "Converts class components into function components"
      ],
      "Automatically memoizes components at build time so manual useMemo/useCallback is rarely needed",
      "The Compiler analyzes your components and inserts memoization automatically — plain code, optimized re-renders."
    )
  ]),

  ...attach("set6-ref-as-prop", [
    mcq(
      "How does a React 19 function component receive a ref from its parent?",
      [
        "As a normal prop: function Input({ ref }) { ... }",
        "Only by wrapping the component in forwardRef",
        "Through this.refs"
      ],
      "As a normal prop: function Input({ ref }) { ... }",
      "ref is no longer special-cased — destructure it from props like anything else."
    ),
    tf(
      "In React 19, a ref callback can return a cleanup function that runs when the element is removed.",
      true,
      "Ref cleanups mirror effect cleanups: set up on attach, clean up on detach."
    ),
    fill(
      "Complete the React 19 component that forwards a ref without forwardRef.",
      code(
        "function SearchBox({ __1__ }) {",
        "  return <input ref={__1__} placeholder=\"Search\" />;",
        "}"
      ),
      [{ label: "__1__", answers: ["ref"] }],
      "Take ref from props and pass it straight to the element."
    ),
    mcq(
      "What was forwardRef for, before React 19?",
      [
        "Letting a parent's ref reach a DOM node inside a function component",
        "Forwarding props to all children automatically",
        "Creating refs without useRef"
      ],
      "Letting a parent's ref reach a DOM node inside a function component",
      "Function components didn't receive ref as a prop, so forwardRef smuggled it through — now unnecessary."
    ),
    tf(
      "Existing components using forwardRef break immediately under React 19.",
      false,
      "forwardRef still works; it is simply no longer needed for new code."
    ),
    mcq(
      "When does the cleanup returned by a ref callback run?",
      [
        "When the element is removed from the DOM (or the ref changes)",
        "On every render",
        "Only when the whole app unmounts"
      ],
      "When the element is removed from the DOM (or the ref changes)",
      "Attach/detach symmetry: setup when the node appears, cleanup when it goes away."
    ),
    fill(
      "Complete the ref callback cleanup.",
      code(
        "<video ref={(node) => {",
        "  node.play();",
        "  __1__ () => node.pause();",
        "}} />"
      ),
      [{ label: "__1__", answers: ["return"] }],
      "Returning a function from the ref callback registers it as the cleanup."
    ),
    mcq(
      "A parent does: const inputRef = useRef(null); <FancyInput ref={inputRef} />. In React 19, what must FancyInput do for inputRef.current to point at the real input?",
      [
        "Accept ref in its props and pass it to the <input>",
        "Nothing — React attaches refs to inner inputs automatically",
        "Call useImperativeHandle in every case"
      ],
      "Accept ref in its props and pass it to the <input>",
      "The component decides where the ref lands by forwarding the prop onto a DOM node."
    ),
    typed(
      "Write a React 19 TextField component that accepts ref as a prop and attaches it to an input element.",
      "function TextField",
      code(
        "function TextField({ ref }) {",
        "  return <input ref={ref} />;",
        "}"
      ),
      ["function TextField", "{ ref }", "<input ref={ref}"],
      "No forwardRef — destructure ref from props and attach it."
    ),
    tf(
      "Accessing element.ref on a JSX element is the recommended way to read refs in React 19.",
      false,
      "element.ref access is deprecated in React 19 — refs flow through props now."
    )
  ]),

  ...attach("set6-actions", [
    mcq(
      "What does a function passed to <form action={fn}> receive when the form submits?",
      ["The form's FormData object", "The click event", "A JSON string of all inputs"],
      "The form's FormData object",
      "Actions receive FormData — read fields with formData.get(\"fieldName\")."
    ),
    fill(
      "Read the email field inside a form Action.",
      code(
        "async function subscribe(formData) {",
        "  const email = formData.__1__(\"email\");",
        "  await api.subscribe(email);",
        "}"
      ),
      [{ label: "__1__", answers: ["get"] }],
      "FormData.get(name) returns the value of the named field."
    ),
    tf(
      "While a form Action is running, React tracks its pending state without any useState from you.",
      true,
      "That tracking is the point of Actions — read it via useActionState's isPending or useFormStatus."
    ),
    mcq(
      "After a form Action completes successfully, what happens to uncontrolled inputs in that form?",
      ["React resets them automatically", "They keep their typed values forever", "They are removed from the DOM"],
      "React resets them automatically",
      "React 19 resets uncontrolled form fields after a successful Action — no manual clearing."
    ),
    mcq(
      "Which older pattern does <form action={asyncFn}> largely replace?",
      [
        "onSubmit={(e) => { e.preventDefault(); ... setLoading(true) ... }}",
        "componentWillMount data fetching",
        "Redux reducers"
      ],
      "onSubmit={(e) => { e.preventDefault(); ... setLoading(true) ... }}",
      "The preventDefault + manual loading-flag dance is what Actions automate."
    ),
    tf(
      "Actions can only be used with forms — there is no way to run one from a button click.",
      false,
      "Forms are the common case, but any async function inside startTransition is an Action; buttons can have formAction too."
    ),
    fill(
      "Give the submit button its own Action, overriding the form's.",
      code(
        "<form action={saveDraft}>",
        "  <input name=\"title\" />",
        "  <button>Save draft</button>",
        "  <button __1__={publish}>Publish</button>",
        "</form>"
      ),
      [{ label: "__1__", answers: ["formAction"] }],
      "A button's formAction prop overrides the form's action for that button — one form, two submit behaviors."
    ),
    mcq(
      "Why are Actions async functions specifically?",
      [
        "So React can await them and know exactly when pending starts and ends",
        "Because synchronous JavaScript cannot modify state",
        "Async functions run on the server automatically"
      ],
      "So React can await them and know exactly when pending starts and ends",
      "The returned promise is what React observes to drive pending and error states."
    ),
    typed(
      "Write a form whose action is an async function named addItem, containing an input named text and a button labelled Add.",
      "<form ",
      code(
        "<form action={addItem}>",
        "  <input name=\"text\" />",
        "  <button>Add</button>",
        "</form>"
      ),
      ["<form action={addItem}>", "name=\"text\"", "<button>Add</button>"],
      "Pass the function itself to action — React calls it with the FormData."
    ),
    tf(
      "Inside an Action you should call event.preventDefault() before doing your work.",
      false,
      "There is no event — Actions receive FormData, and React handles the submission lifecycle."
    )
  ]),

  ...attach("set6-useactionstate", [
    mcq(
      "What does useActionState return?",
      [
        "[state, formAction, isPending]",
        "[isPending, setPending]",
        "{ data, error, refetch }"
      ],
      "[state, formAction, isPending]",
      "Latest state from the action, a wrapped action to give the form, and a pending flag."
    ),
    mcq(
      "What arguments does the function you pass to useActionState receive?",
      [
        "(previousState, formData)",
        "(event, formData)",
        "(formData) only"
      ],
      "(previousState, formData)",
      "Like a reducer for submissions: last state in, next state out."
    ),
    fill(
      "Complete the hook call.",
      code(
        "const [error, formAction, isPending] = __1__(",
        "  async (prev, formData) => {",
        "    if (!formData.get(\"title\")) return \"Title required\";",
        "    await api.save(formData);",
        "    return null;",
        "  },",
        "  null",
        ");"
      ),
      [{ label: "__1__", answers: ["useActionState"] }],
      "useActionState(actionFn, initialState) wires the action to state."
    ),
    tf(
      "The second argument to useActionState is the initial state value.",
      true,
      "useActionState(fn, initialState) — state starts there until the first submission returns something."
    ),
    mcq(
      "Where does the formAction returned by useActionState go?",
      [
        "Into the form: <form action={formAction}>",
        "Into useEffect dependencies",
        "Into the button's onClick only"
      ],
      "Into the form: <form action={formAction}>",
      "The wrapped action is what connects submissions back to the hook's state."
    ),
    mcq(
      "A validation Action returns \"Email is invalid\" when the input is bad. How does the UI show it?",
      [
        "Render the state value: {error && <p>{error}</p>}",
        "React shows an alert dialog automatically",
        "Throw the string from the component"
      ],
      "Render the state value: {error && <p>{error}</p>}",
      "Whatever the action returns becomes the state — render it like any state."
    ),
    tf(
      "isPending from useActionState is true while the async action is still running.",
      true,
      "Use it to disable the submit button or show a spinner."
    ),
    fill(
      "Disable the button while the action runs.",
      code(
        "<form action={formAction}>",
        "  <input name=\"email\" />",
        "  <button disabled={__1__}>Subscribe</button>",
        "</form>"
      ),
      [{ label: "__1__", answers: ["isPending"] }],
      "The third element of useActionState's return is the pending flag."
    ),
    typed(
      "Write a useActionState call whose action returns \"Required\" when formData.get(\"name\") is empty, otherwise null. Use initial state null.",
      "const [error, formAction, isPending] = ",
      code(
        "const [error, formAction, isPending] = useActionState(",
        "  async (prev, formData) => {",
        "    if (!formData.get(\"name\")) return \"Required\";",
        "    return null;",
        "  },",
        "  null",
        ");"
      ),
      ["useActionState", "(prev, formData)", "formData.get(\"name\")", "\"Required\"", "null"],
      "Reducer-style: previous state and FormData in, next state out."
    ),
    mcq(
      "How is useActionState different from plain useState for form submission results?",
      [
        "It ties the state directly to an Action's lifecycle, including pending tracking",
        "It stores state on the server",
        "It can hold only strings"
      ],
      "It ties the state directly to an Action's lifecycle, including pending tracking",
      "State updates automatically when the action resolves — no setter calls scattered through handlers."
    )
  ]),

  ...attach("set6-useformstatus", [
    mcq(
      "What does useFormStatus report?",
      [
        "The pending state and data of the nearest enclosing <form>",
        "Whether any form on the page has errors",
        "The validity of every input according to HTML attributes"
      ],
      "The pending state and data of the nearest enclosing <form>",
      "It behaves like reading a context provided by the parent form."
    ),
    mcq(
      "Why does useFormStatus belong in a child component like <SubmitButton /> rather than the component rendering the <form>?",
      [
        "It reads the status of the PARENT form above it in the tree — beside the form there is nothing to read",
        "Hooks cannot be called in components that render forms",
        "It only works in class components"
      ],
      "It reads the status of the PARENT form above it in the tree — beside the form there is nothing to read",
      "Render the hook's component inside the form so the form is its parent."
    ),
    fill(
      "Complete the reusable submit button.",
      code(
        "import { useFormStatus } from \"react-dom\";",
        "",
        "function SubmitButton() {",
        "  const { __1__ } = useFormStatus();",
        "  return <button disabled={__1__}>Save</button>;",
        "}"
      ),
      [{ label: "__1__", answers: ["pending"] }],
      "pending is true while the parent form's Action runs."
    ),
    tf(
      "useFormStatus is imported from react-dom, not react.",
      true,
      "Form status is a DOM concern: import { useFormStatus } from \"react-dom\"."
    ),
    tf(
      "A SubmitButton using useFormStatus must receive an isPending prop from every form that uses it.",
      false,
      "That is exactly the boilerplate it removes — the button reads its parent form directly."
    ),
    mcq(
      "Besides pending, what else does useFormStatus expose?",
      [
        "The in-flight submission's data (FormData), method, and action",
        "The list of all registered forms",
        "The HTTP response status code"
      ],
      "The in-flight submission's data (FormData), method, and action",
      "{ pending, data, method, action } — data lets you preview what was submitted."
    ),
    fill(
      "Show what the user submitted while it is saving.",
      code(
        "function Saving() {",
        "  const { pending, __1__ } = useFormStatus();",
        "  if (!pending || !__1__) return null;",
        "  return <p>Saving {__1__.get(\"title\")}...</p>;",
        "}"
      ),
      [{ label: "__1__", answers: ["data"] }],
      "data is the FormData of the in-flight submission."
    ),
    mcq(
      "This renders a form AND calls useFormStatus in the same component. What will pending be during submission?",
      [
        "false — the hook finds no PARENT form, so it reports nothing useful",
        "true — it is inside the same function",
        "It throws an error"
      ],
      "false — the hook finds no PARENT form, so it reports nothing useful",
      "The classic gotcha: move the hook into a child component rendered inside the form.",
      code(
        "function Page() {",
        "  const { pending } = useFormStatus(); // wrong place!",
        "  return <form action={save}>...</form>;",
        "}"
      )
    ),
    typed(
      "Write a SubmitButton component that uses useFormStatus and shows \"Working...\" while pending, otherwise \"Submit\".",
      "function SubmitButton",
      code(
        "function SubmitButton() {",
        "  const { pending } = useFormStatus();",
        "  return <button disabled={pending}>{pending ? \"Working...\" : \"Submit\"}</button>;",
        "}"
      ),
      ["function SubmitButton", "useFormStatus()", "pending", "Working..."],
      "One shared button component, status read straight from whichever form contains it."
    ),
    tf(
      "useFormStatus works with forms driven by Actions (action={fn}), reflecting the Action's pending state.",
      true,
      "Action-driven forms are exactly what its pending flag tracks."
    )
  ]),

  ...attach("set6-useoptimistic", [
    mcq(
      "What is optimistic UI?",
      [
        "Showing the expected result immediately, before the server confirms it",
        "Hiding errors from users",
        "Rendering a spinner until every request resolves"
      ],
      "Showing the expected result immediately, before the server confirms it",
      "Perceived speed: the UI assumes success and corrects itself if wrong."
    ),
    mcq(
      "What does useOptimistic(state, mergeFn) return?",
      [
        "[optimisticState, addOptimistic]",
        "[state, setState]",
        "{ mutate, rollback }"
      ],
      "[optimisticState, addOptimistic]",
      "Render the optimistic state; call addOptimistic(value) inside an Action to add a hopeful update."
    ),
    fill(
      "Complete the optimistic todos hook.",
      code(
        "const [optimisticTodos, addOptimisticTodo] = __1__(",
        "  todos,",
        "  (current, newTodo) => [...current, newTodo]",
        ");"
      ),
      [{ label: "__1__", answers: ["useOptimistic"] }],
      "First argument is the real state; second merges an optimistic value into it."
    ),
    tf(
      "If the Action fails, React automatically discards the optimistic update and re-renders from the real state.",
      true,
      "No manual rollback code — the optimistic layer only exists while the Action is pending."
    ),
    mcq(
      "Where should addOptimistic be called?",
      [
        "Inside the Action (or a transition), before the slow await",
        "Inside useEffect after the data arrives",
        "In the component body on every render"
      ],
      "Inside the Action (or a transition), before the slow await",
      "Add the hopeful value first, then await the real work — the UI updates instantly."
    ),
    mcq(
      "A message list marks optimistic messages with sending: true. Why?",
      [
        "So the UI can subtly show which items are not yet confirmed",
        "React requires a sending field on optimistic objects",
        "It prevents duplicate keys"
      ],
      "So the UI can subtly show which items are not yet confirmed",
      "A convention, not an API requirement — italics or a clock icon tells the user what is in flight."
    ),
    tf(
      "useOptimistic replaces the need for a server entirely.",
      false,
      "It only changes WHEN the UI updates — the Action still has to do the real work."
    ),
    fill(
      "Add the hopeful message before awaiting the network.",
      code(
        "async function sendAction(formData) {",
        "  const message = { text: formData.get(\"text\"), sending: true };",
        "  __1__(message);",
        "  await api.send(message.text);",
        "}"
      ),
      [{ label: "__1__", answers: ["addOptimisticMessage", "addOptimistic"] }],
      "Call the add function returned by useOptimistic before the slow await."
    ),
    typed(
      "Write a useOptimistic call for likes: real state is likeCount, and the merge function adds the increment to the current count.",
      "const [optimisticLikes, addOptimisticLike] = ",
      "const [optimisticLikes, addOptimisticLike] = useOptimistic(likeCount, (current, amount) => current + amount);",
      ["useOptimistic", "likeCount", "current + amount"],
      "Optimistic state doesn't have to be a list — any merge of current + update works."
    ),
    mcq(
      "Which UI should render: the optimistic state or the real state?",
      [
        "The optimistic state — it equals the real state whenever nothing is pending",
        "The real state, with the optimistic one logged for debugging",
        "Both, side by side"
      ],
      "The optimistic state — it equals the real state whenever nothing is pending",
      "optimisticState IS realState plus any pending hopeful updates; render it everywhere."
    )
  ]),

  ...attach("set6-use-api", [
    mcq(
      "What happens when a component calls use(promise) and the promise is still pending?",
      [
        "The component suspends and the nearest Suspense fallback shows",
        "use returns undefined until it resolves",
        "The render throws an uncaught error"
      ],
      "The component suspends and the nearest Suspense fallback shows",
      "use integrates with Suspense — rendering pauses until the data is ready."
    ),
    mcq(
      "Which is a real difference between use() and hooks like useContext?",
      [
        "use can be called inside conditions and loops",
        "use can only run on the server",
        "use must be the first line of the component"
      ],
      "use can be called inside conditions and loops",
      "use is exempt from the top-level-only rule — read context inside an if when you need to."
    ),
    fill(
      "Read context conditionally with use.",
      code(
        "function Status({ live }) {",
        "  if (live) {",
        "    const theme = __1__(ThemeContext);",
        "    return <span className={theme}>LIVE</span>;",
        "  }",
        "  return <span>Offline</span>;",
        "}"
      ),
      [{ label: "__1__", answers: ["use"] }],
      "use(Context) works where useContext cannot — inside a condition."
    ),
    tf(
      "Creating a new promise inside the component body and passing it to use is the recommended pattern.",
      false,
      "Trick statement — it is the classic MISTAKE: each render creates a fresh promise, so the component suspends forever. Create promises in a parent, a cache, or a framework loader."
    ),
    mcq(
      "Which component setup correctly consumes use(commentsPromise)?",
      [
        "A parent wraps the consumer in <Suspense fallback={...}> and passes the promise down",
        "The consumer wraps ITSELF in Suspense",
        "No Suspense is needed anywhere"
      ],
      "A parent wraps the consumer in <Suspense fallback={...}> and passes the promise down",
      "Suspense must be ABOVE the suspending component to catch it."
    ),
    tf(
      "use(promise) unwraps the resolved value, so const user = use(userPromise) gives you the user object.",
      true,
      "It reads the resource's value — no .then chains in render code."
    ),
    fill(
      "Complete the Suspense boundary.",
      code(
        "<__1__ fallback={<Spinner />}>",
        "  <Comments commentsPromise={promise} />",
        "</__1__>"
      ),
      [{ label: "__1__", answers: ["Suspense"] }],
      "The fallback renders while anything inside suspends."
    ),
    mcq(
      "What happens if the promise passed to use rejects?",
      [
        "The nearest error boundary catches it",
        "use returns null",
        "React retries the promise three times"
      ],
      "The nearest error boundary catches it",
      "Rejections propagate like render errors — pair Suspense with an error boundary."
    ),
    typed(
      "Write an Albums component that takes an albumsPromise prop, reads it with use, and renders each album title in an li (key album.id).",
      "function Albums",
      code(
        "function Albums({ albumsPromise }) {",
        "  const albums = use(albumsPromise);",
        "  return (",
        "    <ul>",
        "      {albums.map((album) => (",
        "        <li key={album.id}>{album.title}</li>",
        "      ))}",
        "    </ul>",
        "  );",
        "}"
      ),
      ["function Albums", "use(albumsPromise)", "albums.map", "key={album.id}"],
      "use unwraps the promise; the rest is ordinary list rendering."
    ),
    mcq(
      "Why pass a promise DOWN from a parent instead of creating it in the consumer?",
      [
        "So the same promise survives re-renders and the data is fetched once",
        "Promises cannot exist inside components",
        "Child components cannot call APIs"
      ],
      "So the same promise survives re-renders and the data is fetched once",
      "A stable promise = stable data source; a per-render promise = infinite suspension loop."
    )
  ]),

  ...attach("set6-server-components", [
    mcq(
      "Where does a Server Component's JavaScript execute?",
      [
        "On the server — only its rendered output reaches the browser",
        "In the browser, after hydration",
        "In a web worker"
      ],
      "On the server — only its rendered output reaches the browser",
      "The component's code, and its dependencies, never enter the client bundle."
    ),
    mcq(
      "Which of these is allowed in a Server Component?",
      [
        "Being an async function that awaits a database query",
        "useState for a counter",
        "onClick handlers on its elements"
      ],
      "Being an async function that awaits a database query",
      "Server Components can await data directly; state and event handlers need a Client Component."
    ),
    tf(
      "A Server Component can use useEffect as long as the effect is fast.",
      false,
      "Effects run in the browser after render — Server Components never run there, so no effects, no state."
    ),
    fill(
      "Mark the boundary where client-side interactivity begins.",
      code(
        "__1__;",
        "",
        "export function LikeButton({ postId }) {",
        "  const [liked, setLiked] = useState(false);",
        "  return <button onClick={() => setLiked(!liked)}>{liked ? \"♥\" : \"♡\"}</button>;",
        "}"
      ),
      [{ label: "__1__", answers: ["\"use client\"", "'use client'"] }],
      "'use client' at the top of the file makes its components Client Components."
    ),
    mcq(
      "What is the main bundle-size benefit of Server Components?",
      [
        "Their code and heavy dependencies (markdown parsers, date libraries) never ship to the browser",
        "They compress JSX better than gzip",
        "They remove the need for images"
      ],
      "Their code and heavy dependencies (markdown parsers, date libraries) never ship to the browser",
      "Render markdown on the server with a 200 KB library and the client downloads only the resulting HTML."
    ),
    tf(
      "A Server Component can render Client Components as children.",
      true,
      "Server output composes client islands — the server renders the shell, clients hydrate the interactive parts."
    ),
    mcq(
      "Why can a Server Component query the database directly?",
      [
        "It runs in an environment that has the credentials and network position to do so",
        "Browsers now include SQL drivers",
        "React proxies queries through a public endpoint automatically"
      ],
      "It runs in an environment that has the credentials and network position to do so",
      "Server code is server code — secrets and DB access stay off the client."
    ),
    mcq(
      "What does 'use client' actually mark?",
      [
        "The entry point of the client bundle — that file and everything it imports run on the client",
        "A single function as asynchronous",
        "Code that should be cached by the browser"
      ],
      "The entry point of the client bundle — that file and everything it imports run on the client",
      "It is a boundary directive, not a per-component switch — imports of that file come along."
    ),
    tf(
      "Server Components require a framework or bundler integration (like Next.js) — plain client-only React apps don't run them.",
      true,
      "RSC needs a server/build pipeline that knows how to split and stream the tree."
    ),
    typed(
      "Write an async Server Component named UserList that awaits db.users.all() into users and renders each name in an li (key user.id).",
      "async function UserList",
      code(
        "async function UserList() {",
        "  const users = await db.users.all();",
        "  return (",
        "    <ul>",
        "      {users.map((user) => (",
        "        <li key={user.id}>{user.name}</li>",
        "      ))}",
        "    </ul>",
        "  );",
        "}"
      ),
      ["async function UserList", "await db.users.all()", "users.map", "key={user.id}"],
      "Async components are the signature Server Component move — await data, return JSX."
    )
  ]),

  ...attach("set6-server-actions", [
    mcq(
      "What does the 'use server' directive do?",
      [
        "Marks functions that run on the server but can be called from client code",
        "Moves the whole component to the server",
        "Enables server-side rendering for the page"
      ],
      "Marks functions that run on the server but can be called from client code",
      "Server Functions are RPC endpoints defined as plain functions."
    ),
    fill(
      "Mark this module's exports as server functions.",
      code(
        "__1__;",
        "",
        "export async function deletePost(formData) {",
        "  await db.posts.delete(formData.get(\"id\"));",
        "}"
      ),
      [{ label: "__1__", answers: ["\"use server\"", "'use server'"] }],
      "'use server' at the top of the file exposes its async exports to the client as server functions."
    ),
    mcq(
      "How is a server function most naturally used in a React 19 form?",
      [
        "<form action={serverFunction}> — submission becomes a call to the server",
        "fetch(serverFunction.url)",
        "It must be wrapped in useEffect first"
      ],
      "<form action={serverFunction}> — submission becomes a call to the server",
      "The framework serializes the FormData, runs the function server-side, and returns the result."
    ),
    tf(
      "Server functions can read environment secrets and talk to the database directly.",
      true,
      "They run on the server — which is also why their inputs must be validated."
    ),
    tf(
      "Because server functions are written in your own codebase, validating their input is unnecessary.",
      false,
      "Anyone can invoke the endpoint a server function creates — treat input like any public API's."
    ),
    mcq(
      "What happens when a client form submits to a server function?",
      [
        "The call is serialized to the server, the function runs there, and the result returns to React",
        "The function's source code downloads and runs in the browser",
        "The page fully reloads to execute it"
      ],
      "The call is serialized to the server, the function runs there, and the result returns to React",
      "It is a remote procedure call wearing a form's clothes."
    ),
    mcq(
      "Which hook pairs with server functions to show validation errors returned from the server?",
      ["useActionState", "useRef", "useLayoutEffect"],
      "useActionState",
      "Server function in, state out — the same Action machinery works across the network."
    ),
    fill(
      "Mark just one function as a server function (inline directive).",
      code(
        "async function publish(formData) {",
        "  __1__;",
        "  await db.posts.publish(formData.get(\"id\"));",
        "}"
      ),
      [{ label: "__1__", answers: ["\"use server\"", "'use server'"] }],
      "The directive can sit at the top of a single function body instead of the whole file."
    ),
    typed(
      "Write a server-function module: the 'use server' directive, then an exported async function createComment that awaits db.comments.create with the text field from formData.",
      "",
      code(
        "\"use server\";",
        "",
        "export async function createComment(formData) {",
        "  await db.comments.create({ text: formData.get(\"text\") });",
        "}"
      ),
      ["use server", "export async function createComment", "formData.get(\"text\")"],
      "A complete server module: directive on top, async exports below."
    ),
    tf(
      "Server functions eliminate the need to hand-write a fetch call and a matching API route for simple mutations.",
      true,
      "Define the function, pass it to a form — the framework owns the wire format."
    )
  ]),

  ...attach("set6-compiler-metadata", [
    mcq(
      "With the React Compiler enabled, what happens to most manual useMemo and useCallback calls?",
      [
        "They become unnecessary — the compiler memoizes automatically at build time",
        "They cause build errors and must be deleted",
        "They run twice as fast"
      ],
      "They become unnecessary — the compiler memoizes automatically at build time",
      "Write plain components; the compiler inserts the memoization a careful human would have."
    ),
    tf(
      "The React Compiler changes your code's behavior at runtime by skipping renders whose inputs did not change.",
      true,
      "Same rendered output, fewer wasted re-renders — automatically."
    ),
    mcq(
      "Where does a <title> element rendered inside a deeply nested component end up in React 19?",
      [
        "Hoisted into the document <head>",
        "Rendered inline where the component sits",
        "Ignored with a console warning"
      ],
      "Hoisted into the document <head>",
      "Metadata support: <title>, <meta>, and <link> rendered anywhere are moved to <head>."
    ),
    fill(
      "Set the page title from the component that knows it.",
      code(
        "function ProductPage({ product }) {",
        "  return (",
        "    <article>",
        "      <__1__>{product.name} — Shop</__1__>",
        "      <h1>{product.name}</h1>",
        "    </article>",
        "  );",
        "}"
      ),
      [{ label: "__1__", answers: ["title"] }],
      "Render <title> right in the component — React hoists it to the head."
    ),
    mcq(
      "Which React 19 syntax replaces <ThemeContext.Provider value=\"dark\">?",
      [
        "<ThemeContext value=\"dark\">",
        "<ThemeContext.Consumer value=\"dark\">",
        "<Provider context={ThemeContext} value=\"dark\">"
      ],
      "<ThemeContext value=\"dark\">",
      "Contexts render directly as providers now — one less wrapper to remember."
    ),
    tf(
      "defaultProps on function components still works in React 19.",
      false,
      "Removed — use JavaScript default parameters: function Button({ kind = \"primary\" })."
    ),
    fill(
      "Replace defaultProps with a default parameter.",
      code(
        "function Badge({ tone __1__ \"info\" }) {",
        "  return <span className={tone}>!</span>;",
        "}"
      ),
      [{ label: "__1__", answers: ["="] }],
      "Destructuring defaults are plain JavaScript — no React API needed."
    ),
    mcq(
      "Which of these was REMOVED in React 19?",
      [
        "propTypes checking on function components",
        "useState",
        "JSX fragments"
      ],
      "propTypes checking on function components",
      "propTypes (and string refs, and ReactDOM.render) are gone — TypeScript fills the type-checking role."
    ),
    mcq(
      "What replaces ReactDOM.render in modern React?",
      [
        "createRoot(container).render(<App />)",
        "ReactDOM.hydrate only",
        "document.render(<App />)"
      ],
      "createRoot(container).render(<App />)",
      "createRoot has been the entry point since React 18; 19 removes the legacy API entirely."
    ),
    tf(
      "Adopting React 19 features can be done gradually — Actions in new forms first, while old forms keep their onSubmit handlers.",
      true,
      "Migration is per-feature and per-component, not all-or-nothing."
    )
  ])
];
