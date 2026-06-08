const code = (...lines) => lines.join("\n");
const setId = "set3";

function mcq(id, moduleId, prompt, choices, answer, explanation, snippet) {
  return { id, setId, moduleId, level: "MCQ", type: "mcq", prompt, choices, answer, explanation, ...(snippet ? { snippet } : {}) };
}

function tf(id, moduleId, prompt, answer, explanation, snippet) {
  return { id, setId, moduleId, level: "True/False", type: "tf", prompt, answer, explanation, ...(snippet ? { snippet } : {}) };
}

function fill(id, moduleId, prompt, snippet, blanks, explanation) {
  return { id, setId, moduleId, level: "Complete", type: "fill", prompt, snippet, blanks, explanation };
}

function typed(id, moduleId, prompt, starter, expected, required, explanation, accepted) {
  return { id, setId, moduleId, level: "Typed Code", type: "code", prompt, starter, expected, required, explanation, ...(accepted ? { accepted } : {}) };
}

export const set3Modules = [
  { id: "set3-functions-callbacks", setId, title: "Function Values and Callbacks" },
  { id: "set3-execution-event-loop", setId, title: "Execution Model and Event Loop" },
  { id: "set3-scope-closures-this", setId, title: "Scope, Closures, and this" },
  { id: "set3-type-conversion", setId, title: "Type Conversion and Form Values" },
  { id: "set3-equality-truthiness", setId, title: "Equality, Truthiness, and Safe Defaults" },
  { id: "set3-arrays-sorting-reduce", setId, title: "Arrays, Sorting, and Reduce" },
  { id: "set3-immutability-references", setId, title: "Immutability and References" },
  { id: "set3-json-storage-api", setId, title: "JSON, Storage, and Request Bodies" },
  { id: "set3-destructuring-api", setId, title: "Destructuring for API Data" },
  { id: "set3-promises-async", setId, title: "Promises and async/await" },
  { id: "set3-fetch-http", setId, title: "Fetch API and HTTP Handling" },
  { id: "set3-abort-stale-requests", setId, title: "AbortController and Stale Requests" },
  { id: "set3-events-dom", setId, title: "Event Object and DOM Concepts" },
  { id: "set3-browser-env", setId, title: "Browser APIs and Environment Variables" },
  { id: "set3-modules-utilities", setId, title: "Modules, Utilities, and Imports" },
  { id: "set3-data-transformation", setId, title: "Data Transformation for UI" },
  { id: "set3-defensive-debugging", setId, title: "Defensive JavaScript and Debugging" },
  { id: "set3-debounce-mini", setId, title: "Debounce and Mini Programs" }
];

export const set3Questions = [
  mcq(
    "set3-functions-callbacks-1",
    "set3-functions-callbacks",
    "Which statement best describes functions as values in JavaScript?",
    ["Functions can be stored in variables and passed to other functions", "Functions can only be written inside JSX", "Functions cannot be returned from other functions"],
    "Functions can be stored in variables and passed to other functions",
    "React relies heavily on functions as values: event handlers, callbacks, array methods, hooks, and utilities."
  ),
  mcq(
    "set3-functions-callbacks-2",
    "set3-functions-callbacks",
    "Which example is a function declaration?",
    ["function greet() {}", "const greet = () => {};", "const greet = function() {};"],
    "function greet() {}",
    "Function declarations use the function keyword followed by a name."
  ),
  mcq(
    "set3-functions-callbacks-3",
    "set3-functions-callbacks",
    "Which example is a function expression?",
    ["const greet = function() {};", "function greet() {}", "if (greet) {}"],
    "const greet = function() {};",
    "A function expression creates a function as part of an expression, often assigned to a variable."
  ),
  fill(
    "set3-functions-callbacks-4",
    "set3-functions-callbacks",
    "Complete the arrow function expression.",
    "const greet = __1__ => \"Hello\";",
    [{ label: "__1__", answers: ["()"] }],
    "An arrow function with no parameters uses empty parentheses."
  ),
  mcq(
    "set3-functions-callbacks-5",
    "set3-functions-callbacks",
    "What is a callback function?",
    ["A function passed to another function to be called later", "A function that can only return JSX", "A function that reloads the browser"],
    "A function passed to another function to be called later",
    "Callbacks appear in array methods, event listeners, timers, promises, and React props."
  ),
  fill(
    "set3-functions-callbacks-6",
    "set3-functions-callbacks",
    "Complete the callback passed to addEventListener.",
    "button.addEventListener(\"click\", __1__);",
    [{ label: "__1__", answers: ["handleClick"] }],
    "The handler function is passed as a value. It should not be called immediately."
  ),
  mcq(
    "set3-functions-callbacks-7",
    "set3-functions-callbacks",
    "Which code passes a callback instead of calling it immediately?",
    ["items.map(formatItem)", "items.map(formatItem())", "items.map = formatItem"],
    "items.map(formatItem)",
    "Passing formatItem gives map a function to call for each item."
  ),
  tf(
    "set3-functions-callbacks-8",
    "set3-functions-callbacks",
    "A higher-order function is a function that receives a function or returns a function.",
    true,
    "map, filter, and event helpers are common higher-order-function examples."
  ),
  fill(
    "set3-functions-callbacks-9",
    "set3-functions-callbacks",
    "Complete the higher-order function call.",
    "const names = users.map(__1__ => __1__.name);",
    [{ label: "__1__", answers: ["user"] }],
    "The callback receives each user and returns the name."
  ),
  typed(
    "set3-functions-callbacks-10",
    "set3-functions-callbacks",
    "Write a function named runTwice that receives a callback and calls it two times.",
    code("function runTwice(callback) {", "  ", "}"),
    code("function runTwice(callback) {", "  callback();", "  callback();", "}"),
    ["function runTwice", "callback()", "callback()"],
    "This practices functions as values and callback execution."
  ),
  mcq(
    "set3-execution-event-loop-1",
    "set3-execution-event-loop",
    "Which code runs first in normal synchronous JavaScript?",
    ["The current call stack", "A setTimeout callback", "A fetch response handler"],
    "The current call stack",
    "Synchronous code on the call stack finishes before queued async callbacks run."
  ),
  mcq(
    "set3-execution-event-loop-2",
    "set3-execution-event-loop",
    "What is the call stack?",
    ["The place JavaScript tracks currently running function calls", "A React folder for components", "The queue where CSS files load"],
    "The place JavaScript tracks currently running function calls",
    "When a function calls another function, JavaScript pushes another frame onto the call stack."
  ),
  mcq(
    "set3-execution-event-loop-3",
    "set3-execution-event-loop",
    "What is the output order?",
    ["A C B", "A B C", "B A C"],
    "A C B",
    "setTimeout runs later, after synchronous logs finish.",
    code("console.log(\"A\");", "setTimeout(() => console.log(\"B\"), 0);", "console.log(\"C\");")
  ),
  mcq(
    "set3-execution-event-loop-4",
    "set3-execution-event-loop",
    "What is the output order?",
    ["start end promise timeout", "start promise end timeout", "start timeout promise end"],
    "start end promise timeout",
    "Promise callbacks are microtasks and run after synchronous code but before timeout tasks.",
    code("console.log(\"start\");", "setTimeout(() => console.log(\"timeout\"), 0);", "Promise.resolve().then(() => console.log(\"promise\"));", "console.log(\"end\");")
  ),
  tf(
    "set3-execution-event-loop-5",
    "set3-execution-event-loop",
    "Promise .then callbacks usually run before setTimeout callbacks queued in the same turn.",
    true,
    "Promise reactions are microtasks, while setTimeout callbacks are tasks."
  ),
  fill(
    "set3-execution-event-loop-6",
    "set3-execution-event-loop",
    "Complete the async scheduling function.",
    "__1__(() => console.log(\"later\"), 1000);",
    [{ label: "__1__", answers: ["setTimeout"] }],
    "setTimeout asks the browser to run a callback later."
  ),
  mcq(
    "set3-execution-event-loop-7",
    "set3-execution-event-loop",
    "Which queue do Promise callbacks belong to?",
    ["Microtask queue", "CSS queue", "package queue"],
    "Microtask queue",
    "Promise callbacks are microtasks, which run before the next macrotask."
  ),
  mcq(
    "set3-execution-event-loop-8",
    "set3-execution-event-loop",
    "Why can React event handlers finish before a state update is visible?",
    ["React schedules updates and renders after the handler completes", "State setters are disabled inside events", "JSX blocks event handlers"],
    "React schedules updates and renders after the handler completes",
    "React batches and applies updates around event boundaries instead of changing the current render's variables."
  ),
  fill(
    "set3-execution-event-loop-9",
    "set3-execution-event-loop",
    "Complete the microtask example.",
    "__1__.resolve().then(() => console.log(\"microtask\"));",
    [{ label: "__1__", answers: ["Promise"] }],
    "Promise.resolve().then queues a microtask."
  ),
  typed(
    "set3-execution-event-loop-10",
    "set3-execution-event-loop",
    "Write code that logs first now and second later with setTimeout.",
    "",
    code("console.log(\"first\");", "setTimeout(() => console.log(\"second\"), 0);"),
    ["console.log(\"first\")", "setTimeout", "console.log(\"second\")"],
    "This practices the basic async scheduling mental model."
  ),
  mcq(
    "set3-scope-closures-this-1",
    "set3-scope-closures-this",
    "What is lexical scope?",
    ["A function can access variables from where it was written", "A variable can only be read inside JSX", "Scope that changes based on CSS"],
    "A function can access variables from where it was written",
    "Closures come from lexical scope: functions remember their surrounding variables."
  ),
  mcq(
    "set3-scope-closures-this-2",
    "set3-scope-closures-this",
    "What is a closure?",
    ["A function remembering variables from its outer scope", "A component returning null", "A deleted variable"],
    "A function remembering variables from its outer scope",
    "Closures are why event handlers and timers can use variables from a previous render."
  ),
  fill(
    "set3-scope-closures-this-3",
    "set3-scope-closures-this",
    "Complete the closure that remembers count.",
    code("function makeCounter() {", "  let count = 0;", "  return function() {", "    count = count + 1;", "    return __1__;", "  };", "}"),
    [{ label: "__1__", answers: ["count"] }],
    "The returned function closes over count."
  ),
  mcq(
    "set3-scope-closures-this-4",
    "set3-scope-closures-this",
    "Why can a timer callback see an old React state value?",
    ["The callback closed over a value from an older render", "React converts numbers into strings", "Timers cannot read variables"],
    "The callback closed over a value from an older render",
    "This is a stale closure. Functional state updates often fix it."
  ),
  tf(
    "set3-scope-closures-this-5",
    "set3-scope-closures-this",
    "let and const are block scoped.",
    true,
    "A block is usually created by braces, such as inside if statements and loops."
  ),
  mcq(
    "set3-scope-closures-this-6",
    "set3-scope-closures-this",
    "What is variable shadowing?",
    ["An inner variable has the same name as an outer variable", "A variable is stored in localStorage", "A variable is converted to CSS"],
    "An inner variable has the same name as an outer variable",
    "Shadowing can make code harder to read when the same name means different values in nested scopes."
  ),
  mcq(
    "set3-scope-closures-this-7",
    "set3-scope-closures-this",
    "What is the temporal dead zone?",
    ["The period before a let or const declaration where accessing it throws", "A React render delay", "A browser cache feature"],
    "The period before a let or const declaration where accessing it throws",
    "let and const are hoisted but cannot be accessed before declaration."
  ),
  mcq(
    "set3-scope-closures-this-8",
    "set3-scope-closures-this",
    "How does an arrow function handle this?",
    ["It uses this from the surrounding lexical scope", "It creates a new this every call", "It deletes this"],
    "It uses this from the surrounding lexical scope",
    "Arrow functions do not bind their own this."
  ),
  tf(
    "set3-scope-closures-this-9",
    "set3-scope-closures-this",
    "Function components usually avoid this because props, state, and handlers are regular variables/functions.",
    true,
    "this is more common in older class components and plain object methods."
  ),
  typed(
    "set3-scope-closures-this-10",
    "set3-scope-closures-this",
    "Write a createGreeter function that returns a function saying Hello plus name.",
    code("function createGreeter(name) {", "  ", "}"),
    code("function createGreeter(name) {", "  return function() {", "    return \"Hello \" + name;", "  };", "}"),
    ["function createGreeter", "return function", "Hello", "name"],
    "The returned function forms a closure over name."
  ),
  mcq(
    "set3-type-conversion-1",
    "set3-type-conversion",
    "What type is event.target.value from a text input?",
    ["string", "number", "boolean"],
    "string",
    "Form input values are strings unless you convert them."
  ),
  fill(
    "set3-type-conversion-2",
    "set3-type-conversion",
    "Convert an input value into a number.",
    "const age = __1__(event.target.value);",
    [{ label: "__1__", answers: ["Number"] }],
    "Number(value) converts a numeric string into a number."
  ),
  mcq(
    "set3-type-conversion-3",
    "set3-type-conversion",
    "What is Number(\"42\")?",
    ["42 as a number", "\"42\" as a string", "undefined"],
    "42 as a number",
    "Number converts the string into a numeric value."
  ),
  mcq(
    "set3-type-conversion-4",
    "set3-type-conversion",
    "What does Number(\"abc\") produce?",
    ["NaN", "0", "\"abc\""],
    "NaN",
    "NaN means Not-a-Number and usually means conversion failed."
  ),
  fill(
    "set3-type-conversion-5",
    "set3-type-conversion",
    "Complete a base-10 integer conversion.",
    "const page = parseInt(queryValue, __1__);",
    [{ label: "__1__", answers: ["10"] }],
    "Passing radix 10 makes parseInt read decimal numbers."
  ),
  mcq(
    "set3-type-conversion-6",
    "set3-type-conversion",
    "Which function is better for reading 12.5 as a decimal number?",
    ["parseFloat", "parseInt", "JSON.stringify"],
    "parseFloat",
    "parseFloat preserves the decimal part."
  ),
  tf(
    "set3-type-conversion-7",
    "set3-type-conversion",
    "The + operator can concatenate strings, so form values should be converted before numeric math.",
    true,
    "For example, \"2\" + 1 gives \"21\", while Number(\"2\") + 1 gives 3."
  ),
  mcq(
    "set3-type-conversion-8",
    "set3-type-conversion",
    "Which check detects failed numeric conversion?",
    ["Number.isNaN(age)", "age === \"NaN\"", "age.isBroken()"],
    "Number.isNaN(age)",
    "Number.isNaN is a clear way to test for NaN."
  ),
  fill(
    "set3-type-conversion-9",
    "set3-type-conversion",
    "Complete the controlled numeric input update.",
    "onChange={e => setAge(__1__(e.target.value))}",
    [{ label: "__1__", answers: ["Number"] }],
    "The input produces a string, and Number converts it before storing numeric state."
  ),
  typed(
    "set3-type-conversion-10",
    "set3-type-conversion",
    "Write a function toNumber that returns Number(value).",
    code("function toNumber(value) {", "  ", "}"),
    code("function toNumber(value) {", "  return Number(value);", "}"),
    ["function toNumber", "return Number(value)"],
    "Small conversion helpers make form code easier to read."
  ),
  mcq(
    "set3-equality-truthiness-1",
    "set3-equality-truthiness",
    "Which equality operator should usually be preferred in modern JavaScript?",
    ["===", "==", "="],
    "===",
    "Strict equality avoids surprise type coercion."
  ),
  mcq(
    "set3-equality-truthiness-2",
    "set3-equality-truthiness",
    "Which value is falsy?",
    ["\"\"", "\"false\"", "[]"],
    "\"\"",
    "Empty string is falsy. Non-empty strings and arrays are truthy."
  ),
  tf(
    "set3-equality-truthiness-3",
    "set3-equality-truthiness",
    "An empty array [] is truthy.",
    true,
    "This surprises beginners. Use array.length to check emptiness."
  ),
  mcq(
    "set3-equality-truthiness-4",
    "set3-equality-truthiness",
    "What is the difference between null and undefined?",
    ["null is intentional absence; undefined often means no value was assigned", "They are always numbers", "They can only appear in JSX"],
    "null is intentional absence; undefined often means no value was assigned",
    "Both represent missing values, but they communicate slightly different intent."
  ),
  fill(
    "set3-equality-truthiness-5",
    "set3-equality-truthiness",
    "Safely read a nested property with optional chaining.",
    "const city = user.address__1__.city;",
    [{ label: "__1__", answers: ["?"] }],
    "user.address?.city avoids crashing when address is missing."
  ),
  mcq(
    "set3-equality-truthiness-6",
    "set3-equality-truthiness",
    "What does nullish coalescing ?? use as missing values?",
    ["null and undefined", "all falsy values", "only empty strings"],
    "null and undefined",
    "?? keeps valid falsy values like 0 and empty string."
  ),
  mcq(
    "set3-equality-truthiness-7",
    "set3-equality-truthiness",
    "Why can count || 10 be a bug?",
    ["It replaces 0 with 10", "It crashes if count is 5", "It creates a promise"],
    "It replaces 0 with 10",
    "Use count ?? 10 when 0 is a valid value."
  ),
  fill(
    "set3-equality-truthiness-8",
    "set3-equality-truthiness",
    "Use nullish coalescing for a default page size.",
    "const size = pageSize __1__ 20;",
    [{ label: "__1__", answers: ["??"] }],
    "?? applies the fallback only for null or undefined."
  ),
  mcq(
    "set3-equality-truthiness-9",
    "set3-equality-truthiness",
    "Which check is best for an empty array?",
    ["items.length === 0", "!items", "items === false"],
    "items.length === 0",
    "Arrays are truthy, so check length."
  ),
  typed(
    "set3-equality-truthiness-10",
    "set3-equality-truthiness",
    "Write a safe displayName expression using user.name if it exists, otherwise Guest.",
    "const displayName = ",
    "const displayName = user.name ?? \"Guest\";",
    ["const displayName", "user.name", "??", "Guest"],
    "Nullish coalescing avoids replacing valid empty-ish values accidentally."
  ),
  mcq(
    "set3-arrays-sorting-reduce-1",
    "set3-arrays-sorting-reduce",
    "Which method returns a new array of transformed values?",
    ["map", "find", "sort"],
    "map",
    "map transforms each item and returns a new array."
  ),
  mcq(
    "set3-arrays-sorting-reduce-2",
    "set3-arrays-sorting-reduce",
    "Which method returns the first matching item?",
    ["find", "filter", "every"],
    "find",
    "find returns one item or undefined."
  ),
  mcq(
    "set3-arrays-sorting-reduce-3",
    "set3-arrays-sorting-reduce",
    "Which method answers whether at least one item matches?",
    ["some", "every", "reduce"],
    "some",
    "some returns true when any item passes the test."
  ),
  mcq(
    "set3-arrays-sorting-reduce-4",
    "set3-arrays-sorting-reduce",
    "Which method answers whether all items match?",
    ["every", "some", "find"],
    "every",
    "every returns true only when every item passes."
  ),
  fill(
    "set3-arrays-sorting-reduce-5",
    "set3-arrays-sorting-reduce",
    "Complete the total price calculation.",
    "const total = items.__1__((sum, item) => sum + item.price, 0);",
    [{ label: "__1__", answers: ["reduce"] }],
    "reduce is useful for turning an array into a single value."
  ),
  tf(
    "set3-arrays-sorting-reduce-6",
    "set3-arrays-sorting-reduce",
    "sort() mutates the array it is called on.",
    true,
    "Copy before sorting React state arrays."
  ),
  mcq(
    "set3-arrays-sorting-reduce-7",
    "set3-arrays-sorting-reduce",
    "Which numeric sort is correct?",
    ["numbers.sort((a, b) => a - b)", "numbers.sort()", "numbers.sort(a > b)"],
    "numbers.sort((a, b) => a - b)",
    "Without a compare function, sort converts values to strings."
  ),
  fill(
    "set3-arrays-sorting-reduce-8",
    "set3-arrays-sorting-reduce",
    "Sort items without mutating the original array.",
    "const sorted = [__1__items].sort((a, b) => a.price - b.price);",
    [{ label: "__1__", answers: ["..."] }],
    "Spreading creates a shallow copy before sort mutates that copy."
  ),
  mcq(
    "set3-arrays-sorting-reduce-9",
    "set3-arrays-sorting-reduce",
    "Which method is best for removing items from a rendered list by condition?",
    ["filter", "sort", "forEach"],
    "filter",
    "filter returns a new array containing only matching items."
  ),
  typed(
    "set3-arrays-sorting-reduce-10",
    "set3-arrays-sorting-reduce",
    "Write a safe ascending numeric sort that does not mutate numbers.",
    "const sorted = ",
    "const sorted = [...numbers].sort((a, b) => a - b);",
    ["const sorted", "...numbers", ".sort", "a - b"],
    "Copy before sorting, then provide a numeric compare function."
  ),
  mcq(
    "set3-immutability-references-1",
    "set3-immutability-references",
    "What does it mean that spread is a shallow copy?",
    ["Nested objects are still shared references", "It deeply clones every nested value", "It only works on strings"],
    "Nested objects are still shared references",
    "You must copy nested levels you plan to change."
  ),
  mcq(
    "set3-immutability-references-2",
    "set3-immutability-references",
    "Which comparison checks whether two variables point to the same object reference?",
    ["objA === objB", "objA == JSON", "objA.same(objB)"],
    "objA === objB",
    "Objects compare by reference, not by identical contents."
  ),
  fill(
    "set3-immutability-references-3",
    "set3-immutability-references",
    "Complete the shallow object copy.",
    "const copy = { __1__user };",
    [{ label: "__1__", answers: ["..."] }],
    "Object spread copies top-level properties into a new object."
  ),
  mcq(
    "set3-immutability-references-4",
    "set3-immutability-references",
    "Which update avoids mutating nested state?",
    ["setUser({ ...user, address: { ...user.address, city } })", "user.address.city = city", "setUser(user)"],
    "setUser({ ...user, address: { ...user.address, city } })",
    "Copy each object level that changes."
  ),
  tf(
    "set3-immutability-references-5",
    "set3-immutability-references",
    "reverse() mutates the array it is called on.",
    true,
    "Like sort, reverse mutates. Copy first when working from state."
  ),
  fill(
    "set3-immutability-references-6",
    "set3-immutability-references",
    "Reverse without mutating the original list.",
    "const reversed = [__1__list].reverse();",
    [{ label: "__1__", answers: ["..."] }],
    "The copy is mutated, not the original list."
  ),
  mcq(
    "set3-immutability-references-7",
    "set3-immutability-references",
    "Why can mutating React state directly fail to update UI correctly?",
    ["React may see the same reference and skip meaningful work", "React state can never be an object", "Mutation turns JSX into HTML"],
    "React may see the same reference and skip meaningful work",
    "React expects a new value/reference for state updates."
  ),
  mcq(
    "set3-immutability-references-8",
    "set3-immutability-references",
    "Which array update changes one item immutably?",
    ["items.map(item => item.id === id ? { ...item, done: true } : item)", "items[0].done = true", "items.push(done)"],
    "items.map(item => item.id === id ? { ...item, done: true } : item)",
    "map can return a copied changed item and unchanged originals."
  ),
  fill(
    "set3-immutability-references-9",
    "set3-immutability-references",
    "Complete the immutable add.",
    "setItems(items => [__1__items, newItem]);",
    [{ label: "__1__", answers: ["..."] }],
    "Spread creates a new array with existing items plus the new item."
  ),
  typed(
    "set3-immutability-references-10",
    "set3-immutability-references",
    "Write a safe copy of products sorted by price ascending.",
    "const sortedProducts = ",
    "const sortedProducts = [...products].sort((a, b) => a.price - b.price);",
    ["const sortedProducts", "...products", ".sort", "a.price - b.price"],
    "This combines immutability with numeric sorting."
  ),
  mcq(
    "set3-json-storage-api-1",
    "set3-json-storage-api",
    "What does JSON.stringify do?",
    ["Converts a JavaScript value into a JSON string", "Parses JSON text into an object", "Starts a fetch request"],
    "Converts a JavaScript value into a JSON string",
    "Use stringify before storing objects in localStorage or sending JSON bodies."
  ),
  mcq(
    "set3-json-storage-api-2",
    "set3-json-storage-api",
    "What does JSON.parse do?",
    ["Converts JSON text into a JavaScript value", "Converts an object into text", "Clears localStorage"],
    "Converts JSON text into a JavaScript value",
    "Use parse when reading JSON strings from APIs or storage."
  ),
  fill(
    "set3-json-storage-api-3",
    "set3-json-storage-api",
    "Save an object to localStorage.",
    "localStorage.setItem(\"user\", JSON.__1__(user));",
    [{ label: "__1__", answers: ["stringify"] }],
    "localStorage stores strings."
  ),
  fill(
    "set3-json-storage-api-4",
    "set3-json-storage-api",
    "Read an object from localStorage.",
    "const user = JSON.__1__(localStorage.getItem(\"user\"));",
    [{ label: "__1__", answers: ["parse"] }],
    "parse converts the stored JSON string back into a JavaScript object."
  ),
  mcq(
    "set3-json-storage-api-5",
    "set3-json-storage-api",
    "Why is JSON.stringify often used in fetch request bodies?",
    ["The server usually expects text-formatted JSON", "fetch cannot send strings", "React requires all bodies to be arrays"],
    "The server usually expects text-formatted JSON",
    "A JavaScript object must be serialized before sending as JSON."
  ),
  fill(
    "set3-json-storage-api-6",
    "set3-json-storage-api",
    "Complete a JSON POST body.",
    "body: JSON.__1__({ title })",
    [{ label: "__1__", answers: ["stringify"] }],
    "Request bodies are transmitted as strings or binary data, not raw JavaScript objects."
  ),
  mcq(
    "set3-json-storage-api-7",
    "set3-json-storage-api",
    "Which header usually tells the server you are sending JSON?",
    ["Content-Type: application/json", "Accept-Language: JSON", "React-Type: JSON"],
    "Content-Type: application/json",
    "Content-Type describes the format of the request body."
  ),
  tf(
    "set3-json-storage-api-8",
    "set3-json-storage-api",
    "response.json() parses the response body as JSON.",
    true,
    "It returns a promise for the parsed JavaScript value."
  ),
  fill(
    "set3-json-storage-api-9",
    "set3-json-storage-api",
    "Complete the API response parsing.",
    "const data = await response.__1__();",
    [{ label: "__1__", answers: ["json"] }],
    "response.json() reads and parses JSON from the response body."
  ),
  typed(
    "set3-json-storage-api-10",
    "set3-json-storage-api",
    "Write a line that stores settings as JSON in localStorage.",
    "",
    "localStorage.setItem(\"settings\", JSON.stringify(settings));",
    ["localStorage.setItem", "settings", "JSON.stringify(settings)"],
    "This is the common object-storage pattern."
  ),
  mcq(
    "set3-destructuring-api-1",
    "set3-destructuring-api",
    "Which destructures name from a user prop in a component parameter?",
    ["function UserCard({ name }) {}", "function UserCard([name]) {}", "function UserCard(name: props) {}"],
    "function UserCard({ name }) {}",
    "React function components commonly destructure props in the parameter list."
  ),
  fill(
    "set3-destructuring-api-2",
    "set3-destructuring-api",
    "Complete nested API destructuring with a safe default.",
    "const { user: { name } = __1__ } = data;",
    [{ label: "__1__", answers: ["{}"] }],
    "The default empty object prevents a crash if data.user is missing."
  ),
  mcq(
    "set3-destructuring-api-3",
    "set3-destructuring-api",
    "Why might const { user: { name } } = data crash?",
    ["data.user may be undefined", "name cannot be a string", "Destructuring never works with APIs"],
    "data.user may be undefined",
    "APIs can return missing fields, so guard nested destructuring."
  ),
  fill(
    "set3-destructuring-api-4",
    "set3-destructuring-api",
    "Rename an API field while destructuring.",
    "const { user_name: __1__ } = apiUser;",
    [{ label: "__1__", answers: ["userName"] }],
    "Destructuring can rename snake_case API fields into camelCase variables."
  ),
  mcq(
    "set3-destructuring-api-5",
    "set3-destructuring-api",
    "Which destructuring pattern gives a default array?",
    ["const { items = [] } = data;", "const { items || [] } = data;", "const [items = []] = data;"],
    "const { items = [] } = data;",
    "Default values in object destructuring use =."
  ),
  tf(
    "set3-destructuring-api-6",
    "set3-destructuring-api",
    "Destructuring function parameters can make small utility functions clearer.",
    true,
    "For example, formatUser({ firstName, lastName }) uses only the fields it needs."
  ),
  fill(
    "set3-destructuring-api-7",
    "set3-destructuring-api",
    "Complete parameter destructuring.",
    "function formatUser({ __1__, __2__ }) { return firstName + \" \" + lastName; }",
    [
      { label: "__1__", answers: ["firstName"] },
      { label: "__2__", answers: ["lastName"] }
    ],
    "The function receives an object and extracts the needed fields."
  ),
  mcq(
    "set3-destructuring-api-8",
    "set3-destructuring-api",
    "Which pattern safely reads data.user.name without destructuring?",
    ["data.user?.name", "data.user.name!", "data?user?name"],
    "data.user?.name",
    "Optional chaining is often clearer than deep destructuring for uncertain data."
  ),
  fill(
    "set3-destructuring-api-9",
    "set3-destructuring-api",
    "Complete a default prop value through destructuring.",
    "function Avatar({ size = __1__ }) { return <img width={size} />; }",
    [{ label: "__1__", answers: ["40"] }],
    "Default values in parameters are useful for optional props."
  ),
  typed(
    "set3-destructuring-api-10",
    "set3-destructuring-api",
    "Write a UserCard signature that receives name and age via destructuring.",
    "function UserCard(",
    "function UserCard({ name, age }) {",
    ["function UserCard", "{ name, age }"],
    "This reinforces React-style prop destructuring."
  ),
  mcq(
    "set3-promises-async-1",
    "set3-promises-async",
    "Which states can a Promise have?",
    ["pending, fulfilled, rejected", "loading, mounted, rendered", "true, false, maybe"],
    "pending, fulfilled, rejected",
    "Promises model eventual success or failure."
  ),
  mcq(
    "set3-promises-async-2",
    "set3-promises-async",
    "What does .then receive?",
    ["The fulfilled value from the promise", "Only error messages", "The current React component"],
    "The fulfilled value from the promise",
    ".then registers a callback for successful fulfillment."
  ),
  fill(
    "set3-promises-async-3",
    "set3-promises-async",
    "Complete the rejection handler.",
    "loadUser().then(setUser).__1__(setError);",
    [{ label: "__1__", answers: ["catch"] }],
    ".catch handles rejected promises."
  ),
  tf(
    "set3-promises-async-4",
    "set3-promises-async",
    "An async function always returns a Promise.",
    true,
    "Even if you return a plain value, JavaScript wraps it in a resolved Promise."
  ),
  fill(
    "set3-promises-async-5",
    "set3-promises-async",
    "Complete the awaited API call.",
    "const user = __1__ getUser();",
    [{ label: "__1__", answers: ["await"] }],
    "await pauses inside an async function until the promise settles."
  ),
  mcq(
    "set3-promises-async-6",
    "set3-promises-async",
    "Which block handles errors from await?",
    ["try/catch", "if/else only", "map/filter"],
    "try/catch",
    "Rejected promises thrown by await can be caught with catch."
  ),
  mcq(
    "set3-promises-async-7",
    "set3-promises-async",
    "Which code runs two independent requests in parallel?",
    ["await Promise.all([fetchUser(), fetchPosts()])", "await fetchUser(); await fetchPosts();", "fetchUser() + fetchPosts()"],
    "await Promise.all([fetchUser(), fetchPosts()])",
    "Promise.all starts both promises and waits for both results."
  ),
  mcq(
    "set3-promises-async-8",
    "set3-promises-async",
    "When should sequential awaits be used?",
    ["When the second request depends on the first result", "Whenever requests are independent", "Only inside JSX"],
    "When the second request depends on the first result",
    "Independent work can often run in parallel."
  ),
  fill(
    "set3-promises-async-9",
    "set3-promises-async",
    "Complete the parallel await destructuring.",
    "const [user, posts] = await __1__.all([fetchUser(), fetchPosts()]);",
    [{ label: "__1__", answers: ["Promise"] }],
    "Promise.all returns an array of results in the same order as the input promises."
  ),
  typed(
    "set3-promises-async-10",
    "set3-promises-async",
    "Write an async function getUserName that awaits getUser and returns user.name.",
    code("async function getUserName() {", "  ", "}"),
    code("async function getUserName() {", "  const user = await getUser();", "  return user.name;", "}"),
    ["async function getUserName", "await getUser()", "return user.name"],
    "This practices async return values and data extraction."
  ),
  mcq(
    "set3-fetch-http-1",
    "set3-fetch-http",
    "What does fetch(url) return?",
    ["A Promise for a Response object", "The parsed JSON immediately", "A React component"],
    "A Promise for a Response object",
    "You usually await fetch, then await response.json()."
  ),
  fill(
    "set3-fetch-http-2",
    "set3-fetch-http",
    "Complete the JSON response parsing.",
    "const data = await response.__1__();",
    [{ label: "__1__", answers: ["json"] }],
    "response.json() returns a promise for parsed JSON."
  ),
  mcq(
    "set3-fetch-http-3",
    "set3-fetch-http",
    "Why check response.ok?",
    ["fetch does not reject for HTTP 404/500 by default", "response.ok starts the request", "React requires it for JSX"],
    "fetch does not reject for HTTP 404/500 by default",
    "HTTP error statuses still resolve the fetch promise."
  ),
  fill(
    "set3-fetch-http-4",
    "set3-fetch-http",
    "Throw when the response is not ok.",
    "if (!response.__1__) throw new Error(\"Request failed\");",
    [{ label: "__1__", answers: ["ok"] }],
    "response.ok is true for successful HTTP status codes."
  ),
  mcq(
    "set3-fetch-http-5",
    "set3-fetch-http",
    "Which option sets a POST method?",
    ["{ method: \"POST\" }", "{ type: \"POST\" }", "{ fetch: \"POST\" }"],
    "{ method: \"POST\" }",
    "The fetch options object uses method."
  ),
  fill(
    "set3-fetch-http-6",
    "set3-fetch-http",
    "Complete the JSON header key.",
    "headers: { \"__1__\": \"application/json\" }",
    [{ label: "__1__", answers: ["Content-Type"] }],
    "Content-Type tells the server the request body format."
  ),
  mcq(
    "set3-fetch-http-7",
    "set3-fetch-http",
    "Which creates a query string safely?",
    ["new URLSearchParams({ q: search }).toString()", "JSON.stringify(search).url()", "search.map(url)"],
    "new URLSearchParams({ q: search }).toString()",
    "URLSearchParams handles encoding query values."
  ),
  fill(
    "set3-fetch-http-8",
    "set3-fetch-http",
    "Complete the request body serialization.",
    "body: JSON.__1__(newPost)",
    [{ label: "__1__", answers: ["stringify"] }],
    "Send JSON bodies as strings."
  ),
  mcq(
    "set3-fetch-http-9",
    "set3-fetch-http",
    "Which error is fetch most likely to reject for?",
    ["Network failure", "HTTP 404 automatically", "Empty array response"],
    "Network failure",
    "HTTP errors need response.ok checks."
  ),
  typed(
    "set3-fetch-http-10",
    "set3-fetch-http",
    "Write a safe fetch helper line that throws if response.ok is false.",
    code("const response = await fetch(url);", ""),
    code("if (!response.ok) throw new Error(\"Request failed\");"),
    ["if (!response.ok)", "throw new Error"],
    "HTTP status handling belongs near the fetch response."
  ),
  mcq(
    "set3-abort-stale-requests-1",
    "set3-abort-stale-requests",
    "What does AbortController help with?",
    ["Cancelling requests or async work that supports abort signals", "Sorting arrays numerically", "Creating package scripts"],
    "Cancelling requests or async work that supports abort signals",
    "AbortController is especially useful for stale fetch requests in effects."
  ),
  fill(
    "set3-abort-stale-requests-2",
    "set3-abort-stale-requests",
    "Create an AbortController.",
    "const controller = new __1__();",
    [{ label: "__1__", answers: ["AbortController"] }],
    "The controller exposes a signal and an abort method."
  ),
  fill(
    "set3-abort-stale-requests-3",
    "set3-abort-stale-requests",
    "Pass the abort signal to fetch.",
    "fetch(url, { signal: controller.__1__ });",
    [{ label: "__1__", answers: ["signal"] }],
    "The fetch request listens to the provided signal."
  ),
  fill(
    "set3-abort-stale-requests-4",
    "set3-abort-stale-requests",
    "Abort the request in cleanup.",
    "return () => controller.__1__();",
    [{ label: "__1__", answers: ["abort"] }],
    "Cleanup cancels the request when the effect becomes stale or unmounts."
  ),
  mcq(
    "set3-abort-stale-requests-5",
    "set3-abort-stale-requests",
    "What is the difference between ignoring old results and aborting?",
    ["Ignoring skips state updates; aborting also asks the request to stop", "They are exactly the same", "Ignoring only works for CSS"],
    "Ignoring skips state updates; aborting also asks the request to stop",
    "Both can protect UI correctness, but aborting may save work."
  ),
  tf(
    "set3-abort-stale-requests-6",
    "set3-abort-stale-requests",
    "A cleanup function can abort a fetch started by the effect.",
    true,
    "This is a strong pattern for effects that fetch based on changing inputs."
  ),
  mcq(
    "set3-abort-stale-requests-7",
    "set3-abort-stale-requests",
    "When userId changes quickly, what can go wrong without cleanup?",
    ["An older slower response can overwrite newer data", "React forgets all props", "map stops working"],
    "An older slower response can overwrite newer data",
    "This is a stale request race condition."
  ),
  typed(
    "set3-abort-stale-requests-8",
    "set3-abort-stale-requests",
    "Write the two key lines that create a controller and pass its signal to fetch.",
    "",
    code("const controller = new AbortController();", "fetch(url, { signal: controller.signal });"),
    ["new AbortController()", "signal: controller.signal"],
    "These are the core pieces before adding cleanup."
  ),
  mcq(
    "set3-abort-stale-requests-9",
    "set3-abort-stale-requests",
    "Which error name is commonly produced when a fetch is aborted?",
    ["AbortError", "FetchIgnored", "TimeoutJSON"],
    "AbortError",
    "AbortError lets you distinguish an intentional cancellation from a real request failure."
  ),
  fill(
    "set3-abort-stale-requests-10",
    "set3-abort-stale-requests",
    "Ignore expected abort errors in a catch block.",
    "if (error.name === \"__1__\") return;",
    [{ label: "__1__", answers: ["AbortError"] }],
    "When abort is expected during cleanup, you often avoid showing it as a user-facing error."
  ),
  mcq(
    "set3-events-dom-1",
    "set3-events-dom",
    "What does event.preventDefault() do?",
    ["Prevents the browser's default behavior for that event", "Stops React from rendering forever", "Deletes the event object"],
    "Prevents the browser's default behavior for that event",
    "Forms commonly use preventDefault to avoid a full page reload."
  ),
  mcq(
    "set3-events-dom-2",
    "set3-events-dom",
    "What does event.stopPropagation() do?",
    ["Stops the event from bubbling to parent handlers", "Stops all JavaScript on the page", "Prevents input value changes"],
    "Stops the event from bubbling to parent handlers",
    "Use it sparingly when parent click handlers should not run."
  ),
  mcq(
    "set3-events-dom-3",
    "set3-events-dom",
    "What is event.target?",
    ["The deepest element that triggered the event", "Always the element with the handler", "The current URL"],
    "The deepest element that triggered the event",
    "For delegated events, target may be a child inside the handler element."
  ),
  mcq(
    "set3-events-dom-4",
    "set3-events-dom",
    "What is event.currentTarget?",
    ["The element whose handler is currently running", "The first input on the page", "The response body"],
    "The element whose handler is currently running",
    "currentTarget is often safer when reading data from the element that owns the handler."
  ),
  fill(
    "set3-events-dom-5",
    "set3-events-dom",
    "Complete the submit handler default prevention.",
    "function handleSubmit(event) { event.__1__(); }",
    [{ label: "__1__", answers: ["preventDefault"] }],
    "This keeps a React-controlled form from refreshing the page."
  ),
  fill(
    "set3-events-dom-6",
    "set3-events-dom",
    "Complete the bubbling stop.",
    "event.__1__();",
    [{ label: "__1__", answers: ["stopPropagation"] }],
    "This prevents parent handlers from receiving the event."
  ),
  mcq(
    "set3-events-dom-7",
    "set3-events-dom",
    "Why does React usually avoid direct DOM manipulation?",
    ["React derives the DOM from component state and props", "The DOM does not exist in browsers", "React forbids all browser APIs"],
    "React derives the DOM from component state and props",
    "Direct DOM writes can fight React's rendering model."
  ),
  mcq(
    "set3-events-dom-8",
    "set3-events-dom",
    "When direct DOM access is needed in React, what is usually preferred?",
    ["refs", "document.querySelector everywhere", "package-lock.json"],
    "refs",
    "Refs are React's way to hold DOM nodes or mutable values."
  ),
  tf(
    "set3-events-dom-9",
    "set3-events-dom",
    "Events can bubble from child elements to parent elements.",
    true,
    "Understanding bubbling helps explain nested click handlers."
  ),
  typed(
    "set3-events-dom-10",
    "set3-events-dom",
    "Write a click handler line that stops bubbling before calling onClose.",
    "",
    code("event.stopPropagation();", "onClose();"),
    ["event.stopPropagation()", "onClose()"],
    "This is common inside overlays or nested clickable UI."
  ),
  mcq(
    "set3-browser-env-1",
    "set3-browser-env",
    "Which API stores data only for the current browser session?",
    ["sessionStorage", "localStorage", "URLSearchParams"],
    "sessionStorage",
    "sessionStorage is cleared when the session ends, while localStorage persists longer."
  ),
  mcq(
    "set3-browser-env-2",
    "set3-browser-env",
    "Which API helps build or read query strings?",
    ["URLSearchParams", "AbortController", "JSON.parse"],
    "URLSearchParams",
    "URLSearchParams handles encoding and decoding URL query parameters."
  ),
  fill(
    "set3-browser-env-3",
    "set3-browser-env",
    "Complete reading a query parameter.",
    "const page = params.__1__(\"page\");",
    [{ label: "__1__", answers: ["get"] }],
    "URLSearchParams.get returns the value for one query key."
  ),
  mcq(
    "set3-browser-env-4",
    "set3-browser-env",
    "Which browser API can copy text to the user's clipboard?",
    ["navigator.clipboard.writeText", "window.copy.JSON", "document.storage.copy"],
    "navigator.clipboard.writeText",
    "Clipboard access is asynchronous and browser-permission dependent."
  ),
  mcq(
    "set3-browser-env-5",
    "set3-browser-env",
    "Which API can check a media query in JavaScript?",
    ["window.matchMedia", "window.location.media", "navigator.queryCSS"],
    "window.matchMedia",
    "matchMedia can sync JS behavior with CSS media queries."
  ),
  mcq(
    "set3-browser-env-6",
    "set3-browser-env",
    "How does Vite expose frontend environment variables?",
    ["import.meta.env", "process.env by default in the browser", "package.env"],
    "import.meta.env",
    "Vite uses import.meta.env in client code."
  ),
  fill(
    "set3-browser-env-7",
    "set3-browser-env",
    "Complete a Vite public env variable read.",
    "const apiUrl = import.meta.__1__.VITE_API_URL;",
    [{ label: "__1__", answers: ["env"] }],
    "Vite exposes client env variables on import.meta.env."
  ),
  tf(
    "set3-browser-env-8",
    "set3-browser-env",
    "Frontend environment variables are still visible to users in the browser bundle.",
    true,
    "Do not put secret API keys in client-side environment variables."
  ),
  mcq(
    "set3-browser-env-9",
    "set3-browser-env",
    "Why should API URLs often come from environment variables?",
    ["Different environments may use different API hosts", "React cannot read string literals", "fetch only accepts env variables"],
    "Different environments may use different API hosts",
    "Development, staging, and production commonly use different URLs."
  ),
  typed(
    "set3-browser-env-10",
    "set3-browser-env",
    "Write a line that reads VITE_API_URL into apiUrl.",
    "",
    "const apiUrl = import.meta.env.VITE_API_URL;",
    ["const apiUrl", "import.meta.env.VITE_API_URL"],
    "This is the Vite client-side environment variable pattern."
  ),
  mcq(
    "set3-modules-utilities-1",
    "set3-modules-utilities",
    "What is an import alias useful for?",
    ["Renaming an imported value locally", "Mutating a module", "Running an effect twice"],
    "Renaming an imported value locally",
    "Aliases can avoid naming conflicts or improve clarity."
  ),
  fill(
    "set3-modules-utilities-2",
    "set3-modules-utilities",
    "Complete a named import alias.",
    "import { formatDate as __1__ } from \"./dates.js\";",
    [{ label: "__1__", answers: ["formatUserDate"] }],
    "The local name formatUserDate can differ from the exported name formatDate."
  ),
  mcq(
    "set3-modules-utilities-3",
    "set3-modules-utilities",
    "What is a barrel file?",
    ["A file that re-exports values from other files", "A file that stores localStorage data", "A JSON file with API responses"],
    "A file that re-exports values from other files",
    "Barrel files can simplify imports, but should be used carefully."
  ),
  fill(
    "set3-modules-utilities-4",
    "set3-modules-utilities",
    "Complete a re-export from a barrel file.",
    "export { Button } from \"__1__\";",
    [{ label: "__1__", answers: ["./Button.jsx"] }],
    "A barrel can gather exports from sibling modules."
  ),
  tf(
    "set3-modules-utilities-5",
    "set3-modules-utilities",
    "Circular imports can make modules harder to reason about and may produce undefined values.",
    true,
    "Avoid circular dependencies in shared utilities and component modules."
  ),
  mcq(
    "set3-modules-utilities-6",
    "set3-modules-utilities",
    "Where should a reusable date formatting helper usually live?",
    ["A utility module outside the component when it has no React dependency", "Inside every component duplicated", "Inside package-lock.json"],
    "A utility module outside the component when it has no React dependency",
    "Pure utilities are easier to reuse and test when separate from components."
  ),
  mcq(
    "set3-modules-utilities-7",
    "set3-modules-utilities",
    "Which helper is likely pure and reusable?",
    ["formatPrice(amount)", "setCount(count + 1)", "document.querySelector(\"body\")"],
    "formatPrice(amount)",
    "Formatting from inputs to outputs is a good utility function."
  ),
  fill(
    "set3-modules-utilities-8",
    "set3-modules-utilities",
    "Complete a utility export.",
    "__1__ function formatPrice(amount) { return `$${amount}`; }",
    [{ label: "__1__", answers: ["export"] }],
    "Named utility exports are common."
  ),
  mcq(
    "set3-modules-utilities-9",
    "set3-modules-utilities",
    "Why keep helpers independent from React when possible?",
    ["They become easier to test and reuse", "They cannot use strings otherwise", "React forbids helper functions"],
    "They become easier to test and reuse",
    "Pure helpers do not need rendering or hook context."
  ),
  typed(
    "set3-modules-utilities-10",
    "set3-modules-utilities",
    "Write a named export for a clamp helper.",
    "",
    "export function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }",
    ["export function clamp", "Math.min", "Math.max"],
    "Small utilities are building blocks for larger apps."
  ),
  mcq(
    "set3-data-transformation-1",
    "set3-data-transformation",
    "What does it mean to normalize API data for UI?",
    ["Transform raw API data into a shape that is easier for components to render", "Convert every value to null", "Store JSX inside the API response"],
    "Transform raw API data into a shape that is easier for components to render",
    "UI often needs display-friendly names, ids, flags, and defaults."
  ),
  fill(
    "set3-data-transformation-2",
    "set3-data-transformation",
    "Complete mapping API users into display cards.",
    "const cards = users.__1__(user => ({ id: user.id, title: user.name }));",
    [{ label: "__1__", answers: ["map"] }],
    "map transforms raw items into UI-ready objects."
  ),
  mcq(
    "set3-data-transformation-3",
    "set3-data-transformation",
    "Which method groups values into one object or Map?",
    ["reduce", "some", "find"],
    "reduce",
    "reduce can accumulate grouped data."
  ),
  fill(
    "set3-data-transformation-4",
    "set3-data-transformation",
    "Complete deriving unique categories.",
    "const categories = [...new __1__(products.map(p => p.category))];",
    [{ label: "__1__", answers: ["Set"] }],
    "A Set removes duplicate category values."
  ),
  mcq(
    "set3-data-transformation-5",
    "set3-data-transformation",
    "Where should simple filtering for visible search results usually happen?",
    ["During render as a derived value", "In a useEffect that stores copied state every time", "In index.html"],
    "During render as a derived value",
    "If it is derived from current items and query, calculate it directly."
  ),
  fill(
    "set3-data-transformation-6",
    "set3-data-transformation",
    "Complete a case-insensitive search.",
    "item.name.toLowerCase().includes(query.__1__())",
    [{ label: "__1__", answers: ["toLowerCase"] }],
    "Normalize both strings before comparing."
  ),
  mcq(
    "set3-data-transformation-7",
    "set3-data-transformation",
    "Which API is commonly used for formatting currency?",
    ["Intl.NumberFormat", "JSON.Number", "Currency.parse"],
    "Intl.NumberFormat",
    "Intl.NumberFormat handles locale-aware number and currency formatting."
  ),
  fill(
    "set3-data-transformation-8",
    "set3-data-transformation",
    "Complete a date formatting call.",
    "const label = new Intl.DateTimeFormat(\"en-US\").__1__(date);",
    [{ label: "__1__", answers: ["format"] }],
    "Intl formatters convert dates/numbers into display strings."
  ),
  mcq(
    "set3-data-transformation-9",
    "set3-data-transformation",
    "Why transform data before rendering complex UI?",
    ["Components become simpler and less repetitive", "React cannot render arrays", "APIs only return JSX"],
    "Components become simpler and less repetitive",
    "A small transformation layer can make rendering code clearer."
  ),
  typed(
    "set3-data-transformation-10",
    "set3-data-transformation",
    "Write a derived filteredProducts variable using query.",
    "const filteredProducts = ",
    "const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));",
    ["products.filter", "product.name.toLowerCase()", "query.toLowerCase()"],
    "This is a common search transformation before rendering."
  ),
  mcq(
    "set3-defensive-debugging-1",
    "set3-defensive-debugging",
    "Why guard against missing API fields?",
    ["The first render or a changed API response can otherwise crash the UI", "React does not support objects", "Guards make fetch synchronous"],
    "The first render or a changed API response can otherwise crash the UI",
    "Defensive JavaScript keeps UI resilient while data loads or changes."
  ),
  fill(
    "set3-defensive-debugging-2",
    "set3-defensive-debugging",
    "Default a possibly missing items array.",
    "const items = data.items __1__ [];",
    [{ label: "__1__", answers: ["??"] }],
    "Use ?? so null or undefined becomes an empty array."
  ),
  mcq(
    "set3-defensive-debugging-3",
    "set3-defensive-debugging",
    "Which console method displays arrays of objects as a table?",
    ["console.table", "console.grid", "console.array"],
    "console.table",
    "console.table is useful for inspecting lists of records."
  ),
  mcq(
    "set3-defensive-debugging-4",
    "set3-defensive-debugging",
    "What does a stack trace help you find?",
    ["The chain of function calls that led to an error", "The CSS color palette", "The npm registry URL"],
    "The chain of function calls that led to an error",
    "Stack traces point toward where an error happened and how execution got there."
  ),
  tf(
    "set3-defensive-debugging-5",
    "set3-defensive-debugging",
    "A pure function gives the same output for the same input and avoids side effects.",
    true,
    "Pure helpers and reducers are easier to test and reason about."
  ),
  mcq(
    "set3-defensive-debugging-6",
    "set3-defensive-debugging",
    "Which function is pure?",
    ["function add(a, b) { return a + b; }", "function save(x) { localStorage.setItem(\"x\", x); }", "function click() { document.body.remove(); }"],
    "function add(a, b) { return a + b; }",
    "add has no side effects and depends only on its inputs."
  ),
  fill(
    "set3-defensive-debugging-7",
    "set3-defensive-debugging",
    "Complete a safe optional read.",
    "const zip = user.address__1__.zip;",
    [{ label: "__1__", answers: ["?"] }],
    "Optional chaining prevents crashes when address is missing."
  ),
  mcq(
    "set3-defensive-debugging-8",
    "set3-defensive-debugging",
    "What is a recoverable error?",
    ["An expected failure the UI can handle, like a failed request", "A syntax error in the source file", "A missing closing brace in code"],
    "An expected failure the UI can handle, like a failed request",
    "Recoverable errors should often become user-facing error state."
  ),
  fill(
    "set3-defensive-debugging-9",
    "set3-defensive-debugging",
    "Complete a thrown custom error.",
    "throw new __1__(\"Invalid email\");",
    [{ label: "__1__", answers: ["Error"] }],
    "Throw Error objects for meaningful failures."
  ),
  typed(
    "set3-defensive-debugging-10",
    "set3-defensive-debugging",
    "Write a pure getFullName helper for a user object.",
    code("function getFullName(user) {", "  ", "}"),
    code("function getFullName(user) {", "  return `${user.firstName} ${user.lastName}`;", "}"),
    ["function getFullName", "return", "user.firstName", "user.lastName"],
    "Pure helpers keep display logic reusable and testable."
  ),
  mcq(
    "set3-debounce-mini-1",
    "set3-debounce-mini",
    "What is debounce useful for?",
    ["Waiting until rapid events pause before running work", "Making every keystroke fetch immediately", "Parsing JSON faster"],
    "Waiting until rapid events pause before running work",
    "Debounce is common for search inputs and resize handlers."
  ),
  mcq(
    "set3-debounce-mini-2",
    "set3-debounce-mini",
    "Why debounce a search input before fetching?",
    ["To avoid firing a request on every keystroke", "To make input values numbers", "To skip rendering the search field"],
    "To avoid firing a request on every keystroke",
    "Debouncing reduces unnecessary network work."
  ),
  fill(
    "set3-debounce-mini-3",
    "set3-debounce-mini",
    "Complete the timeout cleanup in a debounce effect.",
    "return () => __1__(id);",
    [{ label: "__1__", answers: ["clearTimeout"] }],
    "Clearing the previous timeout is the core debounce idea."
  ),
  fill(
    "set3-debounce-mini-4",
    "set3-debounce-mini",
    "Complete the delayed update.",
    "const id = __1__(() => setDebouncedQuery(query), 300);",
    [{ label: "__1__", answers: ["setTimeout"] }],
    "The timeout waits before committing the debounced value."
  ),
  tf(
    "set3-debounce-mini-5",
    "set3-debounce-mini",
    "A debounce effect usually depends on the raw input value.",
    true,
    "When query changes, the old timeout is cleaned up and a new one starts."
  ),
  mcq(
    "set3-debounce-mini-6",
    "set3-debounce-mini",
    "Which dependency should trigger a debounce timer for search text?",
    ["query", "setQuery", "React"],
    "query",
    "The timer should reset whenever the raw query changes."
  ),
  mcq(
    "set3-debounce-mini-7",
    "set3-debounce-mini",
    "What is the difference between debounce and immediate onChange state?",
    ["onChange updates immediately; debounce delays expensive follow-up work", "Debounce replaces useState", "onChange cannot use strings"],
    "onChange updates immediately; debounce delays expensive follow-up work",
    "Keep the input responsive while delaying fetch/filter work if needed."
  ),
  fill(
    "set3-debounce-mini-8",
    "set3-debounce-mini",
    "Complete a debounced effect dependency array.",
    code("useEffect(() => {", "  const id = setTimeout(() => setDebouncedQuery(query), 300);", "  return () => clearTimeout(id);", "}, [__1__]);"),
    [{ label: "__1__", answers: ["query"] }],
    "The timeout resets when query changes."
  ),
  typed(
    "set3-debounce-mini-9",
    "set3-debounce-mini",
    "Write a debounced query effect body with setTimeout and cleanup.",
    code("useEffect(() => {", "  ", "}, [query]);"),
    code("useEffect(() => {", "  const id = setTimeout(() => setDebouncedQuery(query), 300);", "  return () => clearTimeout(id);", "}, [query]);"),
    ["setTimeout", "setDebouncedQuery(query)", "return", "clearTimeout", "[query]"],
    "This is the beginner-friendly debounce pattern for React search."
  ),
  typed(
    "set3-debounce-mini-10",
    "set3-debounce-mini",
    "Write a pure helper that builds a search URL from baseUrl and query.",
    code("function buildSearchUrl(baseUrl, query) {", "  ", "}"),
    code("function buildSearchUrl(baseUrl, query) {", "  const params = new URLSearchParams({ q: query });", "  return `${baseUrl}?${params.toString()}`;", "}"),
    ["function buildSearchUrl", "new URLSearchParams", "q: query", "params.toString()"],
    "This mini-program combines utility functions, query strings, and API preparation."
  )
];
