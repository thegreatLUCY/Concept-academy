const code = (...lines) => lines.join("\n");
const setId = "ts-set1";

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

export const tsSet1Modules = [
  { id: "ts1-why-typescript", setId, title: "Why TypeScript" },
  { id: "ts1-annotations", setId, title: "Basic Type Annotations" },
  { id: "ts1-arrays-objects", setId, title: "Arrays and Object Types" },
  { id: "ts1-functions", setId, title: "Typing Functions" },
  { id: "ts1-unions-literals", setId, title: "Unions and Literal Types" },
  { id: "ts1-interfaces", setId, title: "Interfaces and Type Aliases" },
  { id: "ts1-narrowing", setId, title: "Narrowing" },
  { id: "ts1-inference-any", setId, title: "Inference, any, and unknown" },
  { id: "ts1-generics", setId, title: "Generics Intro" },
  { id: "ts1-tooling", setId, title: "Compiling and Common Errors" }
];

export const tsSet1Lessons = {
  "ts1-why-typescript": {
    summary:
      "TypeScript is JavaScript plus a type system. You annotate what kind of values your code expects, and the compiler (tsc) checks every usage BEFORE the code runs — turning a whole class of runtime crashes into instant red squiggles. The types are erased at compile time: what ships to the browser is plain JavaScript.",
    points: [
      "TypeScript files end in .ts (.tsx with JSX).",
      "Errors appear at compile time, not in production.",
      "Types are erased — the browser runs normal JavaScript."
    ],
    example: code(
      "let age: number = 25;",
      "age = \"old\"; // Error: Type 'string' is not assignable to type 'number'"
    )
  },
  "ts1-annotations": {
    summary:
      "An annotation follows a colon after the name: let name: string. The primitive types are string, number (all numbers — no separate int/float), and boolean. Once annotated, a variable can only ever hold that type; assigning anything else is a compile error.",
    points: [
      "let title: string; let count: number; let done: boolean.",
      "number covers integers AND decimals.",
      "Annotations lock the type for the variable's whole life."
    ],
    example: code(
      "let title: string = \"TS Basics\";",
      "let count: number = 3;",
      "let done: boolean = false;"
    )
  },
  "ts1-arrays-objects": {
    summary:
      "Array types append [] to the element type: string[] is an array of strings. Object shapes are described inline with property names and types: { name: string; age: number }. Mark a property optional with ?, meaning it may be missing.",
    points: [
      "number[] — array of numbers; string[][] — array of string arrays.",
      "{ name: string; age: number } describes an object's shape.",
      "age?: number — the property may be absent."
    ],
    example: code(
      "const scores: number[] = [90, 85];",
      "",
      "const user: { name: string; age?: number } = {",
      "  name: \"Aya\"",
      "};"
    )
  },
  "ts1-functions": {
    summary:
      "Functions annotate each parameter and (optionally) the return value: function add(a: number, b: number): number. The compiler then rejects wrong argument types, wrong argument counts, AND wrong usage of the result. Optional parameters take ?, defaults use =, and a function that returns nothing returns void.",
    points: [
      "function add(a: number, b: number): number { return a + b; }",
      "greet(name: string, title?: string) — title is optional.",
      ": void — the function returns nothing useful."
    ],
    example: code(
      "function add(a: number, b: number): number {",
      "  return a + b;",
      "}",
      "",
      "function log(message: string): void {",
      "  console.log(message);",
      "}"
    )
  },
  "ts1-unions-literals": {
    summary:
      "A union type accepts several alternatives: string | number means \"either one\". Literal types narrow to exact VALUES: type Status = \"loading\" | \"success\" | \"error\" allows only those three strings — typos become compile errors, which is why unions of literals are everywhere in real apps.",
    points: [
      "let id: string | number — both are valid.",
      "type Direction = \"left\" | \"right\" — exact values only.",
      "Literal unions turn typos like \"sucess\" into compile errors."
    ],
    example: code(
      "type Status = \"loading\" | \"success\" | \"error\";",
      "",
      "let state: Status = \"loading\";",
      "state = \"done\"; // Error: not assignable to type Status"
    )
  },
  "ts1-interfaces": {
    summary:
      "Interfaces and type aliases give object shapes a NAME you can reuse: interface User { name: string; age: number }. Both work for objects; type also handles unions and primitives. readonly forbids reassigning a property. Naming your shapes is what makes large codebases readable.",
    points: [
      "interface User { name: string; age: number }",
      "type User = { name: string; age: number } — mostly interchangeable.",
      "readonly id: number — cannot be reassigned after creation."
    ],
    example: code(
      "interface User {",
      "  readonly id: number;",
      "  name: string;",
      "  email?: string;",
      "}",
      "",
      "const aya: User = { id: 1, name: \"Aya\" };"
    )
  },
  "ts1-narrowing": {
    summary:
      "When a value has a union type, you cannot use type-specific operations until you NARROW it. typeof checks narrow primitives (if (typeof id === \"string\")), Array.isArray narrows arrays, and the in operator checks for properties. Inside the check, TypeScript knows the exact type — autocomplete and safety follow.",
    points: [
      "if (typeof id === \"string\") { id.toUpperCase() } — safe inside the check.",
      "Array.isArray(value) narrows array unions.",
      "\"name\" in obj narrows by property presence."
    ],
    example: code(
      "function describe(id: string | number) {",
      "  if (typeof id === \"string\") {",
      "    return id.toUpperCase();",
      "  }",
      "  return id.toFixed(2);",
      "}"
    )
  },
  "ts1-inference-any": {
    summary:
      "TypeScript infers types you do not write: let count = 0 is a number automatically — annotate only where inference cannot see (parameters, empty arrays). any switches the checker OFF for a value and silently spreads; unknown is the safe alternative that forces you to narrow before use.",
    points: [
      "let name = \"Aya\" — inferred string; no annotation needed.",
      "any disables checking — avoid it; it defeats TypeScript.",
      "unknown accepts anything but requires narrowing before use."
    ],
    example: code(
      "let count = 0;        // inferred: number",
      "",
      "let risky: any = \"hi\";",
      "risky.definitely.not.there; // compiles! any hides the bug",
      "",
      "let safe: unknown = \"hi\";",
      "// safe.toUpperCase(); // Error until you narrow it"
    )
  },
  "ts1-generics": {
    summary:
      "Generics let one function or type work with MANY types while staying type-safe. The type parameter <T> is a placeholder filled in at each call: function first<T>(items: T[]): T returns a string from string[] and a number from number[] — no any, no casting. You already use generics: useState<number>, Array<string>, Promise<User>.",
    points: [
      "function first<T>(items: T[]): T — T adapts per call.",
      "Usually inferred: first([1, 2]) makes T = number automatically.",
      "Generic types: Array<string>, Promise<User>."
    ],
    example: code(
      "function first<T>(items: T[]): T {",
      "  return items[0];",
      "}",
      "",
      "const n = first([1, 2, 3]);      // n: number",
      "const s = first([\"a\", \"b\"]);   // s: string"
    )
  },
  "ts1-tooling": {
    summary:
      "tsc compiles .ts to .js and reports type errors; most projects run it through Vite or another bundler with tsconfig.json controlling strictness. Turn strict mode ON — it catches nulls and implicit any. Learn to read the errors: 'Type X is not assignable to type Y' tells you exactly which value violated which expectation.",
    points: [
      "tsc checks AND compiles; tsconfig.json configures it.",
      "\"strict\": true is the setting that makes TypeScript worth it.",
      "Errors name the value's actual type and the expected type — read both."
    ],
    example: code(
      "// tsconfig.json (excerpt)",
      "{",
      "  \"compilerOptions\": {",
      "    \"strict\": true",
      "  }",
      "}"
    )
  }
};

export const tsSet1Questions = [
  ...attach("ts1-why-typescript", [
    mcq("What is TypeScript?", ["JavaScript plus a static type system checked at compile time", "A faster JavaScript runtime", "A CSS preprocessor"], "JavaScript plus a static type system checked at compile time", "TypeScript adds types on top of JavaScript; the checker runs before the code does."),
    mcq("When does TypeScript catch type errors?", ["At compile time, before the code runs", "While users click around", "Only in unit tests"], "At compile time, before the code runs", "That early feedback is the whole value proposition."),
    mcq("What file extension do TypeScript files use?", [".ts (or .tsx with JSX)", ".js only", ".type"], ".ts (or .tsx with JSX)", "tsx is for files containing JSX markup."),
    tf("Browsers execute TypeScript directly.", false, "TypeScript compiles to plain JavaScript first; browsers never see the types."),
    tf("Type annotations are erased during compilation.", true, "The emitted JavaScript contains no trace of the types."),
    mcq("What happens here?", ["Compile error: string is not assignable to number", "age becomes \"old\" at runtime", "It logs NaN"], "Compile error: string is not assignable to number", "The annotation locks age to numbers.", code("let age: number = 25;", "age = \"old\";")),
    mcq("Which bug class does TypeScript largely eliminate?", ["Passing the wrong kind of value (string where number expected, missing properties)", "Slow network requests", "CSS layout bugs"], "Passing the wrong kind of value (string where number expected, missing properties)", "Type mismatches and typo'd property names die at compile time."),
    fill("Complete the compiler's name.", "The TypeScript compiler command is __1__.", [{ label: "__1__", answers: ["tsc"] }], "tsc type-checks and emits JavaScript."),
    mcq("Why do teams adopt TypeScript on large codebases?", ["Types document intent and let editors refactor and autocomplete reliably", "It makes the site load faster", "It removes the need for tests"], "Types document intent and let editors refactor and autocomplete reliably", "Types are machine-checked documentation."),
    tf("Valid JavaScript is (almost always) valid TypeScript, so you can adopt it gradually.", true, "TypeScript is a superset of JavaScript — rename .js to .ts and add types incrementally.")
  ]),
  ...attach("ts1-annotations", [
    mcq("Which line correctly annotates a string variable?", ["let title: string = \"Hi\";", "let title = string \"Hi\";", "string title = \"Hi\";"], "let title: string = \"Hi\";", "The annotation is a colon and type AFTER the name."),
    fill("Annotate the count as a number.", "let count: __1__ = 0;", [{ label: "__1__", answers: ["number"] }], "number is the single numeric type."),
    mcq("Which type covers BOTH 3 and 3.14?", ["number", "int and float separately", "decimal"], "number", "TypeScript has one numeric type: number."),
    fill("Annotate the flag.", "let isActive: __1__ = true;", [{ label: "__1__", answers: ["boolean"] }], "boolean holds true or false."),
    mcq("What happens after let id: number = 1; id = \"one\";?", ["Compile error", "id becomes \"one\"", "id becomes NaN"], "Compile error", "Annotated variables reject other types forever."),
    tf("Type names string, number, and boolean are lowercase in annotations.", true, "Capitalized String/Number/Boolean are wrapper object types — don't use them."),
    mcq("What does this code do?", ["Fails to compile — price is a number", "Sets price to \"9.99\"", "Rounds the string"], "Fails to compile — price is a number", "Quotes make it a string, which a number variable rejects.", code("let price: number = 4.5;", "price = \"9.99\";")),
    fill("Annotate the message.", "let message: __1__ = \"hello\";", [{ label: "__1__", answers: ["string"] }], "string is the text type."),
    mcq("Where do annotations matter MOST (because inference cannot help)?", ["Function parameters", "Literal assignments like let x = 5", "Comments"], "Function parameters", "Parameters have no initializer to infer from — annotate them always."),
    typed("Declare a constant named username with an explicit string annotation, holding the value admin.", "", "const username: string = \"admin\";", ["username: string", "\"admin\""], "const name: type = value is the annotated declaration shape.")
  ]),
  ...attach("ts1-arrays-objects", [
    mcq("Which type describes an array of numbers?", ["number[]", "array<int>", "[number...]"], "number[]", "Element type plus [] — or the equivalent Array<number>."),
    fill("Annotate the list of names.", "const names: __1__[] = [\"Aya\", \"Omar\"];", [{ label: "__1__", answers: ["string"] }], "string[] is an array of strings."),
    mcq("What does { name: string; age: number } describe?", ["An object with a string name and numeric age", "Two separate variables", "A class definition"], "An object with a string name and numeric age", "Inline object types list each property with its type."),
    mcq("What does the ? mean in age?: number?", ["The property may be missing", "The property may be any type", "The property is private"], "The property may be missing", "Optional properties make partial objects type-safe."),
    mcq("Why does this fail?", ["The required age property is missing", "name should be capitalized", "Objects need classes"], "The required age property is missing", "Every non-optional property must be present.", code("const user: { name: string; age: number } = {", "  name: \"Aya\"", "};")),
    tf("Array<string> and string[] mean the same thing.", true, "They are two syntaxes for the identical type."),
    mcq("What type should hold [[1, 2], [3]]?", ["number[][]", "number[2]", "array(array(number))"], "number[][]", "An array of number arrays stacks the brackets."),
    fill("Make the email optional.", "const user: { name: string; email__1__: string } = { name: \"Aya\" };", [{ label: "__1__", answers: ["?"] }], "The ? sits between the property name and the colon."),
    mcq("Why does scores.push(\"90\") fail for scores: number[]?", ["The array only accepts numbers", "push is not allowed in TypeScript", "Strings need double quotes"], "The array only accepts numbers", "Element types are enforced on every operation, including push."),
    typed("Declare a constant tags annotated as string[] containing \"ts\" and \"react\".", "", "const tags: string[] = [\"ts\", \"react\"];", ["tags: string[]", "\"ts\"", "\"react\""], "Annotation then a normal array literal.")
  ]),
  ...attach("ts1-functions", [
    mcq("Which is a fully typed add function?", ["function add(a: number, b: number): number { return a + b; }", "function add(a, b): number { return a + b; }", "function add(number a, number b) { return a + b; }"], "function add(a: number, b: number): number { return a + b; }", "Each parameter is annotated; the return type follows the parentheses."),
    fill("Annotate the return type.", "function double(n: number): __1__ {\n  return n * 2;\n}", [{ label: "__1__", answers: ["number"] }], "The return annotation follows the parameter list."),
    mcq("What does a void return type mean?", ["The function returns nothing useful", "The function never finishes", "The function returns null"], "The function returns nothing useful", "Loggers and event handlers typically return void."),
    mcq("What happens when you call add(2) for add(a: number, b: number)?", ["Compile error: expected 2 arguments, got 1", "b becomes undefined silently", "It returns NaN"], "Compile error: expected 2 arguments, got 1", "TypeScript enforces argument COUNT, unlike plain JavaScript."),
    fill("Make the title parameter optional.", "function greet(name: string, title__1__: string) {\n  return title ? `${title} ${name}` : name;\n}", [{ label: "__1__", answers: ["?"] }], "Optional parameters must come after required ones."),
    mcq("What is the inferred return type here?", ["string", "number", "void"], "string", "TypeScript infers returns from the return statements — annotation optional but documenting.", code("function shout(text: string) {", "  return text.toUpperCase();", "}")),
    tf("A parameter default like exp: number = 2 makes the parameter optional for callers.", true, "Defaults imply optionality with a fallback value."),
    mcq("Why does greet(42) fail for greet(name: string)?", ["42 is not a string", "Numbers must be quoted", "greet needs two arguments"], "42 is not a string", "Argument types are checked against parameter annotations."),
    mcq("Which annotation fits an arrow function that doubles a number?", ["const double = (n: number): number => n * 2;", "const double = n: number => number n * 2;", "const double: number = (n) => n * 2;"], "const double = (n: number): number => n * 2;", "Arrow functions annotate the same way: parameters, then return."),
    typed("Write a function isAdult that takes age (number) and returns a boolean: age >= 18.", "", "function isAdult(age: number): boolean {\n  return age >= 18;\n}", ["age: number", "boolean", "age >= 18"], "Annotated parameter, boolean return type, comparison result returned.", ["function isAdult(age: number): boolean {\n  return age >= 18;\n}", "const isAdult = (age: number): boolean => age >= 18;"])
  ]),
  ...attach("ts1-unions-literals", [
    mcq("What does string | number mean?", ["The value may be a string OR a number", "A string followed by a number", "A tuple of both"], "The value may be a string OR a number", "The pipe creates a union of alternatives."),
    fill("Allow both kinds of id.", "let id: string __1__ number;", [{ label: "__1__", answers: ["|"] }], "The | separates union members."),
    mcq("What does type Status = \"loading\" | \"success\" | \"error\" allow?", ["Only those exact three strings", "Any string", "Any three strings"], "Only those exact three strings", "Literal unions whitelist exact values."),
    mcq("What happens with state = \"sucess\" (typo) when state: Status?", ["Compile error — not a member of the union", "Runtime crash", "Nothing; close enough"], "Compile error — not a member of the union", "Literal unions catch typos that plain strings would let through."),
    tf("Literal unions like \"asc\" | \"desc\" are widely used for options and modes in real codebases.", true, "They self-document the valid choices and autocomplete in editors."),
    fill("Define the union of exact values.", "type Direction = \"left\" __1__ \"right\";", [{ label: "__1__", answers: ["|"] }], "Same pipe, but between literal values."),
    mcq("Which value satisfies let flag: boolean | null?", ["null", "\"true\"", "0"], "null", "The union allows booleans and null — not strings or numbers."),
    mcq("Why use string | number instead of any for an id?", ["It still checks: only those two types pass, and usage must narrow", "It is shorter to type", "any is deprecated"], "It still checks: only those two types pass, and usage must narrow", "Unions keep safety; any abandons it."),
    mcq("What is the type of value inside this if block?", ["string", "string | number", "number"], "string", "The typeof check narrows the union for that branch.", code("function show(value: string | number) {", "  if (typeof value === \"string\") {", "    // value is ??? here", "  }", "}")),
    typed("Define a type alias Size allowing exactly \"small\", \"medium\", or \"large\".", "", "type Size = \"small\" | \"medium\" | \"large\";", ["type Size", "\"small\"", "\"medium\"", "\"large\""], "type Name = literal | literal | literal — a classic options union.")
  ]),
  ...attach("ts1-interfaces", [
    mcq("What does an interface do?", ["Names an object shape so it can be reused", "Creates a class instance", "Runs at runtime to validate data"], "Names an object shape so it can be reused", "Interfaces are compile-time contracts for object structure."),
    fill("Complete the interface keyword.", "__1__ User {\n  name: string;\n  age: number;\n}", [{ label: "__1__", answers: ["interface"] }], "interface Name { ...properties } declares the shape."),
    mcq("Which object satisfies interface User { name: string; age: number }?", ["{ name: \"Aya\", age: 25 }", "{ name: \"Aya\" }", "{ name: 25, age: \"Aya\" }"], "{ name: \"Aya\", age: 25 }", "Every property must exist with the right type."),
    mcq("What does readonly id: number prevent?", ["Reassigning id after the object is created", "Reading id", "Setting id to zero"], "Reassigning id after the object is created", "readonly is compile-time immutability per property."),
    tf("type User = { name: string } works almost identically to an interface for object shapes.", true, "Both name a shape; type additionally handles unions and primitives."),
    mcq("How does a function declare it accepts a User?", ["function greet(user: User) { ... }", "function greet(User user) { ... }", "function greet(user instanceof User)"], "function greet(user: User) { ... }", "Use the interface name like any other type annotation."),
    mcq("Why does this fail?", ["email is required by the interface but missing", "Interfaces cannot have strings", "name must come last"], "email is required by the interface but missing", "Mark properties optional with ? if they may be absent.", code("interface User { name: string; email: string }", "const u: User = { name: \"Aya\" };")),
    fill("Make the id immutable.", "interface Product {\n  __1__ id: number;\n  name: string;\n}", [{ label: "__1__", answers: ["readonly"] }], "readonly goes before the property name."),
    mcq("Which needs type instead of interface?", ["A union: type Id = string | number", "An object with 3 properties", "An object with methods"], "A union: type Id = string | number", "Interfaces describe object shapes; unions need type aliases."),
    typed("Define an interface Book with a string title and a number pages.", "", "interface Book {\n  title: string;\n  pages: number;\n}", ["interface Book", "title: string", "pages: number"], "Interfaces collect named, typed properties.")
  ]),
  ...attach("ts1-narrowing", [
    mcq("Why can't you call id.toUpperCase() when id: string | number?", ["id might be a number, which has no toUpperCase", "Unions disable all methods", "toUpperCase is deprecated"], "id might be a number, which has no toUpperCase", "You must narrow to string first."),
    fill("Narrow to the string case.", "if (__1__ id === \"string\") {\n  id.toUpperCase();\n}", [{ label: "__1__", answers: ["typeof"] }], "typeof checks narrow primitive unions."),
    mcq("Inside if (typeof id === \"number\"), what is id's type?", ["number", "string | number", "any"], "number", "TypeScript tracks the check and narrows within the branch."),
    mcq("Which check narrows an array union like string | string[]?", ["Array.isArray(value)", "typeof value === \"array\"", "value.isArray()"], "Array.isArray(value)", "typeof returns \"object\" for arrays — Array.isArray is the correct test."),
    mcq("What does the in operator narrow by?", ["Whether an object has a property: \"bark\" in pet", "Whether a value is in an array", "Numeric ranges"], "Whether an object has a property: \"bark\" in pet", "Property-presence checks distinguish object union members."),
    tf("After an early return for one union member, the remaining code sees the narrowed leftover type.", true, "Narrowing flows through control flow, not just if blocks."),
    mcq("What is value's type AFTER this if block returns?", ["number", "string", "string | number"], "number", "The string case returned, so only number remains below.", code("function f(value: string | number) {", "  if (typeof value === \"string\") {", "    return value.trim();", "  }", "  // value is ??? here", "}")),
    mcq("How do you safely handle text: string | null?", ["Check first: if (text !== null) { text.trim() }", "Call text.trim() and hope", "Cast it: (text as string).trim() everywhere"], "Check first: if (text !== null) { text.trim() }", "A null check narrows away null; casting just silences the safety."),
    fill("Narrow by property presence.", "if (\"bark\" __1__ pet) {\n  pet.bark();\n}", [{ label: "__1__", answers: ["in"] }], "The in operator narrows object unions by their distinguishing members."),
    typed("Write a function len that takes value: string | string[] and returns value.length (both have length — but add an Array.isArray check that returns value.length for arrays and value.trim().length for strings).", "", "function len(value: string | string[]): number {\n  if (Array.isArray(value)) {\n    return value.length;\n  }\n  return value.trim().length;\n}", ["Array.isArray(value)", "value.trim().length"], "Array.isArray splits the union; each branch uses its own narrowed type.")
  ]),
  ...attach("ts1-inference-any", [
    mcq("What type does TypeScript infer for let count = 0?", ["number", "any", "int"], "number", "Initializers drive inference — no annotation needed."),
    mcq("What does the any type do?", ["Disables type checking for that value entirely", "Accepts only objects", "Makes the value immutable"], "Disables type checking for that value entirely", "any is an escape hatch that silently spreads unsafety."),
    tf("Code like value.definitely.not.there compiles without error when value is any.", true, "That is exactly why any is dangerous — the checker looks away."),
    mcq("What is unknown?", ["A safe any: accepts everything, but must be narrowed before use", "A typo for any", "The type of undefined"], "A safe any: accepts everything, but must be narrowed before use", "unknown forces a typeof or other check before you touch the value."),
    mcq("Where should you still write annotations despite inference?", ["Function parameters and empty arrays", "Every single variable", "String literals"], "Function parameters and empty arrays", "Inference has nothing to look at in those positions."),
    mcq("What is inferred for let items = []?", ["any[] — annotate it, e.g. const items: string[] = []", "never[] forever", "object"], "any[] — annotate it, e.g. const items: string[] = []", "Empty literals give inference no element information."),
    tf("Using any everywhere gives you TypeScript's benefits with less typing.", false, "any removes the benefits; it is plain JavaScript with extra steps."),
    mcq("Why does this fail, and why is that GOOD?", ["unknown must be narrowed first — the error forces a safety check", "unknown values are always null", "toUpperCase needs a number"], "unknown must be narrowed first — the error forces a safety check", "unknown turns 'hope it is a string' into 'prove it is a string'.", code("let data: unknown = fetchSomething();", "data.toUpperCase();")),
    fill("Use the safe top type.", "let payload: __1__ = JSON.parse(text);\nif (typeof payload === \"string\") {\n  console.log(payload.trim());\n}", [{ label: "__1__", answers: ["unknown"] }], "unknown + narrowing is the safe pattern for parsed data."),
    mcq("Which tsconfig option flags parameters that silently become any?", ["noImplicitAny (part of strict)", "allowJs", "skipLibCheck"], "noImplicitAny (part of strict)", "Strict mode refuses parameters whose type cannot be inferred.")
  ]),
  ...attach("ts1-generics", [
    mcq("What problem do generics solve?", ["One function working safely across many types without any", "Making code shorter", "Running code faster"], "One function working safely across many types without any", "The type parameter preserves the input type in the output."),
    mcq("In function first<T>(items: T[]): T, what is T?", ["A type placeholder filled in at each call", "A class named T", "The string \"T\""], "A type placeholder filled in at each call", "T binds to whatever element type the caller provides."),
    mcq("What is the type of result?", ["number", "any", "unknown"], "number", "T is inferred as number from the argument, so the return is number.", code("function first<T>(items: T[]): T {", "  return items[0];", "}", "const result = first([10, 20]);")),
    tf("Callers usually do NOT write the type argument — TypeScript infers it from the arguments.", true, "first([\"a\"]) infers T = string automatically."),
    fill("Declare the type parameter.", "function wrap<__1__>(value: T): T[] {\n  return [value];\n}", [{ label: "__1__", answers: ["T"] }], "Angle brackets after the name declare the generic parameter."),
    mcq("What does Promise<User> express?", ["A promise that resolves to a User", "A promise created by a user", "An array of promises"], "A promise that resolves to a User", "Generic TYPES parameterize containers: arrays, promises, maps."),
    mcq("Which React hook usage is generic?", ["useState<number>(0)", "useState(0).number", "useState:number(0)"], "useState<number>(0)", "The type argument fixes the state type explicitly."),
    mcq("Why is first<T> better than first(items: any[]): any?", ["The caller keeps the element type: strings stay strings, numbers stay numbers", "It compiles faster", "any[] cannot hold strings"], "The caller keeps the element type: strings stay strings, numbers stay numbers", "Generics carry type information THROUGH the function."),
    mcq("What does Array<string> mean?", ["Same as string[]", "An array with one string", "A generic error"], "Same as string[]", "Array<T> is the generic form of the [] syntax."),
    typed("Write a generic function last<T> that takes items: T[] and returns the final element (type T).", "", "function last<T>(items: T[]): T {\n  return items[items.length - 1];\n}", ["last<T>", "items: T[]", "): T"], "Same shape as first<T>, indexing the end of the array.")
  ]),
  ...attach("ts1-tooling", [
    mcq("What does tsc do?", ["Type-checks TypeScript and compiles it to JavaScript", "Runs TypeScript in the browser", "Minifies CSS"], "Type-checks TypeScript and compiles it to JavaScript", "tsc is the compiler; bundlers like Vite wrap it in dev workflows."),
    mcq("Which file configures the TypeScript compiler?", ["tsconfig.json", "package-lock.json", "types.config"], "tsconfig.json", "tsconfig.json sets strictness, output, and which files compile."),
    mcq("What does \"strict\": true enable?", ["The full set of safety checks, including noImplicitAny and strictNullChecks", "Faster builds", "Automatic code formatting"], "The full set of safety checks, including noImplicitAny and strictNullChecks", "Strict mode is the recommended baseline for every new project."),
    tf("With strictNullChecks, string and string | null are different types.", true, "You must handle null explicitly — eliminating a whole crash family."),
    mcq("Read this error: Type 'string' is not assignable to type 'number'. What happened?", ["A string value was assigned where a number was expected", "A number was misspelled", "The compiler crashed"], "A string value was assigned where a number was expected", "Errors name the actual type, then the expected type — read both halves."),
    mcq("What does error TS2339: Property 'nmae' does not exist on type 'User' suggest?", ["A typo — the property is probably name", "User has no properties", "TypeScript is broken"], "A typo — the property is probably name", "Property-name errors are usually misspellings the checker caught for you."),
    fill("Complete the config filename.", "The compiler reads its options from __1__.json.", [{ label: "__1__", answers: ["tsconfig"] }], "tsconfig.json lives at the project root."),
    tf("In a Vite React + TypeScript project, types are checked while Vite serves and builds the code.", true, "Scaffold with npm create vite@latest and pick the TypeScript template."),
    mcq("Your editor shows a red squiggle under an argument. What is the FIRST move?", ["Hover it and read the full error message", "Add as any until it compiles", "Restart the computer"], "Hover it and read the full error message", "The message almost always names the exact mismatch; casting it away hides real bugs."),
    mcq("Why is sprinkling as any to silence errors harmful?", ["It hides genuine type mismatches that will crash at runtime", "It slows the compiler", "It increases bundle size"], "It hides genuine type mismatches that will crash at runtime", "Fix the type, don't mute the messenger.")
  ])
];
